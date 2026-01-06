import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "./ui/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={poppins.className}>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
