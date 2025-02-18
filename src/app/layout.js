import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserComponent from "./usercontext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Nor Movies",
    description: "Download your favorite movies with just one click!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 w-screen`}
            >
                <UserComponent>
                    {children}
                </UserComponent>
            </body>
        </html>
    );
}
