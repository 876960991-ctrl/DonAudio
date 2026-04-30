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

// 启动页交互
(function splashEnter() {
  const splash = document.getElementById('splash');
  const enter  = document.getElementById('splashEnter');
  if (!splash || !enter) return;
  enter.addEventListener('click', () => {
    splash.classList.add('hidden');
  });
})();
