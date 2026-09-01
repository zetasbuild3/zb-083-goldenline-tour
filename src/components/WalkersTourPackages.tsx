'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { TourPackage } from '@/types';
import { TOUR_PACKAGES } from '@/data/travelData';
import { LotusBackground, TropicalLeafBackground } from './DecorativeBackgrounds';

interface WalkersTourPackagesProps {
  onSelectPackage?: (pkg: TourPackage) => void;
}

export const WalkersTourPackages: React.FC<WalkersTourPackagesProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const packagesTabsRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(cat);
    const container = packagesTabsRef.current;
    const button = e.currentTarget;
    if (container && button) {
      const scrollOffset = button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollOffset),
        behavior: 'smooth',
      });
    }
  };

  const categories = [
    'All',
    'Classic Tours',
    'Cultural Tours',
    'Hill Country',
    'Wildlife & Adventure',
    'Beach Holidays',
    'Honeymoon Tours',
    'Luxury Tours',
  ];

  // Default 6 Bento showcase packages
  const featuredBentoIds = [
    'tropical-highlights-tour',
    'ancient-legacy-tour',
    'scenic-escapes-tour',
    'wild-adventures-tour',
    'romantic-climes-tour',
    'the-luxury-escape-sri-lanka',
  ];

  const filteredPackages =
    selectedCategory === 'All'
      ? TOUR_PACKAGES.filter((p) => featuredBentoIds.includes(p.id))
      : TOUR_PACKAGES.filter(
          (p) =>
            p.categoryLabel?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            p.category?.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <section id="packages" className="pt-8 pb-24 lg:pt-12 lg:pb-32 bg-[#F5F2E6] relative overflow-x-clip overflow-y-visible">
      {/* Subtle Background Decorative SVGs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] -translate-y-1/4 translate-x-1/4 pointer-events-none select-none z-0 opacity-20 text-[#cba258]">
        <LotusBackground className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] translate-y-1/4 -translate-x-1/4 pointer-events-none select-none z-0 opacity-10 text-[var(--color-primary)]">
        <TropicalLeafBackground className="w-full h-full" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Category Filter Pills */}
        <div
          ref={packagesTabsRef}
          data-reveal="fade-down"
          className="w-full -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto no-scrollbar pb-3 sm:pb-0 mb-12 py-2 touch-scroll-x"
        >
          <div className="flex items-center sm:flex-wrap gap-2 sm:gap-3 sm:justify-center w-max sm:w-auto min-w-full px-2 py-1 pr-10 sm:pr-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={(e) => handleCategorySelect(cat, e)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[var(--color-primary)] text-white shadow-md'
                    : 'bg-[#f4f7f6] text-[var(--color-primary)] hover:bg-[#e2ede7] hover:text-[var(--color-primary)]'
                }`}
              >
                {cat === 'All' ? 'All Packages' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        {selectedCategory === 'All' ? (
          /* Bento Box Layout for All */
          <div key="bento-all" data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-min is-revealed animate-in fade-in duration-300">
            {filteredPackages.map((pkg, index) => {
              if (index === 0) {
                return (
                  <React.Fragment key={pkg.id}>
                    {/* The Large Left Card */}
                    <Link
                      href={`/tours/${pkg.id}`}
                      className="lg:col-span-1 lg:row-span-2 h-[460px] md:h-[600px] lg:h-full w-full group bg-[#181513] rounded-3xl overflow-hidden shadow-lg border-[8px] border-white relative cursor-pointer flex flex-col justify-end block"
                    >
                      {/* Background Image */}
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover hover-box__img"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181513]/95 via-[#181513]/40 to-transparent group-hover:from-[#181513]/98 transition-colors duration-300" />

                      {/* Badge if available */}
                      {pkg.badge && (
                        <div className="absolute top-6 left-6 z-20 bg-[#c75d2f] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                          {pkg.badge}
                        </div>
                      )}

                      {/* Card Body */}
                      <div className="p-8 sm:p-10 relative z-10 text-white flex flex-col justify-end">
                        <span className="text-xs uppercase tracking-widest text-[#cba258] font-bold block mb-1">
                          {pkg.categoryLabel}
                        </span>
                        <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide leading-tight mb-4 group-hover:text-[#cba258] transition-colors">
                          {pkg.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 mb-6 leading-relaxed">
                          {pkg.description}
                        </p>
                        <div className="next-btn next-btn--white">
                          <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
                          </div>
                          <span className="text-xs uppercase tracking-widest font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">Explore Journey</span>
                        </div>
                      </div>
                    </Link>

                    {/* The Text Block (Col 2 & 3, Row 1) */}
                    <div className="lg:col-span-2 flex flex-col justify-center px-4 sm:px-8 py-8 lg:py-12 relative z-10 lg:pr-16">
                      <div>
                        <span 
                          className="font-caveat text-3xl sm:text-4xl text-[#cba258] mb-2 inline-block -rotate-2"
                          style={{ fontFamily: 'var(--font-caveat), cursive' }}
                        >
                          Explore Our
                        </span>
                        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-6 mt-2">
                          Tour Packages
                        </h2>
                      </div>
                      <p className="text-sm sm:text-base text-gray-800 mb-8 leading-relaxed max-w-2xl">
                        Embark on an unforgettable journey through Sri Lanka's stunning landscapes, rich history, and culture. Whether it be adventure, heritage, or luxury relaxation, GoldenLine TOUR crafts seamless, tailor-made experiences just for you.
                      </p>
                      <Link 
                        href="/tours"
                        className="next-btn next-btn--blue group cursor-pointer w-fit"
                      >
                        <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#C85A32] transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <span className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)]">Explore All Categories</span>
                      </Link>
                    </div>
                  </React.Fragment>
                );
              }

              // Top Right Horizontal Card (Index 1)
              if (index === 1) {
                return (
                  <Link
                    key={pkg.id}
                    href={`/tours/${pkg.id}`}
                    className="lg:col-span-2 h-[260px] sm:h-[280px] w-full group bg-[#181513] rounded-3xl overflow-hidden shadow-lg border-[8px] border-white relative cursor-pointer flex flex-col justify-end block"
                  >
                    {/* Background Image */}
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover hover-box__img"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181513]/95 via-[#181513]/40 to-transparent group-hover:from-[#181513]/98 transition-colors duration-300" />

                    {/* Badge if available */}
                    {pkg.badge && (
                      <div className="absolute top-5 left-5 z-20 bg-[#c75d2f] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                        {pkg.badge}
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-6 sm:p-8 relative z-10 text-white flex flex-col justify-end">
                      <span className="text-xs uppercase tracking-widest text-[#cba258] font-bold block mb-1">
                        {pkg.categoryLabel}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide leading-snug mb-3 group-hover:text-[#cba258] transition-colors">
                        {pkg.title}
                      </h3>
                      <div className="next-btn next-btn--white">
                        <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
                        </div>
                        <span className="text-xs uppercase tracking-widest font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">Explore</span>
                      </div>
                    </div>
                  </Link>
                );
              }

              // Standard 4 grid items below
              return (
                <Link
                  key={pkg.id}
                  href={`/tours/${pkg.id}`}
                  className="lg:col-span-1 h-[260px] sm:h-[280px] w-full group bg-[#181513] rounded-3xl overflow-hidden shadow-lg border-[8px] border-white relative cursor-pointer flex flex-col justify-end block"
                >
                  {/* Background Image */}
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover hover-box__img"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181513]/95 via-[#181513]/40 to-transparent group-hover:from-[#181513]/98 transition-colors duration-300" />

                  {/* Badge if available */}
                  {pkg.badge && (
                    <div className="absolute top-4 left-4 z-20 bg-[#c75d2f] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                      {pkg.badge}
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-6 relative z-10 text-white flex flex-col justify-end">
                    <span className="text-[11px] uppercase tracking-widest text-[#cba258] font-bold block mb-1">
                      {pkg.categoryLabel}
                    </span>
                    <h3 className="font-serif text-2xl font-bold tracking-wide leading-snug mb-4 group-hover:text-[#cba258] transition-colors">
                      {pkg.title}
                    </h3>
                    <div className="next-btn next-btn--white">
                      <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      <span className="text-xs uppercase tracking-widest font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">Explore</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Standard Grid for filtered category */
          <div key={`grid-${selectedCategory}`} data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 is-revealed animate-in fade-in duration-300">
            {filteredPackages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/tours/${pkg.id}`}
                className="hover-box group bg-[#181513] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-end relative cursor-pointer h-[380px] block border-4 border-white is-revealed"
              >
                {/* Background Image */}
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover hover-box__img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181513]/95 via-[#181513]/40 to-transparent group-hover:from-[#181513]/98 transition-colors duration-300" />

                {/* Badge if available */}
                {pkg.badge && (
                  <div className="absolute top-4 left-4 z-20 bg-[#c75d2f] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                    {pkg.badge}
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 sm:p-7 relative z-10 text-white flex flex-col justify-end">
                  <span className="text-[11px] uppercase tracking-widest text-[#cba258] font-bold block mb-1">
                    {pkg.categoryLabel}
                  </span>
                  <h3 className="font-serif text-2xl font-bold tracking-wide leading-snug mb-2 group-hover:text-[#cba258] transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="next-btn next-btn--white">
                    <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">Explore</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
