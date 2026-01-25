import type { Metadata } from "next";
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const t = useTranslations()
export const metadata: Metadata = {
  title: t('app.title'),
  description: t('app.description'),
  keywords: ['カオスゼロナイトメア', 'カオゼロ', 'Chaos Zero Nightmare', 'Deck Builder', 'デッキビルダー', 'ローグライク', 'Roguelike', 'カードゲーム', 'Card Game' ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
