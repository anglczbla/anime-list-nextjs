import "./globals.css";
import Providers from "./providers";
import Navbar from "./ui/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
