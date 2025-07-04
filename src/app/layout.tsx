import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";
import Header from "../sections/Header";
import HeaderServer from "../server/HeaderServer";





const soraFont = Sora({
    subsets: ["latin-ext"],
    variable: "--font-sora",
    weight: "variable",
});
const spaceGroteskFont = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    weight: "variable",
});

export const metadata: Metadata = {
    title: "AI SaaS Landing Page",
    description: "Created by Frontend Tribe",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className= {`${soraFont.variable} ${spaceGroteskFont.variable}  antialiased bg-gray-900 text-gray-300 font-body`}
        >

        {/*<HeaderServer/>*/}
        {children}
        <Toaster richColors closeButton/>
        {/*<Header/>*/}
        </body>
        </html>
    );
}
