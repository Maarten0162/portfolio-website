// app/fonts.ts
import localFont from "next/font/local";

export const DOSFONT = localFont({
  src: "./fonts/perfect-dos-vga-437.woff2", // relative to this file
  display: "swap",
  weight: "400",
  variable: "--font-dos", // optional if you want to use CSS variable
});
