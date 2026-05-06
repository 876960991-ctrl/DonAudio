/* ================================================================
   東方之音 · 悬浮音乐播放器（v2）
   - SVG 图标，风格统一
   - 本地音频，无 CORS 问题
   - 播放/暂停、上下首、随机、循环、喜欢、音量、进度
   - 持久化：localStorage
   ================================================================ */
(function musicPlayer() {
  if (window.__DN_PLAYER_INITED__) return;
  window.__DN_PLAYER_INITED__ = true;

  const waitForData = () => new Promise(resolve => {
    const check = () => {
      if (window.DONAUDIO_DATA && window.DONAUDIO_DATA.todayMix) return resolve();
      setTimeout(check, 50);
    };
    check();
  });

  waitForData().then(init);

  /* ============== SVG 图标（线稿风，24x24） ============== */
  const ICO = {
    play:   `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M7 5v14l12-7z"/></svg>`,
    pause:  `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>`,
    prev:   `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6 5h2v14H6zM20 5v14l-11-7z"/></svg>`,
    next:   `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg>`,
    shuffle:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
             <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
             <line x1="4" y1="4" x2="9" y2="9"/></svg>`,
    repeat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
             <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
    repeatOne: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
             <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
             <text x="12" y="15" font-size="7" font-weight="700" fill="currentColor" stroke="none" text-anchor="middle">1</text></svg>`,
    heart:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    heartOn: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    volume:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
    mute:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    close:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    music:   `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M9 17V5l12-2v12" opacity=".5"/><circle cx="6" cy="17" r="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="15" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    add:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    check:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  };

  function init() {
    const PLAYLIST = window.DONAUDIO_DATA.todayMix;
    const LS_KEY = 'dnAudio.v1';
    let state = Object.assign({
      idx: 0, shuffle: true, loop: 'none', volume: 0.6, muted: false,
      liked: [], collapsed: false,
      currentTime: 0,     // 当前播放位置（秒）— 跨页面恢复用
      playing: false,     // 跨页面是否应继续播放
      lastSaveAt: 0,      // 防写入过频
    }, (function readLS() {
      try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch (e) { return {}; }
    })());
    const saveLS = () => { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} };

    const host = document.createElement('div');
    host.className = 'dn-player' + (state.collapsed ? ' collapsed' : '');
    host.innerHTML = `
      <button class="dn-ball" aria-label="打开播放器" title="今日推荐">
        <span class="dn-ball-bars"><span></span><span></span><span></span></span>
      </button>

      <div class="dn-panel">
        <div class="dn-panel-head">
          <div class="dn-panel-title">
            <span class="dn-dot"></span>
            今日 · 推荐播单
          </div>
          <button class="dn-close" aria-label="最小化" title="最小化">${ICO.close}</button>
        </div>

        <div class="dn-now">
          <div class="dn-cover" id="dnCover"></div>
          <div class="dn-now-info">
            <div class="dn-now-title" id="dnTitle">—</div>
            <div class="dn-now-artist" id="dnArtist">—</div>
          </div>
          <button class="dn-ico-btn dn-like" id="dnLike" aria-label="喜欢" title="喜欢">${ICO.heart}</button>
        </div>

        <div class="dn-progress" id="dnProgress">
          <div class="dn-progress-track">
            <div class="dn-progress-fill" id="dnProgressFill"></div>
            <div class="dn-progress-thumb" id="dnProgressThumb"></div>
          </div>
          <div class="dn-time">
            <span id="dnCur">0:00</span>
            <span id="dnDur">--:--</span>
          </div>
        </div>

        <div class="dn-controls">
          <button class="dn-ico-btn" id="dnShuffle" aria-label="随机播放" title="随机播放">${ICO.shuffle}</button>
          <button class="dn-ico-btn" id="dnPrev" aria-label="上一首" title="上一首">${ICO.prev}</button>
          <button class="dn-play-btn" id="dnPlay" aria-label="播放/暂停" title="播放/暂停">${ICO.play}</button>
          <button class="dn-ico-btn" id="dnNext" aria-label="下一首" title="下一首">${ICO.next}</button>
          <button class="dn-ico-btn" id="dnLoop" aria-label="循环模式" title="不循环">${ICO.repeat}</button>
        </div>

        <div class="dn-volume">
          <button class="dn-ico-btn" id="dnMute" aria-label="静音" title="静音切换">${ICO.volume}</button>
          <input type="range" id="dnVol" min="0" max="100" step="1">
        </div>

        <details class="dn-list-wrap">
          <summary>播放列表 · <span id="dnListCount">${PLAYLIST.length}</span> 首</summary>
          <ul class="dn-list" id="dnList"></ul>
        </details>
      </div>

      <div class="dn-toast" id="dnToast">
        ♪ 点一下这里，开始播放背景音乐
      </div>
    `;
    document.body.appendChild(host);

    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = state.volume;
    audio.muted = state.muted;

    const $ = sel => host.querySelector(sel);
    const ball = $('.dn-ball');
    const closeBtn = $('.dn-close');
    const playBtn  = $('#dnPlay');
    const prevBtn  = $('#dnPrev');
    const nextBtn  = $('#dnNext');
    const shufBtn  = $('#dnShuffle');
    const loopBtn  = $('#dnLoop');
    const likeBtn  = $('#dnLike');
    const muteBtn  = $('#dnMute');
    const volInput = $('#dnVol');
    const titleEl  = $('#dnTitle');
    const artistEl = $('#dnArtist');
    const coverEl  = $('#dnCover');
    const progEl   = $('#dnProgress');
    const fillEl   = $('#dnProgressFill');
    const thumbEl  = $('#dnProgressThumb');
    const curEl    = $('#dnCur');
    const durEl    = $('#dnDur');
    const listEl   = $('#dnList');
    const toastEl  = $('#dnToast');

    function renderList() {
      listEl.innerHTML = PLAYLIST.map((t, i) => `
        <li class="dn-item ${i === state.idx ? 'active' : ''}" data-i="${i}">
          <span class="dn-item-index">${String(i + 1).padStart(2, '0')}</span>
          <span class="dn-item-text">
            <span class="dn-item-title">${t.title}</span>
            <span class="dn-item-artist">${t.artist}</span>
          </span>
          <span class="dn-item-liked">${state.liked.includes(t.url) ? ICO.heartOn : ''}</span>
        </li>
      `).join('');
    }

    function loadTrack(i, autoplay = false, startAt = 0) {
      state.idx = ((i % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
      const t = PLAYLIST[state.idx];
      audio.src = t.url;
      titleEl.textContent = t.title;
      artistEl.textContent = t.artist;
      if (window.DONAUDIO_SVG && typeof window.DONAUDIO_SVG.cover === 'function') {
        coverEl.innerHTML = window.DONAUDIO_SVG.cover(t.cover != null ? t.cover : i, 200, 200);
      }
      const isLiked = state.liked.includes(t.url);
      likeBtn.classList.toggle('on', isLiked);
      likeBtn.innerHTML = isLiked ? ICO.heartOn : ICO.heart;
      renderList();
      // 如果需要从指定位置恢复，等 metadata 加载完再跳
      if (startAt > 0) {
        const jump = () => { try { audio.currentTime = startAt; } catch(e){} };
        audio.addEventListener('loadedmetadata', jump, { once: true });
      }
      saveLS();
      if (autoplay) audio.play().catch(() => {});
    }

    function togglePlay() {
      if (audio.paused) {
        audio.play().then(() => toastEl.classList.remove('on'))
                    .catch(err => console.warn('play blocked', err));
      } else audio.pause();
    }
    function next() {
      state.currentTime = 0;
      if (state.shuffle) {
        let n;
        do { n = Math.floor(Math.random() * PLAYLIST.length); } while (n === state.idx && PLAYLIST.length > 1);
        loadTrack(n, true);
      } else loadTrack(state.idx + 1, true);
    }
    function prev() {
      if (audio.currentTime > 3) { audio.currentTime = 0; state.currentTime = 0; saveLS(); return; }
      state.currentTime = 0;
      if (state.shuffle) {
        let n;
        do { n = Math.floor(Math.random() * PLAYLIST.length); } while (n === state.idx && PLAYLIST.length > 1);
        loadTrack(n, true);
      } else loadTrack(state.idx - 1, true);
    }

    ball.addEventListener('click', () => { host.classList.remove('collapsed'); state.collapsed = false; saveLS(); });
    closeBtn.addEventListener('click', () => { host.classList.add('collapsed'); state.collapsed = true; saveLS(); });
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    shufBtn.addEventListener('click', () => {
      state.shuffle = !state.shuffle;
      shufBtn.classList.toggle('on', state.shuffle);
      shufBtn.title = state.shuffle ? '随机播放（已开）' : '随机播放（已关）';
      saveLS();
    });
    loopBtn.addEventListener('click', () => {
      state.loop = state.loop === 'none' ? 'all' : state.loop === 'all' ? 'one' : 'none';
      loopBtn.classList.toggle('on', state.loop !== 'none');
      loopBtn.innerHTML = state.loop === 'one' ? ICO.repeatOne : ICO.repeat;
      loopBtn.title = state.loop === 'one' ? '单曲循环' : state.loop === 'all' ? '列表循环' : '不循环';
      saveLS();
    });
    likeBtn.addEventListener('click', () => {
      const url = PLAYLIST[state.idx].url;
      const i = state.liked.indexOf(url);
      if (i >= 0) state.liked.splice(i, 1); else state.liked.push(url);
      const isLiked = i < 0;
      likeBtn.classList.toggle('on', isLiked);
      likeBtn.innerHTML = isLiked ? ICO.heartOn : ICO.heart;
      renderList(); saveLS();
    });
    muteBtn.addEventListener('click', () => {
      state.muted = !state.muted; audio.muted = state.muted;
      muteBtn.innerHTML = state.muted ? ICO.mute : ICO.volume;
      saveLS();
    });
    volInput.value = Math.round(state.volume * 100);
    volInput.addEventListener('input', () => {
      state.volume = volInput.value / 100;
      audio.volume = state.volume;
      if (state.muted) { state.muted = false; audio.muted = false; muteBtn.innerHTML = ICO.volume; }
      saveLS();
    });
    listEl.addEventListener('click', (e) => {
      const li = e.target.closest('[data-i]');
      if (!li) return;
      state.currentTime = 0;
      loadTrack(parseInt(li.dataset.i, 10), true);
    });
    progEl.addEventListener('click', (e) => {
      const rect = progEl.getBoundingClientRect();
      const k = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (audio.duration) audio.currentTime = k * audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      const p = audio.currentTime / audio.duration;
      fillEl.style.width = (p * 100) + '%';
      thumbEl.style.left = (p * 100) + '%';
      curEl.textContent = fmtTime(audio.currentTime);
      // 跨页面恢复：每 2 秒写一次当前位置
      const now = Date.now();
      if (now - state.lastSaveAt > 2000) {
        state.currentTime = audio.currentTime;
        state.lastSaveAt = now;
        saveLS();
      }
    });
    audio.addEventListener('loadedmetadata', () => { durEl.textContent = fmtTime(audio.duration); });
    audio.addEventListener('play',  () => {
      playBtn.innerHTML = ICO.pause; playBtn.classList.add('playing');
      state.playing = true; saveLS();
    });
    audio.addEventListener('pause', () => {
      playBtn.innerHTML = ICO.play;  playBtn.classList.remove('playing');
      state.playing = false; saveLS();
    });
    audio.addEventListener('ended', () => {
      // 自然结束，把保存的位置清零，避免下次加载时又跳回末尾
      state.currentTime = 0; saveLS();
      if (state.loop === 'one') { audio.currentTime = 0; audio.play(); return; }
      if (state.loop === 'all' || state.shuffle) { next(); return; }
      if (state.idx < PLAYLIST.length - 1) next();
    });
    audio.addEventListener('error', () => {
      console.warn('audio error', audio.src);
      setTimeout(next, 500);
    });

    function fmtTime(s) {
      if (!isFinite(s)) return '--:--';
      const m = Math.floor(s / 60), sec = Math.floor(s % 60);
      return m + ':' + (sec < 10 ? '0' + sec : sec);
    }

    // 初始化按钮状态
    shufBtn.classList.toggle('on', state.shuffle);
    shufBtn.title = state.shuffle ? '随机播放（已开）' : '随机播放（已关）';
    loopBtn.classList.toggle('on', state.loop !== 'none');
    loopBtn.innerHTML = state.loop === 'one' ? ICO.repeatOne : ICO.repeat;
    loopBtn.title = state.loop === 'one' ? '单曲循环' : state.loop === 'all' ? '列表循环' : '不循环';
    muteBtn.innerHTML = state.muted ? ICO.mute : ICO.volume;

    /* === 跨页面恢复 ===
     * 首次访问（没有保存过位置）才随机选一首；
     * 否则加载上次的那首，并从上次的位置继续播。 */
    const hasResumable = (typeof state.currentTime === 'number' && state.currentTime > 0)
                         || state.playing;
    let startIdx, startAt;
    if (hasResumable) {
      startIdx = state.idx || 0;
      startAt  = state.currentTime || 0;
    } else {
      startIdx = state.shuffle ? Math.floor(Math.random() * PLAYLIST.length) : state.idx;
      startAt  = 0;
    }
    loadTrack(startIdx, false, startAt);

    // 离开页面前立刻保存一次精确位置
    window.addEventListener('beforeunload', () => {
      try {
        state.currentTime = audio.currentTime;
        state.playing = !audio.paused;
        saveLS();
      } catch(e) {}
    });
    // pagehide 是移动端更可靠的卸载事件
    window.addEventListener('pagehide', () => {
      try {
        state.currentTime = audio.currentTime;
        state.playing = !audio.paused;
        saveLS();
      } catch(e) {}
    });

    const tryAutoplay = () => {
      // 若上次是播放中状态，保持播放；否则也尝试自动播（首次访问）
      audio.play().then(() => toastEl.classList.remove('on'))
                  .catch(() => {
                    toastEl.classList.add('on');
                    const dismiss = () => {
                      audio.play().catch(()=>{});
                      toastEl.classList.remove('on');
                      document.removeEventListener('click', dismiss, true);
                    };
                    document.addEventListener('click', dismiss, true);
                  });
    };
    setTimeout(tryAutoplay, 800);

    /* 全局 API：给作品卡的 ▶ 按钮用 */
    window.DNPlayer = {
      playUrl: (url, meta) => {
        if (!url) return;
        state.currentTime = 0;
        audio.src = url;
        if (meta) {
          titleEl.textContent  = meta.title  || '外部曲目';
          artistEl.textContent = meta.artist || meta.author || '来自作品';
          if (window.DONAUDIO_SVG && meta.cover != null) {
            coverEl.innerHTML = window.DONAUDIO_SVG.cover(meta.cover, 200, 200);
          }
        }
        audio.play().then(() => toastEl.classList.remove('on'))
                    .catch(err => console.warn('play blocked', err));
        host.classList.remove('collapsed');
      },
      /* 把作品添加到播放列表（不立即播） */
      addToList: (url, meta) => {
        if (!url) return { added: false };
        // 去重
        const exist = PLAYLIST.findIndex(t => t.url === url);
        if (exist >= 0) {
          showToast(`已在播放列表：${PLAYLIST[exist].title}`, 'warn');
          return { added: false, index: exist };
        }
        const entry = {
          title:  (meta && meta.title)  || '未命名作品',
          artist: (meta && (meta.artist || meta.author)) || '来自作品',
          url,
          cover:  (meta && meta.cover != null) ? meta.cover : 0,
        };
        PLAYLIST.push(entry);
        renderList();
        // 更新播放列表数字
        const countEl = host.querySelector('#dnListCount');
        if (countEl) countEl.textContent = PLAYLIST.length;
        showToast(`已添加到播放列表：${entry.title}`, 'ok');
        // 展开面板让用户看到
        host.classList.remove('collapsed');
        state.collapsed = false; saveLS();
        return { added: true, index: PLAYLIST.length - 1 };
      },
      play:  () => audio.play().catch(()=>{}),
      pause: () => audio.pause(),
      toggle: togglePlay,
      next, prev,
    };

    // Toast 提示（复用 dnToast 元素）
    function showToast(text, kind) {
      toastEl.textContent = text;
      toastEl.dataset.kind = kind || 'ok';
      toastEl.classList.add('on');
      clearTimeout(showToast._t);
      showToast._t = setTimeout(() => toastEl.classList.remove('on'), 2200);
    }

    /* 全局拦截：任何带 .play-btn 的点击都转到 DNPlayer.playUrl，阻止 <a> 跳转 */
    document.addEventListener('click', (e) => {
      // 「添加」按钮优先
      const addBtn = e.target.closest('.add-btn');
      if (addBtn && !addBtn.closest('.dn-player')) {
        const tile = addBtn.closest('[data-audio]');
        const url = tile && tile.dataset && tile.dataset.audio;
        if (url) {
          e.preventDefault();
          e.stopPropagation();
          window.DNPlayer.addToList(url, {
            title: tile.dataset.title,
            artist: tile.dataset.author,
            cover: parseInt(tile.dataset.cover, 10) || 0,
          });
        }
        return;
      }
      const btn = e.target.closest('.play-btn');
      if (!btn) return;
      if (btn.closest('.dn-player')) return;
      const tile = btn.closest('[data-audio]');
      const url = tile && tile.dataset && tile.dataset.audio;
      if (!url) return;
      e.preventDefault();
      e.stopPropagation();
      window.DNPlayer.playUrl(url, {
        title:  tile.dataset.title  || 'Untitled',
        artist: tile.dataset.author || 'Unknown',
        cover:  parseInt(tile.dataset.cover, 10) || 0,
      });
    }, true);
  }
})();
