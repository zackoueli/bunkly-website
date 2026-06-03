import Image from "next/image";

export function BunklyLogo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/Logo.png"
        alt="Bunkly logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
      <span className="text-[18px] font-semibold tracking-tight text-zinc-900">
        Bunkly
      </span>
    </div>
  );
}
