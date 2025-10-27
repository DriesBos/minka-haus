interface IconStopProps {
  className?: string;
  size?: number;
}

export default function IconStop({ className, size = 11 }: IconStopProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 11 11"
      className={className}
      width={size}
      height={size}
    >
      <path stroke="currentColor" d="M1.5 1.5h8v8h-8z" />
    </svg>
  );
}
