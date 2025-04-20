"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <div className="flex min-h-screen">
            <div className="w-[60px] max-md:hidden">
              <div className="fixed w-[60px] h-screen">
                <Sidebar />
              </div>
            </div>
            <div className="flex-1 w-full px-4 overflow-auto">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
