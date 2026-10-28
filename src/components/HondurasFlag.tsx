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
      viewBox="0 0 72 36"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="Bandera de Honduras"
      fill="#0d3b99"
    >
      <title>Bandera de Honduras</title>
      <path fill="#fff" d="M0 0h72v36H0z" />
      <path d="M0 0h72v12H0zm0 24h72v12H0z" />
      <g id="g">
        <path id="s" d="M26 13l1.1756 3.618-3.0777-2.236h3.8042l-3.0777 2.236z" />
        <use href="#s" y="6" />
      </g>
      <use href="#s" x="10" y="3" />
      <use href="#g" x="20" />
    </svg>
  );
}