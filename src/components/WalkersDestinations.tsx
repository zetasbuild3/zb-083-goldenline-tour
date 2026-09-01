'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { DESTINATIONS } from '@/data/travelData';
import { Destination } from '@/types';

interface WalkersDestinationsProps {
  onSelectDestination?: (dest: Destination) => void;
}

export const WalkersDestinations: React.FC<WalkersDestinationsProps> = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Safe Auto Slider functionality (only on desktop hover devices, never interrupt active touch)
  useEffect(() => {
    // Disable auto-scroll interval on touch-primary mobile screens to avoid fighting vertical scroll gestures
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const interval = setInterval(() => {
      if (scrollRef.current && !isHoveredRef.current && !isInteractingRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 310, behavior: 'smooth' });
        }
      }
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="destinations" className="pt-20 pb-8 lg:pt-28 lg:pb-12 bg-[#F5F2E6] relative overflow-hidden">
      {/* Background Watermark Text */}
      <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <span className="watermark-text" style={{ color: 'rgba(4, 27, 45, 0.05)' }}>
          destinations
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-2 sm:mt-4">
        {/* Centered Header matching Tour Packages UI */}
        <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span 
            className="font-caveat text-3xl sm:text-4xl text-[#cba258] mb-2 inline-block -rotate-2"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
          >
            Explore the Wonder of
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-4 mt-1 leading-tight">
            Destinations in Sri Lanka
          </h2>
          <p className="text-[#55697a] sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover the breathtaking beauty, ancient heritage, and hidden tropical paradises across our beautiful island.
          </p>
        </div>

        {/* Actions & Navigation */}
        <div data-reveal="fade-up" className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 sm:mb-10">
          <Link 
            href="/destinations"
            className="next-btn next-btn--blue group cursor-pointer w-full sm:w-auto justify-center sm:justify-start order-2 sm:order-1"
          >
            <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300">
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)]">View All Destinations</span>
          </Link>
        </div>

        {/* Destinations Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
          onTouchStart={() => { isInteractingRef.current = true; }}
          onTouchEnd={() => { setTimeout(() => { isInteractingRef.current = false; }, 1200); }}
          onTouchCancel={() => { isInteractingRef.current = false; }}
          data-reveal-stagger
          className="flex space-x-5 overflow-x-auto no-scrollbar pb-6 pt-2 snap-x snap-mandatory touch-scroll-x"
        >
          {/* Spacer for alignment */}
          <div className="w-4 sm:w-6 lg:w-8 shrink-0" aria-hidden="true" />
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.id}`}
              className="hover-box group flex-shrink-0 w-[260px] sm:w-[290px] h-[400px] sm:h-[440px] cursor-pointer snap-start rounded-2xl overflow-hidden relative block"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover hover-box__img"
                sizes="(max-width: 640px) 260px, 290px"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Card Footer Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end z-10">
                <div className="border-b border-white/30 pb-4 mb-4 group-hover:border-white transition-colors">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#cba258] font-bold tracking-widest uppercase mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.region}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider leading-none">
                    {dest.name}
                  </h3>
                </div>

                <div className="next-btn next-btn--white">
                  <div className="next-btn-circle group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold">Explore</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Spacer for alignment */}
          <div className="w-4 sm:w-6 lg:w-8 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
