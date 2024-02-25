import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "./global.css";
import "normalize.css";

const mitr = Mitr({ subsets: ["latin"], weight: ["600", "400"] });

export const metadata: Metadata = {
  title: "Termo",
  description: "Clone do termo feito por Thiago Tolotti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${mitr.className}`}>{children}</body>
    </html>
  );
}
