import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const parsed = z.object({ email: z.string().email(), password: z.string().min(6) }).safeParse(credentials);
        if (!parsed.success) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
        if (!user || !(await compare(parsed.data.password, user.passwordHash))) return null;
        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) { if (user?.id) token.id = user.id; return token; },
    session({ session, token }) { if (session.user) session.user.id = token.id as string; return session; },
  },
});
