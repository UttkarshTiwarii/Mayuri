type LogoProps = {
  onClick?: () => void;
  light?: boolean;
};

export default function Logo({ onClick, light = false }: LogoProps) {
  const teal = light ? "rgba(255,255,255,0.95)" : "#0d7377";
  const tealSoft = light ? "rgba(255,255,255,0.65)" : "#159895";
  const green = light ? "rgba(255,255,255,0.5)" : "#1f7a5a";
  const gold = "#c9a84c";
  const goldSoft = "#e4c46a";
  const stem = light ? "rgba(255,255,255,0.85)" : "#8b6a3d";

  return (
    <a
      href="#"
      className={`logo ${light ? "light" : ""}`}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
      }}
      style={{ textDecoration: "none" }}
    >
      <svg
        className="logo-icon"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* soft background glow */}
        <circle
          cx="22"
          cy="22"
          r="20"
          fill={light ? "rgba(255,255,255,0.12)" : "rgba(13,115,119,0.10)"}
        />

        {/* feather stem */}
        <path
          d="M22 37 C22 31.5 22 27 22 21"
          stroke={stem}
          strokeWidth="2.1"
          strokeLinecap="round"
        />

        {/* outer feather */}
        <path
          d="M22 7
             C30 7, 35 13, 35 19
             C35 27, 28.5 33, 22 33
             C15.5 33, 9 27, 9 19
             C9 13, 14 7, 22 7Z"
          fill={light ? "rgba(255,255,255,0.10)" : "rgba(13,115,119,0.12)"}
          stroke={teal}
          strokeWidth="1.5"
        />

        {/* emerald feather body */}
        <path
          d="M22 9.5
             C28.5 9.5, 32.5 14.2, 32.5 19
             C32.5 25.6, 27 30.5, 22 30.5
             C17 30.5, 11.5 25.6, 11.5 19
             C11.5 14.2, 15.5 9.5, 22 9.5Z"
          fill={light ? "rgba(255,255,255,0.16)" : "rgba(31,122,90,0.22)"}
        />

        {/* feather side strands */}
        <path
          d="M22 10 C26 12 28.8 15.5 29.5 20"
          stroke={green}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M22 10 C18 12 15.2 15.5 14.5 20"
          stroke={green}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M22 12 C27 14 30 18 30.5 23"
          stroke={tealSoft}
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M22 12 C17 14 14 18 13.5 23"
          stroke={tealSoft}
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* eye outer ring */}
        <ellipse
          cx="22"
          cy="17"
          rx="7.4"
          ry="8.4"
          fill={light ? "rgba(255,255,255,0.12)" : "rgba(13,115,119,0.22)"}
          stroke={teal}
          strokeWidth="1.2"
        />

        {/* eye middle ring */}
        <ellipse
          cx="22"
          cy="17"
          rx="4.9"
          ry="5.7"
          fill={gold}
          opacity="0.92"
        />

        {/* eye center */}
        <ellipse
          cx="22"
          cy="17"
          rx="2.45"
          ry="2.9"
          fill={light ? "rgba(255,255,255,0.95)" : teal}
        />

        {/* eye highlight */}
        <circle cx="22.9" cy="15.9" r="0.7" fill={goldSoft} opacity="0.95" />
      </svg>

      <div className="logo-copy">
        <span className="logo-text">MAYURI</span>
        <span className="logo-sub">Luxury Women's Fashion</span>
      </div>
    </a>
  );
}