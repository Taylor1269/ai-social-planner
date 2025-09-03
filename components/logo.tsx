export default function Logo({ size = 180 }: { size?: number }) {
  const h = Math.round(size * 0.28);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 720 200"
      role="img"
      aria-label="Echo logo"
    >
      <defs>
        {/* Neon gradient */}
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>

        {/* Soft glow */}
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Subtle chrome underlay */}
      <text
        x="0"
        y="145"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
        fontWeight="900"
        fontSize="160"
        fill="url(#g)"
        opacity="0.22"
      >
        ECHO
      </text>

      {/* Main wordmark */}
      <text
        x="0"
        y="145"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
        fontWeight="900"
        fontSize="160"
        fill="none"
        stroke="url(#g)"
        strokeWidth="10"
        filter="url(#glow)"
        paintOrder="stroke"
      >
        ECHO
      </text>

      {/* Inner fill for depth */}
      <text
        x="0"
        y="145"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
        fontWeight="900"
        fontSize="160"
        fill="#e5e7eb"
        opacity="0.06"
      >
        ECHO
      </text>
    </svg>
  );
}