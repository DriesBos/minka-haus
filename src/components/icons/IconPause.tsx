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
      <path stroke="currentColor" d="M.5.5H4v10H.5zM7 .5h3.5v10H7z" />
    </svg>
  );
}
