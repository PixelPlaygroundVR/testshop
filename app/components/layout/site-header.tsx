"use client";

import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "@/app/components/layout/mode-toggle";
import { CartButton } from "@/app/components/cart/CartButton";
import { ThemeToggle } from "@/app/components/theme-toggle";
import QuantumCart from "@/app/components/cart/QuantumCart";
import { Cpu } from "lucide-react";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Cpu className="h-4 w-4 text-white" />
            </div>
            <span className="inline-block font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Pixel Playgrounds
            </span>
          </Link>
          <nav className="flex gap-6">
            <Link
              href="/products"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/deals"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Deals
            </Link>
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <QuantumCart />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
} 