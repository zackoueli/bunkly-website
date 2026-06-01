export function BunklyLogo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="#f97316" />
        <path
          d="M9 8h7.5c2 0 3.5.5 4.5 1.5S22.5 12 22.5 13.5c0 1-.3 1.8-.9 2.5-.4.4-.9.8-1.6 1 .9.2 1.6.7 2.2 1.3.7.8 1 1.8 1 3C23.2 23 21.3 24 18 24H9V8zm3 7h4c.8 0 1.4-.2 1.8-.5.4-.4.7-.9.7-1.5s-.2-1.1-.6-1.5c-.4-.4-1-.5-1.8-.5H12v4zm0 6.5h4.5c.9 0 1.6-.2 2.1-.6.5-.4.7-1 .7-1.7 0-.8-.3-1.3-.8-1.7-.5-.4-1.2-.5-2.1-.5H12v4.5z"
          fill="white"
        />
      </svg>
      <span className="text-[18px] font-semibold tracking-tight text-zinc-900">
        Bunkly
      </span>
    </div>
  );
}
