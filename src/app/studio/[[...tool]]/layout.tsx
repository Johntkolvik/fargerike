import type { Metadata } from "next";
export { viewport } from "next-sanity/studio";

export const metadata: Metadata = {
  title: "Sanity Studio | Fargerike",
  robots: "noindex, nofollow",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="sanity" style={{ height: "100vh" }}>
      {children}
    </div>
  );
}
