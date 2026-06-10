interface HondurasFlagProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function HondurasFlag({ 
  className = "", 
  width = 20, 
  height = 14 
}: HondurasFlagProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 70"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="Bandera de Honduras"
    >
      <defs>
        <linearGradient id="blueStripe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0051BA" />
          <stop offset="100%" stopColor="#003D8F" />
        </linearGradient>
      </defs>
      <rect width="100" height="70" fill="#FFFFFF" />
      <rect width="100" height="23.33" fill="url(#blueStripe)" />
      <rect y="46.67" width="100" height="23.33" fill="url(#blueStripe)" />
      
      <g fill="#0051BA">
        <circle cx="30" cy="35" r="4.5" />
        <circle cx="70" cy="35" r="4.5" />
        <circle cx="50" cy="18.5" r="4.5" />
        <circle cx="50" cy="51.5" r="4.5" />
        <circle cx="50" cy="35" r="4.5" />
      </g>
    </svg>
  );
}