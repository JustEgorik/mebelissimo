import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/components/CartProvider";
import { LangProvider } from "@/components/LangProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Mebelissimo — мебель на заказ в Молдове",
  description:
    "Кровати, детские кровати и диваны на заказ. Индивидуально, качественно, стильно.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${playfair.variable} ${manrope.variable}`}>
      <body>
        <LangProvider>
          <CartProvider>{children}</CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}
