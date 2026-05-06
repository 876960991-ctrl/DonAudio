/* ================================================================
   東方之音 · iframe 子页面助手  v2
   - 不在 iframe 里：重定向到 index.html#/自己（保证 audio 不被破坏）
   - 在 iframe 里：站内 <a> 改为 postMessage 通知父窗口切 hash
   ================================================================ */
(function embed() {
  const inFrame = (window !== window.top);

  if (!inFrame) {
    const self = location.pathname.split('/').pop() || 'index.html';
    // 已经是 shell（index.html）本身，不重定向，避免死循环
    if (self === 'index.html' || self === '') return;
    const q = location.search || '';
    const hash = '#/' + self + q;
    const shellUrl = location.pathname.replace(/[^/]*$/, '') + 'index.html' + hash;
    location.replace(shellUrl);
    return;
  }

  // 子页内：禁止播放器重复初始化
  window.__DN_PLAYER_INITED__ = true;

  const hideDecor = () => {
    document.querySelectorAll('.flux-bg, .flux-grid').forEach(el => el.remove());
    document.querySelectorAll('.dn-player').forEach(el => el.remove());
    // iframe 里如果出现 splash（首页本来就有），让它直接消失
    // 父窗口已经播过 splash，iframe 内不应再播
    const sp = document.getElementById('splash');
    if (sp) sp.classList.add('hidden');
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideDecor);
  } else {
    hideDecor();
  }

  // iframe 透明，移动端可滚
  const applyStyle = () => {
    const s = document.createElement('style');
    s.textContent = `
      html, body { background: transparent !important; }
      body { overflow-x: hidden; -webkit-overflow-scrolling: touch; }
      .splash { display: none !important; }
    `;
    document.head.appendChild(s);
  };
  if (document.head) applyStyle();
  else document.addEventListener('DOMContentLoaded', applyStyle);

  const postTitle = () => {
    try { window.top.postMessage({ type: 'dn:title', title: document.title }, '*'); } catch(e) {}
  };
  postTitle();

  // 拦截站内 <a> 跳转
  document.addEventListener('click', (e) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a');
    if (!a) return;
    if (a.target === '_blank') return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#')) return;
    if (href.startsWith('javascript:')) return;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (/^(https?:)?\/\//.test(href)) {
      try {
        const u = new URL(href, location.href);
        if (u.origin !== location.origin) return;
      } catch (e2) { return; }
    }
    if (!/\.html(\?|#|$)/.test(href) && href !== '/' && href !== './') return;

    e.preventDefault();
    let target = href.replace(/^\.\//, '').replace(/^\//, '');
    try {
      window.top.postMessage({ type: 'dn:navigate', url: target }, '*');
    } catch (err) {
      location.href = href;
    }
  }, true);
})();
