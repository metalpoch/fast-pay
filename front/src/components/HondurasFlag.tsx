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
    <img
      src="https://flagcdn.com/w20/hn.png"
      alt="Bandera de Honduras"
      width={width}
      height={height}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}