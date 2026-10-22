import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Қундузхон Абдуллаева - Теле ва Радио бошловчи | Нотиқлик эксперти",
  description: "Қундузхон Абдуллаева - 15 йиллик тажрибага эга теле ва радио бошловчи, нотиқлик санъати бўйича эксперт.",
  keywords: ["Қундузхон", "Абдуллаева", "телебошловчи", "радио", "нотиқлик", "оммавий нутқ", "Ўзбекистон"],
  authors: [{ name: "Қундузхон Абдуллаева" }],
  openGraph: {
    title: "Қундузхон Абдуллаева - Теле ва Радио бошловчи | Нотиқлик эксперти",
    description: "15 йиллик тажрибага эга теле ва радио бошловчи, нотиқлик санъати бўйича эксперт.",
    url: "https://qunduzxon.uz",
    siteName: "Қундузхон Абдуллаева",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
