'use client';

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/app/i18n/i18n-context";

interface NavbarProps {
  currentTheme: "light" | "dark";
}

export function Navbar({ currentTheme }: NavbarProps) {
  const { t } = useI18n();

  const logoSrc = currentTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          {/* LOGO部分 */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src={logoSrc} alt="Powerful Power Logo" width={150} height={40} />
          </Link>
        </div>

        {/* 导航菜单 */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/database" className="text-sm font-medium transition-colors hover:text-primary">
            {t('nav.power-supplies')}
          </Link>
          <Link href="/ranking" className="text-sm font-medium transition-colors hover:text-primary">
            {t('nav.ranking')}
          </Link>
          <Link href="/compare" className="text-sm font-medium transition-colors hover:text-primary">
            {t('nav.compare')}
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            {t('nav.about')}
          </Link>
        </nav>
      </div>
    </header>
  );
}