import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Official Website of Abdul Malik Fareed | Vloger - Youtuber - Influencer",
  description:
    "Exploring food, travel, people, and cinematic experiences through authentic storytelling and modern content creation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="font-poppins bg-black text-white antialiased selection:bg-[#31B88B] selection:text-black">
        {children}
      </body>
    </html>
  );
}
