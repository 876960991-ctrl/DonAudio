/* ================================================================
   東方之音 · 站内信悬浮窗
   - 挂在 shell 层（与悬浮播放器同级），所有页面共用
   - 收起时是一颗与播放器一致的胶囊球，位置在播放器上方
   - 有未读消息时按节奏闪烁
   - 数据存 localStorage（dnChats.v1），刷新不丢
   - 模拟"对方回复"：每发一条会延迟 1~2.5s 自动回一条
   ================================================================ */
(function messenger() {
  // ============== iframe 子页：仅暴露代理 API，转发到 shell ==============
  if (window !== window.top) {
    if (window.__DN_MSG_PROXY__) return;
    window.__DN_MSG_PROXY__ = true;
    function getTop() {
      try { return window.top && window.top.DNMessenger ? window.top.DNMessenger : null; }
      catch (e) { return null; }
    }
    window.DNMessenger = {
      openWith(name) {
        const t = getTop();
        if (t && t.openWith) return t.openWith(name);
        // shell 还没注入 messenger（极少见），用 postMessage 兜底
        try { window.top.postMessage({ type: 'dn:msg-open', name: name }, '*'); } catch (e) {}
      },
      open() { const t = getTop(); if (t && t.open) t.open(); },
      close() { const t = getTop(); if (t && t.close) t.close(); },
    };
    return;
  }

  // ============== shell（顶层）：完整实现 ==============
  if (window.__DN_MSG_INITED__) return;
  window.__DN_MSG_INITED__ = true;

  const LS = 'dnChats.v1';
  function load() {
    try { return JSON.parse(localStorage.getItem(LS) || '{"threads":{}, "unread":{}}'); }
    catch (e) { return { threads: {}, unread: {} }; }
  }
  function save(s) {
    try { localStorage.setItem(LS, JSON.stringify(s)); } catch(e){}
  }
  let state = load();
  let activePeer = null;

  // ============== UI 注入 ==============
  function ensureDom() {
    if (document.getElementById('dnMsg')) return;
    const root = document.createElement('div');
    root.className = 'dn-msg collapsed';
    root.id = 'dnMsg';
    root.dataset.view = 'list';
    root.innerHTML = `
      <button class="dn-msg-ball" id="dnMsgBall" aria-label="站内信">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span class="dn-msg-badge" id="dnMsgBadge" hidden>0</span>
      </button>

      <div class="dn-msg-panel">

        <!-- 视图 A：会话列表的 head（标题 + 关闭） -->
        <header class="dn-msg-head dn-msg-head-list">
          <div class="dn-msg-title">
            <span class="dn-msg-dot"></span>
            <span class="dn-msg-title-text">站内沟通</span>
          </div>
          <button class="dn-msg-close" id="dnMsgCloseA" aria-label="收起">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </header>

        <!-- 视图 B：对话的 head（返回 + 头像 + 名字 + 关闭） -->
        <header class="dn-msg-head dn-msg-head-conv">
          <button class="dn-msg-back" id="dnMsgBack" title="返回会话列表" aria-label="返回">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="dn-msg-peer-strip">
            <div class="dn-msg-av" id="dnMsgPeerAv"></div>
            <div class="dn-msg-peer-meta">
              <div class="dn-msg-name" id="dnMsgPeerName"></div>
              <div class="dn-msg-preview">在线 · 通常几小时内回复</div>
            </div>
          </div>
          <button class="dn-msg-close" id="dnMsgCloseB" aria-label="收起">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </header>

        <!-- 视图 A 内容：会话列表 -->
        <div class="dn-msg-list" id="dnMsgList"></div>

        <!-- 视图 B 内容：对话流 + 输入 -->
        <div class="dn-msg-conv" id="dnMsgConv">
          <div class="dn-msg-stream" id="dnMsgStream"></div>
          <div class="dn-msg-input">
            <textarea id="dnMsgInput" rows="1" placeholder="说点什么…"></textarea>
            <button id="dnMsgSend" class="dn-msg-send">发送</button>
          </div>
        </div>

      </div>
    `;
    document.body.appendChild(root);

    document.getElementById('dnMsgBall').addEventListener('click', open);
    document.getElementById('dnMsgCloseA').addEventListener('click', close);
    document.getElementById('dnMsgCloseB').addEventListener('click', close);
    document.getElementById('dnMsgBack').addEventListener('click', backToList);
    document.getElementById('dnMsgSend').addEventListener('click', sendMsg);
    document.getElementById('dnMsgInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
    });
    renderList();
    refreshBadge();
  }

  // ============== 视图切换 ==============
  function showList() {
    const root = document.getElementById('dnMsg');
    if (root) root.dataset.view = 'list';
  }
  function showConv() {
    const root = document.getElementById('dnMsg');
    if (root) root.dataset.view = 'conv';
  }

  // ============== 状态切换 ==============
  function open() {
    const root = document.getElementById('dnMsg');
    root.classList.remove('collapsed');
    if (activePeer) { showConv(); renderConv(); }
    else { showList(); renderList(); }
  }
  function close() {
    const root = document.getElementById('dnMsg');
    root.classList.add('collapsed');
  }
  function backToList() {
    activePeer = null;
    showList();
    renderList();
  }

  // ============== 渲染会话列表 ==============
  function renderList() {
    const listEl = document.getElementById('dnMsgList');
    const peers = Object.keys(state.threads);
    if (peers.length === 0) {
      listEl.innerHTML = '<div class="dn-msg-empty">还没有会话<br><span>到任意创作者主页点「立刻沟通」试试</span></div>';
      return;
    }
    peers.sort((a, b) => {
      const ta = state.threads[a]; const tb = state.threads[b];
      const la = ta[ta.length - 1]?.t || 0;
      const lb = tb[tb.length - 1]?.t || 0;
      return lb - la;
    });
    listEl.innerHTML = peers.map(p => {
      const msgs = state.threads[p];
      const last = msgs[msgs.length - 1];
      const unread = state.unread[p] || 0;
      const preview = (last?.text || '').slice(0, 32);
      return `
        <div class="dn-msg-item-row">
          <button class="dn-msg-item" data-peer="${encodeURIComponent(p)}">
            <div class="dn-msg-av">${p.charAt(0)}</div>
            <div class="dn-msg-meta">
              <div class="dn-msg-name">${p}${unread ? `<span class="dn-msg-unread-dot">${unread}</span>` : ''}</div>
              <div class="dn-msg-preview">${last?.from === 'me' ? '我：' : ''}${preview || '（开始聊吧）'}</div>
            </div>
          </button>
          <button class="dn-msg-del" data-del="${encodeURIComponent(p)}" title="删除会话" aria-label="删除会话">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      `;
    }).join('');
    listEl.querySelectorAll('.dn-msg-item').forEach(it => {
      it.addEventListener('click', () => {
        const peer = decodeURIComponent(it.dataset.peer);
        openConv(peer);
      });
    });
    listEl.querySelectorAll('.dn-msg-del').forEach(d => {
      d.addEventListener('click', (e) => {
        e.stopPropagation();
        const peer = decodeURIComponent(d.dataset.del);
        deleteThread(peer);
      });
    });
  }

  function deleteThread(peer) {
    if (!confirm(`确认删除与「${peer}」的全部聊天记录？`)) return;
    delete state.threads[peer];
    delete state.unread[peer];
    save(state);
    if (activePeer === peer) { activePeer = null; showList(); }
    renderList();
    refreshBadge();
  }

  // ============== 渲染对话 ==============
  function openConv(peer) {
    activePeer = peer;
    state.unread[peer] = 0;
    save(state);
    refreshBadge();
    showConv();
    renderConv();
  }
  function renderConv() {
    if (!activePeer) return;
    document.getElementById('dnMsgPeerAv').textContent = activePeer.charAt(0);
    document.getElementById('dnMsgPeerName').textContent = activePeer;
    const stream = document.getElementById('dnMsgStream');
    const list = state.threads[activePeer] || [];
    stream.innerHTML = list.map(m => `
      <div class="dn-msg-bubble ${m.from === 'me' ? 'me' : 'peer'}">
        <div class="dn-msg-text">${escape(m.text)}</div>
        <div class="dn-msg-time">${formatTime(m.t)}</div>
      </div>
    `).join('');
    stream.scrollTop = stream.scrollHeight;
  }

  function escape(s) {
    return String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  }
  function formatTime(t) {
    if (!t) return '';
    const d = new Date(t); const now = new Date();
    if (d.toDateString() === now.toDateString()) return d.toTimeString().slice(0, 5);
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.toTimeString().slice(0, 5);
  }

  // ============== 发送消息 ==============
  function sendMsg() {
    const inp = document.getElementById('dnMsgInput');
    const text = inp.value.trim();
    if (!text || !activePeer) return;
    if (!state.threads[activePeer]) state.threads[activePeer] = [];
    state.threads[activePeer].push({ from: 'me', text, t: Date.now() });
    save(state);
    inp.value = '';
    renderConv();
    // 模拟对方在 1~2.5s 后回复
    const wait = 1000 + Math.random() * 1500;
    setTimeout(() => simulateReply(activePeer), wait);
  }

  // ============== 模拟对方回复 ==============
  const replyPhrases = [
    '嗨～收到了！',
    '稍等我看看你的需求～',
    '可以，方便发个 demo 给我听吗？',
    '我这边周三之前有空，约个时间细聊？',
    '嗯，这个方向我熟，能做。',
    '价位上你心里有数么？我先评估下工作量～',
    '好的好的，发我具体的 brief 看看。',
    '我刚试听了你的作品集，挺有意思的。',
  ];
  function simulateReply(peer) {
    if (!state.threads[peer]) state.threads[peer] = [];
    const text = replyPhrases[Math.floor(Math.random() * replyPhrases.length)];
    state.threads[peer].push({ from: 'peer', text, t: Date.now() });
    state.unread[peer] = (state.unread[peer] || 0) + 1;
    save(state);
    if (activePeer === peer) {
      // 正在看这个对话 → 不增加未读，立刻清零
      state.unread[peer] = 0;
      save(state);
      renderConv();
    } else {
      renderList();
    }
    refreshBadge(true);
  }

  // ============== 红点 + 闪烁 ==============
  function totalUnread() {
    return Object.values(state.unread || {}).reduce((s, n) => s + (n || 0), 0);
  }
  function refreshBadge(triggerFlash) {
    const badge = document.getElementById('dnMsgBadge');
    const ball  = document.getElementById('dnMsgBall');
    const root  = document.getElementById('dnMsg');
    const n = totalUnread();
    if (n > 0) {
      badge.hidden = false;
      badge.textContent = n > 99 ? '99+' : String(n);
      root.classList.add('has-unread');
      if (triggerFlash) {
        ball.classList.remove('flash');
        void ball.offsetWidth;
        ball.classList.add('flash');
      }
    } else {
      badge.hidden = true;
      root.classList.remove('has-unread');
    }
  }

  // ============== 公共 API ==============
  window.DNMessenger = {
    /** 打开对某人的会话（如不存在则创建空会话） */
    openWith(peerName) {
      ensureDom();
      if (!state.threads[peerName]) state.threads[peerName] = [];
      save(state);
      activePeer = peerName;
      // 强制进入对话视图
      showConv();
      open();
      renderConv();
    },
    open, close, refreshBadge,
    getState() { return state; },
  };

  // postMessage 兜底（如果某个 iframe 子页拿不到 window.top）
  window.addEventListener('message', (e) => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'dn:msg-open' && e.data.name) {
      window.DNMessenger.openWith(e.data.name);
    }
  });

  // 启动：DOM 就绪后注入
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureDom);
  } else {
    ensureDom();
  }

  // 监听播放器展开/折叠 → 自动给 messenger 加 .player-open 类让位
  function syncWithPlayer() {
    const root = document.getElementById('dnMsg');
    const player = document.querySelector('.dn-player');
    if (!root || !player) return;
    root.classList.toggle('player-open', !player.classList.contains('collapsed'));
  }
  function watchPlayer() {
    const player = document.querySelector('.dn-player');
    if (!player) return;
    syncWithPlayer();
    new MutationObserver(syncWithPlayer).observe(player, { attributes: true, attributeFilter: ['class'] });
  }
  // 播放器是 player.js 异步注入的，用 setInterval 兜底等到出现
  let tries = 0;
  const t = setInterval(() => {
    if (document.querySelector('.dn-player')) { watchPlayer(); clearInterval(t); }
    if (++tries > 40) clearInterval(t); // 4 秒后放弃
  }, 100);
})();
