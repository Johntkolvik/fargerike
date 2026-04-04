import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logg inn",
  robots: "noindex",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
