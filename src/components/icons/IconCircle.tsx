interface IconCircleProps {
  className?: string;
  size?: number;
  onClick?: () => void;
}

export default function IconCircle({
  className,
  size = 11,
  onClick,
}: IconCircleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 11 11"
      className={className}
      width={size}
      height={size}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <circle cx="5.5" cy="5.5" r="5" stroke="currentColor" />
    </svg>
  );
}
