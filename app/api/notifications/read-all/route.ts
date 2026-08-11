import { NextResponse } from "next/server";import { auth } from "@/auth";import { prisma } from "@/lib/prisma";
export async function POST(){const s=await auth();if(!s?.user?.id)return NextResponse.json({error:"Unauthorized"},{status:401});await prisma.notification.updateMany({where:{userId:s.user.id,read:false},data:{read:true}});return NextResponse.json({ok:true})}
