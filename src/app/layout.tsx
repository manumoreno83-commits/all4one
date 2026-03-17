import type { Metadata, Viewport } from "next";
import AppProvider from "@/components/shared/AppProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALL4ONE Functional Fitness Club",
  description:
    "Training platform — HYROX, DEKA, endurance, mobility & recovery",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ALL4ONE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#223754",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="antialiased">
          <AppProvider>{children}</AppProvider>
        </body>
    </html>
  );
}
