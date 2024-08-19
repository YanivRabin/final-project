"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarStyle = {
    margin: '50px', // Adjust the margin as needed
  };

  return (
    <html lang="en">
      <title>TrAIner</title>
      <body className={inter.className}>
        <Provider store={store}>
          <div style={navbarStyle}>
            <Navbar />
          </div>
          <div className="content">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
