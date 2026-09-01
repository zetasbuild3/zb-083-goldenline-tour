'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WalkersHeader } from '@/components/WalkersHeader';
import { WalkersFooter } from '@/components/WalkersFooter';
import { LotusBackground, TropicalLeafBackground } from '@/components/DecorativeBackgrounds';
import { WalkersCustomTripForm } from '@/components/WalkersCustomTripForm';
import { BackgroundAutoSlider } from '@/components/BackgroundAutoSlider';
import { OffcanvasSearch } from '@/components/Modals/OffcanvasSearch';
import { DESTINATIONS } from '@/data/travelData';
import { Destination } from '@/types';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import {
  MapPin,
  ArrowRight,
  Heart,
  Star,
  Compass,
  Sparkles,
} from 'lucide-react';

export default function DestinationsPage() {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [wishlist, setWishlist] = useState<string[]>(['mirissa', 'sigiriya']);
  const regionTabsRef = useRef<HTMLDivElement>(null);

  const handleRegionSelect = (region: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedRegion(region);
    const container = regionTabsRef.current;
    const button = e.currentTarget;
    if (container && button) {
      const scrollOffset = button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollOffset),
        behavior: 'smooth',
      });
    }
  };

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const destinationSlides = [
    { image: '/images/locations/sigiriya.webp', alt: 'Sigiriya Ancient Rock Fortress', location: 'Sigiriya' },
    { image: '/images/locations/hero-ella.webp', alt: 'Ella Nine Arch Bridge and Tea Hills', location: 'Ella' },
    { image: '/images/locations/mirissa.webp', alt: 'Mirissa Palm Trees and Tropical Ocean', location: 'Mirissa' },
    { image: '/images/locations/yala.webp', alt: 'Yala National Park Wildlife Safari', location: 'Yala' },
    { image: '/images/locations/nuwaraeliya.webp', alt: 'Nuwara Eliya Tea Gardens', location: 'Nuwara Eliya' },
    { image: '/images/locations/gallefort.webp', alt: 'Historic Galle Fort & Lighthouse', location: 'Galle Fort' },
  ];

  const regions = [
    'All Regions',
    'South Coast',
    'Central Province',
    'Cultural Triangle',
    'Hill Country',
    'East Coast',
    'Southern Province',
    'Uva Province',
  ];

  // Toggle wishlist item
  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // Filter destinations based on selected region
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      return selectedRegion === 'All Regions' || dest.region === selectedRegion;
    });
  }, [selectedRegion]);

  const scrollToGrid = () => {
    const el = document.getElementById('destinations-grid');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F5F2E6] relative">
      <WalkersHeader onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Hero Section */}
      <section className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel with Auto Ken-Burns Effect */}
        <div className="absolute inset-0 z-0">
          <BackgroundAutoSlider
            slides={destinationSlides}
            overlayGradient="bg-gradient-to-t from-[#181513] via-transparent to-black/60"
            intervalMs={5500}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white pt-24 pb-20 flex flex-col items-center">
          <div data-reveal="fade-down" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#cba258] text-xs uppercase tracking-widest font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sri Lanka Destination Directory</span>
          </div>

          <h1 data-reveal="zoom-out" data-reveal-duration="900" className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 uppercase text-white drop-shadow-lg leading-tight">
            Enchanting<br />
            <span className="text-[#cba258] italic font-normal font-serif">Destinations</span>
          </h1>

          <p data-reveal="fade-up" data-reveal-delay="250" className="text-base sm:text-xl text-white/90 max-w-2xl font-light leading-relaxed mb-10 drop-shadow">
            From the misty high tea trails of Nuwara Eliya to golden palm-fringed southern coastlines and ancient UNESCO rock citadels.
          </p>

          <div data-reveal="zoom-in" data-reveal-delay="450" className="flex items-center gap-4">
            <button
              onClick={scrollToGrid}
              className="next-btn next-btn--white group cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-[var(--color-primary)] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold">Discover Places</span>
            </button>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/60 pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest mb-1">Scroll</span>
          <div className="w-0.5 h-6 bg-[#F5F2E6]/40 animate-pulse" />
        </div>
      </section>

      {/* Main Destinations Grid Section */}
      <section id="destinations-grid" className="pt-20 pb-24 lg:pt-28 lg:pb-32 bg-[#FAF7EE] relative overflow-hidden">
        {/* Background Mandala */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] -translate-y-1/4 translate-x-1/4 pointer-events-none select-none z-0 opacity-20 text-[#cba258]">
          <LotusBackground className="w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto mb-16">
            <span
              className="font-caveat text-3xl sm:text-4xl text-[#cba258] mb-2 inline-block -rotate-2"
              style={{ fontFamily: 'var(--font-caveat), cursive' }}
            >
              Explore Sri Lanka
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-6">
              Iconic Destinations &amp; Wonders
            </h2>
            <p className="text-gray-600 sm:text-lg leading-relaxed">
              Explore the rich tapestry of Sri Lanka across sacred ancient ruins, misty high-elevation tea trails, untamed safari corridors, and turquoise coastline bays.
            </p>
          </div>

          {/* Region Tabs Filter */}
          <div
            ref={regionTabsRef}
            data-reveal="fade-up"
            data-reveal-delay="100"
            className="w-full -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto pb-4 mb-12 no-scrollbar py-2 touch-scroll-x"
          >
            <div className="flex items-center justify-start md:justify-center gap-2.5 w-max md:w-auto md:flex-wrap min-w-full px-2 py-1 pr-10 md:pr-2">
              {regions.map((region) => {
                const isSelected = selectedRegion === region;
                return (
                  <button
                    key={region}
                    onClick={(e) => handleRegionSelect(region, e)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--color-primary)] text-[#cba258] shadow-md ring-2 ring-[#cba258]/30'
                        : 'bg-[#F5F2E6] text-[var(--color-primary)] hover:bg-[#EAE4D5] border border-gray-200'
                    }`}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Grid */}
          {filteredDestinations.length === 0 ? (
            <div className="bg-[#FAF7EE] rounded-3xl p-12 text-center max-w-md mx-auto shadow-sm border border-gray-200">
              <Compass className="w-12 h-12 text-[#cba258] mx-auto mb-4 animate-bounce" />
              <h3 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-2">
                No Destinations Found
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Try adjusting your search filters or clearing the region selector.
              </p>
              <button
                onClick={() => {
                  setSelectedRegion('All Regions');
                }}
                className="bg-[var(--color-primary)] hover:bg-[#cba258] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredDestinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.id}`}
                  className="hover-box group flex-shrink-0 h-[440px] sm:h-[460px] cursor-pointer rounded-3xl overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#181513] block"
                >
                  {/* Full Background Image */}
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover hover-box__img"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181513]/95 via-[#181513]/35 to-transparent group-hover:from-[#181513]/98 transition-colors duration-300" />

                  {/* Top Badges (Category + Wishlist) */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#cba258] bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      {dest.category}
                    </span>
                    <button
                      onClick={(e) => toggleWishlist(dest.id, e)}
                      className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-[#cba258] transition-colors cursor-pointer"
                      aria-label="Save to favorites"
                    >
                      <Heart
                        className={`w-4 h-4 transition-all duration-300 ${
                          wishlist.includes(dest.id)
                            ? 'fill-[#cba258] text-[#cba258]'
                            : 'text-white'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Bottom Body */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white flex flex-col justify-end">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#cba258] font-bold tracking-widest uppercase mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{dest.region}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold uppercase tracking-wider leading-tight group-hover:text-[#cba258] transition-colors">
                      {dest.name}
                    </h3>

                    <p className="text-xs text-gray-200 line-clamp-2 my-2 leading-relaxed opacity-90 font-light">
                      {dest.shortDesc}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/15 mt-2">
                      <div className="flex items-center gap-1 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-[#cba258] text-[#cba258]" />
                        <span>{dest.rating}</span>
                        <span className="text-[10px] text-gray-300 font-normal">({dest.reviewsCount})</span>
                      </div>

                      <div className="next-btn next-btn--white">
                        <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300">
                          <ArrowRight className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Tailor-Made CTA Strip */}
      <section className="py-20 lg:py-28 bg-[#F5F2E6] border-t border-[#E7E0D0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span
                className="font-caveat text-3xl sm:text-4xl text-[#cba258] mb-2 inline-block -rotate-2"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              >
                Personalized Itineraries
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--color-primary)] mb-6 leading-tight">
                Want to Combine Multiple Destinations?
              </h2>
              <p className="text-sm sm:text-base text-[#6B635B] font-normal leading-relaxed mb-8">
                Let our destination specialists craft a seamless route connecting Sigiriya, Kandy, Ella, Yala, and the southern coast with private air-conditioned transport and dedicated chauffeur guides.
              </p>
              <Link
                href="/tours#custom-tour-form"
                className="next-btn next-btn--blue group cursor-pointer"
              >
                <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs uppercase tracking-widest font-bold">Design Custom Journey</span>
              </Link>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-[320px] sm:h-[380px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/locations/hero-ella.webp"
                  alt="Custom Tour Journey in Ella"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Embedded On-Page Custom Itinerary Planning Form */}
      <WalkersCustomTripForm id="custom-tour-form" />

      {/* Mega Footer */}
      <WalkersFooter />

      {/* Floating WhatsApp Quick Action Button */}
      <div className="floating-whatsapp">
        <a
          href="https://wa.me/94715477149"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:bg-[#20ba59] transition-all cursor-pointer"
        >
          <WhatsAppIcon className="w-7 h-7 fill-white" />
        </a>
      </div>

      {/* Modals & Drawers */}
      <OffcanvasSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSearch={(_term) => {
          setSelectedRegion('All Regions');
          scrollToGrid();
        }}
      />
    </main>
  );
}
