import "./globals.css";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";

export const metadata = {
  title: "Inzivoo | Project-Based Training & Certification",
  description:
    "Inzivoo offers project-based training programs with real-world tasks and completion certificates.",
  keywords: [
    "project based training",
    "internship certificate",
    "developer training",
    "inzivoo",
  ],
  icons: {
    icon: "/logo.png",
  },
};


import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <AOSInit />
        </ThemeProvider>
      </body>
    </html>
  );
}
