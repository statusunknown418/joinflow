import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { authOptions } from "./api/auth/[...nextauth]/route";

/**
 * Font options:
 * Nunito
 * Poppins
 * Montserrat
 * Raleway
 */

const raleway = Montserrat({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/* TODO: Complete OG images */
export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "JoinFlow",
  },
  description: "The job of 10 HR managers done solo!",
  metadataBase: new URL("https://joinflow.vercel.app"),
  themeColor: "#000000",
  creator: "midnight.studios",
  authors: [
    {
      name: "Alvaro",
      url: "https://x.com/@alvaro_dotdev",
    },
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
    },
  },
  openGraph: {
    title: "joinflow",
    authors: ["https://x.com/@alvaro_dotdev"],
    description: "The job of 10 HR managers done solo!",
    images: ["/opengraph-image.png"],
    url: "https://joinflow.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@alvaro_dotdev",
    description: "The job of 10 HR managers done solo!",
    images: ["/opengraph-image.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark">
      <head>
        <Script
          async
          defer
          data-website-key="d63c9ed1ed4a"
          data-api="https://event.wirelytic.com"
          src="https://wirelytic.com/script/wirelytic.min.js"
        />
      </head>

      <body className={cn(raleway.className, "h-screen")}>
        <TrpcProvider>
          <NextAuthProvider session={session}>
            {children}

            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: "32px",
                  paddingBlock: "8px",
                  paddingInline: "16px",
                  backgroundColor: "#181818a8",
                  border: "1px solid #27272a",
                  color: "#e5e5e5",
                  fontSize: "14px",
                  fontWeight: "500",
                  maxWidth: "320px",
                  backdropFilter: "blur(8px)",
                },
              }}
            />
          </NextAuthProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
