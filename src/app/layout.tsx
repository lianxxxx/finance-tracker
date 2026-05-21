import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/context/ToastContext";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trackrph.vercel.app"),
  title: {
    default: "Trackr — Personal Finance Tracker",
    template: "%s | Trackr",
  },
  description:
    "A simple personal finance and expense tracker built for the Philippines. Log transactions, track accounts, set goals, and see where your money actually goes.",
  applicationName: "Trackr",
  authors: [{ name: "Trackr" }],
  creator: "Trackr",
  keywords: [
    "personal finance tracker",
    "expense tracker",
    "expense tracker Philippines",
    "budget app",
    "money tracker",
    "Trackr",
  ],
  icons: {
    icon: "/favicon2.webp",
  },
  openGraph: {
    type: "website",
    siteName: "Trackr",
    title: "Trackr — Personal Finance Tracker",
    description: "Know where your money actually goes.",
    url: "https://trackrph.vercel.app",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trackr — Personal Finance Tracker",
    description: "Know where your money actually goes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmSerifDisplay.variable} ${geistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
