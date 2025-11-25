"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Collections", href: "#collections" },
    { name: "About", href: "#about" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-charcoal hover:text-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation - Left */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wider text-charcoal hover:text-gold transition-colors duration-300 uppercase"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Logo - Center */}
          <Link href="/" className="flex flex-col items-center">
            <img
              src="/images/mbjlogo.png"
              alt="MBJ Exclusive Logo"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - Right */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wider text-charcoal hover:text-gold transition-colors duration-300 uppercase"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-charcoal hover:text-gold transition-colors hidden sm:block" aria-label="Search">
              <Search size={20} />
            </button>
            <Link href="/cart" className="p-2 text-charcoal hover:text-gold transition-colors relative" aria-label="Shopping bag">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gold text-charcoal text-xs flex items-center justify-center rounded-full px-1 font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-500",
            isMobileMenuOpen ? "max-h-96 mt-6" : "max-h-0",
          )}
        >
          <nav className="flex flex-col gap-4 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wider text-charcoal hover:text-gold transition-colors duration-300 uppercase py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
