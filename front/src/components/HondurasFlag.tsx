interface HondurasFlagProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function HondurasFlag({ 
  className = "", 
  width = "1em", 
  height = "1em" 
}: HondurasFlagProps) {
  return (
    <svg
      viewBox="0 0 3 2"
      width={width}
      height={height}
      className={className}
      aria-label="Bandera de Honduras"
      role="img"
    >
      <defs>
        <linearGradient id="honduras-blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0051BA" />
          <stop offset="100%" stopColor="#003380" />
        </linearGradient>
      </defs>
      <rect width="3" height="2" fill="url(#honduras-blue)" />
      <rect x="1" y="0" width="1" height="2" fill="white" />
      <g fill="#0051BA">
        <circle cx="1.5" cy="0.5" r="0.12" />
        <circle cx="1.1" cy="0.85" r="0.12" />
        <circle cx="1.9" cy="0.85" r="0.12" />
        <circle cx="1.3" cy="1.2" r="0.12" />
        <circle cx="1.7" cy="1.2" r="0.12" />
      </g>
    </svg>
  );
}