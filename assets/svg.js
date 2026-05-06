// 可复用 SVG 片段：LOGO、Hero 声波可视化、作品封面占位

window.DONAUDIO_SVG = {
  // 主 LOGO：东方音 · 融合水墨与波形
  logoMark: (size = 30) => `
  <svg class="mark" width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2FE6C8"/>
        <stop offset=".5" stop-color="#8B7CFF"/>
        <stop offset="1" stop-color="#FF4E6A"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="none" stroke="url(#lg1)" stroke-width="2"/>
    <path d="M12 32 Q20 18 32 32 T52 32" fill="none" stroke="url(#lg1)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M12 38 Q22 46 32 38 T52 38" fill="none" stroke="url(#lg1)" stroke-width="2.2" stroke-linecap="round" opacity=".6"/>
    <circle cx="32" cy="32" r="3" fill="url(#lg1)"/>
  </svg>`,

  // Hero 大 LOGO：水墨圆 + 流动声波
  heroVisual: () => `
  <svg viewBox="0 0 600 520" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2FE6C8"/>
        <stop offset=".5" stop-color="#8B7CFF"/>
        <stop offset="1" stop-color="#FF4E6A"/>
      </linearGradient>
      <radialGradient id="hgr" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#2FE6C8" stop-opacity=".6"/>
        <stop offset="1" stop-color="#2FE6C8" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur1"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>

    <!-- 外圈光晕 -->
    <circle cx="300" cy="260" r="220" fill="url(#hgr)" opacity=".5"/>
    <circle cx="300" cy="260" r="180" fill="none" stroke="url(#hg)" stroke-width="1" opacity=".4">
      <animate attributeName="r" values="180;200;180" dur="6s" repeatCount="indefinite"/>
    </circle>
    <circle cx="300" cy="260" r="140" fill="none" stroke="url(#hg)" stroke-width="1" opacity=".6">
      <animate attributeName="r" values="140;160;140" dur="5s" repeatCount="indefinite"/>
    </circle>

    <!-- 旋转圆环 -->
    <g style="transform-origin:300px 260px; animation: spin 40s linear infinite;">
      <circle cx="300" cy="260" r="110" fill="none" stroke="url(#hg)" stroke-width="1.5" stroke-dasharray="4 8"/>
    </g>
    <g style="transform-origin:300px 260px; animation: spin 60s linear infinite reverse;">
      <circle cx="300" cy="260" r="230" fill="none" stroke="url(#hg)" stroke-width="0.8" stroke-dasharray="2 14" opacity=".5"/>
    </g>

    <!-- 中心汉字 -->
    <text x="300" y="285" text-anchor="middle"
          font-family="'Noto Serif SC','Songti SC',serif" font-size="160" font-weight="700"
          fill="url(#hg)">東</text>

    <!-- 声波 -->
    <g opacity=".85">
      ${Array.from({length: 40}, (_, i) => {
        const x = 60 + i*12;
        const h = 20 + Math.abs(Math.sin(i*0.6))*80 + (i%3)*6;
        return `<rect x="${x}" y="${430 - h/2}" width="3" height="${h}" rx="1.5" fill="url(#hg)">
          <animate attributeName="height" values="${h};${h*1.6};${h*0.6};${h}" dur="${1.2 + (i%5)*.2}s" repeatCount="indefinite"/>
          <animate attributeName="y" values="${430 - h/2};${430 - h*0.8};${430 - h*0.3};${430 - h/2}" dur="${1.2 + (i%5)*.2}s" repeatCount="indefinite"/>
        </rect>`;
      }).join('')}
    </g>
  </svg>`,

  // 作品封面：根据 seed 生成不同风格
  cover: (seed = 1, w = 600, h = 800) => {
    const palettes = [
      ['#2FE6C8', '#8B7CFF', '#0A0E1A'],
      ['#FF4E6A', '#E8C06F', '#0A0E1A'],
      ['#8B7CFF', '#2FE6C8', '#0A0E1A'],
      ['#E8C06F', '#FF4E6A', '#1A2138'],
      ['#2FE6C8', '#FF4E6A', '#07090F'],
      ['#8B7CFF', '#E8C06F', '#111627'],
    ];
    const p = palettes[seed % palettes.length];
    const style = seed % 4;
    let inner = '';
    if (style === 0) {
      // 声波条
      inner = Array.from({length: 30}, (_, i) => {
        const x = 20 + i*18;
        const bh = 30 + Math.abs(Math.sin(i*0.5 + seed))*h*0.5;
        return `<rect x="${x}" y="${h/2 - bh/2}" width="6" height="${bh}" rx="3" fill="url(#g${seed})" opacity="${0.4 + (i%5)*.12}"/>`;
      }).join('');
    } else if (style === 1) {
      // 同心圆
      inner = Array.from({length: 8}, (_, i) => {
        return `<circle cx="${w/2}" cy="${h/2}" r="${40 + i*35}" fill="none" stroke="url(#g${seed})" stroke-width="${1 + (i%2)}" opacity="${0.2 + i*0.08}"/>`;
      }).join('') + `<circle cx="${w/2}" cy="${h/2}" r="30" fill="url(#g${seed})"/>`;
    } else if (style === 2) {
      // 流体斑
      inner = `<path d="M0,${h*0.6} Q${w*0.3},${h*0.3} ${w*0.6},${h*0.55} T${w},${h*0.5} L${w},${h} L0,${h} Z" fill="url(#g${seed})" opacity=".7"/>
               <path d="M0,${h*0.75} Q${w*0.4},${h*0.5} ${w*0.7},${h*0.7} T${w},${h*0.65} L${w},${h} L0,${h} Z" fill="url(#g${seed})" opacity=".4"/>
               <circle cx="${w*0.3}" cy="${h*0.3}" r="${h*0.15}" fill="url(#g${seed})" opacity=".5"/>`;
    } else {
      // 频谱网格
      inner = Array.from({length: 12}, (_, r) => Array.from({length: 8}, (_, c) => {
        const v = Math.abs(Math.sin(r*0.7 + c*0.9 + seed));
        return `<rect x="${20 + c*(w-40)/8}" y="${40 + r*(h-80)/12}" width="${(w-40)/8 - 4}" height="${(h-80)/12 - 4}" rx="4" fill="url(#g${seed})" opacity="${v * 0.9}"/>`;
      }).join('')).join('');
    }
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="g${seed}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${p[0]}"/>
          <stop offset="1" stop-color="${p[1]}"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="${p[2]}"/>
      ${inner}
    </svg>`;
  },

  // 播放按钮
  playIcon: () => `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,

  // 小图标
  icons: {
    search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    heart: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    eye: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    msg: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  }
};
