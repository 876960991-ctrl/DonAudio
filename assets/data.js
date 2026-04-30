// 東方之音 - 示例数据（可替换为后端接口）

window.DONAUDIO_DATA = {
  sections: [
    {
      id: 'arranging', num: '01',
      cn: '编曲', en: 'ARRANGING',
      desc: '旋律之上的建筑学。弦乐、节奏、空间感的编织者在此汇聚。',
      tags: ['流行', '国风', '电子', '古典', 'Jazz Fusion'],
      href: 'arranging.html'
    },
    {
      id: 'mixing', num: '02',
      cn: '混音母带', en: 'MIX & MASTER',
      desc: '声音最终的雕刻师。平衡、动态、空间，让作品拥有上架的质感。',
      tags: ['Pop Mix', '母带处理', '人声处理', '沉浸式'],
      href: 'mixing.html'
    },
    {
      id: 'songwriting', num: '03',
      cn: '作词作曲', en: 'SONGWRITING',
      desc: '从零到一的灵感起点。旋律与文字在此相遇。',
      tags: ['作词', '作曲', 'TopLine', 'DemoMaker'],
      href: 'songwriting.html'
    },
    {
      id: 'sounddesign', num: '04',
      cn: '声音设计', en: 'SOUND DESIGN',
      desc: '为游戏、装置、品牌、角色塑形。一切非音乐性声音的艺术。',
      tags: ['游戏音效', 'UI/UX', '品牌声音', 'Foley'],
      href: 'sounddesign.html'
    },
    {
      id: 'scoring', num: '05',
      cn: '影视配乐', en: 'FILM SCORING',
      desc: '画面背后的情绪推手。电影、剧集、短片、广告的叙事之声。',
      tags: ['电影', '剧集', '广告', '纪录片', '游戏CG'],
      href: 'scoring.html'
    }
  ],

  // 各板块的今日资讯（真实信息为蓝本，补充背景与正文）
  news: {
    arranging: [
      { id: 'arr-1', tag: '工具', title: 'Spitfire Audio BBC Symphony Orchestra Discover 免费开放',
        source: 'Spitfire Audio 官网', date: '2026-04-22',
        text: 'Spitfire 推出 BBC SO Discover：Free 版本，编曲人的入门弦乐',
        body: 'Spitfire Audio 的 BBC Symphony Orchestra 系列一直是编曲人的热门选择。Discover 版本作为免费档次，包含全套 33 个管弦分组的基础采样，采自 Maida Vale Studios。\n\n对刚入门管弦编曲的朋友来说，这套采样提供了一个不错的起点：小提琴、中提琴、大提琴、低音提琴、木管、铜管、打击乐一应俱全，格式为 Spitfire 自家播放器，无需 Kontakt。\n\n获取方式：官网注册账户，等待 14 天冷却后可直接免费下载（官方设置的机制），或付 $49 立即解锁。文件大小约 200MB，对比 Core 版本的 39GB，是典型的"轻量入门"定位。'
      },
      { id: 'arr-2', tag: '行业', title: 'Logic Pro 11 的 Session Players 功能对编曲工作流的影响',
        source: 'Apple 官方更新日志', date: '2026-04-15',
        text: 'Logic Pro Session Players：AI 贝斯 / 鼓 / 键盘对编曲人是否是威胁？',
        body: 'Apple 在 Logic Pro 11 引入了 Session Players 功能，包含 Drummer、Bass Player、Keyboard Player 三个 AI 虚拟乐手，可根据和弦进行自动生成伴奏。\n\n这对职业编曲人是威胁还是工具？讨论分成两派：\n\n- 支持派认为：demo 阶段极大加速，原本需要 2 小时的基础节奏铺底，现在几分钟完成；\n- 质疑派认为：生成结果同质化严重，商业作品的"味道"还是需要人工编排与层叠。\n\n我们的观察：对于广告、短视频这类快节奏项目，Session Players 已经足够；对于专辑级制作，它更像是草图工具，后续仍要人工重新编配。'
      },
      { id: 'arr-3', tag: '人物', title: '久石让在武道馆演出前公开《天空之城》新编曲版本',
        source: 'Studio Ghibli 公开信', date: '2026-04-10',
        text: '久石让重新编配《天空之城》：弦乐层次的克制美学',
        body: '久石让在今年武道馆演出前，公开了《天空之城》的 2026 重编版本手稿扫描件（部分段落）。\n\n对比 1986 年原版，新版的改动集中在：\n1. 主旋律前移到双簧管（原版钢琴），让弦乐成为背景支撑；\n2. 副歌高潮减去了一层铜管，给人声合唱让出空间；\n3. 结尾新增 16 小节的淡出延展，用竖琴拨奏收束。\n\n"克制"是这次重编的核心关键词，也是中年之后的久石让一直在追求的方向。编曲人们讨论最多的一点：如何在已经成熟的作品里"减法"，而不是加法。'
      },
      { id: 'arr-4', tag: '招募', title: '独立厂牌「野东西」招合作编曲人',
        source: '厂牌微博 / 投递邮箱', date: '2026-04-20',
        text: '北京独立厂牌「野东西」寻合作编曲人，民谣 + 后摇方向',
        body: '北京独立厂牌「野东西」发布 2026 年度合作编曲人招募，方向为民谣 + 后摇 + City Folk。\n\n工作内容：\n- 签约艺人专辑编曲（3-5 人约稿制，按首付费）；\n- 现场版编曲（Live Band 适配）；\n- 偶尔参与 demo 筛选与 A&R 讨论。\n\n要求：有完整作品集、能接受线下会议（北京 / 上海）、对独立音乐审美匹配。报价根据经验协商，约 ¥8,000-25,000 / 首。\n\n投递：邮件 band@yedongxi.studio，附作品链接 + 过往合作曲目。'
      },
      { id: 'arr-5', tag: '教程', title: '现代流行编曲的三层逻辑',
        source: '編曲夜談 第七期', date: '2026-04-18',
        text: '现代流行编曲思路：节奏底 / 和声垫 / 旋律装饰三层逻辑',
        body: '在「編曲夜談」第七期，嘉宾 Ryan（曾为周深、林俊杰编曲）分享了他的三层编配逻辑：\n\n**第一层 · 节奏底**：Kick + Bass 的"心跳"。现代流行一般先确定 BPM 与 Groove，Sub Bass 是否跟 Kick 同步、Ghost Note 放在哪里——这些决定了歌的"脉搏"。\n\n**第二层 · 和声垫**：Pad / Strings / Electric Piano 的空间感。这一层决定情绪色温，也是最容易"过度"的地方。Ryan 的建议："宁可薄一点，给人声留位置。"\n\n**第三层 · 旋律装饰**：Lead Synth、Guitar Lick、木吉他扫弦。这一层是"记忆点"，但不是每段都需要，很多好作品 verse 里几乎没有装饰。\n\n课程已在 B 站上线（免费），建议配合 DAW 工程文件一起看。'
      },
      { id: 'arr-6', tag: '资源', title: 'Native Instruments 东亚民乐扩展包',
        source: 'Native Instruments', date: '2026-04-12',
        text: 'Kontakt 东方民乐采样集：限时免费至本月底',
        body: 'Native Instruments 与日本民乐演奏者合作推出 Kontakt 扩展包 "Sonic Asia"，包含古筝、二胡、尺八、琵琶、三味线共 12 种乐器。\n\n采样特点：\n- 多圆滑音 / 揉弦力度层；\n- 每件乐器内置 3 种演奏风格（独奏 / 配器 / 打击用法）；\n- 附带 38 个 construction kit（已做好的 loop 片段）。\n\n原价 $149，4 月底前官方直营免费（需 Native Access 账户）。对国风编曲人来说是今年最值得下载的资源之一。'
      }
    ],
    mixing: [
      { id: 'mix-1', tag: '工具', title: 'FabFilter Pro-Q 4 发布',
        source: 'FabFilter 官网', date: '2026-04-14',
        text: 'FabFilter Pro-Q 4 发布：新增动态 EQ 专用模式与频谱匹配',
        body: 'FabFilter 在 4 月 14 日正式发布 Pro-Q 4，距离 Pro-Q 3 上市已经 7 年。\n\n核心新功能：\n- **Dynamic EQ 专用模式**：每个频段可独立开启动态压缩，阈值、ratio、attack/release 完整可调；\n- **Spectrum Grab**：直接在频谱上拖拽能量区域，自动生成带宽与增益；\n- **Match EQ**：类似 iZotope Ozone 的风格参考，匹配另一条轨的频响；\n- **Per-band Mid/Side**：每个 band 独立 M/S 切换。\n\n售价 $179，老用户升级 $89。业内普遍评价："不是革命，但是目前最完整的 EQ。"'
      },
      { id: 'mix-2', tag: '行业', title: 'Apple Music 2026 空间音频份额',
        source: 'Apple Services Report Q1', date: '2026-04-25',
        text: 'Apple Music 空间音频曲目占比突破 65%，混音师需求持续上升',
        body: 'Apple 在 2026 Q1 服务报告中披露，Apple Music 的空间音频（Dolby Atmos）曲目占比已突破 65%，相较 2024 年的 38% 有大幅提升。\n\n这个数据对混音师意味着什么：\n- 一线华语厂牌已将 Atmos 列为新专辑"标配交付"；\n- 但学习曲线不低，Renderer + 监听系统（7.1.4 最少）投入门槛约 ¥50,000；\n- 流媒体 Loudness 标准 -18 LUFS（Atmos）与 -14 LUFS（Stereo）并行交付，工作量 +40%。\n\n结论：Atmos 熟练工匮乏，报价普遍比 Stereo 高 1.5-2 倍，是当前值得投入学习的技能。'
      },
      { id: 'mix-3', tag: '人物', title: 'Andrew Scheps 的 Waves In-The-Box 工作流',
        source: 'Production Expert 访谈', date: '2026-04-08',
        text: 'Andrew Scheps：Mix In The Box 10 年后的回望',
        body: 'Adele、Red Hot Chili Peppers、Metallica 的混音师 Andrew Scheps 接受 Production Expert 专访，回顾了他从 2014 年开始的"完全 In-The-Box"工作流。\n\n他分享的核心观点：\n- 10 年前坚持 ITB 时不少人质疑，现在已经是行业主流；\n- 模拟硬件并没有"魔法"，关键是用得熟练；\n- 他目前的模板只用 Waves + Pro Tools 自带插件，不追更新；\n- 建议新手："少换工具，把一套插件用到吐。"\n\n对新一代混音师很有启发：工具不是瓶颈，对声音的判断才是。'
      },
      { id: 'mix-4', tag: '教程', title: 'Dolby Atmos 人声放置 5 法则',
        source: '東方之音编辑部整理', date: '2026-04-20',
        text: 'Dolby Atmos 人声放置的 5 个经验法则',
        body: '整理自多位一线 Atmos 混音师的经验：\n\n1. **主唱永远在前正中**：0.0 方位，不要乱动；\n2. **和声可展开到 ±60°**：宽度比 Stereo 版本大 30%；\n3. **空间混响走 Height 通道**：而不是后环绕，会更自然；\n4. **Chorus 前后对比**：Verse 人声收紧，Chorus 适度拉宽，避免"全程开"；\n5. **监听必须多房间验证**：耳机 / 2.0 / 5.1.4 / 7.1.4 全听一遍，Atmos 的声场差异极大。'
      },
      { id: 'mix-5', tag: '招募', title: '上海录音棚招母带工程师',
        source: '猎头私信 / 棚主微博', date: '2026-04-19',
        text: '上海录音棚招募母带工程师，常驻 / 远程皆可',
        body: '上海徐汇某中型录音棚（不便具名）发布母带工程师岗位：\n\n- 常驻方向：税前 ¥18,000-28,000 / 月，棚配 7.1.4 Atmos 监听；\n- 远程方向：按项目结算，¥1,500-3,500 / 首起；\n- 3 年以上经验，有可验证的已发行作品清单。\n\n联系方式：通过平台站内信联系 "沉响"（本站认证创作者）。'
      },
      { id: 'mix-6', tag: '资源', title: 'iZotope RX 11 学生版',
        source: 'iZotope 官网', date: '2026-04-05',
        text: 'iZotope RX 11 Advanced 学生 / 教师版 5 折优惠',
        body: 'iZotope RX 11 Advanced 针对在校学生、音乐院校教师推出 5 折教育优惠，从 $1,199 降至 $599。\n\n验证方式：通过 iZotope 官方页面上传学生证 / 在职证明，审核一般 1-2 工作日。\n\nRX 11 相比 10 的升级重点：Dialogue Isolate 模块全面重写，人声与背景分离精度提升约 30%，对做 podcast、remix、电影后期的朋友极为实用。优惠至 5 月 31 日。'
      }
    ],
    songwriting: [
      { id: 'sw-1', tag: '人物', title: 'Jack Antonoff 2026 访谈：流行金曲的 Hook 工业',
        source: 'The New Yorker 访谈节选', date: '2026-04-03',
        text: 'Jack Antonoff 谈 Hook：为什么有些副歌第一秒就抓住你',
        body: 'Taylor Swift、Lana Del Rey、Lorde 的长期合作者 Jack Antonoff 在《The New Yorker》的访谈里分享了他的 Hook 工作论。\n\n关键观点：\n1. **Hook 的前 2 秒就要出现"熟悉感"**：不一定是已知旋律，而是节奏 / 音程上的"似曾相识"；\n2. **重复是力量而不是懒惰**：一个好 Hook 反复听 20 遍依然动人；\n3. **人声起始音的选择是胜负手**：他会专门花几个小时只试"第一个音从哪里开始"；\n4. **写 demo 时不要追求"完整"**：7 成完成度就停下，让歌手带来最后 3 成。\n\n这期访谈在 Songwriting 社区引起广泛讨论。'
      },
      { id: 'sw-2', tag: '行业', title: 'Suno v5 对 Topline 工作的实际冲击',
        source: 'Billboard 专题', date: '2026-04-16',
        text: 'Suno v5 上线后：Topline 新人的生存路径在变窄吗？',
        body: 'AI 音乐生成平台 Suno 在 v5 版本后，生成质量已经达到"人声 demo 不仔细听分辨不出"的程度。\n\n对 Topline 新人的影响：\n- 入门单子（$50-200 / 首的广告 demo）几乎被完全替代；\n- 中端作品（$500-2000）客户开始要求"必须人声真唱"作为差异化；\n- 高端创作（一线艺人主打、OST）暂时未受影响。\n\n路径建议：要么往上走做"有人味"的作品（真嗓、真情绪、真叙事），要么转型做"AI 后期编辑"（拿生成结果做二次创作）。中间地带正在消失。'
      },
      { id: 'sw-3', tag: '教程', title: 'Hook 的十种入口',
        source: '东方之音编辑部', date: '2026-04-22',
        text: '从一句歌词开始：Hook 写作的十种常见入口',
        body: '总结 200+ 首近年爆款的 Hook 入口，归纳为 10 类：\n\n1. **直接问句**："你还爱我吗"\n2. **重复呼喊**："啦啦啦 / Oh oh oh"\n3. **数字开头**："三百六十五里路"\n4. **拟声词**："嘭！"\n5. **对比句**："白天 / 黑夜"\n6. **名字呼唤**："Maria"\n7. **时间地点**："2019 年的夏天"\n8. **矛盾陈述**："我讨厌你我也喜欢你"\n9. **条件假设**："如果..."\n10. **直白命令**："跳！"\n\n每种入口配合情绪色温和节奏型，几乎可以覆盖 90% 的流行 Hook。'
      },
      { id: 'sw-4', tag: '约稿', title: '一线艺人下张专辑约稿',
        source: '平台匿名中介', date: '2026-04-24',
        text: '某一线艺人下张专辑约稿：中文抒情 / 电子情歌',
        body: '某头部女歌手（不便具名）下一张专辑约稿信息：\n\n- 5-7 首歌词曲约稿，中文抒情 + 电子情歌方向；\n- 接受 Topliner 提交完整 demo，优先考虑有过合作经验的作者；\n- 每首稿费 ¥20,000-50,000（使用后额外版权分成）；\n- 截稿：6 月 30 日；提交通过平台站内信转发。\n\n想投稿请在"作词作曲"板块发布你的 demo 集，被相中后我们会主动联系。'
      },
      { id: 'sw-5', tag: '活动', title: '24 小时歌词擂台',
        source: '东方之音活动中心', date: '2026-04-25',
        text: '周日「歌词擂台」：同一主题 24 小时出稿',
        body: '东方之音 4 月 28 日（周日）举办第 12 期「歌词擂台」：\n\n- 同一主题（当日揭晓，近期主题方向：离家 / 夜晚 / 便利店）；\n- 24 小时内完成歌词 + 清唱 demo；\n- 社区公开投票 + 3 位评委打分；\n- 冠军奖金 ¥3,000，作品被制作成完整成品（含作曲、编曲、混音）。\n\n往期亮点：第 9 期冠军《地铁末班车》已被一家独立厂牌收购并制作。'
      },
      { id: 'sw-6', tag: '工具', title: 'Chordify v5 多轨识别',
        source: 'Chordify 官方博客', date: '2026-04-11',
        text: 'Chordify v5：支持多轨识别，Topliner 扒和弦更高效',
        body: 'Chordify（和弦识别工具）v5 版本大升级，支持多轨识别：上传音频后可同时得到主旋律、和弦进行、根音线三条信息。\n\n对 Topliner 的意义：拿到任何参考音频，10 秒内获得和弦谱与 MIDI 文件，大幅加速"学习—借鉴—创作"流程。\n\n月订阅 $9.99，可导出 MIDI 与 MusicXML，直接拖进 Logic / Cubase。'
      }
    ],
    sounddesign: [
      { id: 'sd-1', tag: '行业', title: 'GDC 2026 音频议题',
        source: 'GDC Vault', date: '2026-03-22',
        text: 'GDC 2026 音频议题速览：程序化音频与 AI 混音的落地',
        body: 'GDC 2026（游戏开发者大会）的音频 track 总结：\n\n**主要议题**\n1. **程序化音频**：《荒野大镖客在线》团队分享了环境音程序化生成流程；\n2. **AI 混音**：Wwise 演示了基于场景自动调整动态混音的 AI 模块；\n3. **空间音频**：PSVR2 与 Meta Quest 3 的双耳音频管线对比；\n4. **独立游戏音频**：《Animal Well》《Balatro》音频师分享"一个人的音频团队"经验。\n\n全部视频已上 GDC Vault，免费档可看部分，付费订阅可看全部。'
      },
      { id: 'sd-2', tag: '招募', title: '米哈游音效组招聘',
        source: '米哈游招聘官网', date: '2026-04-20',
        text: '米哈游音效组招聘中，实习 / 全职同时开放',
        body: '米哈游音频部门 2026 春季招聘：\n\n**全职岗位**\n- 高级音效设计师（上海 / 新加坡 / 蒙特利尔）\n- Technical Sound Designer（Wwise / Unreal / Unity）\n- 音乐 / 配乐设计师（《原神》《绝区零》《崩坏》系列）\n\n**实习岗位**\n- 音效设计实习（上海，6 个月起，日薪 ¥300-500）\n\n申请链接：careers.mihoyo.com（或 hoyoverse.com）。\n注：要求提交完整作品集（含 Wwise 项目 zip 或视频 demo）。'
      },
      { id: 'sd-3', tag: '工具', title: 'Output Arcade 3',
        source: 'Output 官网', date: '2026-04-05',
        text: 'Output Arcade 3：采样工具对声音设计师的新能力',
        body: 'Output 在 4 月发布 Arcade 3，新增了对声音设计工作流友好的几个能力：\n\n- **对象化采样**：每个 loop 现在包含"层级结构"（底层、中层、表层），可独立重采样；\n- **Granular + Spectral 双引擎**：Granular 用于质感铺底，Spectral 用于变形；\n- **Wwise / FMOD 导出**：直接输出为游戏引擎支持的音频容器。\n\n月订阅 $10，对游戏音频团队的小预算项目尤其友好。'
      },
      { id: 'sd-4', tag: '教程', title: 'Granular 做武器击打',
        source: 'Sound Design Academy', date: '2026-04-18',
        text: '用 Granular 合成做武器击打的三种思路',
        body: '武器击打的经典做法是"Layer 多层录音"，但 Granular 合成提供了一条新路径：\n\n**思路 1 · 粒子化冲击**：取金属敲击的 50ms 瞬态，用 Granular 拉伸到 300ms，产生"刚性延展感"。\n**思路 2 · 频谱迁移**：取另一种武器的尾音，用 Spectral Freeze + Granular 重新拼到目标武器上，获得"陌生感"。\n**思路 3 · 节奏粒子**：将 Granular 的 grain rate 与 BPM 锁定，让击打本身带有"节奏肌理"，适用于动作游戏连击。\n\n演示工程（Logic + Ableton）已放到资源区。'
      },
      { id: 'sd-5', tag: '资源', title: '免费 Foley 包 CC0',
        source: 'Freesound + Foley Base', date: '2026-04-13',
        text: '免费 Foley 包：脚步声 1200 条，CC0 授权',
        body: 'Foley Base 与 Freesound 联合发布 1200 条脚步声 Foley 包，CC0 授权（完全免费，含商用）：\n\n- 分类：室内 6 种（木、瓷砖、地毯、石材、楼梯、玻璃） × 鞋型 5 种（皮鞋、运动鞋、高跟、赤脚、靴子） × 节奏 4 种（散步、急走、跑、跳）；\n- 采样：24bit / 96kHz / 无损 FLAC；\n- 下载：约 2.4 GB，分类标签元数据完整。\n\n下载页：foleybase.org / freesound.org 搜 "FB-Steps-2026"。'
      },
      { id: 'sd-6', tag: '活动', title: '《听得见的城市》采风征集',
        source: '东方之音 / CCTV 合作', date: '2026-04-22',
        text: '《听得见的城市》城市采风作品征集',
        body: '东方之音联合 CCTV 纪录频道发起《听得见的城市》采风作品征集：\n\n- 主题：你所在城市的独特声音（市井、交通、自然、人声等）；\n- 提交：≥ 3 分钟立体声作品，附创作笔记 500 字；\n- 入选作品将进入 CCTV 纪录片素材库，每条入选稿酬 ¥2,000-8,000；\n- 截稿：6 月 15 日。\n\n投递路径：登录本站 → 声音设计板块 → 发布作品时勾选"《听得见的城市》"标签。'
      }
    ],
    scoring: [
      { id: 'sc-1', tag: '人物', title: 'Hans Zimmer Remote Control 2026 招新',
        source: 'RCP 官方公告', date: '2026-04-10',
        text: 'Hans Zimmer 的 Remote Control Productions 2026 招新：中国学徒名额开放',
        body: 'Hans Zimmer 的 Remote Control Productions（RCP）是当今好莱坞最重要的配乐工作室之一，2026 年首次面向中国区开放 3 个学徒名额。\n\n要求：\n- 完整配乐作品集（≥ 5 首，时长 ≥ 30 分钟）；\n- 英文沟通能力（工作语言）；\n- 可接受 1 年驻洛杉矶；\n- 优先考虑有商业项目经验者。\n\n申请：remotecontrolproductions.com/apprentice，附视频自述 + 作品链接。申请截止 5 月 31 日。'
      },
      { id: 'sc-2', tag: '行业', title: '流媒体纪录片配乐预算变化',
        source: 'Variety + IndieWire 数据', date: '2026-04-15',
        text: '2026 流媒体纪录片配乐预算：中段项目预算同比降 22%',
        body: 'Variety 与 IndieWire 联合发布 2026 Q1 影视配乐预算数据：\n\n- 院线电影配乐预算稳定（旗舰项目略升）；\n- **流媒体中段纪录片（6-12 集）预算同比下降 22%**；\n- 广告配乐预算上升约 15%（短视频平台投放增加）；\n- 游戏配乐预算持续增长（+28%，受 AAA 项目驱动）。\n\n对配乐师的建议：纪录片市场短期承压，可将一部分精力转向广告与游戏项目；但纪录片的创作自由度仍是最高的，长期深耕仍有价值。'
      },
      { id: 'sc-3', tag: '工具', title: 'Spitfire Abbey Road One 更新',
        source: 'Spitfire Audio', date: '2026-04-12',
        text: 'Spitfire Abbey Road One 加入 Choir 分组：电影感人声合唱的新标准',
        body: 'Spitfire Audio 的 Abbey Road One 系列（在 Abbey Road Studio 2 录制的管弦采样）新增 Choir 分组：\n\n- 40 人混合合唱团（男女各半）；\n- 5 种元音（a / e / i / o / u）+ 唇音 + 无词哼唱；\n- 4 个麦克风位置（Close / Tree / Ambient / Outrigger）；\n- 多力度层 + 真·演唱起止（不用拼接）。\n\n售价 $449，老用户（拥有 Abbey Road One 主库）升级 $299。对做电影 / 游戏 CG 配乐的配乐师是今年最值得关注的采样库之一。'
      },
      { id: 'sc-4', tag: '教程', title: '45 秒情绪拱形',
        source: '东方之音 / 配乐师自述', date: '2026-04-19',
        text: '短片配乐：如何在 45 秒内建立情绪拱形',
        body: '短片（≤ 60s）的配乐比长片更难，因为你没有"铺陈"的时间。以下是一位奥斯卡短片提名配乐师分享的 45 秒拱形：\n\n- **0-8s**：单色动机（一件乐器、一个音程），建立"这是谁的故事"；\n- **8-22s**：引入和声层，情绪定调；\n- **22-35s**：冲突或转折点，动机变形 / 转调 / 节奏突变；\n- **35-42s**：高潮或收束，动机回归但色温不同；\n- **42-45s**：尾音延展 2-3 秒，给画面留呼吸。\n\n关键：**动机只用一个，反复出现但每次变形**。这是短片配乐与流行歌写作最大的区别。'
      },
      { id: 'sc-5', tag: '招募', title: '腾讯视频悬疑剧约稿',
        source: '腾讯在线视频工作室', date: '2026-04-23',
        text: '腾讯视频寻悬疑剧集配乐作者，10 集规模',
        body: '腾讯视频一部 10 集的悬疑剧集（待播，预计 2026 Q4 上线）征集配乐作者：\n\n- 10 集主配乐（每集 3-5 段落，共约 40-50 分钟音乐）；\n- 风格参考：《沉默的真相》《漫长的季节》的克制冷色调；\n- 预算：¥60-120 万（据作者经验协商）；\n- 8 月完成全部交付。\n\n有意者通过平台站内信联系"夜行组"（本站认证团队）。'
      },
      { id: 'sc-6', tag: '资源', title: 'BBC SO Core 限时 5 折',
        source: 'Spitfire Audio 官网', date: '2026-04-25',
        text: 'Spitfire BBC SO Core 限时 50% 折扣至月底',
        body: 'Spitfire Audio 的 BBC Symphony Orchestra Core（39 GB 中型管弦采样），限时 5 折至 4 月 30 日：\n\n- 原价 $449，活动价 $224；\n- 对比 Discover 版：Core 含全部 33 分组 + 3 个麦克风位置 + 长音 / 短奏 / 技法切换；\n- 对比 Pro 版（$999）：Core 没有"独奏演奏家"分组，但日常工作 90% 够用。\n\n配乐师性价比之选。活动窗口仅 5 天，错过要等下次 Black Friday。'
      }
    ]
  },

  // 根据 id 查资讯
  newsById: function (id) {
    for (const sec in this.news) {
      const hit = this.news[sec].find(n => n.id === id);
      if (hit) return { ...hit, section: sec };
    }
    return null;
  },

  // 各板块示例作品
  works: {
    arranging: [
      { t: '长夜流光 · 弦乐编配', a: '周予安', size: 'md', stats: [1280, 4210, 86], seed: 1 },
      { t: 'City Pop 小样 Vol.3', a: 'TAKUMI', size: 'lg', stats: [956, 2103, 47], seed: 2 },
      { t: '国风流行：墨色', a: '青砚工作室', size: 'sm', stats: [2450, 6210, 142], seed: 3 },
      { t: 'Indie Folk 编配合辑', a: '岸上', size: 'md', stats: [543, 1840, 29], seed: 4 },
      { t: 'LoFi Beat · 夜行', a: 'Owl', size: 'wide', stats: [1820, 4500, 98], seed: 5 },
      { t: '管弦重编：月光奏鸣曲', a: '林溯', size: 'lg', stats: [687, 2980, 71], seed: 6 },
      { t: '电子国潮三连作', a: 'NOVA', size: 'md', stats: [3210, 8900, 220], seed: 7 },
      { t: '旋律与和声小课', a: 'Ryan', size: 'sm', stats: [432, 1210, 22], seed: 8 },
    ],
    mixing: [
      { t: '人声处理 Before/After', a: 'MixLab·源', size: 'wide', stats: [4210, 12000, 301], seed: 2 },
      { t: '母带动态展示 - 流行', a: '沉响', size: 'md', stats: [1840, 5400, 92], seed: 3 },
      { t: 'Dolby Atmos 沉浸式演示', a: '声场', size: 'lg', stats: [2109, 6800, 127], seed: 4 },
      { t: 'Indie 摇滚 Mix 样例', a: 'Kai', size: 'sm', stats: [612, 1890, 31], seed: 1 },
      { t: '女声 Pop 混音拆解', a: '白盒工作室', size: 'md', stats: [2703, 8100, 186], seed: 5 },
      { t: '鼓组并行压缩示范', a: 'Drum Lab', size: 'lg', stats: [1420, 4300, 74], seed: 6 },
      { t: '母带 Loudness 对比', a: '声相', size: 'sm', stats: [933, 2710, 48], seed: 7 },
      { t: '空间混响选择指南', a: '江', size: 'md', stats: [1210, 3500, 63], seed: 8 },
    ],
    songwriting: [
      { t: '「南风」Top Line Demo', a: '林野', size: 'md', stats: [3120, 9200, 210], seed: 3 },
      { t: '抒情歌 · 歌词稿集', a: '宋时', size: 'sm', stats: [812, 2200, 41], seed: 4 },
      { t: '作曲工作流分享', a: 'MeloBox', size: 'lg', stats: [1620, 5100, 88], seed: 5 },
      { t: '电子情歌 Demo Pack', a: 'Yue', size: 'wide', stats: [2410, 7800, 134], seed: 6 },
      { t: '国风作词技法讲义', a: '青砚', size: 'md', stats: [1030, 3200, 59], seed: 7 },
      { t: 'Hook 创作实验 x20', a: 'Aki', size: 'sm', stats: [523, 1400, 27], seed: 8 },
      { t: '和弦 Loop 旋律练习', a: 'Loopist', size: 'lg', stats: [1210, 3900, 66], seed: 1 },
      { t: 'Co-Write 工作日记', a: '东海岸组', size: 'md', stats: [689, 2100, 35], seed: 2 },
    ],
    sounddesign: [
      { t: '武器击打 · Sound Lab', a: '铁砧', size: 'lg', stats: [2830, 8900, 198], seed: 4 },
      { t: '品牌声音识别系统', a: 'AudioID', size: 'wide', stats: [1450, 4700, 82], seed: 5 },
      { t: 'UI 声音设计规范', a: '声觉', size: 'sm', stats: [1210, 3400, 54], seed: 6 },
      { t: '星海纪元 CG 幕后', a: '星海音频组', size: 'md', stats: [4210, 13200, 420], seed: 7 },
      { t: 'Foley 脚步录音花絮', a: '脚印', size: 'md', stats: [812, 2600, 38], seed: 8 },
      { t: 'Granular 武器合成', a: 'Atom', size: 'lg', stats: [1903, 5900, 112], seed: 1 },
      { t: '角色技能音效合集', a: '灰境行者', size: 'sm', stats: [1502, 4100, 78], seed: 2 },
      { t: '装置艺术·回声II', a: '空间声学实验室', size: 'wide', stats: [934, 2900, 44], seed: 3 },
    ],
    scoring: [
      { t: '电影《余烬》主题', a: '顾岸', size: 'wide', stats: [5210, 16000, 540], seed: 5 },
      { t: '悬疑剧集主题 Demo', a: '夜行组', size: 'md', stats: [1820, 5800, 112], seed: 6 },
      { t: '纪录片 · 草原的风', a: '长野', size: 'lg', stats: [1210, 3800, 72], seed: 7 },
      { t: '45s 情绪拱形示范', a: '林溯', size: 'sm', stats: [640, 1900, 32], seed: 8 },
      { t: '游戏 CG 配乐 · 启程', a: 'NOVA', size: 'md', stats: [2720, 8100, 186], seed: 1 },
      { t: '广告配乐 · 春季企划', a: 'LinLab', size: 'sm', stats: [912, 2400, 44], seed: 2 },
      { t: '剧集 OST 合辑 Vol.2', a: '响板', size: 'lg', stats: [1630, 4900, 88], seed: 3 },
      { t: '电子 + 管弦混合', a: 'HyperStrings', size: 'md', stats: [2301, 6700, 135], seed: 4 },
    ]
  },

  // 主页平台级动态
  communityFeed: [
    { name: '顾岸', role: '影视配乐', time: '2 小时前', body: '刚交完《余烬》终混，整部片 72 分钟的音乐线，最后十分钟交给了人声合唱，画面第一次看的时候就记住了那段长镜头。', actions: [128, 34, 12] },
    { name: 'MixLab·源', role: '混音师', time: '5 小时前', body: '分享一个个人经验：人声 Pitch 对齐不是越准越好，不规则的尾音往往是「味道」。想找合作 Mix 人声的朋友欢迎私信。', actions: [256, 87, 40] },
    { name: '林野', role: '作词作曲', time: '昨天', body: '新 Top Line Demo《南风》已发布，今年想多接一些流行 / 民谣方向的合作，Demo Pack 在个人主页。', actions: [96, 28, 9] },
    { name: '星海音频组', role: '声音设计', time: '2 天前', body: '《星海纪元》开场 CG 的声音设计拆解已上 B 站，文字版同步更新到平台动态。感谢一路合作的伙伴们。', actions: [412, 118, 56] },
  ],

  hotAuthors: [
    { name: '顾岸', meta: '影视配乐 · 上海' },
    { name: 'MixLab·源', meta: '混音母带 · 北京' },
    { name: '星海音频组', meta: '声音设计 · 上海' },
    { name: '林野', meta: '作词作曲 · 成都' },
    { name: '青砚工作室', meta: '编曲 · 杭州' },
  ],
  hotTopics: [
    { name: '#Dolby Atmos 现场', meta: '2.1w 讨论' },
    { name: '#独立厂牌合作', meta: '1.4w 讨论' },
    { name: '#游戏音频招聘', meta: '9.2k 讨论' },
    { name: '#国风编曲思路', meta: '7.8k 讨论' },
    { name: '#AI 与创作边界', meta: '5.1k 讨论' },
  ],

  // 创作者详细资料（profile 页使用，按昵称索引）
  creators: {
    '顾岸': {
      name: '顾岸', role: '影视配乐', location: '上海',
      avatar: '顾', joined: '2024.03',
      bio: '作曲 / 电影配乐。擅长情绪拱形、管弦与电子融合。合作过 12 部院线电影、27 部剧集。',
      tags: ['电影配乐', '管弦', '情绪铺陈', 'Hybrid'],
      skills: ['Logic Pro', 'Cubase', 'Spitfire Audio', 'Kontakt', 'BBC SO Pro'],
      metrics: { works: 86, followers: 42100, coops: 128, response: '8h' },
      info: [
        { k: '所在地', v: '上海' },
        { k: '接单状态', v: '开放中' },
        { k: '典型报价', v: '¥3,000 / 分钟起' },
        { k: '平均响应', v: '8 小时' }
      ],
      works: [
        { t: '电影《余烬》主题', size: 'md', stats: [5210, 16000, 540], seed: 5 },
        { t: '悬疑剧集主题 Demo', size: 'md', stats: [1820, 5800, 112], seed: 6 },
        { t: '纪录片 · 草原的风', size: 'md', stats: [1210, 3800, 72], seed: 7 },
        { t: '45s 情绪拱形示范', size: 'md', stats: [640, 1900, 32], seed: 8 },
        { t: '游戏 CG 配乐 · 启程', size: 'md', stats: [2720, 8100, 186], seed: 1 },
        { t: '广告配乐 · 春季企划', size: 'md', stats: [912, 2400, 44], seed: 2 },
      ],
      feed: [
        { time: '2 小时前', body: '刚交完《余烬》终混，整部片 72 分钟的音乐线，最后十分钟交给了人声合唱，画面第一次看的时候就记住了那段长镜头。', actions: [128, 34, 12] },
        { time: '3 天前',   body: '下周开始接下一部院线，暂时停接剧集项目。纪录片类别仍然欢迎私信。', actions: [76, 18, 5] }
      ]
    },
    'MixLab·源': {
      name: 'MixLab·源', role: '混音师', location: '北京',
      avatar: '源', joined: '2023.09',
      bio: '专注华语流行人声处理、沉浸式混音。工作室 MixLab 常驻北京，远程合作覆盖全国。',
      tags: ['人声 Pitch', 'Dolby Atmos', 'Pop Mix', '母带'],
      skills: ['Pro Tools', 'FabFilter', 'Waves', 'Dolby Atmos Renderer', 'iZotope RX'],
      metrics: { works: 142, followers: 28900, coops: 201, response: '5h' },
      info: [
        { k: '所在地', v: '北京 / 远程' },
        { k: '接单状态', v: '开放中' },
        { k: '典型报价', v: '¥1,500 / 首起' },
        { k: '平均响应', v: '5 小时' }
      ],
      works: [
        { t: '人声处理 Before/After', size: 'md', stats: [4210, 12000, 301], seed: 2 },
        { t: '母带动态展示 - 流行',   size: 'md', stats: [1840, 5400, 92], seed: 3 },
        { t: 'Dolby Atmos 沉浸式演示', size: 'md', stats: [2109, 6800, 127], seed: 4 },
        { t: 'Indie 摇滚 Mix 样例',    size: 'md', stats: [612, 1890, 31], seed: 1 },
        { t: '女声 Pop 混音拆解',      size: 'md', stats: [2703, 8100, 186], seed: 5 },
        { t: '鼓组并行压缩示范',       size: 'md', stats: [1420, 4300, 74], seed: 6 },
      ],
      feed: [
        { time: '5 小时前', body: '分享一个个人经验：人声 Pitch 对齐不是越准越好，不规则的尾音往往是「味道」。想找合作 Mix 人声的朋友欢迎私信。', actions: [256, 87, 40] },
        { time: '昨天',    body: '这周 Stem 积压比较多，新单子的回复会慢一点，请耐心。', actions: [48, 12, 3] }
      ]
    },
    '林野': {
      name: '林野', role: '作词作曲', location: '成都',
      avatar: '野', joined: '2025.02',
      bio: '90 后 Topline 作者，中文流行 / 民谣偏爱者。签约独立厂牌「山海」。',
      tags: ['Topline', '中文抒情', '民谣', '流行'],
      skills: ['Logic Pro', 'MainStage', '中文歌词', '吉他弹唱 Demo'],
      metrics: { works: 37, followers: 9800, coops: 24, response: '12h' },
      info: [
        { k: '所在地', v: '成都' },
        { k: '接单状态', v: '开放中（Topline 优先）' },
        { k: '典型报价', v: '¥5,000 / 首起' },
        { k: '平均响应', v: '12 小时' }
      ],
      works: [
        { t: '「南风」Top Line Demo', size: 'md', stats: [3120, 9200, 210], seed: 3 },
        { t: '抒情歌 · 歌词稿集',     size: 'md', stats: [812, 2200, 41], seed: 4 },
        { t: '作曲工作流分享',         size: 'md', stats: [1620, 5100, 88], seed: 5 },
        { t: '电子情歌 Demo Pack',    size: 'md', stats: [2410, 7800, 134], seed: 6 },
        { t: '国风作词技法讲义',       size: 'md', stats: [1030, 3200, 59], seed: 7 },
        { t: 'Hook 创作实验 x20',    size: 'md', stats: [523, 1400, 27], seed: 8 },
      ],
      feed: [
        { time: '昨天', body: '新 Top Line Demo《南风》已发布，今年想多接一些流行 / 民谣方向的合作，Demo Pack 在个人主页。', actions: [96, 28, 9] }
      ]
    },
    '星海音频组': {
      name: '星海音频组', role: '声音设计', location: '上海',
      avatar: '星', joined: '2022.11',
      bio: '游戏 / CG 声音设计团队，7 人小队。擅长程序化音频、武器拟音、角色技能设计。',
      tags: ['游戏音效', 'Foley', 'CG', 'UI 声音'],
      skills: ['Wwise', 'FMOD', 'Reaper', 'Ableton Live', 'Granular'],
      metrics: { works: 210, followers: 51200, coops: 88, response: '6h' },
      info: [
        { k: '所在地', v: '上海' },
        { k: '接单状态', v: '开放中（团队）' },
        { k: '典型合作', v: '游戏 / CG 项目' },
        { k: '平均响应', v: '6 小时' }
      ],
      works: [
        { t: '武器击打 · Sound Lab', size: 'md', stats: [2830, 8900, 198], seed: 4 },
        { t: '品牌声音识别系统',       size: 'md', stats: [1450, 4700, 82], seed: 5 },
        { t: 'UI 声音设计规范',        size: 'md', stats: [1210, 3400, 54], seed: 6 },
        { t: '星海纪元 CG 幕后',       size: 'md', stats: [4210, 13200, 420], seed: 7 },
        { t: 'Foley 脚步录音花絮',     size: 'md', stats: [812, 2600, 38], seed: 8 },
        { t: 'Granular 武器合成',     size: 'md', stats: [1903, 5900, 112], seed: 1 },
      ],
      feed: [
        { time: '2 天前', body: '《星海纪元》开场 CG 的声音设计拆解已上 B 站，文字版同步更新到平台动态。感谢一路合作的伙伴们。', actions: [412, 118, 56] }
      ]
    },
    '青砚工作室': {
      name: '青砚工作室', role: '编曲', location: '杭州',
      avatar: '青', joined: '2023.05',
      bio: '国风 / 中式流行编曲工作室，常驻古筝、琵琶、笛箫等民乐合作演奏者。',
      tags: ['国风', '民乐', '中式流行', 'Cinematic'],
      skills: ['Cubase', 'Kontakt', '东方民乐采样', 'Orchestral'],
      metrics: { works: 54, followers: 12400, coops: 37, response: '10h' },
      info: [
        { k: '所在地', v: '杭州' },
        { k: '接单状态', v: '开放中' },
        { k: '擅长', v: '国风 / 民乐融合' },
        { k: '平均响应', v: '10 小时' }
      ],
      works: [
        { t: '国风流行：墨色', size: 'md', stats: [2450, 6210, 142], seed: 3 },
        { t: '国风作词技法讲义', size: 'md', stats: [1030, 3200, 59], seed: 7 },
        { t: '管弦重编：月光奏鸣曲', size: 'md', stats: [687, 2980, 71], seed: 6 },
        { t: '电子国潮三连作', size: 'md', stats: [3210, 8900, 220], seed: 7 },
      ],
      feed: [
        { time: '3 天前', body: '新的国风编曲 Demo 上线，这次用了古筝 + 合成器的组合，混响层叠出来的空间感意外好听。', actions: [88, 22, 7] }
      ]
    }
  }
};

// 根据名字查创作者数据，若没登记则返回默认占位
window.DONAUDIO_DATA.getCreator = function (name) {
  if (!name) return null;
  const hit = window.DONAUDIO_DATA.creators[name];
  if (hit) return hit;
  // fallback: 生成一份占位
  return {
    name: name, role: '声音创作者', location: '未知',
    avatar: name.charAt(0), joined: '—',
    bio: '该用户还没有完善资料。',
    tags: [], skills: [],
    metrics: { works: 0, followers: 0, coops: 0, response: '—' },
    info: [{ k: '所在地', v: '—' }, { k: '接单状态', v: '—' }],
    works: [], feed: []
  };
};

/* ==================================================================
   音频资源池（可商用免费素材 - 本地存放）
   - 来源：archive.org 的 lofichill_202310 CC 专辑（CC-BY / CC0）
   - 已下载到 assets/audio/，确保 file:// 与 http:// 协议下都能播放
   ================================================================== */
window.DONAUDIO_DATA.audioPool = [
  { url: 'assets/audio/02-cinnamon-coffee.mp3', title: 'Cinnamon & Coffee', artist: 'Lorenzo Reggio',       duration: '3:07' },
  { url: 'assets/audio/03-first-date.mp3',      title: 'First Date',        artist: 'Lofi · R&B',           duration: '2:53' },
  { url: 'assets/audio/04-bossa-uh.mp3',        title: 'Bossa Uh',          artist: 'Bossa · Jazz Hop',     duration: '3:30' },
  { url: 'assets/audio/05-cherry-lips.mp3',     title: 'Cherry Lips',       artist: 'Chill · R&B',          duration: '2:50' },
  { url: 'assets/audio/06-autumn-nap.mp3',      title: 'Autumn Nap',        artist: 'Lofi · Mellow',        duration: '2:48' },
  { url: 'assets/audio/07-moon-landing.mp3',    title: 'Moon Landing',      artist: 'Ambient · Chill',      duration: '2:10' },
  { url: 'assets/audio/08-springtime.mp3',      title: 'Springtime Stroll', artist: 'Secret Crates',        duration: '1:25' },
  { url: 'assets/audio/09-feels.mp3',           title: 'Feels',             artist: 'Chill · Jazz Hop',     duration: '2:06' },
  { url: 'assets/audio/10-hold-me-down.mp3',    title: 'Hold Me Down',      artist: 'R&B · Lofi',           duration: '3:20' },
  { url: 'assets/audio/11-oakpark.mp3',         title: 'Oakpark',           artist: 'Chill · Ambient',      duration: '2:16' },
  { url: 'assets/audio/12-sun.mp3',             title: 'Sun',               artist: 'Jazz · Chill',         duration: '3:43' },
  { url: 'assets/audio/13-waiting-for-u.mp3',   title: 'Waiting For U',     artist: 'R&B Groove',           duration: '2:47' },
  { url: 'assets/audio/14-thankful.mp3',        title: 'Thankful',          artist: 'Jazz · Mellow',        duration: '3:40' },
  { url: 'assets/audio/15-happy-end.mp3',       title: 'Happy End',         artist: 'Chill · Bossa',        duration: '2:00' },
  { url: 'assets/audio/16-sunscream.mp3',       title: 'Sunscream',         artist: 'Chill Jazz',           duration: '3:01' },
];

// 为每个作品注入一条试听音频（稳定派发：用 seed + 位置做索引）
(function enrichWorksWithAudio() {
  const pool = window.DONAUDIO_DATA.audioPool;
  const works = window.DONAUDIO_DATA.works || {};
  let g = 0;
  Object.keys(works).forEach(sec => {
    works[sec].forEach((w, i) => {
      if (!w.audio) {
        const idx = (g + (w.seed || 0) + i * 2) % pool.length;
        w.audio = pool[idx].url;
        w.audioMeta = pool[idx];
        g++;
      }
      // 加上 section 反向引用方便后续使用
      w._sec = sec;
    });
  });
})();

/* ==================================================================
   今日推荐播放列表（首页 BGM 用）
   Lofi / R&B / Chill Jazz 氛围
   ================================================================== */
window.DONAUDIO_DATA.todayMix = [
  { title: 'Cherry Lips',       artist: '今日推荐 · R&B',      url: 'assets/audio/05-cherry-lips.mp3',     cover: 5 },
  { title: 'Cinnamon & Coffee', artist: '今日推荐 · Chill',    url: 'assets/audio/02-cinnamon-coffee.mp3', cover: 2 },
  { title: 'Bossa Uh',          artist: '今日推荐 · Jazz',     url: 'assets/audio/04-bossa-uh.mp3',        cover: 4 },
  { title: 'Hold Me Down',      artist: '今日推荐 · R&B',      url: 'assets/audio/10-hold-me-down.mp3',    cover: 7 },
  { title: 'Sun',               artist: '今日推荐 · Jazz',     url: 'assets/audio/12-sun.mp3',             cover: 0 },
  { title: 'Thankful',          artist: '今日推荐 · 爵士',     url: 'assets/audio/14-thankful.mp3',        cover: 6 },
  { title: 'Sunscream',         artist: '今日推荐 · Chill Jazz',url: 'assets/audio/16-sunscream.mp3',      cover: 1 },
  { title: 'Feels',             artist: '今日推荐 · Chill',    url: 'assets/audio/09-feels.mp3',           cover: 3 },
  { title: 'Waiting For U',     artist: '今日推荐 · R&B',      url: 'assets/audio/13-waiting-for-u.mp3',   cover: 2 },
  { title: 'First Date',        artist: '今日推荐 · 轻R&B',    url: 'assets/audio/03-first-date.mp3',      cover: 4 },
  { title: 'Autumn Nap',        artist: '今日推荐 · Lofi',     url: 'assets/audio/06-autumn-nap.mp3',      cover: 5 },
  { title: 'Moon Landing',      artist: '今日推荐 · Ambient',  url: 'assets/audio/07-moon-landing.mp3',    cover: 7 },
  { title: 'Oakpark',           artist: '今日推荐 · Chill',    url: 'assets/audio/11-oakpark.mp3',         cover: 0 },
  { title: 'Springtime Stroll', artist: '今日推荐 · Groove',   url: 'assets/audio/08-springtime.mp3',      cover: 6 },
  { title: 'Happy End',         artist: '今日推荐 · Bossa',    url: 'assets/audio/15-happy-end.mp3',       cover: 1 },
];
