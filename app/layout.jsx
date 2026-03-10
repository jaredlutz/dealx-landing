import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "./globals.css";

export const metadata = {
  title: "DiversyFund | Invest in Real Estate with Expert-Managed Multifamily",
  description: "Invest smarter in expert-managed multifamily real estate with an AI-powered platform. Accredited investors access curated funds for long-term wealth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthKitProvider>{children}</AuthKitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
