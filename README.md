# MBJ EXCLUSIVE

**Fashion Beyond Clothing** - Redefining Nigerian luxury fashion for the modern woman.

## Overview

MBJ EXCLUSIVE is a premium fashion platform offering handcrafted couture, premium materials, and perfect fit guaranteed. Built with Next.js 16 and modern web technologies.

## Features

- 🎨 **Luxury Design** - Premium UI with gold accents and elegant typography
- 📱 **Mobile PWA** - Progressive Web App functionality for mobile devices only
- 🌙 **Dark Mode** - Seamless dark/light theme switching
- ⚡ **Performance** - Optimized with Next.js 16 and React 19
- 🎯 **Type Safe** - Full TypeScript support

## PWA Installation (Mobile Only)

### Android (Chrome/Edge)
1. Visit the website on your mobile browser
2. Look for the install prompt at the bottom of the screen
3. Tap "Install" to add MBJ EXCLUSIVE to your home screen
4. Enjoy offline access and app-like experience

### iOS (Safari)
1. Visit the website in Safari on your iPhone/iPad
2. Tap the Share button (⎙) at the bottom
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to install the app
5. Access MBJ EXCLUSIVE from your home screen

**Note:** PWA features are intentionally disabled on desktop browsers to provide the best experience on each platform.

## Platform-Specific Features

### Mobile Devices
- ✅ PWA installation
- ✅ Offline support
- ✅ Home screen icon
- ✅ Standalone app mode
- ✅ Service worker caching

### Desktop Browsers
- ✅ Full website functionality
- ✅ Responsive design
- ❌ PWA installation (intentionally disabled)
- ❌ Service worker (not registered)

## Tech Stack

- **Framework:** Next.js 16.0.3
- **UI Library:** React 19.2.0
- **Styling:** Tailwind CSS 4.1.9
- **Components:** Radix UI
- **Forms:** React Hook Form + Zod
- **Analytics:** Vercel Analytics
- **Icons:** Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ or compatible runtime
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mbj-exclusive/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with PWA setup
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and animations
├── components/            # React components
│   └── pwa-installer.tsx  # Mobile-only PWA installer
├── lib/                   # Utilities and helpers
│   └── platform-detection.ts  # Mobile/desktop detection
├── public/                # Static assets
│   ├── manifest.json      # PWA manifest
│   ├── service-worker.js  # Service worker for offline support
│   ├── offline.html       # Offline fallback page
│   ├── favicon.ico        # Browser favicon
│   ├── icon-192.png       # PWA icon (192x192)
│   ├── icon-512.png       # PWA icon (512x512)
│   └── apple-touch-icon.png  # iOS home screen icon
└── styles/                # Additional styles
```

## Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Consistent component patterns
- Mobile-first responsive design

### Adding New Features
1. Create components in `components/` directory
2. Use TypeScript for all new files
3. Follow existing naming conventions
4. Test on both mobile and desktop

## PWA Technical Details

### Service Worker
The service worker (`public/service-worker.js`) provides:
- Offline page caching
- Static asset caching
- Network-first strategy for dynamic content
- Automatic cache cleanup

### Platform Detection
The `lib/platform-detection.ts` utility provides:
- `isMobileDevice()` - Detects mobile/tablet devices
- `isStandalone()` - Checks if app is installed
- `canInstallPWA()` - Determines if PWA can be installed
- `getPlatform()` - Returns 'ios', 'android', or 'desktop'

### Manifest Configuration
The PWA manifest includes:
- App name and description
- Theme colors matching brand
- Icon sizes for all devices
- Display mode: standalone
- Orientation: portrait-primary

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For support, please contact the MBJ EXCLUSIVE team.

---

**MBJ EXCLUSIVE** - Where fashion meets excellence.
