"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarWrapper({ children }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const isHome = pathname === "/";

  if (isHome) {
    return (
      <div 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 transform ${
          isScrolled 
            ? "translate-y-0 opacity-100" 
            : "-translate-y-full opacity-0"
        }`}
      >
        {children}
      </div>
    );
  }

  return <>{children}</>;
}
