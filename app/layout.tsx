import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavigationBar/NavBar";
import { ProgressBarLayout } from "@/components/Common/process-bar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>CV Website</title>
      <body className="bg-sky-200">
        <NavBar />
        <ProgressBarLayout>
          {children}
        </ProgressBarLayout>
        <Footer/>
      </body>
    </html>
  );
}
