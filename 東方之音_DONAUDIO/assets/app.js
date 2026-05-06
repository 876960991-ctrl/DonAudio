// 東方之音 DONAUDIO - 全局交互

// 鼠标跟随光晕
(function cursorGlow() {
  const g = document.createElement('div');
  g.className = 'cursor-glow';
  document.body.appendChild(g);
  window.addEventListener('mousemove', (e) => {
    g.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
})();

// 进场动画
(function revealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('on');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// 数字滚动
(function counters() {
  const nums = document.querySelectorAll('[data-count]');
  nums.forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    let cur = 0; const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = target.toLocaleString(); return; }
      el.textContent = cur.toLocaleString();
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { tick(); io.disconnect(); }
    });
    io.observe(el);
  });
})();

// chip 切换
document.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (chip && chip.parentElement.classList.contains('toolbar')) {
    [...chip.parentElement.querySelectorAll('.chip')].forEach(c => c.classList.remove('on'));
    chip.classList.add('on');
  }
});

// 登录/注册 tab 与角色切换（如果存在）
document.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab-switch button');
  if (tab) {
    [...tab.parentElement.children].forEach(b => b.classList.remove('on'));
    tab.classList.add('on');
  }
  const opt = e.target.closest('.role-pick .opt');
  if (opt) {
    [...opt.parentElement.children].forEach(b => b.classList.remove('on'));
    opt.classList.add('on');
  }
});


// 全局搜索：顶部 .nav-search input 按回车跳到 search.html?q=xxx
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  const inp = e.target.closest('.nav-search input');
  if (!inp) return;
  const v = inp.value.trim();
  if (!v) return;
  const url = 'search.html?q=' + encodeURIComponent(v);
  // 在 iframe 里走父窗口 hash 路由
  try { window.top.postMessage({ type: 'dn:navigate', url }, '*'); }
  catch (err) { location.href = url; }
});

/* ============== 移动端汉堡菜单 ==============
   每个子页都自动获得一个汉堡按钮 + 抽屉式导航。
   nav 里如果已有 .nav-burger（手动写的）就跳过，否则自动注入。
*/
(function mobileNav() {
  function init() {
    const navInner = document.querySelector('.nav-inner');
    if (!navInner) return;
    if (navInner.querySelector('.nav-burger')) return;

    const navLinks = navInner.querySelector('.nav-links');
    const navRight = navInner.querySelector('.nav-right');
    if (!navLinks) return;

    // 创建汉堡按钮
    const burger = document.createElement('button');
    burger.className = 'nav-burger';
    burger.setAttribute('aria-label', '菜单');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navInner.appendChild(burger);

    // 创建抽屉容器（把 nav-links 和 nav-right 内容克隆进去）
    const drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.innerHTML = `
      <div class="nav-drawer-inner">
        <div class="nav-drawer-links"></div>
        <div class="nav-drawer-actions"></div>
      </div>
      <div class="nav-drawer-mask"></div>
    `;
    document.body.appendChild(drawer);

    // 把链接和按钮塞进去（克隆）
    const linksWrap = drawer.querySelector('.nav-drawer-links');
    [...navLinks.querySelectorAll('a')].forEach(a => {
      const c = a.cloneNode(true);
      linksWrap.appendChild(c);
    });
    const actionsWrap = drawer.querySelector('.nav-drawer-actions');
    if (navRight) {
      [...navRight.querySelectorAll('a.btn, a.nav-user')].forEach(a => {
        const c = a.cloneNode(true);
        actionsWrap.appendChild(c);
      });
    }

    // 切换
    function toggle(open) {
      const isOpen = open ?? !document.body.classList.contains('nav-open');
      document.body.classList.toggle('nav-open', isOpen);
      burger.classList.toggle('on', isOpen);
    }
    burger.addEventListener('click', () => toggle());
    drawer.querySelector('.nav-drawer-mask').addEventListener('click', () => toggle(false));
    // 点抽屉里的链接 → 关掉抽屉（让 embed.js 拦截 postMessage）
    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) toggle(false);
    });
    window.addEventListener('hashchange', () => toggle(false));
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
