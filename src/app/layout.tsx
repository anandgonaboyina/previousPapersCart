import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navBar";
import BottomNavBar from "@/components/bottomNavBar";
import { ClerkProvider } from "@clerk/nextjs"
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PrepPapers — B.Tech PYQ Hub",
  description: "Access previous year question papers for NIT & IIT easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_Y3JlYXRpdmUtbmV3dC0zNS5jbGVyay5hY2NvdW50cy5kZXYk"}
      appearance={{
        cssLayerName: "clerk",
        elements: {
          // 1. Center Modal Backdrop (for modal mode if ever used)
          modalBackdrop: "",
          modalContent: "",

          // 2. The main container card for SignIn / SignUp
          cardBox: "bg-[#0a0e1a] !rounded-3xl",
          card: "!bg-white !shadow !border-none",

          // 3. Header
          headerTitle: "",
          headerSubtitle: "",

          // 4. Social buttons
          socialButtonsBlockButton: "!bg-white !border !rounded-mdS !border-blue-500",
          socialButtonsBlockButtonText: "!text-black !bg-white ",

          // 5. Divider
          dividerLine: "!bg-blue-500",
          dividerText: " !text-blue-500 !text-[20px]",

          // 6. Form elements
          formFieldLabel: "!text-black",
          formFieldInput: "h-30 !text-[14px] ",

          // 7. Primary button
          formButtonPrimary: " !bg-blue-500",

          // 8. Footer/Links
          footerActionText: "!text-black",
          footerActionLink: "!text-blue-500",

          // 9. Identity preview (e.g. after password screen or verification step)
          identityPreviewText: "",
          identityPreviewEditButtonIcon: "",
          formResendCodeLink: "",

          // 10. External link
          externalLink: "!text-blue-500",
        }
      }}
    >
      <html
        lang="en"
        className={`${inter.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Navbar />
          <div className="flex-1 pb-16 md:pb-0">
            {children}
          </div>
          <BottomNavBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
