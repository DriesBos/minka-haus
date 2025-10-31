interface IconExitProps {
  className?: string;
}

export default function IconExit({ className }: IconExitProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="11"
      fill="none"
      className={className}
    >
      <g stroke="currentColor" clip-path="url(#a)">
        <path d="M6.5 1v4.5M2 .5h5M7 0 2 5" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="currentColor" d="M0 0h7v11H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
