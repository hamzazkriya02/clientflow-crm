"use client";
import { useMemo,useState } from "react";import { useRouter } from "next/navigation";import Link from "next/link";import { Plus,Search,Trash2,X } from "lucide-react";import { formatDate } from "@/lib/utils";
type Client={id:string;name:string;company:string|null;email:string|null;phone:string|null;country:string|null;address:string|null;website:string|null;status:"ACTIVE"|"POTENTIAL"|"INACTIVE";notes:string|null;createdAt:string|Date};
export function ClientManager({initial,openNew=false}:{initial:Client[];openNew?:boolean}){const router=useRouter();const[items,setItems]=useState(initial);const[q,setQ]=useState("");const[status,setStatus]=useState("ALL");const[open,setOpen]=useState(openNew);const[busy,setBusy]=useState(false);const filtered=useMemo(()=>items.filter(c=>(status==="ALL"||c.status===status)&&`${c.name} ${c.company||""} ${c.email||""}`.toLowerCase().includes(q.toLowerCase())),[items,q,status]);async function create(fd:FormData){setBusy(true);const body=Object.fromEntries(fd);const res=await fetch("/api/clients",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)});const j=await res.json();setBusy(false);if(res.ok){setItems([j.item,...items]);setOpen(false);router.refresh()}else alert(j.error||"Could not create client")};async function del(id:string,name:string){if(!confirm(`Delete ${name}? Related records may block deletion.`))return;const res=await fetch(`/api/clients/${id}`,{method:"DELETE"});if(res.ok){setItems(items.filter(x=>x.id!==id));router.refresh()}else alert("Could not delete client. Remove restricted invoice relationships first.")}
return <><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"><div className="relative w-full sm:w-80 sm:flex-none"><Search
  size={17}
  className="pointer-events-none absolute left-3 top-1/2 z-20 -translate-y-1/2 text-slate-400"
/>

<input
  id="client-search-real"
  value={q}
  onChange={e=>setQ(e.target.value)}
  placeholder={q ? "" : "Search clients..."}
  className="h-11 w-full rounded-xl border border-slate-200 bg-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900"
  style={{
    paddingLeft: "40px",
    paddingRight: "14px",
    color: "transparent",
    caretColor: "#4f46e5"
  }}
/>

{q && (
  <div
    className="pointer-events-none absolute inset-y-0 left-10 right-3 z-10 flex items-center overflow-hidden whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white"
  >
    {q}
  </div>
)}</div><select className="input w-full sm:w-44" value={status} onChange={e=>setStatus(e.target.value)}><option value="ALL">All statuses</option><option value="ACTIVE">Active</option><option value="POTENTIAL">Potential</option><option value="INACTIVE">Inactive</option></select></div><button onClick={()=>setOpen(true)} className="btn-primary"><Plus size={17}/>Add Client</button></div><div className="table-wrap mt-5"><table><thead><tr><th>Client</th><th>Status</th><th>Contact</th><th>Country</th><th>Created</th><th></th></tr></thead><tbody>{filtered.map(c=><tr key={c.id}><td><Link href={`/dashboard/clients/${c.id}`} className="font-extrabold hover:text-indigo-600">{c.name}</Link><div className="text-xs text-slate-500">{c.company||"Independent"}</div></td><td><Status s={c.status}/></td><td><div>{c.email||"â€”"}</div><div className="text-xs text-slate-500">{c.phone||""}</div></td><td>{c.country||"â€”"}</td><td>{formatDate(c.createdAt)}</td><td><button onClick={()=>del(c.id,c.name)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={16}/></button></td></tr>)}{!filtered.length&&<tr><td colSpan={6}><div className="py-16 text-center text-slate-400">No clients match this view.</div></td></tr>}</tbody></table></div>{open&&<div className="fixed inset-0 z-[70] grid place-items-center overflow-auto bg-slate-950/50 p-4 backdrop-blur-sm"><div className="card w-full max-w-2xl p-6"><div className="flex items-center justify-between"><div><h2 className="text-xl font-black">Add a new client</h2><p className="text-sm text-slate-500">Create a client record and connect work later.</p></div><button onClick={()=>setOpen(false)}><X/></button></div><form action={create} className="mt-6 grid gap-4 sm:grid-cols-2"><Field n="name" l="Client name" req/><Field n="company" l="Company"/><Field n="email" l="Email" type="email"/><Field n="phone" l="Phone"/><Field n="country" l="Country"/><Field n="website" l="Website"/><label><span className="label">Status</span><select name="status" className="input"><option value="POTENTIAL">Potential</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></label><Field n="address" l="Address"/><label className="sm:col-span-2"><span className="label">Notes</span><textarea className="input min-h-24" name="notes"/></label><div className="flex justify-end gap-2 sm:col-span-2"><button type="button" className="btn-secondary" onClick={()=>setOpen(false)}>Cancel</button><button disabled={busy} className="btn-primary">{busy?"Savingâ€¦":"Create Client"}</button></div></form></div></div>}</>}
function Field({n,l,type="text",req=false}:{n:string;l:string;type?:string;req?:boolean}){return <label><span className="label">{l}</span><input className="input" name={n} type={type} required={req}/></label>};function Status({s}:{s:string}){const c=s==="ACTIVE"?"bg-emerald-50 text-emerald-700":s==="POTENTIAL"?"bg-amber-50 text-amber-700":"bg-slate-100 text-slate-600";return <span className={`badge ${c}`}>{s}</span>}






