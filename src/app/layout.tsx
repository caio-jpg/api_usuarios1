import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'API typescript',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <head>
                {/* Nenhuma referência a favicon */}
            </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}

 