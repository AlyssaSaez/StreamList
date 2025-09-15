export default function LogoSVG({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent-2)"/>
          <stop offset="1" stopColor="var(--accent)"/>
        </linearGradient>
      </defs>
      <rect x="6" y="20" width="52" height="34" rx="6" fill="rgba(0,0,0,.35)" stroke="url(#g)" strokeWidth="2"/>
      <path d="M10 24 L54 24" stroke="url(#g)" strokeWidth="2" opacity=".6"/>
      <path d="M14 14 L48 20 L43 28 L9 22 Z" fill="url(#g)" opacity=".9"/>
      <circle cx="49" cy="40" r="3" fill="var(--accent-2)"/>
    </svg>
  );
}
