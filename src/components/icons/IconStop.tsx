interface IconStopProps {
  className?: string;
}

export default function IconStop({ className }: IconStopProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 11 11"
      className={className}
    >
      <path stroke="currentColor" d="M.5.5h10v10H.5z" />
    </svg>
  );
}
