/* ══════════════════════════════════════════════════════════════
   COLORSTACK UMN — IDEATHON 2026 WINNERS PAGE
   script.js — Lightbox only
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

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
})();
