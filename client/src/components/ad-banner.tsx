import { useEffect, useRef } from "react";

export function AdBanner() {
  const desktopAdRef = useRef<HTMLDivElement>(null);
  const mobileAdRef = useRef<HTMLDivElement>(null);
  const desktopInitialized = useRef(false);
  const mobileInitialized = useRef(false);

  // Desktop 728x90 banner
  useEffect(() => {
    if (desktopInitialized.current || !desktopAdRef.current) return;
    desktopInitialized.current = true;

    (window as any).atOptions = {
      'key': '30921ee85d2429c2f2753aea3474a6a9',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.highperformanceformat.com/30921ee85d2429c2f2753aea3474a6a9/invoke.js';
    desktopAdRef.current.appendChild(script);
  }, []);

  // Mobile 320x50 banner
  useEffect(() => {
    if (mobileInitialized.current || !mobileAdRef.current) return;
    mobileInitialized.current = true;

    (window as any).atOptions = {
      'key': 'a58a198de44c9cebfbb876b7b669a7fe',
      'format': 'iframe',
      'height': 50,
      'width': 320,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.highperformanceformat.com/a58a198de44c9cebfbb876b7b669a7fe/invoke.js';
    mobileAdRef.current.appendChild(script);
  }, []);

  return (
    <>
      {/* Desktop 728x90 banner - hidden on mobile */}
      <div className="hidden md:flex justify-center my-6">
        <div ref={desktopAdRef} className="ad-banner-container"></div>
      </div>
      {/* Mobile 320x50 banner - hidden on desktop */}
      <div className="flex md:hidden justify-center my-4">
        <div ref={mobileAdRef} className="ad-banner-container"></div>
      </div>
    </>
  );
}
