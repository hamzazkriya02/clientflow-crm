"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, BriefcaseBusiness, ContactRound, FileText, Gauge, KanbanSquare, ListTodo, LogOut, Settings, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const items = [
  ["Overview","/dashboard",Gauge],["Clients","/dashboard/clients",ContactRound],["Leads","/dashboard/leads",KanbanSquare],["Projects","/dashboard/projects",BriefcaseBusiness],["Tasks","/dashboard/tasks",ListTodo],["Invoices","/dashboard/invoices",FileText],["Analytics","/dashboard/analytics",BarChart3],["Notifications","/dashboard/notifications",Bell],["Settings","/dashboard/settings",Settings],
] as const;
export function Sidebar({open,onClose,userName,logout}: {open:boolean;onClose:()=>void;userName:string;logout:()=>void}) {
  const path=usePathname();
  return <><div onClick={onClose} className={cn("fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm md:hidden",open?"block":"hidden")}/><aside className={cn("fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 px-4 py-5 text-slate-300 transition-transform md:translate-x-0",open?"translate-x-0":"-translate-x-full")}><div className="flex items-center justify-between px-2"><div className="text-white"><Logo href="/dashboard"/></div><button className="md:hidden" onClick={onClose}><X/></button></div><nav className="mt-8 flex-1 space-y-1">{items.map(([label,href,Icon])=>{const active=href==="/dashboard"?path===href:path.startsWith(href);return <Link onClick={onClose} key={href} href={href} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",active?"bg-indigo-600 text-white shadow-lg shadow-indigo-950/40":"hover:bg-white/5 hover:text-white")}><Icon size={18}/>{label}</Link>})}</nav><div className="border-t border-white/10 pt-4"><div className="mb-3 px-3 text-xs text-slate-500">Signed in as</div><div className="px-3 text-sm font-bold text-white">{userName}</div><form action={logout}><button className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-white/5 hover:text-white"><LogOut size={18}/>Logout</button></form></div></aside></>;
}
