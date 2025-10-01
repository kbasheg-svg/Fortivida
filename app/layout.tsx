import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fortivida — Strength for Life",
  description:
    "Reset, focus, and grow in 8 minutes a day with science-backed rituals, real-time triage coaching with Celeste, and clear dashboards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-white text-gray-800"}>
        {children}
      </body>
    </html>
  );
}
