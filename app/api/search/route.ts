import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest){
 const session=await auth(); if(!session?.user?.id) return NextResponse.json({results:[]},{status:401});
 const q=req.nextUrl.searchParams.get("q")?.trim()||""; if(q.length<2)return NextResponse.json({results:[]});
 const userId=session.user.id;
 const [clients,leads,projects,tasks,invoices]=await Promise.all([
  prisma.client.findMany({where:{userId,OR:[{name:{contains:q,mode:"insensitive"}},{company:{contains:q,mode:"insensitive"}},{email:{contains:q,mode:"insensitive"}}]},take:4}),
  prisma.lead.findMany({where:{userId,OR:[{name:{contains:q,mode:"insensitive"}},{company:{contains:q,mode:"insensitive"}}]},take:4}),
  prisma.project.findMany({where:{userId,name:{contains:q,mode:"insensitive"}},take:4}),
  prisma.task.findMany({where:{userId,title:{contains:q,mode:"insensitive"}},take:4}),
  prisma.invoice.findMany({where:{userId,invoiceNumber:{contains:q,mode:"insensitive"}},include:{client:true},take:4}),
 ]);
 const results=[
  ...clients.map(x=>({id:x.id,type:"Client",title:x.name,subtitle:x.company||x.email||"Client",href:`/dashboard/clients/${x.id}`})),
  ...leads.map(x=>({id:x.id,type:"Lead",title:x.name,subtitle:x.company||x.stage,href:"/dashboard/leads"})),
  ...projects.map(x=>({id:x.id,type:"Project",title:x.name,subtitle:x.status.replaceAll("_"," "),href:`/dashboard/projects/${x.id}`})),
  ...tasks.map(x=>({id:x.id,type:"Task",title:x.title,subtitle:x.status.replaceAll("_"," "),href:"/dashboard/tasks"})),
  ...invoices.map(x=>({id:x.id,type:"Invoice",title:x.invoiceNumber,subtitle:x.client.name,href:`/dashboard/invoices/${x.id}`})),
 ].slice(0,12);
 return NextResponse.json({results});
}
