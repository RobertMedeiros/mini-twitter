import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import Footer from "./ui/footer";
import "./globals.css";
import Providers from "./providers";

const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Twitter",
  description: "Mini Twitter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.theme === 'dark') {
                document.documentElement.classList.add('dark')
              }
            `,
          }}
        />
      </head>
      <body
        className={`${josefin.className} antialiased`}
      >
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
