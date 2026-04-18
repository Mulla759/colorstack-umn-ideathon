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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
