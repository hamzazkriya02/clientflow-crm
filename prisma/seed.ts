import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
const days=(n:number)=>new Date(Date.now()+n*86400000); const monthsAgo=(n:number)=>{const d=new Date();d.setMonth(d.getMonth()-n);return d};
async function main(){
 const email="hamzahoon02@gmail.com"; const old=await prisma.user.findUnique({where:{email}}); if(old)await prisma.user.delete({where:{id:old.id}});
 const user=await prisma.user.create({data:{name:"Muhammad Hamza",email,passwordHash:await hash("hamza1122",12),phone:"+92 300 1234567",businessName:"Hamza Digital Studio",businessEmail:"hamzahoon02@gmail.com",businessPhone:"+92 300 1234567",businessAddress:"Multan, Punjab, Pakistan",businessWebsite:"https://example.com"}});
 const clientData=[
  ["Ahmed Raza","Raza Traders","ahmed@razatraders.example","Pakistan","ACTIVE"],["Ayesha Khan","Nexa Creative","ayesha@nexa.example","Pakistan","ACTIVE"],["Usman Ali","Pak Agro Solutions","usman@pakagro.example","Pakistan","POTENTIAL"],["Olivia Bennett","Acme Studio","olivia@acme.example","United States","ACTIVE"],["Noah Williams","Bright Labs","noah@bright.example","Canada","ACTIVE"],["Emma Carter","Mosaic Creative","emma@mosaic.example","United Kingdom","ACTIVE"],["Liam Scott","Orbit Systems","liam@orbit.example","Australia","POTENTIAL"],["Sophia Turner","Harbor & Co","sophia@harbor.example","United States","INACTIVE"]
 ] as const;
 const clients=[] as any[]; for(let i=0;i<clientData.length;i++){const [name,company,email,country,status]=clientData[i];clients.push(await prisma.client.create({data:{userId:user.id,name,company,email,country,status,phone:i<3?`+92 300 555 01${20+i}`:`+1 555 01${20+i}`,website:"https://example.com",notes:"Key account contact. Prefers concise weekly updates.",createdAt:monthsAgo(5-i%5)}}))}
 const leadRows=[
  ["Hassan Ahmed","Vertex Pakistan",12500,"Referral","NEW"],["Fatima Noor","Noor Interiors",8200,"LinkedIn","CONTACTED"],["Bilal Shah","South Punjab Foods",16400,"Website","QUALIFIED"],["Ava Mitchell","PixelPeak",24000,"Partner","PROPOSAL"],["Amelia Wright","Monarch Homes",9700,"LinkedIn","NEGOTIATION"],["Henry Green","Nova Foods",13200,"Referral","WON"],["Isabella Baker","Lumen Works",6800,"Website","LOST"],["Daniel Adams","Gridline",18500,"Cold outreach","QUALIFIED"],["Harper Nelson","Kinship Labs",7600,"Referral","CONTACTED"],["Alexander Hill","Redwood Ops",21500,"Website","PROPOSAL"]
 ] as const;
 for(const [name,company,value,source,stage] of leadRows)await prisma.lead.create({data:{userId:user.id,name,company,estimatedValue:value,source,stage,followUpDate:days(Math.floor(Math.random()*12)+1),email:`${name.toLowerCase().replace(" ",".")}@example.com`}});
 const projects=[] as any[];
 const pRows=[
  ["Raza Traders Website Redesign",0,18500,"IN_PROGRESS",72,18],["Nexa Creative Client Portal",1,26000,"REVIEW",88,7],["Pak Agro Product Platform",2,14000,"PLANNING",25,31],["Bright Labs Growth Dashboard",4,22500,"IN_PROGRESS",54,3],["Orbit Systems Mobile Portal",6,31000,"IN_PROGRESS",43,24],["Harbor & Co Commerce Audit",7,9500,"COMPLETED",100,-8]
 ] as const;
 for(const [name,ci,budget,status,progress,due] of pRows)projects.push(await prisma.project.create({data:{userId:user.id,clientId:clients[ci].id,name,budget,status,progress,startDate:monthsAgo(2),deadline:days(due),description:"A high-visibility client engagement with clearly defined milestones, weekly updates and measurable business outcomes."}}));
 const taskRows=[
  ["Finalize responsive homepage",0,"HIGH","IN_PROGRESS",1],["Review client portal QA feedback",1,"URGENT","TODO",1],["Prepare brand direction workshop",2,"MEDIUM","TODO",5],["Connect analytics event tracking",3,"HIGH","IN_PROGRESS",3],["Design patient onboarding flow",4,"HIGH","TODO",6],["Send weekly client progress update",0,"MEDIUM","TODO",2],["Archive audit deliverables",5,"LOW","COMPLETED",-2],["Validate invoice payment status",1,"MEDIUM","TODO",4],["Write launch handoff documentation",3,"MEDIUM","TODO",7]
 ] as const;
 for(const [title,pi,priority,status,due] of taskRows)await prisma.task.create({data:{userId:user.id,projectId:projects[pi].id,clientId:projects[pi].clientId,title,priority,status,dueDate:days(due),description:"Demo task with realistic ownership and delivery context."}});
 const invoiceRows=[
  ["CF-2026-0001",0,"PAID",6200,monthsAgo(5),days(-120)],["CF-2026-0002",1,"PAID",9800,monthsAgo(4),days(-90)],["CF-2026-0003",2,"PAID",5400,monthsAgo(3),days(-60)],["CF-2026-0004",4,"PAID",11200,monthsAgo(2),days(-30)],["CF-2026-0005",6,"SENT",7600,monthsAgo(1),days(10)],["CF-2026-0006",0,"SENT",4300,new Date(),days(-2)],["CF-2026-0007",7,"DRAFT",3100,new Date(),days(21)]
 ] as const;
 for(const [number,ci,status,total,issue,due] of invoiceRows){const rate=Number(total);await prisma.invoice.create({data:{userId:user.id,clientId:clients[ci].id,invoiceNumber:number,status,issueDate:issue,dueDate:due,subtotal:rate,tax:0,discount:0,total:rate,notes:"Thank you for your business. Payment is due according to the terms above.",items:{create:[{description:"Strategy, design and development services",quantity:1,rate,amount:rate}]}}})}
 const notifications=[
  ["Welcome to ClientFlow","Your demo workspace is loaded with realistic CRM data.","SUCCESS","/dashboard"],["Lead won","Henry Green at Nova Foods moved to Won.","SUCCESS","/dashboard/leads"],["Project deadline approaching","Bright Labs Growth Dashboard is due soon.","WARNING",`/dashboard/projects/${projects[3].id}`],["Task due","Review client portal QA feedback is due shortly.","WARNING","/dashboard/tasks"]
 ] as const;for(const [title,message,type,href] of notifications)await prisma.notification.create({data:{userId:user.id,title,message,type,href}});
 for(const [action,entity,entityId] of [["Created invoice CF-2026-0007","Invoice",null],["Updated Bright Labs Growth Dashboard","Project",projects[3].id],["Won Nova Foods opportunity","Lead",null],["Created client Liam Scott","Client",clients[6].id]] as const)await prisma.activity.create({data:{userId:user.id,action,entity,entityId}});
 console.log("ClientFlow demo seeded: hamzahoon02@gmail.com / hamza1122");
}
main().finally(async()=>prisma.$disconnect());
