import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "./global.css";
import "normalize.css";
import clsx from "clsx";

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
      <body
        className={clsx(
          `${mitr.className}`,
          "bg-brown-600 text-gray-100 flex flex-col h-dvh items-center justify-center gap-4 max-w-screen-sm m-auto"
        )}
      >
        {children}
      </body>
    </html>
  );
}
