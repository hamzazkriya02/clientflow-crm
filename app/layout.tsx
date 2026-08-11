import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ClientFlow — CRM for modern teams", template: "%s | ClientFlow" },
  description: "A modern SaaS CRM for clients, leads, projects, tasks and invoices.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
