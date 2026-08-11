import Link from "next/link";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { Logo } from "@/components/logo";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string; demo?: string }> }) {
  const params = await searchParams;
  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirectTo: "/dashboard" });
    } catch (error) {
      if (error instanceof AuthError) redirect("/login?error=Invalid%20email%20or%20password");
      throw error;
    }
  }
  return <main className="grid min-h-screen bg-white lg:grid-cols-2"><section className="flex items-center justify-center px-6 py-12"><div className="w-full max-w-md"><Logo/><div className="mt-12"><p className="text-sm font-black uppercase tracking-[.2em] text-indigo-600">Welcome back</p><h1 className="mt-2 text-4xl font-black tracking-tight">Sign in to ClientFlow</h1><p className="mt-3 text-slate-500">Continue managing your clients, projects and revenue.</p></div>{params.error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{params.error}</div>}{params.demo && <div className="mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-800"><b>Demo:</b> hamzahoon02@gmail.com / hamza1122</div>}<form action={login} className="mt-8 space-y-5"><label><span className="label">Email address</span><input className="input" name="email" type="email" defaultValue={params.demo?"hamzahoon02@gmail.com":""} required/></label><label><span className="label">Password</span><input className="input" name="password" type="password" defaultValue={params.demo?"hamza1122":""} required/></label><div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2 text-slate-500"><input type="checkbox"/> Remember me</label><Link href="/forgot-password" className="font-bold text-indigo-600">Forgot password?</Link></div><button className="btn-primary w-full py-3" type="submit">Sign In</button></form><p className="mt-7 text-center text-sm text-slate-500">New to ClientFlow? <Link href="/register" className="font-bold text-indigo-600">Create an account</Link></p></div></section><section className="hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between"><div className="max-w-xl"><p className="text-sm font-black uppercase tracking-[.2em] text-indigo-300">Your client operating system</p><h2 className="mt-5 text-5xl font-black leading-tight">Keep every deal, deadline and dollar in view.</h2><p className="mt-5 text-lg leading-8 text-slate-300">A clean CRM workspace for the whole client lifecycle—without the clutter of enterprise software.</p></div><div className="grid grid-cols-2 gap-4">{["Sales pipeline","Project delivery","Smart invoices","Business analytics"].map(x=><div className="rounded-2xl border border-white/10 bg-white/5 p-5 font-bold" key={x}>{x}</div>)}</div></section></main>;
}
