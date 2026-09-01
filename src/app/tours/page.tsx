'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WalkersHeader } from '@/components/WalkersHeader';
import { WalkersFooter } from '@/components/WalkersFooter';
import { MandalaBackground, TropicalLeafBackground } from '@/components/DecorativeBackgrounds';
import { OffcanvasSearch } from '@/components/Modals/OffcanvasSearch';
import { WalkersCustomTripForm } from '@/components/WalkersCustomTripForm';
import { BackgroundAutoSlider } from '@/components/BackgroundAutoSlider';
import { TOUR_PACKAGES } from '@/data/travelData';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Clock,
} from 'lucide-react';

export default function ToursOverviewPage() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const categoryTabsRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCategory(id);
    const container = categoryTabsRef.current;
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
    { id: 'All', label: 'All Packages' },
    { id: 'Classic Tours Sri Lanka', label: 'Classic Tours' },
    { id: 'Cultural Tours Sri Lanka', label: 'Cultural Tours' },
    { id: 'Hill Country Scenic Tour', label: 'Hill Country' },
    { id: 'Wildlife and Adventure Tours Sri Lanka', label: 'Wildlife & Adventure' },
    { id: 'Beach Holidays', label: 'Beach Holidays' },
    { id: 'Honeymoon Tours', label: 'Honeymoon Tours' },
    { id: 'Luxury Tours', label: 'Luxury Tours' },
  ];

  const filteredPackages = useMemo(() => {
    return TOUR_PACKAGES.filter((pkg) => {
      const matchCat =
        selectedCategory === 'All' ||
        pkg.category === selectedCategory ||
        pkg.categoryLabel === selectedCategory ||
        pkg.category?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        pkg.categoryLabel?.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchSearch =
        searchQuery === '' ||
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destinationsCovered.some((d) =>
          d.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen flex flex-col bg-[#F5F2E6] relative">
      {/* Header */}
      <WalkersHeader
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Hero with Background Auto Slider */}
      <section className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center text-white overflow-hidden text-center pt-28 pb-20">
        <BackgroundAutoSlider
          intervalMs={4500}
          overlayGradient="bg-gradient-to-b from-black/80 via-black/45 to-[#181513]"
        />

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-0">
          <span
            data-reveal="fade-down"
            data-reveal-delay="100"
            className="font-caveat text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#cba258] mb-[-5px] sm:mb-[-10px] md:mb-[-15px] z-10 -rotate-2 inline-block"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
          >
            Explore the Wonder of
          </span>

          <h1 
            data-reveal="fade-up"
            data-reveal-delay="200"
            className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-[90px] font-bold tracking-wider sm:tracking-widest text-[#f8fbfa] uppercase leading-tight sm:leading-none drop-shadow-2xl mb-6 lg:mb-8 mt-2 max-w-full"
          >
            TOUR PACKAGES
          </h1>

          <div data-reveal="zoom-in" data-reveal-delay="450" className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-[280px] sm:max-w-none mx-auto">
            <button
              onClick={() => {
                const el = document.getElementById('packages-list');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="next-btn next-btn--white group cursor-pointer hover:scale-105 transition-transform w-full sm:w-auto justify-start sm:justify-center"
            >
              <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300 shrink-0">
                <ArrowRight className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-left">Discover Itineraries</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('custom-tour-form');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="next-btn next-btn--white group cursor-pointer hover:scale-105 transition-transform w-full sm:w-auto justify-start sm:justify-center"
            >
              <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all duration-300 shrink-0">
                <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-left">Plan Custom Trip</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section id="packages-list" className="py-16 lg:py-24 bg-[#FAF7EE] relative overflow-hidden">
        {/* Decorative Background SVGs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] -translate-y-1/4 translate-x-1/4 pointer-events-none select-none z-0 opacity-20 text-[#cba258]">
          <MandalaBackground className="w-full h-full" />
        </div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] translate-y-1/4 -translate-x-1/4 pointer-events-none select-none z-0 opacity-10 text-[var(--color-primary)]">
          <TropicalLeafBackground className="w-full h-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div data-reveal="fade-up" className="text-center max-w-3xl mx-auto mb-10">
            <span
              className="font-caveat text-3xl sm:text-4xl text-[#cba258] mb-2 inline-block -rotate-2"
              style={{ fontFamily: 'var(--font-caveat), cursive' }}
            >
              Handcrafted Itineraries
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] mb-4">
              Classic &amp; Curated Tours
            </h2>
            <p className="text-gray-600 sm:text-base leading-relaxed">
              Explore authentic Sri Lankan journeys with full day-by-day itineraries, verified boutique accommodations, and certified private chauffeur guides.
            </p>
          </div>

          {/* Category Tabs */}
          <div
            ref={categoryTabsRef}
            data-reveal="fade-up"
            data-reveal-delay="100"
            className="w-full -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto pb-4 mb-12 no-scrollbar py-2 touch-scroll-x"
          >
            <div className="flex items-center justify-start md:justify-center gap-2.5 w-max md:w-auto md:flex-wrap min-w-full px-2 py-1 pr-10 md:pr-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={(e) => handleCategorySelect(cat.id, e)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--color-primary)] text-[#cba258] shadow-md ring-2 ring-[#cba258]/30'
                        : 'bg-[#F5F2E6] text-[var(--color-primary)] hover:bg-[#EAE4D5] border border-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#F5F2E6] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-[#E7E0D0] transition-all duration-500 flex flex-col justify-between group"
              >
                <div className="relative h-64 w-full bg-[#181513] overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181513]/90 via-[#181513]/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="bg-black/40 backdrop-blur-md text-[#cba258] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                      {pkg.categoryLabel}
                    </span>
                    {pkg.badge && (
                      <span className="bg-[#cba258] text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#cba258] mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.duration}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold uppercase tracking-wider leading-tight group-hover:text-[#cba258] transition-colors">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-5 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                        Key Stops
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.destinationsCovered.slice(0, 4).map((d) => (
                          <span key={d} className="text-[11px] font-semibold text-[var(--color-primary)] bg-[#FAF7EE] px-2.5 py-1 rounded-md flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-[#cba258]" />
                            {d}
                          </span>
                        ))}
                        {pkg.destinationsCovered.length > 4 && (
                          <span className="text-[11px] font-semibold text-gray-500 bg-[#FAF7EE] px-2 py-1 rounded-md">
                            +{pkg.destinationsCovered.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-[#cba258] font-bold">Custom Tour</div>
                      <div className="font-serif text-sm sm:text-base font-bold text-[var(--color-primary)]">
                        Tailor-Made
                      </div>
                    </div>

                    <Link
                      href={`/tours/${pkg.id}`}
                      className="next-btn next-btn--blue group"
                    >
                      <div className="next-btn-circle group-hover:scale-110 group-hover:bg-[#cba258] transition-all">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs uppercase tracking-widest font-bold">View Itinerary</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Embedded On-Page Custom Itinerary Planning Form */}
      <WalkersCustomTripForm id="custom-tour-form" />

      {/* Footer */}
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

      {/* Modals */}
      <OffcanvasSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSearch={(term) => setSearchQuery(term)}
      />
    </main>
  );
}
