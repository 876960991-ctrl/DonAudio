/* ================================================================
   東方之音 · iframe 子页面助手
   - 如果不在 iframe 里，重定向到 shell.html#/自己（保证 audio 不被破坏）
   - 在 iframe 里时：
     · 站内 <a> 点击改为 postMessage 通知父窗口切换 hash
     · 通过 postMessage 同步 title 到父窗口
     · 隐藏冗余的 flux-bg / flux-grid（父窗口已有）
     · 屏蔽 player.js 的初始化（播放器只在父窗口存在）
   ================================================================ */
(function embed() {
  const inFrame = (window !== window.top);

  if (!inFrame) {
    // 不在 iframe 里：重定向到 shell
    const self = location.pathname.split('/').pop() || 'index.html';
    const q = location.search || '';
    const hash = '#/' + self + q;
    // 如果 URL 已经就是 shell.html 本身，就不重定向（避免死循环）
    if (self !== 'shell.html' && self !== '') {
      // 带上原本的查询
      const shellUrl = location.pathname.replace(/[^/]*$/, '') + 'shell.html' + hash;
      location.replace(shellUrl);
      return;
    }
  }

  // 禁止播放器在 iframe 里重复初始化
  window.__DN_PLAYER_INITED__ = true;
  // 隐藏 iframe 内重复的装饰层（父窗口已有）
  const hideDecor = () => {
    document.querySelectorAll('.flux-bg, .flux-grid').forEach(el => el.remove());
    // 如果 iframe 里出现了 dn-player 也清掉
    document.querySelectorAll('.dn-player').forEach(el => el.remove());
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideDecor);
  } else {
    hideDecor();
  }

  // 让 iframe 自身透明，接收父窗口背景
  const applyStyle = () => {
    const s = document.createElement('style');
    s.textContent = `
      html, body { background: transparent !important; }
      body { overflow-x: hidden; }
    `;
    document.head.appendChild(s);
  };
  if (document.head) applyStyle();

  // 通知父窗口当前标题
  const postTitle = () => {
    try { window.top.postMessage({ type: 'dn:title', title: document.title }, '*'); } catch(e) {}
  };
  postTitle();

  // 拦截所有 <a> 站内跳转，走父窗口的 hash 路由
  document.addEventListener('click', (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a');
    if (!a) return;
    if (a.target === '_blank') return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('javascript:')) return;
    if (/^(https?:)?\/\//.test(href)) {
      try {
        const u = new URL(href, location.href);
        if (u.origin !== location.origin) return;
      } catch (e2) { return; }
    }
    if (!/\.html(\?|#|$)/.test(href) && href !== '/' && href !== './') return;

    e.preventDefault();
    // 规范化相对路径
    let target = href.replace(/^\.\//, '').replace(/^\//, '');
    try {
      window.top.postMessage({ type: 'dn:navigate', url: target }, '*');
    } catch (err) {
      location.href = href;
    }
  }, true);
})();
