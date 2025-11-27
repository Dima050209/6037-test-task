import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "6037 test task by Dmytro Kharchenko",
  description: "Test task for 6037 by Dmytro Kharchenko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
