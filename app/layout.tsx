import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OrbitexInd | Android, Web & AI Developer — Maharashtra, India",
  description:
    "Freelance developer from Maharashtra, India. I build Android apps, modern websites, AI chatbots & data dashboards at affordable Indian pricing. Fast delivery, clean code.",
  keywords: [
    "android developer india",
    "freelance developer maharashtra",
    "web developer india",
    "ai chatbot developer",
    "python developer",
    "full-stack developer india",
    "affordable app development",
    "flutter developer",
    "orbitexind",
  ],
  authors: [{ name: "OrbitexInd" }],
  creator: "OrbitexInd",
  metadataBase: new URL("https://satvikrokadeportfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://satvikrokadeportfolio.vercel.app",
    title: "OrbitexInd | Android, Web & AI Developer",
    description:
      "Freelance developer from Maharashtra, India. Android apps, websites, AI chatbots & dashboards at affordable Indian pricing.",
    siteName: "OrbitexInd Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "OrbitexInd | Android, Web & AI Developer",
    description:
      "Freelance developer from Maharashtra, India. Android apps, websites, AI chatbots & dashboards at affordable Indian pricing.",
    creator: "@orbitexind",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-white dark:bg-[#030712] text-gray-900 dark:text-white antialiased transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
