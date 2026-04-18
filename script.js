/* ══════════════════════════════════════════════════════════════
   COLORSTACK UMN — IDEATHON PRESENTATION DECK
   script.js — Locked to Winners slide (post-event)
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var deck = document.getElementById('deck');
  var slides = Array.from(deck.querySelectorAll('.slide'));
  var dotNav = document.getElementById('dotNav');
  var pageCounter = document.getElementById('pageCounter');
  var winnersIndex = slides.length - 1; // last slide (14)

  function init() {
    /* Jump straight to the winners slide */
    deck.style.transition = 'none';
    deck.style.transform = 'translateX(' + (-winnersIndex * 100) + 'vw)';

    /* Activate only the winners slide */
    slides.forEach(function (s, i) {
      s.classList.toggle('slide--active', i === winnersIndex);
    });

    /* Set maroon theme */
    document.body.classList.add('theme--maroon');

    /* Hide navigation — presentation is over */
    if (dotNav) dotNav.style.display = 'none';
    if (pageCounter) pageCounter.style.display = 'none';

    /* ── Lightbox ── */
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxCaption = document.getElementById('lightboxCaption');

    function openLightbox(src, alt) {
      if (!src) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightboxCaption.textContent = alt || '';
      lightbox.classList.add('active');
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
    }

    document.querySelectorAll('.winner-entry-img[data-lightbox]').forEach(function (el) {
      el.addEventListener('click', function () {
        var src = this.getAttribute('data-lightbox');
        var img = this.querySelector('img');
        openLightbox(src, img ? img.alt : '');
      });
    });

    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightboxImg) return;
      if (e.target === lightboxCaption) return;
      closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
