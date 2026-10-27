import logoImg from "@/assets/logo-ble.png";

export function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src={logoImg} alt="Blé" width={631} height={224} className={className} decoding="async" />;
}

export function Wheat({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 200" fill="none" aria-hidden="true">
      <path d="M30 200 C30 140 31 90 30 20" stroke="var(--gold)" strokeWidth="2" />
      {Array.from({ length: 7 }).map((_, i) => {
        const y = 30 + i * 18;
        return (
          <g key={i} fill="var(--gold)" opacity={0.9}>
            <ellipse cx="22" cy={y} rx="5" ry="10" transform={`rotate(-30 22 ${y})`} />
            <ellipse cx="38" cy={y} rx="5" ry="10" transform={`rotate(30 38 ${y})`} />
          </g>
        );
      })}
      <ellipse cx="30" cy="16" rx="4" ry="10" fill="var(--gold)" />
    </svg>
  );
}

/** Large detailed wheat ear. Grains tint toward the CSS variable --glow. */
export function WheatEar({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const fill = "color-mix(in srgb, var(--glow, #d9a441) 30%, #e2b04c)";
  return (
    <svg className={className} style={style} viewBox="0 0 120 600" fill="none" aria-hidden="true">
      <path d="M60 600C57 430 63 260 60 110" stroke="#b8862a" strokeWidth="3" />
      {Array.from({ length: 9 }).flatMap((_, i) => {
        const y = 122 + i * 27;
        return [-1, 1].map((d) => {
          const x = 60 + d * 8;
          return (
            <g key={`${i}${d}`}>
              <ellipse cx={x} cy={y} rx="7" ry="17" transform={`rotate(${d * 24} ${x} ${y})`} fill={fill} stroke="#8a5d0e" strokeWidth=".6" />
              <path d={`M${x} ${y - 14}L${60 + d * 34} ${y - 86}`} stroke="#e2b04c" strokeWidth=".8" opacity=".85" />
            </g>
          );
        });
      })}
      <ellipse cx="60" cy="100" rx="7" ry="18" fill={fill} />
      <path d="M60 84V8" stroke="#e2b04c" strokeWidth=".8" />
    </svg>
  );
}
