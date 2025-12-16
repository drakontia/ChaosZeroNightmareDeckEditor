import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "カオスゼロナイトメア デッキエディター",
  description: "ゲーム「カオスゼロナイトメア」のカードデッキを作成・保存出来る攻略補助サイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
