import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatApp",
  description: "A simple chat application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`min-h-full flex flex-col ${inter.className}`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
