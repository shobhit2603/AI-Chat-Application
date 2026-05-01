import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/provider";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aura.ai - Gen AI Chat Application",
  description: "A modern AI chat application built with Next.js — chat, learn, and explore.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`min-h-full flex flex-col ${inter.className}`}>
        <ReduxProvider>
          <AuthGuard>
            {children}
          </AuthGuard>
        </ReduxProvider>
      </body>
    </html>
  );
}
