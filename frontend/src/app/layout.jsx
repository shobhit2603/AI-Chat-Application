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
  const themeScript = `
    (() => {
      const storedTheme = localStorage.getItem("aura-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = storedTheme || (prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", theme === "dark");
    })();
  `;

  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
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
