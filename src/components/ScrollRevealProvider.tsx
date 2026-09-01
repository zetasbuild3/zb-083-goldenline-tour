'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollRevealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-reveal], [data-reveal-stagger], section, footer').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('is-revealed');

          // Handle staggered cascading for children
          if (el.hasAttribute('data-reveal-stagger') || el.classList.contains('reveal-stagger')) {
            const children = Array.from(el.children) as HTMLElement[];
            children.forEach((child, index) => {
              child.style.setProperty('--reveal-index', `${index + 1}`);
              child.classList.add('is-revealed');
            });
          }

          // Unobserve once revealed to save CPU & battery
          obs.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.02],
      rootMargin: '120px 0px 80px 0px',
    });

    const registerElements = () => {
      const targets = document.querySelectorAll<HTMLElement>(
        '[data-reveal], [data-reveal-stagger], section:not(.no-reveal), footer:not(.no-reveal), .reveal-section, .hover-box'
      );

      const vh = window.innerHeight || 800;

      targets.forEach((target) => {
        // If it is a stagger container, ensure all current children have reveal index
        if (target.hasAttribute('data-reveal-stagger') || target.classList.contains('reveal-stagger')) {
          const children = Array.from(target.children) as HTMLElement[];
          children.forEach((child, index) => {
            child.style.setProperty('--reveal-index', `${index + 1}`);
            if (target.classList.contains('is-revealed')) {
              child.classList.add('is-revealed');
            }
          });
        }

        if (target.classList.contains('is-revealed')) return;

        if (!target.hasAttribute('data-reveal') && !target.hasAttribute('data-reveal-stagger')) {
          target.setAttribute('data-reveal', 'fade-up');
        }

        const rect = target.getBoundingClientRect();
        if (rect.top < vh + 50 && rect.bottom > -50) {
          target.classList.add('is-revealed');
          if (target.hasAttribute('data-reveal-stagger') || target.classList.contains('reveal-stagger')) {
            const children = Array.from(target.children) as HTMLElement[];
            children.forEach((child, index) => {
              child.style.setProperty('--reveal-index', `${index + 1}`);
              child.classList.add('is-revealed');
            });
          }
        } else {
          observer.observe(target);
        }
      });
    };

    // Initial registration
    const timer = setTimeout(registerElements, 40);

    // Watch for dynamic DOM changes (filtering, tabs, accordion) with debounce
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const mutationObserver = new MutationObserver(() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        registerElements();
      }, 150);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      if (debounceTimer) clearTimeout(debounceTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
};
