import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akmaljon Kadirov - Frontend Developer",
  description:
    "Frontend Junior+ ReactJS developer with 1+ years of experience building modern, responsive web applications.",
  icons: {
    icon: "/logoIcon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${poppins.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
            storageKey="portfolio-theme"
          >
            {children}
            <Toaster
              position="top-left"
              offset="32px"
              closeButton={false}
              expand={false}
              richColors={false}
              toastOptions={{
                duration: 4500,
                style: {
                  background: "rgba(20, 20, 20, 0.65)",
                  color: "#ffffff",
                  border: "1px solid rgba(60, 60, 60, 0.5)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: "14px",
                  fontSize: "500 15px system-ui, sans-serif",
                  boxShadow: "2px 2px 8px rgba(250, 250, 250, 0.111)",
                },
                classNames: {
                  success: "border-emerald-500/30 bg-emerald-500/10",
                  error: "border-red-500/30 bg-red-500/10",
                  toast: "animate-in slide-in-from-left-4 duration-500",
                },
              }}
            />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
