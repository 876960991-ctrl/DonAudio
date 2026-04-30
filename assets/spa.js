/* ================================================================
   東方之音 · SPA 路由（让音乐跨页面持续播放不中断）
   - 拦截所有站内 <a> 点击，用 fetch 加载目标 HTML
   - 替换 <main> 的内容 + <title>，不重新加载整个页面
   - 保留 <audio>、<nav>、<footer>、浮动播放器等跨页面元素
   - 执行目标页面的内联脚本，保证页面逻辑正常运行
   - 使用 history.pushState 同步 URL
   ================================================================ */
(function spa() {
  if (window.__DN_SPA_INITED__) return;
  window.__DN_SPA_INITED__ = true;

  /* 哪些链接要拦截：相对路径的 .html 或根目录 */
  function shouldIntercept(a) {
    if (!a || a.target === '_blank') return false;
    const href = a.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('#')) return false;              // 锚点不拦
    if (href.startsWith('javascript:')) return false;
    if (/^(https?:)?\/\//.test(href)) {
      // 绝对 URL：只有同源才拦
      try {
        const u = new URL(href, location.href);
        if (u.origin !== location.origin) return false;
      } catch (e) { return false; }
    }
    // 必须是 .html 或路径结尾
    if (!/\.html(\?|#|$)/.test(href) && href !== '/' && href !== './') return false;
    return true;
  }

  /* 拉取页面并替换主内容 */
  async function loadPage(url, push = true) {
    try {
      document.body.classList.add('spa-loading');
      const resp = await fetch(url, { credentials: 'same-origin' });
      if (!resp.ok) throw new Error('fetch failed: ' + resp.status);
      const html = await resp.text();

      // 用 DOMParser 解析，不会实际渲染
      const doc = new DOMParser().parseFromString(html, 'text/html');

      // 更新标题
      if (doc.title) document.title = doc.title;

      // 更新 <meta description>
      const newDesc = doc.querySelector('meta[name="description"]');
      const oldDesc = document.querySelector('meta[name="description"]');
      if (newDesc && oldDesc) oldDesc.setAttribute('content', newDesc.getAttribute('content'));

      // 关键：用新页面的 <body> 替换当前 <body>，但跳过 .dn-player / <audio>
      const newBody = doc.body;
      // 收集要保留的元素（播放器等）
      const keep = [];
      document.body.querySelectorAll('.dn-player').forEach(el => keep.push(el));

      // 把 newBody 的孩子全部放入当前 body（先移除旧内容，除保留的以外）
      // 旧内容清理
      [...document.body.children].forEach(el => {
        if (!keep.includes(el)) el.remove();
      });
      // 插入新 body 的所有子节点（跳过可能重复的 .dn-player）
      [...newBody.children].forEach(child => {
        if (child.classList && child.classList.contains('dn-player')) return; // 避免重复
        document.body.appendChild(child);
      });

      // 重新执行新页面里的 <script>（除了 player.js / data.js / svg.js / app.js / spa.js 这些全局已加载的）
      const GLOBAL_SCRIPTS = ['assets/svg.js', 'assets/data.js', 'assets/app.js', 'assets/player.js', 'assets/spa.js'];
      const scripts = document.body.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const src = oldScript.getAttribute('src');
        // 外部脚本：跳过全局已加载的
        if (src && GLOBAL_SCRIPTS.some(g => src.endsWith(g))) return;
        // 复制一份新的 <script> 让浏览器重新执行
        const s = document.createElement('script');
        if (src) s.src = src;
        else s.textContent = oldScript.textContent;
        // 把原脚本替换掉（会触发执行）
        oldScript.parentNode.replaceChild(s, oldScript);
      });

      // URL
      if (push) history.pushState({ spa: true, url }, '', url);
      window.scrollTo({ top: 0, behavior: 'instant' });

      // 刷新高亮的导航、触发 reveal 动画
      document.querySelectorAll('.reveal').forEach(el => {
        if (!el.classList.contains('on')) el.classList.add('on');
      });

      // 同步导航 active 状态（根据 URL）
      const path = location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.nav-links a').forEach(a => {
        const h = (a.getAttribute('href') || '').split('/').pop();
        a.classList.toggle('active', h === path);
      });

      document.body.classList.remove('spa-loading');
      // 派发自定义事件让其他模块有机会响应
      window.dispatchEvent(new CustomEvent('dn:navigated', { detail: { url } }));
    } catch (err) {
      console.warn('[SPA] loadPage failed, fallback to native nav:', err);
      document.body.classList.remove('spa-loading');
      // 失败就走原生跳转
      location.href = url;
    }
  }

  /* 拦截点击 */
  document.addEventListener('click', (e) => {
    // 允许 Ctrl/Cmd 点击新开标签页
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (e.defaultPrevented) return;
    const a = e.target.closest('a');
    if (!a) return;
    if (!shouldIntercept(a)) return;
    e.preventDefault();
    const href = a.getAttribute('href');
    // 相对路径标准化
    const url = new URL(href, location.href).pathname + new URL(href, location.href).search + new URL(href, location.href).hash;
    loadPage(url);
  });

  /* 前进后退 */
  window.addEventListener('popstate', (e) => {
    loadPage(location.pathname + location.search + location.hash, false);
  });
})();
