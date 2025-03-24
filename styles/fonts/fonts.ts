import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const avenirNext = localFont({
  src: [
    {
      path: "../../public/fonts/Avenir Next/Avenir-next-lt-pro/AvenirNextLTPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Avenir Next/Avenir-next-lt-pro/AvenirNextLTPro-Bold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-avenirNext",
});
