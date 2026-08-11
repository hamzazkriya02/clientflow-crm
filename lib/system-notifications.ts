import { prisma } from "@/lib/prisma";
export async function syncSystemNotifications(userId:string){
 const now=new Date(); const in3=new Date(now.getTime()+3*86400000); const in1=new Date(now.getTime()+86400000);
 const overdue=await prisma.invoice.findMany({where:{userId,status:"SENT",dueDate:{lt:now}},select:{id:true,invoiceNumber:true}});
 for(const i of overdue){await prisma.invoice.update({where:{id:i.id},data:{status:"OVERDUE"}});const href=`/dashboard/invoices/${i.id}`;const exists=await prisma.notification.findFirst({where:{userId,title:"Invoice overdue",href}});if(!exists)await prisma.notification.create({data:{userId,title:"Invoice overdue",message:`${i.invoiceNumber} is past its due date.`,type:"DANGER",href}})}
 const projects=await prisma.project.findMany({where:{userId,status:{not:"COMPLETED"},deadline:{gte:now,lte:in3}},select:{id:true,name:true,deadline:true}});
 for(const p of projects){const href=`/dashboard/projects/${p.id}`;const exists=await prisma.notification.findFirst({where:{userId,title:"Project deadline approaching",href}});if(!exists)await prisma.notification.create({data:{userId,title:"Project deadline approaching",message:`${p.name} is due within the next three days.`,type:"WARNING",href}})}
 const tasks=await prisma.task.findMany({where:{userId,status:{not:"COMPLETED"},dueDate:{gte:now,lte:in1}},select:{id:true,title:true}});
 for(const t of tasks){const href="/dashboard/tasks";const message=`${t.title} is due within 24 hours.`;const exists=await prisma.notification.findFirst({where:{userId,title:"Task due",message}});if(!exists)await prisma.notification.create({data:{userId,title:"Task due",message,type:"WARNING",href}})}
}
