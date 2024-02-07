import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cn } from "~/lib/utils"
import { dark } from '@clerk/themes';

import { ClerkProvider } from '@clerk/nextjs'
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme/theme-provider"
import { Header } from "~/components/partials/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export { metadata } from "./metadata";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <GlobalProviders>
          <Header />
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}

function GlobalProviders({ children }: { children: React.ReactNode }) {
  return <ClerkProvider appearance={{ baseTheme: dark }}>
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  </ClerkProvider>
}
