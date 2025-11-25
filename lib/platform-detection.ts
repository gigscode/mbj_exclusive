/**
 * Platform detection utilities for mobile-only PWA features
 */

export function isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false;

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Check for mobile devices
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobile = mobileRegex.test(userAgent.toLowerCase());

    // Additional check for tablet devices
    const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent.toLowerCase());

    return isMobile || isTablet;
}

export function isStandalone(): boolean {
    if (typeof window === 'undefined') return false;

    // Check if app is running in standalone mode (installed PWA)
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://')
    );
}

export function canInstallPWA(): boolean {
    // Only allow PWA installation on mobile devices
    return isMobileDevice() && !isStandalone();
}

export function getPlatform(): 'ios' | 'android' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop';

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    if (/android/i.test(userAgent)) {
        return 'android';
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return 'ios';
    }

    return 'desktop';
}
