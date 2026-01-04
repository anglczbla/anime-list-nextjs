import Navbar from "./components/Navbar";
import "./globals.css";
import Providers from "./providers";

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
