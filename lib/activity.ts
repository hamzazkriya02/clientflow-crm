import { prisma } from "@/lib/prisma";
export async function logActivity(userId: string, action: string, entity: string, entityId?: string, meta?: Record<string, unknown>) {
  await prisma.activity.create({ data: { userId, action, entity, entityId, meta: meta ?? undefined } });
}
export async function notify(userId: string, title: string, message: string, href?: string, type: "INFO"|"SUCCESS"|"WARNING"|"DANGER" = "INFO") {
  await prisma.notification.create({ data: { userId, title, message, href, type } });
}
