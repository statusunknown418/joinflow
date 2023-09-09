import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Raleway } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Raleway({ subsets: ["latin"] });

/* TODO: Complete OG images */
export const metadata: Metadata = {
  title: "JoinFlow",
  description: "The job of 10 HR managers done solo!",
  metadataBase: new URL("https://joinflow.vercel.app"),
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
    title: "getrehire",
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

      <body className={inter.className}>
        <TrpcProvider>
          <NextAuthProvider session={session}>
            {children}

            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  borderRadius: "9999px",
                  backgroundColor: "#171717",
                  color: "#e5e5e5",
                  fontSize: "14px",
                  fontWeight: "500",
                },
              }}
            />
          </NextAuthProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
