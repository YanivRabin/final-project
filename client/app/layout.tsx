"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Navbar from "./components/Navbar";
import "@/styles/global.css"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Fitness</title>
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <div className="content">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
