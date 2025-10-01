import './globals.css';

export const metadata = {
  title: 'Fortivida',
  description: 'Strength for Life',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
