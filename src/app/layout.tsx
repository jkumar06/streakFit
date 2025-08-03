import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StreakFit - Track Your Workout Consistency",
  description: "Build lasting fitness habits with StreakFit. Track your workout consistency, maintain streaks, and achieve your fitness goals with our intuitive workout tracker.",
  keywords: "workout tracker, fitness app, exercise consistency, workout streak, fitness goals",
  authors: [{ name: "StreakFit Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
