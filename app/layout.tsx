// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Unit Conversion Game',
  description: 'Farcaster Unit Conversion Game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
