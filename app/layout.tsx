import "./globals.css";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "InternHub | Project-Based Training & Certification",
  description:
    "InternHub offers project-based training programs with real-world tasks and completion certificates.",
  keywords: [
    "project based training",
    "internship certificate",
    "developer training",
    "internhub",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
