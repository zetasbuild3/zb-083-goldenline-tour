'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface WalkersTourCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const WalkersTourCategories: React.FC<WalkersTourCategoriesProps> = ({
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isInteractingRef = useRef<boolean>(false);

  const categories = [
    {
      id: 'classic',
      title: 'Classic Tours',
      image: '/images/locations/classic.webp',
    },
    {
      id: 'cultural',
      title: 'Cultural Tours',
      image: '/images/locations/cultural.webp',
    },
    {
      id: 'hill-country',
      title: 'Hill Country Scenic',
      image: '/images/locations/hillcountry.webp',
    },
    {
      id: 'wildlife-adventure',
      title: 'Wildlife & Adventure',
      image: '/images/locations/wildlife.webp',
    },
    {
      id: 'beach',
      title: 'Beach Holidays',
      image: '/images/locations/mirissa.webp',
    },
    {
      id: 'honeymoon',
      title: 'Honeymoon Tours',
      image: '/images/locations/honeymoon.webp',
    },
    {
      id: 'luxury',
      title: 'Luxury Tours',
      image: '/images/locations/luxury.webp',
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Safe Auto Slider functionality (only on desktop hover devices, never interrupt active touch)
  useEffect(() => {
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
    <section id="categories" className="py-20 lg:py-24 bg-[#FAF7EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-reveal="fade-up" className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-12">
          <div className="md:col-span-4">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[var(--color-primary)] leading-tight">
              <span>Tour</span><br />
              <span className="font-bold">Categories</span>
            </h2>
          </div>

          <div className="md:col-span-5">
            <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
              As Sri Lanka’s leading travel agency, we craft seamless journeys to iconic UNESCO heritage citadels and hidden tropical paradises.
            </p>
          </div>

          <div className="md:col-span-3 flex justify-start md:justify-end items-center gap-3">
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous category"
              className="w-10 h-10 rounded-full bg-[#F5F2E6] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-primary)] shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              aria-label="Next category"
              className="w-10 h-10 rounded-full bg-[#F5F2E6] hover:bg-[var(--color-primary)] hover:text-white text-[var(--color-primary)] shadow-sm flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Carousel */}
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
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.title)}
              className="hover-box group flex-shrink-0 w-[260px] sm:w-[290px] h-[400px] sm:h-[440px] cursor-pointer snap-start"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover hover-box__img"
                sizes="(max-width: 640px) 260px, 290px"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Card Footer Details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col justify-end">
                <div className="border-b-2 border-white/40 pb-3 mb-4 group-hover:border-white transition-colors">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>

                <div className="next-btn next-btn--white">
                  <div className="next-btn-circle group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold">Explore</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
