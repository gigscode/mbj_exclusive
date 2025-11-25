import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

// TikTok icon component since lucide doesn't have it
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const footerLinks = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Shop", href: "#shop" },
    { name: "Book Fitting", href: "#contact" },
  ],
  collections: [
    { name: "Elegant Couture", href: "#" },
    { name: "Ready-to-Wear", href: "#" },
    { name: "Bridal Collection", href: "#" },
    { name: "Occasion Wear", href: "#" },
  ],
  support: [
    { name: "FAQs", href: "#" },
    { name: "Shipping Info", href: "#" },
    { name: "Returns Policy", href: "#" },
    { name: "Size Guide", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-cream">
      {/* Gold Line */}
      <div className="h-1 bg-gold" />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="relative h-24 w-48 mb-6">
              <Image
                src="/images/mbjfulllogo.png"
                alt="MBJ Exclusive"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-cream/70 leading-relaxed max-w-sm mb-6">
              Redefining Nigerian luxury fashion for the modern woman. Where tradition meets contemporary elegance.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-charcoal transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="block py-1 text-cream/70 hover:text-gold transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-6">Collections</h4>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="block py-1 text-cream/70 hover:text-gold transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-lg text-gold mb-6">Customer Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="block py-1 text-cream/70 hover:text-gold transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-sm">© {new Date().getFullYear()} MBJ Exclusive. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-cream/50">
            <a href="#" className="hover:text-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
