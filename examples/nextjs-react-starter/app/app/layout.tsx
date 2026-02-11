import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NextJS React Starter - PDD Example',
  description: 'A NextJS 16 + React 19 starter built with Prompt-Driven Development',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
