/* ================================================================
   東方之音 · 纯前端用户认证（localStorage 版）
   - 所有账号数据存在浏览器本地，对每个访客而言是独立的
   - 注册：写入 localStorage['dnUsers'] 字典
   - 登录：校验密码，置 localStorage['dnCurrentUser']
   - 登出：清 localStorage['dnCurrentUser']
   - 其他页面用 window.DNAuth API 获取当前用户
   ================================================================ */
(function auth() {
  const LS_USERS = 'dnUsers.v1';
  const LS_CURRENT = 'dnCurrentUser.v1';

  function readUsers() {
    try { return JSON.parse(localStorage.getItem(LS_USERS) || '{}'); }
    catch (e) { return {}; }
  }
  function writeUsers(u) {
    try { localStorage.setItem(LS_USERS, JSON.stringify(u)); } catch(e){}
  }
  function hash(pwd) {
    // 简单混淆（非生产级安全，但比明文好）。纯前端做不到真正的加密。
    let h = 5381;
    for (let i = 0; i < pwd.length; i++) h = ((h << 5) + h) + pwd.charCodeAt(i);
    return 'h_' + (h >>> 0).toString(36) + '_' + pwd.length;
  }

  window.DNAuth = {
    register(payload) {
      const { name, email, phone, pwd, pwd2, role, city } = payload || {};
      if (!name)  return { ok: false, msg: '请填写昵称' };
      if (!pwd)   return { ok: false, msg: '请填写密码' };
      if (pwd.length < 6) return { ok: false, msg: '密码至少 6 位' };
      if (pwd !== pwd2)   return { ok: false, msg: '两次输入的密码不一致' };
      if (!email && !phone) return { ok: false, msg: '请至少填写邮箱或手机号其中一项' };
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, msg: '邮箱格式不正确' };
      if (phone && !/^1[3-9]\d{9}$/.test(phone)) return { ok: false, msg: '手机号格式不正确（11 位大陆号码）' };

      const users = readUsers();
      if (users[name]) return { ok: false, msg: '该昵称已被注册' };
      for (const k in users) {
        if (email && users[k].email && users[k].email === email) return { ok: false, msg: '该邮箱已被注册' };
        if (phone && users[k].phone && users[k].phone === phone) return { ok: false, msg: '该手机号已被注册' };
      }

      users[name] = {
        name,
        email: email || '',
        phone: phone || '',
        pwdHash: hash(pwd),
        role: role || '声音创作者',
        city: city || '',
        createdAt: Date.now(),
        // 可编辑的个人资料（profile 页修改后覆盖）
        avatar: '',      // 可选 base64 头像图
        avatarChar: name.charAt(0),
        bio: '',
        tags: [],
        skills: [],
        prefs: '',       // 偏好风格
        coverImg: '',    // 主页封面图 base64
        coverGradient: 'linear-gradient(135deg, #00FF87, #7B2FBE, #FF0080)',
        links: { wechat:'', bilibili:'', xiaohongshu:'', web:'' },
        works: [],
      };
      writeUsers(users);
      try { localStorage.setItem(LS_CURRENT, name); } catch(e){}
      return { ok: true, user: users[name] };
    },

    /* id 可以是 昵称 / 邮箱 / 手机号 */
    login(id, pwd) {
      if (!id || !pwd) return { ok: false, msg: '请输入账号和密码' };
      const users = readUsers();
      let u = users[id] || null;
      if (!u) {
        for (const k in users) {
          if (users[k].email === id || users[k].phone === id) { u = users[k]; break; }
        }
      }
      if (!u) return { ok: false, msg: '未找到该账号' };
      if (u.pwdHash !== hash(pwd)) return { ok: false, msg: '密码错误' };
      try { localStorage.setItem(LS_CURRENT, u.name); } catch(e){}
      return { ok: true, user: u };
    },

    /* 更新当前用户的资料 */
    updateProfile(patch) {
      const cur = this.current();
      if (!cur) return { ok: false, msg: '未登录' };
      const users = readUsers();
      Object.assign(users[cur.name], patch);
      writeUsers(users);
      return { ok: true, user: users[cur.name] };
    },

    /* 新增一件作品到当前用户 */
    addWork(work) {
      const cur = this.current();
      if (!cur) return { ok: false, msg: '未登录' };
      const users = readUsers();
      if (!users[cur.name].works) users[cur.name].works = [];
      users[cur.name].works.unshift({
        t: work.t || '未命名',
        size: work.size || 'md',
        seed: work.seed != null ? work.seed : Math.floor(Math.random()*8),
        stats: [0, 0, 0],
        desc: work.desc || '',
        tags: work.tags || [],
        audio: work.audio || '',
        cover: work.cover || '',
        createdAt: Date.now(),
      });
      writeUsers(users);
      return { ok: true, user: users[cur.name] };
    },

    /* 删除作品 */
    removeWork(index) {
      const cur = this.current();
      if (!cur) return { ok: false };
      const users = readUsers();
      if (users[cur.name].works) {
        users[cur.name].works.splice(index, 1);
        writeUsers(users);
      }
      return { ok: true };
    },

    /* 编辑某件作品（替换音频/封面/标题/简介/标签/分区等） */
    editWork(index, patch) {
      const cur = this.current();
      if (!cur) return { ok: false, msg: '未登录' };
      const users = readUsers();
      const list = users[cur.name].works || [];
      if (!list[index]) return { ok: false, msg: '作品不存在' };
      // 仅允许修改这些字段
      const allowed = ['t', 'desc', 'tags', 'audio', 'cover', 'seed', 'size', 'section'];
      allowed.forEach(k => {
        if (patch[k] !== undefined) list[index][k] = patch[k];
      });
      list[index].updatedAt = Date.now();
      writeUsers(users);
      return { ok: true, user: users[cur.name] };
    },

    /* 给当前用户初始化 N 件示例作品（用于演示）。
       已有作品则不重复，直接追加示例标记。 */
    seedDemoWorks(opts) {
      opts = opts || {};
      const cur = this.current();
      if (!cur) return { ok: false, msg: '未登录' };
      const users = readUsers();
      if (!users[cur.name].works) users[cur.name].works = [];
      const audioPool = (window.DONAUDIO_DATA?.audioPool) || [];
      const samples = [
        { t: '夜灯下的口琴曲',       desc: '即兴录制，给城市的夜色',       tags: ['民谣','即兴'],   section: 'arranging' },
        { t: '霓虹回廊',             desc: 'lofi 节拍 + 老唱片采样',       tags: ['lofi','电子'],   section: 'mixing' },
        { t: '空山新雨后',           desc: '钢琴与笛子对话',                tags: ['国风','钢琴'],   section: 'songwriting' },
        { t: '雨夜地铁站',           desc: '环境声 / 场景音设计',           tags: ['场景','空间感'], section: 'sounddesign' },
        { t: '黎明前的小镇',         desc: '管弦小品，画面感铺底',          tags: ['影视','管弦'],   section: 'scoring' },
      ];
      samples.forEach((s, i) => {
        const a = audioPool[i % Math.max(1, audioPool.length)] || {};
        users[cur.name].works.unshift({
          t: s.t,
          size: ['md','lg','sm','md','lg'][i % 5],
          seed: i,
          stats: [120 + i * 33, 800 + i * 200, 8 + i * 2],
          desc: s.desc,
          tags: s.tags,
          section: s.section,
          audio: a.url || '',
          cover: '',
          createdAt: Date.now() - (i + 1) * 86400000,
          isDemo: true,
        });
      });
      writeUsers(users);
      return { ok: true, user: users[cur.name] };
    },

    /* === 粉丝（模拟数据） ===
       根据用户名生成稳定的 N 个模拟粉丝。后端版本会从数据库拉取。 */
    fansOf(userName) {
      const all = (window.DONAUDIO_DATA?.creators || []).slice();
      const regUsers = Object.values(readUsers()).map(u => ({
        name: u.name, role: u.role, city: u.city, avatarChar: u.avatarChar || u.name.charAt(0),
        avatarImg: u.avatar || '', isReal: true,
      }));
      const merged = regUsers.concat(all).filter(u => u.name && u.name !== userName);
      // 用 userName hash 做稳定洗牌
      let seed = 0; for (let i = 0; i < userName.length; i++) seed = ((seed * 31 + userName.charCodeAt(i)) >>> 0);
      // Fisher-Yates with seeded RNG
      const arr = merged.slice();
      function rand() { seed = (seed * 1103515245 + 12345) >>> 0; return seed / 0xFFFFFFFF; }
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.slice(0, 28);
    },

    logout() {
      try { localStorage.removeItem(LS_CURRENT); } catch(e){}
    },

    current() {
      try {
        const name = localStorage.getItem(LS_CURRENT);
        if (!name) return null;
        const users = readUsers();
        return users[name] || null;
      } catch(e) { return null; }
    },

    // 用户列表（仅用于调试，不泄露密码）
    allUsers() {
      const users = readUsers();
      return Object.values(users).map(u => ({ name: u.name, email: u.email, role: u.role, city: u.city, createdAt: u.createdAt }));
    },
  };

  /* === 同步导航的登录/注册按钮 ===
     如果页面里有 .nav-right 的"登录 / 注册"按钮，登录后改为"@ 昵称"+"退出" */
  function syncNav() {
    const cur = window.DNAuth.current();
    document.querySelectorAll('.nav-right').forEach(nav => {
      let slot = nav.querySelector('[data-auth-slot]');
      if (!slot) {
        // 找到原本的"登录/注册"按钮把它包装起来
        const loginBtn = nav.querySelector('a[href*="auth.html"]');
        if (!loginBtn) return;
        slot = document.createElement('span');
        slot.setAttribute('data-auth-slot', '');
        slot.style.display = 'inline-flex';
        slot.style.gap = '8px';
        slot.style.alignItems = 'center';
        loginBtn.parentNode.insertBefore(slot, loginBtn);
        slot.appendChild(loginBtn);
      }
      if (cur) {
        slot.innerHTML = `
          <a href="profile.html?u=${encodeURIComponent(cur.name)}" class="btn btn-ghost" title="我的主页" style="font-weight:600;">@ ${cur.name}</a>
          <button type="button" class="btn btn-outline" data-auth-logout>退出</button>
        `;
      } else {
        slot.innerHTML = `<a href="auth.html" class="btn btn-primary">登录 / 注册</a>`;
      }
    });
  }

  // 延迟到 DOM 稳定时同步
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncNav);
  } else {
    syncNav();
  }
  // SPA/iframe 切换后也重新同步
  window.addEventListener('dn:navigated', syncNav);
  // 退出按钮
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-auth-logout]')) {
      window.DNAuth.logout();
      syncNav();
      // 回首页
      try { window.top.postMessage({ type:'dn:navigate', url:'home.html' }, '*'); }
      catch(err) { location.href = 'home.html'; }
    }
  });
})();
