import type { Metadata } from "next";
import "./globals.css";
import { DOSFONT } from "./fonts";

export const metadata: Metadata = {
  title: "Terminal Portfolio",
  description: "Maarten van den Berg's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${DOSFONT.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
