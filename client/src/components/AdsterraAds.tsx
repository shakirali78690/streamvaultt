import { useEffect, useRef } from "react";

// ==================== BANNER ADS ====================

// Banner 728x90 - Desktop Leaderboard
export function Banner728x90() {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !adRef.current) return;
    initialized.current = true;

    (window as any).atOptions = {
      'key': '1a8887a1f7602c45803795a1a6e971db',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://openairtowhardworking.com/1a8887a1f7602c45803795a1a6e971db/invoke.js';
    adRef.current.appendChild(script);
  }, []);

  return (
    <div ref={adRef} className="ad-container ad-desktop-only justify-center my-4" />
  );
}

// Banner 320x50 - Mobile Banner
export function Banner320x50() {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !adRef.current) return;
    initialized.current = true;

    (window as any).atOptions = {
      'key': 'bc37847301010f38b235b5b78d8382d1',
      'format': 'iframe',
      'height': 50,
      'width': 320,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://openairtowhardworking.com/bc37847301010f38b235b5b78d8382d1/invoke.js';
    adRef.current.appendChild(script);
  }, []);

  return (
    <div ref={adRef} className="ad-container ad-mobile-only justify-center my-4" />
  );
}

// Banner 468x60 - Medium Banner
export function Banner468x60() {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !adRef.current) return;
    initialized.current = true;

    (window as any).atOptions = {
      'key': '3495d0b8d01a4fcf0328cbbb7abd76c8',
      'format': 'iframe',
      'height': 60,
      'width': 468,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://openairtowhardworking.com/3495d0b8d01a4fcf0328cbbb7abd76c8/invoke.js';
    adRef.current.appendChild(script);
  }, []);

  return (
    <div ref={adRef} className="ad-container justify-center my-4" />
  );
}

// Banner 300x250 - Medium Rectangle
export function Banner300x250() {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !adRef.current) return;
    initialized.current = true;

    (window as any).atOptions = {
      'key': '30b9e1edda80cc79f456b9f7e7821c47',
      'format': 'iframe',
      'height': 250,
      'width': 300,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://openairtowhardworking.com/30b9e1edda80cc79f456b9f7e7821c47/invoke.js';
    adRef.current.appendChild(script);
  }, []);

  return (
    <div ref={adRef} className="ad-container justify-center my-4" />
  );
}

// Banner 160x600 - Skyscraper
export function Banner160x600() {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !adRef.current) return;
    initialized.current = true;

    (window as any).atOptions = {
      'key': '931b8e6c69b0fa8ebccab7b0e9cfde9a',
      'format': 'iframe',
      'height': 600,
      'width': 160,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://openairtowhardworking.com/931b8e6c69b0fa8ebccab7b0e9cfde9a/invoke.js';
    adRef.current.appendChild(script);
  }, []);

  return (
    <div ref={adRef} className="ad-sidebar" />
  );
}

// Banner 160x300 - Half Page
export function Banner160x300() {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !adRef.current) return;
    initialized.current = true;

    (window as any).atOptions = {
      'key': 'e1bfd6b49d9cfccad14357530f5a0160',
      'format': 'iframe',
      'height': 300,
      'width': 160,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://openairtowhardworking.com/e1bfd6b49d9cfccad14357530f5a0160/invoke.js';
    adRef.current.appendChild(script);
  }, []);

  return (
    <div ref={adRef} className="ad-sidebar" />
  );
}

// ==================== NATIVE BANNER ====================

export function NativeBanner() {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !adRef.current) return;
    initialized.current = true;

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://openairtowhardworking.com/2fe64366cad801afa603d926d7c7d413/invoke.js';
    adRef.current.appendChild(script);
  }, []);

  return (
    <div className="ad-container my-6">
      <div ref={adRef}>
        <div id="container-2fe64366cad801afa603d926d7c7d413"></div>
      </div>
    </div>
  );
}

// ==================== SMARTLINK ====================

const SMARTLINK_URL = "https://openairtowhardworking.com/r52n12yhee?key=c9e42e6265a0e4becf4bde3064060d5e";

interface SmartlinkButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "gradient" | "outline";
}

export function SmartlinkButton({ children, className = "", variant = "primary" }: SmartlinkButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer";

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    gradient: "bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white hover:opacity-90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
  };

  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

// Smartlink as sponsored content card
export function SmartlinkCard() {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-xl hover:border-purple-500/60 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-2xl">🎁</span>
        </div>
        <div className="flex-1">
          <p className="font-bold text-white group-hover:text-purple-300 transition-colors">Special Offer!</p>
          <p className="text-sm text-gray-400">Click here for exclusive deals</p>
        </div>
        <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </a>
  );
}

// Floating VIP Button - Fixed position
export function SmartlinkFloatingVIP() {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-40 px-4 py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform animate-pulse flex items-center gap-2"
    >
      <span className="text-xl">👑</span>
      <span className="hidden sm:inline">Get VIP Access</span>
      <span className="sm:hidden">VIP</span>
    </a>
  );
}

// Premium Banner - Full width promotional
export function SmartlinkPremiumBanner() {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full p-4 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 text-black rounded-lg hover:shadow-lg transition-all group"
    >
      <div className="flex items-center justify-center gap-4 text-center">
        <span className="text-2xl">⭐</span>
        <div>
          <p className="font-bold text-lg">Unlock Premium Features</p>
          <p className="text-sm opacity-80">Ad-free streaming • HD Quality • Exclusive Content</p>
        </div>
        <span className="text-2xl group-hover:scale-110 transition-transform">→</span>
      </div>
    </a>
  );
}

// Win Subscription Promo - Contest style
export function SmartlinkWinPromo() {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-5 bg-gradient-to-br from-green-900/60 to-emerald-900/60 border border-green-500/40 rounded-xl hover:border-green-400/70 transition-all group"
    >
      <div className="text-center">
        <div className="text-4xl mb-2">🎉</div>
        <p className="font-bold text-xl text-green-300 mb-1">WIN FREE SUBSCRIPTION!</p>
        <p className="text-sm text-gray-300 mb-3">Click to enter the giveaway</p>
        <div className="inline-block px-6 py-2 bg-green-500 text-black font-bold rounded-full group-hover:bg-green-400 transition-colors">
          Enter Now →
        </div>
      </div>
    </a>
  );
}

// Download App Button
export function SmartlinkDownloadApp() {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-5 py-3 bg-black text-white rounded-xl border border-gray-700 hover:border-gray-500 transition-all group"
    >
      <div className="text-3xl">📱</div>
      <div className="text-left">
        <p className="text-xs text-gray-400">Download on</p>
        <p className="font-bold text-lg">Mobile App</p>
      </div>
    </a>
  );
}

// Referral Card - Share and earn
export function SmartlinkReferral() {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/30 rounded-xl hover:border-blue-400/60 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">💰</div>
        <div className="flex-1">
          <p className="font-bold text-blue-300">Refer & Earn!</p>
          <p className="text-sm text-gray-400">Share with friends, get rewards</p>
        </div>
        <span className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">FREE</span>
      </div>
    </a>
  );
}

// Exclusive Offer Banner - Urgency style
export function SmartlinkExclusiveOffer() {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gradient-to-r from-red-900/70 via-red-800/70 to-red-900/70 border border-red-500/50 rounded-lg hover:border-red-400/80 transition-all animate-pulse"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="font-bold text-red-300">LIMITED TIME OFFER!</p>
            <p className="text-xs text-gray-300">Expires soon - Don't miss out</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg">
          Claim Now
        </div>
      </div>
    </a>
  );
}

// Movie/Show specific CTA
export function SmartlinkWatchNow() {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg"
    >
      <span>▶</span>
      <span>Watch in HD</span>
      <span className="px-2 py-0.5 bg-yellow-400 text-black text-xs rounded">FREE</span>
    </a>
  );
}

// Footer CTA Button
export function SmartlinkFooterCTA() {
  return (
    <a
      href={SMARTLINK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm font-medium"
    >
      <span>🌟</span>
      <span>Get Premium Access</span>
    </a>
  );
}

// ==================== RESPONSIVE AD WRAPPER ====================

// Shows 728x90 on desktop, 320x50 on mobile
export function ResponsiveHeaderBanner() {
  return (
    <>
      <Banner728x90 />
      <Banner320x50 />
    </>
  );
}

// Sidebar ad stack
export function SidebarAds() {
  return (
    <div className="hidden lg:flex flex-col gap-4 sticky top-24">
      <Banner160x600 />
      <Banner160x300 />
      <SmartlinkCard />
      <SmartlinkReferral />
    </div>
  );
}

// In-content ad block (multiple ads)
export function InContentAds() {
  return (
    <div className="space-y-6 my-8">
      <NativeBanner />
      <div className="flex justify-center">
        <Banner300x250 />
      </div>
    </div>
  );
}

