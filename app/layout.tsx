import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

export const metadata: Metadata = {
  title: "Orbitex | Android, Web & AI Developer — Maharashtra, India",
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
  authors: [{ name: "Orbitex" }],
  creator: "Orbitex",
  metadataBase: new URL("https://satvikrokadeportfolio.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://satvikrokadeportfolio.vercel.app",
    title: "Orbitex | Android, Web & AI Developer",
    description:
      "Freelance developer from Maharashtra, India. Android apps, websites, AI chatbots & dashboards at affordable Indian pricing.",
    siteName: "Orbitex Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbitex | Android, Web & AI Developer",
    description:
      "Freelance developer from Maharashtra, India. Android apps, websites, AI chatbots & dashboards at affordable Indian pricing.",
    creator: "@orbitexind",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
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
        suppressHydrationWarning
        className={`font-sans bg-white dark:bg-[#030712] text-gray-900 dark:text-white antialiased transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
