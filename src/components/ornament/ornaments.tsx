type MarkTone = 'paper' | 'wine' | 'dark' | 'earth'

const markTones: Record<MarkTone, { fill: string; stroke: string }> = {
  paper: { fill: '#FBF6EE', stroke: '#C4A574' },
  wine: { fill: '#6E2433', stroke: '#E4D0A8' },
  dark: { fill: '#2A1418', stroke: '#C4A574' },
  earth: { fill: 'none', stroke: '#E4D0A8' },
}

function petals(
  cx: number,
  cy: number,
  count: number,
  rx: number,
  ry: number,
  orbit: number,
  fill: string,
  spin = 0,
) {
  return Array.from({ length: count }, (_, index) => (
    <ellipse
      key={`${orbit}-${rx}-${index}`}
      cx={cx}
      cy={cy - orbit}
      rx={rx}
      ry={ry}
      fill={fill}
      stroke="#6E2433"
      strokeWidth="0.7"
      transform={`rotate(${spin + (360 / count) * index} ${cx} ${cy})`}
    />
  ))
}

export function FlowerMark({
  tone = 'paper',
  bare = false,
  className,
}: {
  tone?: MarkTone
  bare?: boolean
  className?: string
}) {
  const { fill, stroke } = markTones[tone]
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      {bare ? null : <circle cx="32" cy="32" r="30" fill={fill} stroke={stroke} strokeWidth="1" />}
      {Array.from({ length: 6 }, (_, index) => (
        <ellipse
          key={index}
          cx="32"
          cy="15"
          rx="3.4"
          ry="8"
          fill="none"
          stroke={stroke}
          strokeWidth="1.15"
          transform={`rotate(${index * 60} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="3" fill={stroke} />
    </svg>
  )
}

export function Mandala({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="96" fill="none" stroke="#C4A574" strokeWidth="0.7" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="#C4A574" strokeWidth="0.5" />
      {Array.from({ length: 12 }, (_, index) => (
        <ellipse
          key={index}
          cx="100"
          cy="48"
          rx="11"
          ry="24"
          fill="none"
          stroke="#C4A574"
          strokeWidth="0.8"
          transform={`rotate(${index * 30} 100 100)`}
        />
      ))}
      {Array.from({ length: 8 }, (_, index) => (
        <ellipse
          key={`inner-${index}`}
          cx="100"
          cy="64"
          rx="7"
          ry="16"
          fill="none"
          stroke="#A68456"
          strokeWidth="0.7"
          transform={`rotate(${index * 45 + 18} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="18" fill="none" stroke="#C4A574" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="5" fill="#C4A574" />
    </svg>
  )
}

export function Marigold({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-42 -42 84 84" aria-hidden="true">
      {petals(0, 0, 18, 6, 16, 18, '#E8CC90')}
      {petals(0, 0, 14, 4.4, 11, 11, '#C4A574', 8)}
      <circle r="7" fill="#6E2433" />
      <circle r="3.1" fill="#F6E7C2" />
    </svg>
  )
}

export function Rose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-32 -32 64 64" aria-hidden="true">
      <ellipse cx="-7" cy="3" rx="15" ry="12" fill="#F8E7EA" stroke="#6E2433" strokeWidth="0.8" />
      <ellipse cx="8" cy="2" rx="14" ry="11" fill="#F3D4DC" stroke="#6E2433" strokeWidth="0.8" />
      <ellipse cx="0" cy="-7" rx="13" ry="11" fill="#FBF6EE" stroke="#6E2433" strokeWidth="0.8" />
      <ellipse cx="1" cy="2" rx="8" ry="7" fill="#E8C9C6" stroke="#6E2433" strokeWidth="0.7" />
      <circle cx="1" cy="1" r="3.2" fill="#C4A574" stroke="#6E2433" strokeWidth="0.6" />
    </svg>
  )
}

export function Lotus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-40 -40 80 80" aria-hidden="true">
      {petals(0, 0, 8, 9, 20, 14, '#FBF6EE')}
      {petals(0, 0, 8, 6, 13, 8, '#F4D5DC', 22)}
      <circle r="5" fill="#C4A574" stroke="#6E2433" strokeWidth="0.6" />
    </svg>
  )
}

export function Jasmine({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="-22 -22 44 44" aria-hidden="true">
      {petals(0, 0, 5, 3.4, 7, 6.5, '#FBF6EE')}
      <circle r="2.3" fill="#C4A574" stroke="#6E2433" strokeWidth="0.5" />
    </svg>
  )
}

export function LeafSprig({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 150 96" aria-hidden="true">
      <path d="M8 78C46 74 78 52 132 16" fill="none" stroke="#6E2433" strokeWidth="1.2" />
      <path
        d="M38 70c14-16 32-12 40 0c-10 10-26 12-40 0Z"
        fill="#F4E7C8"
        stroke="#6E2433"
        strokeWidth="0.8"
        transform="rotate(-24 58 70)"
      />
      <path
        d="M78 46c12-14 28-10 34 0c-8 9-22 10-34 0Z"
        fill="#E7DCC4"
        stroke="#6E2433"
        strokeWidth="0.8"
        transform="rotate(16 96 46)"
      />
      <g transform="translate(124 22)">
        {petals(0, 0, 5, 3.2, 6.4, 6, '#FBF6EE')}
        <circle r="2" fill="#C4A574" />
      </g>
    </svg>
  )
}

function Leaf({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path d="M0 0C18-16 36-8 46 2C34 14 16 16 0 0Z" fill="#F4E7C8" stroke="#6E2433" strokeWidth="0.8" />
      <path d="M6 1C18-4 32-1 42 2" fill="none" stroke="#A68456" strokeWidth="0.6" />
    </g>
  )
}

export function Bouquet({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 220" aria-hidden="true">
      <path
        d="M176 198c-10-38-8-62-34-84"
        fill="none"
        stroke="#6E2433"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M142 116c-24 10-40 32-46 62"
        fill="none"
        stroke="#6E2433"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <Leaf transform="translate(28 86) rotate(-32)" />
      <Leaf transform="translate(168 104) rotate(24) scale(-0.9 0.9)" />
      <Leaf transform="translate(78 146) rotate(46) scale(0.72)" />
      <g transform="translate(86 58)">
        {petals(0, 0, 16, 5.2, 13, 15, '#E8CC90')}
        {petals(0, 0, 12, 3.8, 9, 9, '#C4A574', 10)}
        <circle r="6" fill="#6E2433" />
        <circle r="2.6" fill="#F6E7C2" />
      </g>
      <g transform="translate(138 112) scale(1.05)">
        <ellipse cx="-6" cy="2" rx="13" ry="10" fill="#F8E7EA" stroke="#6E2433" strokeWidth="0.75" />
        <ellipse cx="7" cy="1" rx="12" ry="9" fill="#F3D4DC" stroke="#6E2433" strokeWidth="0.75" />
        <ellipse cx="0" cy="-6" rx="11" ry="9" fill="#FBF6EE" stroke="#6E2433" strokeWidth="0.75" />
        <ellipse cx="1" cy="1" rx="7" ry="6" fill="#E8C9C6" stroke="#6E2433" strokeWidth="0.65" />
        <circle cx="1" cy="1" r="2.8" fill="#C4A574" stroke="#6E2433" strokeWidth="0.5" />
      </g>
      <g transform="translate(48 124) scale(0.95)">
        {petals(0, 0, 5, 3.2, 6.6, 6.2, '#FBF6EE')}
        <circle r="2.1" fill="#C4A574" />
      </g>
      <g transform="translate(112 162) scale(0.72)">
        {petals(0, 0, 5, 3.2, 6.6, 6.2, '#FBF6EE')}
        <circle r="2.1" fill="#C4A574" />
      </g>
      <circle cx="64" cy="92" r="1.7" fill="#C4A574" />
      <circle cx="158" cy="74" r="1.6" fill="#C4A574" />
      <circle cx="118" cy="62" r="1.4" fill="#A68456" />
    </svg>
  )
}

export function CornerFlowers() {
  return (
    <>
      <div className="bouquet bouquet--nw" aria-hidden="true">
        <div className="bouquet__art">
          <Bouquet />
        </div>
      </div>
      <div className="bouquet bouquet--ne" aria-hidden="true">
        <div className="bouquet__art">
          <Bouquet />
        </div>
      </div>
      <div className="bouquet bouquet--sw" aria-hidden="true">
        <div className="bouquet__art">
          <Bouquet />
        </div>
      </div>
      <div className="bouquet bouquet--se" aria-hidden="true">
        <div className="bouquet__art">
          <Bouquet />
        </div>
      </div>
    </>
  )
}

export function Garland({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 56" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M8 34C90 8 150 8 220 34C300 62 390 62 470 34C550 6 640 8 720 32C752 42 776 42 792 30"
        stroke="#C4A574"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export function Swastik({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="none" stroke="#C4A574" strokeWidth="1" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="#E4D0A8" strokeWidth="0.6" />
      <g
        fill="none"
        stroke="#E4D0A8"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M60 52 V24 H80" />
        <path d="M68 60 H96 V80" />
        <path d="M60 68 V96 H40" />
        <path d="M52 60 H24 V40" />
      </g>
      <circle cx="60" cy="60" r="3.2" fill="#C4A574" />
    </svg>
  )
}

export function Kalash({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 140" aria-hidden="true">
      <circle cx="60" cy="70" r="54" fill="none" stroke="#C4A574" strokeWidth="1" />
      <g fill="none" stroke="#E4D0A8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 28 C52 16 40 18 34 12" />
        <path d="M60 28 C68 16 80 18 86 12" />
        <path d="M60 30 C56 18 62 14 60 8" />
        <path d="M60 26 C48 20 46 30 52 34" />
        <path d="M60 26 C72 20 74 30 68 34" />
        <ellipse cx="60" cy="38" rx="9" ry="6" />
        <path d="M51 44 H69 L73 54 H47 Z" />
        <path d="M47 54 C34 60 30 78 36 94 C42 108 78 108 84 94 C90 78 86 60 73 54" />
        <path d="M40 96 H80" />
        <path d="M44 102 H76" />
      </g>
    </svg>
  )
}

export function Rule() {
  return (
    <div className="rule" aria-hidden="true">
      <span />
      <i />
      <span />
    </div>
  )
}
