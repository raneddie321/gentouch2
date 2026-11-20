import type { ArtKind } from '../data/products'

type Props = { kind: ArtKind; hue: string; label?: string; className?: string; id: string }

// Stylized vector product renders. Each piece is drawn on a 200×160 canvas.
export default function ProductArt({ kind, hue, label, className = '', id }: Props) {
  const g = `g-${id}`
  const s = `s-${id}`
  const light = isLight(hue)
  const ink = light ? '#141821' : '#EEF1F7'
  const body = `url(#${g})`
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={shade(hue, 0.18)} />
          <stop offset="1" stopColor={shade(hue, -0.28)} />
        </linearGradient>
        <radialGradient id={s} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity=".55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="146" rx="70" ry="8" fill={`url(#${s})`} />
      {draw(kind, body, hue, ink, label)}
    </svg>
  )
}

function draw(kind: ArtKind, body: string, hue: string, ink: string, label?: string) {
  const dark = shade(hue, -0.45)
  const st = { stroke: dark, strokeWidth: 1.5 }
  switch (kind) {
    case 'console-tower':
      return (
        <g>
          <path d="M70 20 Q62 80 68 140 L84 140 Q80 80 86 20Z" fill={body} {...st} />
          <path d="M114 20 Q120 80 116 140 L132 140 Q138 80 130 20Z" fill={body} {...st} />
          <rect x="84" y="18" width="32" height="124" rx="6" fill="#111318" />
          <rect x="88" y="28" width="24" height="3" rx="1.5" fill="#2B6BFF" opacity=".9" />
          <circle cx="100" cy="128" r="3" fill="#2B6BFF" />
        </g>
      )
    case 'console-box':
      return (
        <g>
          <rect x="62" y="22" width="76" height="118" rx="8" fill={body} {...st} />
          <circle cx="100" cy="40" r="20" fill={dark} opacity=".6" />
          {Array.from({ length: 16 }).map((_, i) => (
            <circle key={i} cx={86 + (i % 4) * 9.3} cy={28 + Math.floor(i / 4) * 8} r="2.3" fill="#000" opacity=".55" />
          ))}
          <circle cx="100" cy="40" r="10" fill="#39E81B" opacity=".18" />
          <rect x="70" y="120" width="20" height="3" rx="1.5" fill={ink} opacity=".3" />
          <circle cx="126" cy="124" r="3" fill="#39E81B" />
        </g>
      )
    case 'handheld':
      return (
        <g>
          <rect x="22" y="44" width="34" height="78" rx="14" fill={body} {...st} />
          <rect x="144" y="44" width="34" height="78" rx="14" fill={hue === '#1A1A1A' ? body : '#2B6BFF'} {...st} />
          <rect x="52" y="40" width="96" height="86" rx="8" fill="#111318" />
          <rect x="58" y="46" width="84" height="74" rx="4" fill="#1B2030" />
          <rect x="58" y="46" width="84" height="74" rx="4" fill="url(#scr)" />
          <defs>
            <linearGradient id="scr" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#7C5CFF" stopOpacity=".7" />
              <stop offset="1" stopColor="#FF4D2E" stopOpacity=".5" />
            </linearGradient>
          </defs>
          {label && (
            <text x="100" y="88" textAnchor="middle" fontFamily="Rubik" fontWeight="800" fontSize="12" fill="#fff">
              {label}
            </text>
          )}
          <circle cx="39" cy="66" r="7" fill="#111318" />
          <circle cx="161" cy="98" r="7" fill="#111318" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={161 + [0, 7, 0, -7][i]} cy={66 + [-7, 0, 7, 0][i]} r="3" fill="#111318" />
          ))}
          <path d="M33 98h12M39 92v12" stroke="#111318" strokeWidth="4" strokeLinecap="round" />
        </g>
      )
    case 'controller':
      return (
        <g>
          <path d="M60 52 Q100 42 140 52 Q170 58 176 110 Q178 132 160 132 Q146 132 136 112 L64 112 Q54 132 40 132 Q22 132 24 110 Q30 58 60 52Z" fill={body} {...st} />
          <path d="M74 56 h52 v26 Q100 92 74 82Z" fill={dark} opacity=".45" />
          <circle cx="78" cy="96" r="10" fill="#111318" />
          <circle cx="122" cy="96" r="10" fill="#111318" />
          <path d="M52 72h16M60 64v16" stroke={ink} strokeWidth="5" strokeLinecap="round" opacity=".7" />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={142 + [0, 8, 0, -8][i]} cy={72 + [-8, 0, 8, 0][i]} r="4" fill={['#14C8A8', '#FF4D2E', '#2B6BFF', '#FF2E7E'][i]} />
          ))}
          <path d="M84 50 h32" stroke="#2B6BFF" strokeWidth="2" opacity=".8" />
        </g>
      )
    case 'headset':
      return (
        <g>
          <path d="M48 96 Q48 26 100 26 Q152 26 152 96" fill="none" stroke={dark} strokeWidth="12" strokeLinecap="round" />
          <path d="M48 96 Q48 26 100 26 Q152 26 152 96" fill="none" stroke={hue} strokeWidth="7" strokeLinecap="round" />
          <rect x="30" y="80" width="38" height="56" rx="16" fill={body} {...st} />
          <rect x="132" y="80" width="38" height="56" rx="16" fill={body} {...st} />
          <rect x="38" y="90" width="22" height="36" rx="10" fill={dark} opacity=".5" />
          <rect x="140" y="90" width="22" height="36" rx="10" fill={dark} opacity=".5" />
          <path d="M40 128 Q60 150 84 140" fill="none" stroke="#111318" strokeWidth="4" strokeLinecap="round" />
        </g>
      )
    case 'vr':
      return (
        <g>
          <path d="M30 70 Q30 46 56 46 L144 46 Q170 46 170 70 L170 104 Q170 122 150 122 L122 122 Q112 104 100 104 Q88 104 78 122 L50 122 Q30 122 30 104Z" fill={body} {...st} />
          <path d="M42 66 Q42 58 54 58 L146 58 Q158 58 158 66 L158 90 Q158 98 146 98 L54 98 Q42 98 42 90Z" fill="#111318" />
          <rect x="54" y="66" width="92" height="4" rx="2" fill="#7C5CFF" opacity=".7" />
          <path d="M30 80 L14 76 M170 80 L186 76" stroke={dark} strokeWidth="8" strokeLinecap="round" />
        </g>
      )
    case 'pc':
      return (
        <g>
          <rect x="56" y="12" width="88" height="132" rx="6" fill="#111318" stroke="#252B3D" strokeWidth="2" />
          <rect x="64" y="20" width="58" height="116" rx="3" fill="#0B0D12" stroke={hue} strokeOpacity=".5" />
          <rect x="70" y="72" width="46" height="12" rx="2" fill={hue} opacity=".85" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx="133" cy={36 + i * 34} r="9" fill="none" stroke={hue} strokeWidth="2.5" />
              <circle cx="133" cy={36 + i * 34} r="3" fill={hue} />
            </g>
          ))}
          <circle cx="93" cy="44" r="11" fill="none" stroke={hue} strokeWidth="2" opacity=".7" />
          <rect x="70" y="96" width="46" height="4" rx="2" fill={hue} opacity=".4" />
          <rect x="70" y="106" width="46" height="4" rx="2" fill={hue} opacity=".4" />
          <rect x="56" y="12" width="88" height="132" rx="6" fill="none" stroke={hue} strokeOpacity=".35" strokeWidth="1" />
        </g>
      )
    case 'laptop':
      return (
        <g>
          <path d="M44 28 h112 q6 0 6 6 v78 h-124 v-78 q0-6 6-6z" fill="#111318" stroke="#252B3D" strokeWidth="2" />
          <rect x="46" y="32" width="108" height="76" rx="2" fill="#1B2030" />
          <path d="M46 108 L90 32 L154 32 L154 108Z" fill={hue} opacity=".25" />
          <path d="M46 108 L70 70 L100 90 L130 50 L154 70 L154 108Z" fill={hue} opacity=".5" />
          <path d="M22 116 h156 l-10 16 h-136z" fill={body} {...st} />
          <rect x="86" y="118" width="28" height="3" rx="1.5" fill="#111318" opacity=".5" />
        </g>
      )
    case 'monitor':
      return (
        <g>
          <path d="M18 24 Q100 14 182 24 L182 108 Q100 98 18 108Z" fill="#111318" stroke="#252B3D" strokeWidth="2" />
          <path d="M24 30 Q100 21 176 30 L176 102 Q100 93 24 102Z" fill={hue} opacity=".35" />
          <path d="M24 102 L60 60 L90 84 L130 40 L176 76 L176 102 Q100 93 24 102Z" fill={hue} opacity=".6" />
          <rect x="94" y="104" width="12" height="28" fill="#1B2030" />
          <path d="M66 136 h68 l-6 -6 h-56z" fill="#1B2030" />
        </g>
      )
    case 'mouse':
      return (
        <g>
          <path d="M100 18 Q144 18 146 72 L146 106 Q146 144 100 144 Q54 144 54 106 L54 72 Q56 18 100 18Z" fill={body} {...st} />
          <path d="M100 18 V68" stroke={shade(hue, -0.35)} strokeWidth="2" />
          <rect x="95" y="34" width="10" height="20" rx="5" fill="#111318" />
          <path d="M56 70 Q100 82 144 70" stroke={shade(hue, -0.35)} strokeWidth="1.5" fill="none" />
        </g>
      )
    case 'keyboard':
      return (
        <g transform="translate(0 6) skewX(-8)">
          <rect x="22" y="44" width="164" height="74" rx="8" fill="#111318" stroke={hue} strokeOpacity=".6" strokeWidth="2" />
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 12 }).map((_, c) => (
              <rect key={`${r}-${c}`} x={30 + c * 12.6} y={52 + r * 15} width="10" height="11" rx="2" fill="#1B2030" stroke={hue} strokeOpacity={0.25 + ((r + c) % 3) * 0.2} />
            )),
          )}
          <rect x="58" y="112" width="92" height="0" />
          <rect x="22" y="116" width="164" height="4" rx="2" fill={hue} opacity=".7" />
        </g>
      )
    case 'chair':
      return (
        <g>
          <path d="M66 14 Q100 6 134 14 L130 92 L70 92Z" fill="#111318" stroke="#252B3D" strokeWidth="2" />
          <path d="M80 22 Q100 18 120 22 L118 86 L82 86Z" fill={body} />
          <rect x="88" y="30" width="24" height="10" rx="4" fill="#111318" opacity=".6" />
          <rect x="60" y="90" width="80" height="16" rx="6" fill="#111318" stroke="#252B3D" strokeWidth="2" />
          <rect x="96" y="106" width="8" height="20" fill="#252B3D" />
          <path d="M60 136 L100 126 L140 136 M100 126 L100 140" stroke="#252B3D" strokeWidth="5" strokeLinecap="round" />
          <path d="M60 78 v14 M140 78 v14" stroke="#252B3D" strokeWidth="6" strokeLinecap="round" />
        </g>
      )
    case 'game':
      return (
        <g>
          <rect x="58" y="10" width="84" height="134" rx="5" fill={body} {...st} />
          <rect x="58" y="10" width="84" height="18" rx="5" fill={/Switch|MARIO|DK|POK/i.test(label || '') ? '#E60012' : '#2B6BFF'} />
          <text x="66" y="23" fontFamily="Rubik" fontWeight="700" fontSize="9" fill="#fff">
            {/MARIO|DK|POK/i.test(label || '') ? 'SWITCH 2' : 'PS5'}
          </text>
          <circle cx="100" cy="76" r="30" fill="#fff" opacity=".12" />
          <path d="M66 140 L100 96 L134 140Z" fill="#000" opacity=".2" />
          <text x="100" y="82" textAnchor="middle" fontFamily="Rubik" fontWeight="900" fontSize={(label || '').length > 9 ? 11 : 16} fill="#fff" style={{ letterSpacing: 1 }}>
            {label}
          </text>
        </g>
      )
    case 'wheel':
      return (
        <g>
          <rect x="128" y="62" width="50" height="58" rx="8" fill="#111318" stroke="#252B3D" strokeWidth="2" />
          <circle cx="86" cy="80" r="56" fill="none" stroke="#111318" strokeWidth="14" />
          <circle cx="86" cy="80" r="56" fill="none" stroke={hue} strokeWidth="4" strokeOpacity=".7" />
          <path d="M34 72 Q86 62 138 72 L120 100 Q86 116 52 100Z" fill="#111318" />
          <circle cx="86" cy="86" r="16" fill={body} {...st} />
          <rect x="83" y="24" width="6" height="10" fill="#FF4D2E" />
          {[60, 112].map((x) => (
            <circle key={x} cx={x} cy="84" r="4" fill="#FF4D2E" />
          ))}
        </g>
      )
    case 'pedals':
      return (
        <g>
          <rect x="26" y="120" width="148" height="16" rx="4" fill="#111318" stroke="#252B3D" strokeWidth="2" />
          {[52, 100, 148].map((x, i) => (
            <g key={x}>
              <path d={`M${x} 120 L${x - 6} 70`} stroke="#252B3D" strokeWidth="6" />
              <rect x={x - 20} y={30 + i * 6} width="28" height="48" rx="4" fill={body} {...st} transform={`rotate(-12 ${x - 6} 54)`} />
            </g>
          ))}
        </g>
      )
    case 'cockpit':
      return (
        <g>
          <path d="M20 132 h160" stroke="#252B3D" strokeWidth="8" strokeLinecap="round" />
          <path d="M40 132 L60 70 M150 132 L140 80" stroke="#252B3D" strokeWidth="7" strokeLinecap="round" />
          <path d="M30 128 Q26 60 50 34 Q66 24 76 40 L74 112 L96 116 L96 128Z" fill={body} {...st} />
          <path d="M44 50 Q52 40 64 46 L62 104" fill="none" stroke="#000" opacity=".3" strokeWidth="6" />
          <circle cx="150" cy="62" r="22" fill="none" stroke="#111318" strokeWidth="7" />
          <rect x="132" y="100" width="40" height="8" rx="2" fill="#111318" />
          <path d="M120 116 h40" stroke="#111318" strokeWidth="6" />
        </g>
      )
    case 'joystick':
      return (
        <g>
          <rect x="34" y="112" width="132" height="24" rx="10" fill="#111318" stroke="#252B3D" strokeWidth="2" />
          <path d="M92 112 L88 64 Q86 24 108 22 Q128 22 124 54 L114 112Z" fill={body} {...st} />
          <circle cx="112" cy="34" r="5" fill="#FF4D2E" />
          <rect x="94" y="52" width="10" height="6" rx="2" fill="#111318" />
          <circle cx="58" cy="124" r="5" fill="#FF4D2E" />
          <circle cx="142" cy="124" r="5" fill="#14C8A8" />
        </g>
      )
    case 'car':
      return (
        <g>
          <path d="M36 92 Q40 66 70 62 L94 46 Q106 40 124 44 L150 62 Q170 66 172 92 L166 100 L40 100Z" fill={body} {...st} />
          <path d="M98 50 L122 50 L140 64 L92 64Z" fill="#111318" opacity=".75" />
          <rect x="146" y="44" width="30" height="5" rx="2" fill="#111318" />
          <path d="M162 49 v14" stroke="#111318" strokeWidth="3" />
          {[62, 146].map((x) => (
            <g key={x}>
              <circle cx={x} cy="108" r="27" fill="#111318" />
              <circle cx={x} cy="108" r="11" fill={hue} opacity=".9" />
              <circle cx={x} cy="108" r="27" fill="none" stroke="#252B3D" strokeWidth="6" strokeDasharray="5 5" />
            </g>
          ))}
        </g>
      )
    case 'drone':
      return (
        <g>
          {[
            [44, 48],
            [156, 48],
            [44, 116],
            [156, 116],
          ].map(([x, y]) => (
            <g key={`${x}${y}`}>
              <path d={`M100 82 L${x} ${y}`} stroke={shade(hue, -0.3)} strokeWidth="8" strokeLinecap="round" />
              <ellipse cx={x} cy={y - 6} rx="28" ry="5" fill={hue} opacity=".35" />
              <circle cx={x} cy={y} r="7" fill="#111318" />
            </g>
          ))}
          <rect x="74" y="64" width="52" height="38" rx="14" fill={body} {...st} />
          <circle cx="100" cy="110" r="10" fill="#111318" />
          <circle cx="100" cy="110" r="4" fill="#2B6BFF" />
        </g>
      )
    case 'plane':
      return (
        <g>
          <path d="M14 82 Q100 62 186 82 L186 92 Q100 84 14 92Z" fill={body} {...st} />
          <path d="M96 40 Q140 44 168 78 L156 98 Q120 104 60 96 L40 72 Z" fill={body} {...st} opacity=".9" />
          <path d="M40 72 L24 44 L36 44 L60 74" fill={body} {...st} />
          <circle cx="166" cy="86" r="4" fill="#111318" />
          <path d="M172 70 v32" stroke="#111318" strokeWidth="3" opacity=".6" />
          <path d="M110 58 Q128 60 138 70 L110 70Z" fill="#2B6BFF" opacity=".7" />
          <path d="M70 84 h60" stroke="#FF4D2E" strokeWidth="3" />
        </g>
      )
    case 'figure':
      return (
        <g>
          <rect x="66" y="96" width="68" height="44" rx="12" fill={body} {...st} />
          <rect x="54" y="18" width="92" height="82" rx="30" fill={body} {...st} />
          <ellipse cx="82" cy="62" rx="9" ry="10" fill="#111318" />
          <ellipse cx="118" cy="62" rx="9" ry="10" fill="#111318" />
          <circle cx="85" cy="58" r="3" fill="#fff" />
          <circle cx="121" cy="58" r="3" fill="#fff" />
          <rect x="74" y="118" width="20" height="22" rx="6" fill={shade(hue, -0.3)} />
          <rect x="106" y="118" width="20" height="22" rx="6" fill={shade(hue, -0.3)} />
        </g>
      )
    case 'lamp': {
      const glow = hue
      return (
        <g>
          <circle cx="100" cy="76" r="62" fill={glow} opacity=".14" />
          <circle cx="100" cy="76" r="42" fill={glow} opacity=".14" />
          {hue === '#39E81B' ? (
            <g transform="translate(46 34) scale(9)" shapeRendering="crispEdges">
              <path fill={glow} d={INVADER_PATH} />
            </g>
          ) : (
            <g fill="none" stroke={glow} strokeWidth="6" strokeLinejoin="round">
              <path d="M38 96 L58 62 L78 96Z" />
              <circle cx="100" cy="78" r="18" />
              <path d="M126 62 l32 32 M158 62 l-32 32" />
            </g>
          )}
          <rect x="44" y="128" width="112" height="10" rx="4" fill="#111318" />
        </g>
      )
    }
    case 'apparel':
      return (
        <g>
          <path d="M66 22 Q100 40 134 22 L170 46 L156 80 L142 72 L142 140 L58 140 L58 72 L44 80 L30 46Z" fill={body} stroke="#252B3D" strokeWidth="2" />
          <path d="M80 22 Q100 52 120 22" fill="none" stroke="#252B3D" strokeWidth="4" />
          <g transform="translate(82 74) scale(3)" shapeRendering="crispEdges">
            <path fill="#39E81B" d={INVADER_PATH} />
          </g>
          <path d="M84 124 Q100 130 116 124" fill="none" stroke="#252B3D" strokeWidth="3" />
        </g>
      )
  }
}

export const INVADER_PATH =
  'M2 0h1v1h-1zM9 0h1v1h-1zM2 1h2v1h-2zM8 1h2v1h-2zM1 2h10v1h-10zM0 3h3v1h-3zM4 3h4v1h-4zM9 3h3v1h-3zM0 4h12v1h-12zM0 5h12v1h-12zM0 6h2v1h-2zM3 6h6v1h-6zM10 6h2v1h-2zM0 7h2v1h-2zM4 7h4v1h-4zM10 7h2v1h-2z'

function hexToRgb(h: string) {
  const v = parseInt(h.slice(1), 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}
function shade(h: string, amt: number) {
  const [r, g, b] = hexToRgb(h)
  const f = (c: number) => Math.round(Math.max(0, Math.min(255, amt > 0 ? c + (255 - c) * amt : c * (1 + amt))))
  return `rgb(${f(r)},${f(g)},${f(b)})`
}
function isLight(h: string) {
  const [r, g, b] = hexToRgb(h)
  return r * 0.299 + g * 0.587 + b * 0.114 > 150
}
