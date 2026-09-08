import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "奇门决策实验室", description: "用奇门、六爻与大六壬，辅助你看清局势、时机与行动方向" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className="paper-grain">{children}</body></html>;
}
