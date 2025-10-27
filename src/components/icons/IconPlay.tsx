interface IconPlayProps {
  className?: string;
  size?: number;
}

export default function IconPlay({ className, size = 11 }: IconPlayProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 11 11"
      className={className}
      width={size}
      height={size}
    >
      <path stroke="currentColor" d="m9.465 5.5-7.988 4.612V.889z" />
    </svg>
  );
}
