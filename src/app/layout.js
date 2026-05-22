import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";
import DynamicTitle from "@/components/DynamicTitle";
import { Toaster } from "react-hot-toast";
import { MainNavbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediQueue – Tutor Booking System",
  description: "Elite medical academic tutoring and clinical specialist consultations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#FAF9F6] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200 transition-colors duration-200">
        <ThemeProvider>
          <DynamicTitle />
          <Toaster position="top-right" reverseOrder={false} />
          <MainNavbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
