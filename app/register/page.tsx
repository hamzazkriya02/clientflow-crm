import Link from "next/link";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Logo } from "@/components/logo";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  async function register(formData: FormData) {
    "use server";
    const name = String(formData.get("name")||"").trim(); const email=String(formData.get("email")||"").trim().toLowerCase(); const password=String(formData.get("password")||"");
    if(name.length<2 || !email.includes("@") || password.length<8) redirect("/register?error=Please%20enter%20valid%20details%20and%20an%208-character%20password");
    const exists=await prisma.user.findUnique({where:{email}}); if(exists) redirect("/register?error=An%20account%20with%20this%20email%20already%20exists");
    const user=await prisma.user.create({data:{name,email,passwordHash:await hash(password,12),businessName:`${name}'s Workspace`}});
    await prisma.notification.create({data:{userId:user.id,title:"Welcome to ClientFlow",message:"Your workspace is ready. Add your first client or explore the demo workflow.",type:"SUCCESS",href:"/dashboard/clients"}});
    redirect("/login?error=Account%20created.%20Please%20sign%20in.");
  }
  return <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eef2ff,white_50%)] px-6 py-12"><div className="mx-auto max-w-md"><div className="text-center"><Logo/></div><div className="card mt-10 p-7 sm:p-9"><p className="text-sm font-black uppercase tracking-[.2em] text-indigo-600">Start free</p><h1 className="mt-2 text-3xl font-black">Create your workspace</h1><p className="mt-2 text-sm text-slate-500">Get your client operations organized in minutes.</p>{params.error&&<div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">{params.error}</div>}<form action={register} className="mt-7 space-y-5"><label><span className="label">Full name</span><input className="input" name="name" required/></label><label><span className="label">Work email</span><input className="input" name="email" type="email" required/></label><label><span className="label">Password</span><input className="input" name="password" type="password" minLength={8} required/><span className="mt-1 block text-xs text-slate-400">Use at least 8 characters.</span></label><button className="btn-primary w-full py-3">Create Account</button></form><p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link className="font-bold text-indigo-600" href="/login">Sign in</Link></p></div></div></main>;
}
