import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Little Birthday Surprise",
  description: "Interactive birthday wishes, a note, and a make-a-wish celebration.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
