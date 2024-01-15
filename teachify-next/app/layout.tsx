import type { Metadata } from "next";
import { DARK_MODE_CLASS_NAME } from "@/utils/const";
import { Inter } from "next/font/google";
import { DarkModeContextProvider } from "@/context/darkModeContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Teachify",
    description:
        "A fully AI managed suite for all academic and administration needs."
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={DARK_MODE_CLASS_NAME}>
            <DarkModeContextProvider>
                <body className={inter.className}>{children}</body>
            </DarkModeContextProvider>
        </html>
    );
}
