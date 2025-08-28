import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400','500','600','700'],
  variable: '--font-roboto', 
  display: 'swap', 
});



export const metadata: Metadata = {
  title: "Note Hub",
  description: "NoteHub is a minimalist and user-friendly app for managing personal notes — create, edit, search, and organize your thoughts quickly and efficiently.",
  openGraph: {
      title: `Welcome to NoteHub`,
      description: "NoteHub is a minimalist and user-friendly app for managing personal notes — create, edit, search, and organize your thoughts quickly and efficiently.",
      url: `https://notehub.com/notes`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Home page',
        },
      ],
      type: 'website',
    },
  };

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
       <TanStackProvider>
        <Header />
          <main className="main">
            {children}
            {modal}
        </main>
          <Footer />
       </TanStackProvider>
      </body>
    </html>
  );
}
