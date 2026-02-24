/**
 * Scroll-triggered animations using IntersectionObserver.
 * Elements with [data-animate] fade in when they enter the viewport.
 * Supports data-delay for staggered reveals.
 */
(function () {
  'use strict';

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Make everything visible immediately
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.classList.add('is-visible');
    });
    var heroH1 = document.querySelector('#hero h1');
    if (heroH1) {
      heroH1.classList.add('hero-animate');
    }
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-delay') || '0', 10);

          setTimeout(function () {
            el.classList.add('is-visible');
          }, delay);

          // One-shot: stop observing after trigger
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  document.querySelectorAll('[data-animate]').forEach(function (el) {
    observer.observe(el);
  });

  // Hero word-by-word animation
  var heroH1 = document.querySelector('#hero h1');
  if (heroH1) {
    var heroObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero-animate');
            heroObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    heroObserver.observe(heroH1);
  }
})();
