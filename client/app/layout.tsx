"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Navbar from "./components/Navbar"

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
        <Navbar/>
        <Provider store={store}>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
