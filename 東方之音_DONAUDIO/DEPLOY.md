# 東方之音 DONAUDIO · 部署指南（Vercel 方案）

> 不用命令行、不用注册域名、不用本地开服务器。
> 全程 5 分钟，零成本。

---

## ✅ 前置检查（已就绪）

- [x] 项目是纯静态网页（HTML + CSS + JS + 音频/图片）
- [x] 已经写好 `vercel.json` 优化配置（缓存、Range 请求）
- [x] 所有路径都用相对路径（不会在部署后失效）
- [x] 音频文件全部本地化（`assets/audio/*.mp3`）

---

## 🚀 部署步骤

### ① 注册 Vercel 账号（1 分钟）

1. 打开 <https://vercel.com/signup>
2. 选 **Continue with GitHub / GitLab / Email** 任一方式注册
3. 完成邮箱验证

> 如果你本来就有 GitHub 账号，直接用 GitHub 登录最省事。

---

### ② 上传项目（2 分钟）

登录后点右上角 **Add New...** → **Project**

在新开的页面里：

**方法 A：拖拽文件夹（最简单）**

1. 页面下方有一个 **Import Third-Party Git Repository** 区域，旁边有 **Deploy from Folder** 或类似选项
2. 新版 Vercel 可能把"拖拽部署"藏在 **+ New Project → Browse All Templates → 底部 Deploy a Project** 之类的入口。找不到的话用方法 B。

**方法 B：命令行（更稳）**

1. 打开 Vercel 首页 <https://vercel.com>
2. 右上角点 **Dashboard**
3. 点 **New...** → **Project**
4. 在 "Import Git Repository" 旁有一个小链接 **「Want to deploy without Git?」** 或 **「Use CLI」**
5. 照它给的提示装 CLI（两行命令）

**方法 C（最省事，推荐！）：用 Vercel 官方 CLI**

打开命令行（Windows PowerShell 或 CMD），在 `G:\AI\龙虾工作档案\東方之音_DONAUDIO` 这个文件夹里执行：

```
npm install -g vercel
vercel login
vercel
```

- 第一条：安装 Vercel CLI（需要已经装了 Node.js）
- 第二条：登录（会打开浏览器让你点确认）
- 第三条：部署当前目录，第一次它会问几个问题，全部按回车用默认即可

**几秒钟后它会输出一个网址**，类似：

```
https://donaudio-xxx.vercel.app
```

**这就是你的公网链接！** 在世界任何地方都能打开（除了需要翻墙的网络有时候会稍慢）。

---

### ③ 修改后重新部署

以后你改了代码，只要再执行一遍：

```
vercel --prod
```

就能把新版推上去。URL 不变。

---

## 🔗 如果你想要更短的自定义网址

Vercel 免费送的 `xxx.vercel.app` 本身就够用了。如果你想要比如 `donaudio.com`：

1. 去阿里云 / 腾讯云 / Namecheap 买一个域名（`.com` 约 ¥55-75/年）
2. 在 Vercel 项目页 **Settings → Domains** 添加你买的域名
3. 去你买域名的地方加一条 DNS CNAME 记录，指向 Vercel 给你的地址
4. 完成（几分钟生效）

> 注意：如果要让**中国大陆用户也能流畅访问**，域名必须在工信部备案（免费，需要 7-20 天审核），而且通常要搭配国内云服务器。Vercel 的服务器在海外，访问速度国内一般但不会被墙。

---

## ❓ 常见问题

**Q：免费版有什么限制？**
A：100 GB 流量 / 月、带宽快、自动 HTTPS。个人作品集项目几乎不可能用满。

**Q：音频能正常播放吗？**
A：能。我们 15 首 mp3 一共约 35 MB，Vercel 支持 Range 请求（边下边播）。

**Q：首页会不会加载慢？**
A：第一次打开要拉图片和音频，可能 1-2 秒；之后命中 CDN 缓存（配置里已设 7 天 / 30 天）几乎秒开。

**Q：我可以删除这个站吗？**
A：可以。Vercel Dashboard → 项目 → Settings → Delete Project。

---

## 📁 项目结构（部署用）

```
東方之音_DONAUDIO/
├── index.html              # 首页
├── arranging.html          # 编曲板块
├── mixing.html             # 混音母带
├── songwriting.html        # 作词作曲
├── sounddesign.html        # 声音设计
├── scoring.html            # 影视配乐
├── community.html          # 社区
├── brief.html              # 发布需求
├── profile.html            # 用户主页
├── news.html               # 资讯详情
├── auth.html               # 登录注册
├── vercel.json             # Vercel 配置（缓存/Range）
└── assets/
    ├── styles.css
    ├── data.js
    ├── svg.js
    ├── app.js
    ├── player.js
    ├── dong-ink.png        # Logo 图
    └── audio/
        └── *.mp3           # 15 首 BGM
```

---

## 🍃 祝部署顺利

部署完成后把网址发我或发朋友圈，这就是你的作品了。
