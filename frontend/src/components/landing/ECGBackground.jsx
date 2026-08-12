export default function ECGBackground() {
    return (
        <div
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            aria-hidden="true"
        >
            <svg
                className="absolute left-0 top-1/2 h-[320px] w-full -translate-y-1/2"
                viewBox="0 0 1600 260"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Pink → purple → blue */}
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

                    {/* Soft wide glow */}
                    <filter
                        id="ecgGlowStrong"
                        x="-50%"
                        y="-150%"
                        width="200%"
                        height="400%"
                    >
                        <feGaussianBlur stdDeviation="10" />
                    </filter>

                    {/* Main sharp glow */}
                    <filter
                        id="ecgGlow"
                        x="-50%"
                        y="-150%"
                        width="200%"
                        height="400%"
                    >
                        <feGaussianBlur stdDeviation="4" result="blur" />

                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* ONE complete heartbeat pattern */}
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

                {/* =====================================================
            CONTINUOUS ECG
            3 identical heartbeat patterns.
            
            The patterns are exactly 800 units apart.
            Animation moves exactly -800 units.
            
            That means when one heartbeat leaves,
            the next heartbeat is already in exactly
            the same position.
            
            NO gaps.
            NO jumps.
            NO duplicate center pulse.
        ====================================================== */}

                <g className="ecg-track">
                    {/* Soft glow — 3 repeating waves */}
                    <g
                        opacity="0.22"
                        filter="url(#ecgGlowStrong)"
                        strokeWidth="10"
                    >
                        <use href="#heartbeat" x="0" />
                        <use href="#heartbeat" x="800" />
                        <use href="#heartbeat" x="1600" />
                    </g>

                    {/* Main ECG — 3 repeating waves */}
                    <g
                        opacity="0.95"
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
          /*
            RIGHT → LEFT

            One complete heartbeat occupies 800 units.
            We move exactly 800 units so the animation
            loops perfectly without a visible jump.
          */

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