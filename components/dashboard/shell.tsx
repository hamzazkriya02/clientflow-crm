"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { GlobalSearch } from "./global-search";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { Bell } from "lucide-react";
import { initials } from "@/lib/utils";

export function DashboardShell({children,user,unread,logout}:{children:React.ReactNode;user:{name?:string|null;email?:string|null};unread:number;logout:()=>void}){
 const [open,setOpen]=useState(false);
 return <div className="min-h-screen"><Sidebar open={open} onClose={()=>setOpen(false)} userName={user.name||"ClientFlow User"} logout={logout}/><div className="md:pl-72"><header className="sticky top-0 z-30 flex h-18 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl md:px-7 dark:border-slate-800 dark:bg-[#0b1220]/95"><button className="btn-secondary px-2.5 md:hidden" onClick={()=>setOpen(true)}><Menu size={20}/></button><GlobalSearch/><div className="ml-auto flex items-center gap-2"><ThemeToggle/><Link href="/dashboard/notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"><Bell size={18}/>{unread>0&&<span className="absolute -right-1 -top-1 z-20 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white shadow-sm ring-2 ring-white dark:ring-slate-950">{unread}</span>}</Link><Link href="/dashboard/settings" className="grid h-10 w-10 place-items-center rounded-full bg-indigo-600 text-sm font-black text-white shadow-sm ring-2 ring-indigo-100 transition hover:bg-indigo-700 dark:ring-indigo-950">{initials(user.name)}</Link></div></header><main className="p-4 md:p-7">{children}</main></div></div>
}


