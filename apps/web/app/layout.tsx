import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Newsreader as FontSerif } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans"
});

const fontSerif = FontSerif({
    subsets: ["latin"],
    variable: "--font-serif"
});

export const metadata = {
    title: "ai.kyle.so"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable,
                        fontSerif.variable
                    )}
                >
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
