/* ══════════════════════════════════════════════════════════════
   COLORSTACK UMN — IDEATHON PRESENTATION DECK
   script.js
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── State ── */
  var state = {
    current: 0,
    total: 14,
    isAnimating: false,
    promptRevealed: false
  };

  /* ── DOM refs ── */
  var deck = document.getElementById('deck');
  var slides = Array.from(deck.querySelectorAll('.slide'));
  var dotNav = document.getElementById('dotNav');
  var pageCounter = document.getElementById('pageCounter');
  var promptLoader = document.getElementById('promptLoader');
  var promptReveal = document.getElementById('promptReveal');
  var promptSlide = document.getElementById('promptSlide');

  /* ── Themes per slide ──
     M, C, M, C, M, M, M, C, M, M, C, M, C, M
     Slides 5-6-7 triple maroon, slides 9-10 double maroon */
  var themes = [
    'maroon', 'cream', 'maroon', 'cream',
    'maroon', 'maroon', 'maroon',
    'cream', 'maroon', 'maroon',
    'cream', 'maroon', 'cream', 'maroon'
  ];

  /* Sync total from actual DOM */
  state.total = slides.length;

  /* ── Find prompt slide index dynamically ── */
  var promptSlideIndex = promptSlide ? slides.indexOf(promptSlide) : -1;

  /* ── Prompt reveal sequence ── */
  function triggerPromptReveal() {
    if (state.promptRevealed) return;
    state.promptRevealed = true;

    /* Show loader for 2.5s, then swap to revealed text */
    setTimeout(function () {
      if (promptLoader) promptLoader.classList.add('hidden');
      setTimeout(function () {
        if (promptReveal) promptReveal.classList.add('revealed');
      }, 300);
    }, 2500);
  }

  /* ── Go to slide ── */
  function goToSlide(index) {
    if (index < 0 || index >= state.total || index === state.current || state.isAnimating) return;

    state.isAnimating = true;
    var prev = state.current;
    state.current = index;

    /* Move deck */
    deck.style.transform = 'translateX(' + (-index * 100) + 'vw)';

    /* Toggle active class */
    slides[prev].classList.remove('slide--active');
    slides[index].classList.add('slide--active');

    /* Theme on body */
    document.body.classList.remove('theme--maroon', 'theme--cream');
    document.body.classList.add('theme--' + themes[index]);

    /* Update dot nav */
    var dots = dotNav.querySelectorAll('.dot-nav-item');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === index);
    });

    /* Update page counter */
    var num = (index + 1).toString().padStart(2, '0');
    pageCounter.textContent = num + ' / ' + state.total.toString().padStart(2, '0');

    /* Trigger prompt reveal when landing on prompt slide */
    if (index === promptSlideIndex) {
      triggerPromptReveal();
    }

    /* Unlock after transition */
    setTimeout(function () {
      state.isAnimating = false;
    }, 720);
  }

  /* ── Build dot nav ── */
  function buildDotNav() {
    dotNav.innerHTML = '';
    for (var i = 0; i < state.total; i++) {
      var btn = document.createElement('button');
      btn.className = 'dot-nav-item';
      btn.textContent = (i + 1).toString().padStart(2, '0');
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.dataset.index = i;
      btn.addEventListener('click', function () {
        goToSlide(parseInt(this.dataset.index, 10));
      });
      dotNav.appendChild(btn);
    }
  }

  /* ── Keyboard ── */
  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        goToSlide(state.current + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        goToSlide(state.current - 1);
        break;
      case ' ':
        e.preventDefault();
        goToSlide(state.current + 1);
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(state.total - 1);
        break;
    }
  });

  /* ── Mouse Wheel (debounced) ── */
  var wheelCooldown = false;
  document.addEventListener('wheel', function (e) {
    e.preventDefault();
    if (wheelCooldown || state.isAnimating) return;
    var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) < 30) return;

    wheelCooldown = true;
    if (delta > 0) {
      goToSlide(state.current + 1);
    } else {
      goToSlide(state.current - 1);
    }
    setTimeout(function () {
      wheelCooldown = false;
    }, 1000);
  }, { passive: false });

  /* ── Touch Swipe ── */
  var touchStartX = 0;
  var touchStartY = 0;
  var touchTracking = false;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchTracking = true;
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    if (!touchTracking) return;
    var dx = Math.abs(e.touches[0].clientX - touchStartX);
    var dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (dx > dy) {
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('touchend', function (e) {
    if (!touchTracking) return;
    touchTracking = false;
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;

    if (dx < 0) {
      goToSlide(state.current + 1);
    } else {
      goToSlide(state.current - 1);
    }
  }, { passive: true });

  /* ── Init ── */
  function init() {
    buildDotNav();
    slides[0].classList.add('slide--active');
    var firstDot = dotNav.querySelector('.dot-nav-item');
    if (firstDot) firstDot.classList.add('active');
    document.body.classList.add('theme--' + themes[0]);
    pageCounter.textContent = '01 / ' + state.total.toString().padStart(2, '0');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
