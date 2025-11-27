'use client';

import { useEffect, useState } from 'react';
import { isMobileDevice, canInstallPWA, getPlatform } from '@/lib/platform-detection';

export function PWAInstaller() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    useEffect(() => {
        // Only register service worker on mobile devices
        if (!isMobileDevice()) {
            console.log('PWA features disabled on desktop');
            return;
        }

        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered:', registration);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });

            // Reload page when service worker updates
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });
        }

        // Listen for install prompt (Android)
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);

            if (canInstallPWA()) {
                setShowInstallPrompt(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        console.log(`User response to install prompt: ${outcome}`);
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
    };

    // Don't render anything on desktop
    if (!isMobileDevice()) {
        return null;
    }

    // iOS install instructions
    const platform = getPlatform();
    if (platform === 'ios' && canInstallPWA()) {
        return (
            <div className="fixed bottom-4 left-4 right-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-4 rounded-lg shadow-lg z-50 animate-slide-up">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-2xl">📱</div>
                    <div className="flex-1">
                        <h3 className="font-semibold mb-1">Install MBJ EXCLUSIVE</h3>
                        <p className="text-sm opacity-90">
                            Tap the share button <span className="inline-block">⎙</span> and select "Add to Home Screen"
                        </p>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="flex-shrink-0 text-white/80 hover:text-white"
                        aria-label="Dismiss"
                    >
                        ✕
                    </button>
                </div>
            </div>
        );
    }

    // Android install prompt
    if (showInstallPrompt && platform === 'android') {
        return (
            <div className="fixed bottom-4 left-4 right-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-4 rounded-lg shadow-lg z-50 animate-slide-up">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-2xl">📱</div>
                    <div className="flex-1">
                        <h3 className="font-semibold mb-1">Install MBJ EXCLUSIVE</h3>
                        <p className="text-sm opacity-90 mb-3">
                            Get quick access and offline support
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={handleInstallClick}
                                className="bg-white text-amber-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-amber-50 transition-colors"
                            >
                                Install
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="text-white/90 px-4 py-2 rounded-md text-sm hover:bg-white/10 transition-colors"
                            >
                                Not now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
