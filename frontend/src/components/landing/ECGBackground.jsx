export default function ECGBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute left-0 top-[58%] h-[320px] w-full -translate-y-1/2 lg:top-[61%]"
        viewBox="0 0 1600 260"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Purple → pink → purple → blue */}
          <linearGradient
            id="ecgGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="25%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#ff5a8a" />
            <stop offset="75%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          {/* Soft atmospheric glow */}
          <filter
            id="ecgGlowStrong"
            x="-50%"
            y="-150%"
            width="200%"
            height="400%"
          >
            <feGaussianBlur stdDeviation="10" />
          </filter>

          {/* Main ECG glow */}
          <filter
            id="ecgGlow"
            x="-50%"
            y="-150%"
            width="200%"
            height="400%"
          >
            <feGaussianBlur
              stdDeviation="4"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* One complete heartbeat */}
          <path
            id="heartbeat"
            d="
              M 0 130

              H 170

              L 188 130
              L 202 112
              L 216 130

              H 250

              L 270 130
              L 292 55
              L 315 205
              L 338 130

              H 390

              L 410 130
              L 425 118
              L 440 130

              H 800
            "
            fill="none"
            stroke="url(#ecgGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </defs>

        {/* Repeating ECG track */}
        <g className="ecg-track">
          {/* Soft glow */}
          <g
            opacity="0.14"
            filter="url(#ecgGlowStrong)"
            strokeWidth="10"
          >
            <use href="#heartbeat" x="0" />
            <use href="#heartbeat" x="800" />
            <use href="#heartbeat" x="1600" />
          </g>

          {/* Main line */}
          <g
            opacity="0.72"
            filter="url(#ecgGlow)"
          >
            <use href="#heartbeat" x="0" />
            <use href="#heartbeat" x="800" />
            <use href="#heartbeat" x="1600" />
          </g>
        </g>
      </svg>

      <style>
        {`
          .ecg-track {
            animation: ecgMove 6s linear infinite;
            will-change: transform;
          }

          @keyframes ecgMove {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-800px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .ecg-track {
              animation: none;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
}