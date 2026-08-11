import Link from "next/link";
export function Logo({ href="/" }: { href?: string }) {
  return <Link href={href} className="inline-flex items-center gap-2.5 font-extrabold tracking-tight text-lg" aria-label="ClientFlow home">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-[11px] font-black tracking-[-.08em] text-white shadow-sm">CF</span>
    <span>Client<span className="text-indigo-600">Flow</span></span>
  </Link>;
}
