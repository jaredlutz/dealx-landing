import "./globals.css";

export const metadata = {
  title: "DealX | Institutional Fixed Income",
  description: "Private-market fixed income engineered with institutional discipline and operator-level execution.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
