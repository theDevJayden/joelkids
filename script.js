/**
 * Joel Kids Ministry - Interactive Scripts
 * Modern UI/UX interactions, theme toggling, rainbow hover hook, and banner modal
 */

// ── Global Modal & Navigation Functions ──
window.openBannerModal = function(pngPath, svgFallback, title) {
  const modal = document.getElementById('banner-modal');
  const modalImg = document.getElementById('modal-banner-img');
  const modalTitle = document.getElementById('modal-banner-title');

  if (modal && modalImg && modalTitle) {
    modalTitle.textContent = title || 'Banner Kelas';
    modalImg.src = pngPath;
    modalImg.onerror = function() {
      this.onerror = null;
      this.src = svgFallback || 'asset/icon.svg';
    };
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
};

window.closeBannerModal = function() {
  const modal = document.getElementById('banner-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

window.openVideoModal = function(videoSrc, title, category) {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('theater-video-player');
  const titleEl = document.getElementById('video-modal-title');
  const catEl = document.getElementById('video-modal-category');

  if (modal && player) {
    // Pause background praise music to avoid overlapping sound
    if (window._jkAudioInstance && !window._jkAudioInstance.paused) {
      window._jkAudioInstance.pause();
    }

    if (titleEl) titleEl.textContent = title || 'Video Joel Kids';
    if (catEl) catEl.textContent = category ? `// ${category}` : '// TAYANGAN JOEL KIDS';

    player.src = videoSrc;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    player.play().catch(e => console.warn('Video playback notice:', e));
  }
};

window.closeVideoModal = function() {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('theater-video-player');

  if (modal && player) {
    player.pause();
    player.src = '';
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (window.closeVideoModal) window.closeVideoModal();
    if (window.closeBannerModal) window.closeBannerModal();
  }
});

window.scrollToClass = function(classId) {
  const targetElement = document.getElementById(classId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetElement.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease';
    targetElement.style.boxShadow = '0 0 40px #ffd700, 0 0 60px #00d4c8';
    targetElement.style.transform = 'translateY(-10px) scale(1.03)';
    
    setTimeout(() => {
      targetElement.style.boxShadow = '';
      targetElement.style.transform = '';
    }, 1800);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Theme Toggle (Sunlit Cyan / Deep Ocean Night) ──
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  
  const savedTheme = localStorage.getItem('joelkids-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('joelkids-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = 'Sunlit';
    } else {
      document.body.classList.remove('light-theme');
      if (themeIcon) themeIcon.textContent = '🌊';
      if (themeText) themeText.textContent = 'Deep Ocean';
    }
  }

  // ── 2. Mobile Navigation Drawer ──
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navBackdrop = document.getElementById('nav-backdrop');

  function openMenu() {
    if (navMenu && mobileToggle) {
      navMenu.classList.add('open');
      mobileToggle.classList.add('active');
      if (navBackdrop) navBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (navMenu && mobileToggle) {
      navMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
      if (navBackdrop) navBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMenu);
  }

  // Close mobile menu when clicking nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // ── 3. Navbar Blur/Shadow on Scroll ──
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── 4. Dynamic Floating Micro-Bubbles Generator ──
  const bubbleContainer = document.querySelector('.ocean-bubbles');
  if (bubbleContainer) {
    const bubbleCount = 16;
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'ambient-bubble';
      const size = Math.floor(Math.random() * 20) + 8; // 8px to 28px
      const left = Math.floor(Math.random() * 100);
      const duration = Math.floor(Math.random() * 12) + 8; // 8s to 20s
      const delay = Math.floor(Math.random() * 10);
      
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.animationDuration = `${duration}s`;
      bubble.style.animationDelay = `${delay}s`;
      
      bubbleContainer.appendChild(bubble);
    }
  }

  // ── 5. Back to Top Button ──
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── 6. Rainbow Letters Extra Dynamic Flare on Mouse Hover ──
  const rainbowLetters = document.querySelectorAll('.rainbow-letter');
  const rainbowColors = [
    '#ff3355', // Red
    '#ff7a00', // Orange
    '#ffd200', // Yellow
    '#00e676', // Green
    '#00d4c8', // Aqua
    '#00a2ff', // Blue
    '#9d4edd', // Purple
    '#ff3399'  // Pink
  ];

  rainbowLetters.forEach((letter, index) => {
    letter.addEventListener('mouseenter', () => {
      const targetColor = letter.dataset.color || rainbowColors[index % rainbowColors.length];
      letter.style.color = targetColor;
      letter.style.webkitTextFillColor = targetColor;
      letter.style.textShadow = `0 0 20px ${targetColor}, 0 0 35px ${targetColor}88`;
    });

    letter.addEventListener('mouseleave', () => {
      // Smoothly return to default gradient/color after a brief delay
      setTimeout(() => {
        letter.style.color = '';
        letter.style.webkitTextFillColor = '';
        letter.style.textShadow = '';
      }, 150);
    });
  });

  // ── 7. Close Banner Modal on Escape Key ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeBannerModal();
    }
  });

  // ── 8. Interactive 3D Niche Alcove Mouse Tracking & Parallax (Smooth Physics) ──
  function initGodsHeroes3D() {
    const nicheContainer = document.querySelector('.gods-heroes-container');
    const bannerCards = document.querySelectorAll('.small-banner-item');
    const restingAngles = [12, 6, 2, -2, -6, -12]; // Concave niche resting arc

    if (!nicheContainer || bannerCards.length === 0) return;

    // State for each card for smooth spring/lerp interpolation
    const cardStates = Array.from(bannerCards).map((item, index) => {
      const restY = restingAngles[index] || 0;
      return {
        el: item,
        card3D: item.querySelector('.banner-3d-card') || item,
        glare: item.querySelector('.banner-glare-effect'),
        // Current animated values
        curRotX: 0,
        curRotY: restY,
        curTransZ: 0,
        curTransY: 0,
        curScale: 1,
        // Target values
        targetRotX: 0,
        targetRotY: restY,
        targetTransZ: 0,
        targetTransY: 0,
        targetScale: 1,
        targetGlareOpacity: 0,
        glareX: 50,
        glareY: 50
      };
    });

    let isMouseInside = false;
    let mouseX = -1000;
    let mouseY = -1000;

    const spotlight = nicheContainer.querySelector('.alcove-hero-spotlight');
    const pedestalHalo = nicheContainer.querySelector('.alcove-pedestal-halo');

    nicheContainer.addEventListener('mouseenter', () => {
      isMouseInside = true;
    });

    nicheContainer.addEventListener('mousemove', (e) => {
      isMouseInside = true;
      mouseX = e.clientX;
      mouseY = e.clientY;

      let hoveredBanner = null;

      cardStates.forEach((state) => {
        const rect = state.el.getBoundingClientRect();
        const bannerCenterX = rect.left + rect.width / 2;
        const bannerCenterY = rect.top + rect.height / 2;

        const deltaX = mouseX - bannerCenterX;
        const deltaY = mouseY - bannerCenterY;

        const maxAngleY = 18;
        const maxAngleX = 10;

        const ratioX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth * 0.35)));
        const ratioY = Math.max(-1, Math.min(1, deltaY / 300));

        state.targetRotY = ratioX * maxAngleY;
        state.targetRotX = -ratioY * maxAngleX;

        const isHovered = (
          mouseX >= rect.left && 
          mouseX <= rect.right && 
          mouseY >= rect.top && 
          mouseY <= rect.bottom
        );

        if (isHovered) {
          hoveredBanner = state;
          state.targetTransZ = 35;
          state.targetTransY = -32;
          state.targetScale = 1.06;
          state.el.style.zIndex = '250';
          state.targetGlareOpacity = 0.9;
        } else {
          state.targetTransZ = 8;
          state.targetTransY = 0;
          state.targetScale = 1;
          state.el.style.zIndex = '10';
          state.targetGlareOpacity = 0.25;
        }

        if (state.glare) {
          state.glareX = ((mouseX - rect.left) / rect.width) * 100;
          state.glareY = ((mouseY - rect.top) / rect.height) * 100;
        }
      });

      // ✝️ Volumetric Top-Down Celestial Spotlight Alignment (Centered over hero)
      if (hoveredBanner && spotlight && pedestalHalo) {
        const cRect = nicheContainer.getBoundingClientRect();
        const bRect = hoveredBanner.el.getBoundingClientRect();
        const centerX = (bRect.left - cRect.left) + bRect.width / 2;
        spotlight.style.transform = `translateX(${(centerX - 180).toFixed(1)}px)`;
        spotlight.classList.add('is-active');
        pedestalHalo.style.transform = `translateX(${(centerX - 90).toFixed(1)}px) scaleY(0.4)`;
        pedestalHalo.classList.add('is-active');
      } else if (spotlight && pedestalHalo) {
        spotlight.classList.remove('is-active');
        pedestalHalo.classList.remove('is-active');
      }
    });

    nicheContainer.addEventListener('mouseleave', () => {
      isMouseInside = false;
      if (spotlight) spotlight.classList.remove('is-active');
      if (pedestalHalo) pedestalHalo.classList.remove('is-active');
      cardStates.forEach((state, index) => {
        state.el.style.zIndex = '';
        state.targetRotX = 0;
        state.targetRotY = restingAngles[index] || 0;
        state.targetTransZ = 0;
        state.targetTransY = 0;
        state.targetScale = 1;
        state.targetGlareOpacity = 0;
      });
    });

    // Continuous smooth animation loop (60/120fps buttery lerp)
    function updatePhysics() {
      const lerpSpeed = 0.085; // Buttery-smooth easing constant

      cardStates.forEach(state => {
        state.curRotX += (state.targetRotX - state.curRotX) * lerpSpeed;
        state.curRotY += (state.targetRotY - state.curRotY) * lerpSpeed;
        state.curTransZ += (state.targetTransZ - state.curTransZ) * lerpSpeed;
        state.curTransY += (state.targetTransY - state.curTransY) * lerpSpeed;
        state.curScale += (state.targetScale - state.curScale) * lerpSpeed;

        state.card3D.style.transform = `perspective(1000px) rotateX(${state.curRotX.toFixed(2)}deg) rotateY(${state.curRotY.toFixed(2)}deg) translateZ(${state.curTransZ.toFixed(1)}px) translateY(${state.curTransY.toFixed(1)}px) scale(${state.curScale.toFixed(3)})`;

        if (state.glare) {
          state.glare.style.opacity = state.targetGlareOpacity;
          state.glare.style.background = `radial-gradient(circle at ${state.glareX.toFixed(1)}% ${state.glareY.toFixed(1)}%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.12) 35%, transparent 70%)`;
        }
      });

      window._godsHeroesAnimId = requestAnimationFrame(updatePhysics);
    }

    if (window._godsHeroesAnimId) {
      cancelAnimationFrame(window._godsHeroesAnimId);
    }
    window._godsHeroesAnimId = requestAnimationFrame(updatePhysics);
  }
  window._initGodsHeroes3D = initGodsHeroes3D;
  initGodsHeroes3D();

  // ── 9. Class Cards (Gods Heroes Section) 3D Tilt on Hover ──
  const heroClassCards = document.querySelectorAll('.hero-class-card');
  heroClassCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = -y * 12;
      const rotateY = x * 14;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ── 10. Scroll-Triggered Reveal & Undo-on-Scroll-Up System ──
  const revealTargetSelectors = [
    // Hero Elements
    '.hero-badge',
    '.hero-title',
    '.hero-subtitle',
    '.hero-actions',
    '.hero-metrics',
    '.album-hero-header > *',
    
    // Section Headers
    '.section-header .section-tag',
    '.section-header .section-title',
    '.section-header .section-subtitle',
    '.section-header .section-line',
    '.banner-section-header > *',

    // Content Cards & Features
    '.about-card',
    '.feature-item',
    '.gods-heroes-container',
    '.schedule-card',
    '.hero-class-card',
    '.social-hub-card',
    '.album-showcase-card',

    // Footer columns
    '.footer-brand-col',
    '.footer-links-col',
    '.footer-affiliation-col',
    '.footer-bottom-bar',

    // Any manual elements marked with .scroll-reveal
    '.scroll-reveal'
  ];

  const revealElements = new Set();
  revealTargetSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => revealElements.add(el));
  });

  revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    if (el.matches('.schedule-card, .hero-class-card, .social-hub-card, .about-card, .album-showcase-card')) {
      el.classList.add('reveal-pop');
    }
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // "if we scroll back up then the animation will undo and remove"
          entry.target.classList.remove('is-revealed');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '20px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // ── 11. Lando Norris-Inspired Follower Cursor & Micro-Interactions ──
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer) {
    let cursorDot = document.querySelector('.jk-cursor-dot');
    let cursorRing = document.querySelector('.jk-cursor-ring');

    if (!cursorDot) {
      cursorDot = document.createElement('div');
      cursorDot.className = 'jk-cursor-dot';
      document.body.appendChild(cursorDot);
    }
    if (!cursorRing) {
      cursorRing = document.createElement('div');
      cursorRing.className = 'jk-cursor-ring';
      document.body.appendChild(cursorRing);
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        ringX = mouseX;
        ringY = mouseY;
        document.body.classList.add('cursor-active');
      }
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    document.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
    });

    document.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-active');
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-down');
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-down');
    });

    // Smooth lerping frame loop for outer follower ring
    function renderCursor() {
      if (isMoving) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.left = `${ringX.toFixed(1)}px`;
        cursorRing.style.top = `${ringY.toFixed(1)}px`;
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Expand & highlight cursor over interactive UI elements
    const interactiveQuery = 'a, button, .btn, .small-banner-item, .schedule-card, .hero-class-card, .social-hub-card, .rainbow-letter, #theme-toggle, .banner-modal-close, .album-cover-box';
    document.querySelectorAll(interactiveQuery).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ── 11b. True Layered 3D Depth Engine for Banner Cards ──
  // Stacks 3 copies of the banner image at different translateZ levels
  // with clip-path isolating different design regions (top: clouds/logo,
  // mid: title text, full: base card). On mouse tilt the layers visibly
  // separate — giving the impression that clouds float in front of the text,
  // which sits in front of the background, exactly like a physical diorama.
  function initBanner3DParallax() {
    function setupBanner(item) {
      if (item.dataset.parallaxInit === 'true') return;
      item.dataset.parallaxInit = 'true';

      const card = item.querySelector('.banner-3d-card');
      const img  = item.querySelector('.small-banner-img');
      if (!card || !img) return;

      const src = img.src || img.getAttribute('src') || '';

      // ── Inject stacked image layers (once only) ──

      // Layer 1 (BACK / deepest): full image at Z = -28px, dimmed
      // Represents the background gradient / rays
      if (!card.querySelector('.px-img-back')) {
        const back = document.createElement('img');
        back.className = 'px-img-back';
        back.src = src;
        back.alt = '';
        back.setAttribute('aria-hidden', 'true');
        card.insertBefore(back, img);
      }

      // Layer 2 (MID): clipped to middle band — title text region
      // clip-path: top 28% to 72% of the image height
      if (!card.querySelector('.px-img-mid')) {
        const mid = document.createElement('img');
        mid.className = 'px-img-mid';
        mid.src = src;
        mid.alt = '';
        mid.setAttribute('aria-hidden', 'true');
        card.insertBefore(mid, img);
      }

      // Layer 3 (FORE / closest): clipped to top band — clouds / logo
      // clip-path: top 0% to 38%
      if (!card.querySelector('.px-img-fore')) {
        const fore = document.createElement('img');
        fore.className = 'px-img-fore';
        fore.src = src;
        fore.alt = '';
        fore.setAttribute('aria-hidden', 'true');
        card.insertBefore(fore, img);
      }

      // ── Smooth lerp state ──
      let cx = 0, cy = 0;   // current (-1..1)
      let tx = 0, ty = 0;   // target
      let rafId = null;

      function lerp(a, b, t) { return a + (b - a) * t; }

      function applyLayers() {
        const rotX = cy * -11;
        const rotY = cx * 15;

        // The card tilts
        card.style.transform =
          `perspective(860px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.04,1.04,1.04)`;
        card.style.boxShadow =
          `${(-cx * 20).toFixed(1)}px ${(cy * 12).toFixed(1)}px 50px rgba(0,0,0,0.80),
           0 0 35px rgba(0,212,200,0.30),
           0 0 18px rgba(247,209,48,0.18)`;

        // Back image – far plane, barely shifts
        const back = card.querySelector('.px-img-back');
        if (back) {
          back.style.transform = `translate3d(${(cx * 3).toFixed(1)}px, ${(cy * 2).toFixed(1)}px, -28px) scale(1.06)`;
        }

        // Main / base image stays at Z=0 (reference plane)
        img.style.transform = `translate3d(0,0,0)`;

        // Mid image – title text region, floats at Z=18px
        const mid = card.querySelector('.px-img-mid');
        if (mid) {
          mid.style.transform = `translate3d(${(cx * 5).toFixed(1)}px, ${(cy * 4).toFixed(1)}px, 18px)`;
        }

        // Fore image – clouds / logo, pops at Z=40px
        const fore = card.querySelector('.px-img-fore');
        if (fore) {
          fore.style.transform = `translate3d(${(cx * 11).toFixed(1)}px, ${(cy * 8).toFixed(1)}px, 40px)`;
        }
      }

      function tick() {
        cx = lerp(cx, tx, 0.08);
        cy = lerp(cy, ty, 0.08);
        applyLayers();
        if (Math.abs(cx - tx) > 0.0008 || Math.abs(cy - ty) > 0.0008) {
          rafId = requestAnimationFrame(tick);
        } else {
          rafId = null;
        }
      }

      item.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        tx = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        ty = ((e.clientY - rect.top)  / rect.height) * 2 - 1;
        if (!rafId) rafId = requestAnimationFrame(tick);
      });

      item.addEventListener('mouseleave', () => {
        tx = 0; ty = 0;

        // Restore resting niche angle
        const idx = [...item.parentElement.children].indexOf(item);
        const angles = [12, 6, 2, -2, -6, -12];
        const angle  = angles[idx] || 0;

        function resetTick() {
          cx = lerp(cx, 0, 0.1);
          cy = lerp(cy, 0, 0.1);
          applyLayers();
          if (Math.abs(cx) > 0.002 || Math.abs(cy) > 0.002) {
            requestAnimationFrame(resetTick);
          } else {
            // Snap to resting state cleanly
            cx = 0; cy = 0;
            card.style.transform = `perspective(860px) rotateY(${angle}deg)`;
            card.style.boxShadow = '';
            img.style.transform  = '';
            const back = card.querySelector('.px-img-back');
            const mid  = card.querySelector('.px-img-mid');
            const fore = card.querySelector('.px-img-fore');
            if (back) back.style.transform = '';
            if (mid)  mid.style.transform  = '';
            if (fore) fore.style.transform = '';
          }
        }
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        requestAnimationFrame(resetTick);
      });
    }

    document.querySelectorAll('.small-banner-item').forEach(setupBanner);
    window._initBanner3DParallax = function() {
      document.querySelectorAll('.small-banner-item').forEach(setupBanner);
    };
  }
  initBanner3DParallax();

  // ── 12. OHZI-Inspired Dynamic 3D Card Tilt, Specular Spotlight & Prismatic Sheen ──
  function initCardSpotlightAndTilt() {
    const cards = document.querySelectorAll('.schedule-card, .hero-class-card, .main-about-card, .social-hub-card, .album-showcase-card');
    cards.forEach(card => {
      // 1. Inject spotlight layer if not present
      if (!card.querySelector('.card-spotlight-layer')) {
        const layer = document.createElement('div');
        layer.className = 'card-spotlight-layer';
        card.appendChild(layer);
      }

      // 2. Inject prismatic border if not present
      if (!card.querySelector('.card-prismatic-border')) {
        const border = document.createElement('div');
        border.className = 'card-prismatic-border';
        card.appendChild(border);
      }

      // 3. Inject technical corner crosshairs (+) if not present
      if (!card.querySelector('.corner-tl')) {
        const tl = document.createElement('span');
        tl.className = 'card-corner corner-tl';
        tl.textContent = '+';
        const br = document.createElement('span');
        br.className = 'card-corner corner-br';
        br.textContent = '+';
        card.appendChild(tl);
        card.appendChild(br);
      }

      // 4. Mousemove 3D tilt & spotlight coordinates
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;

        card.style.setProperty('--card-mouse-x', `${pctX.toFixed(1)}%`);
        card.style.setProperty('--card-mouse-y', `${pctY.toFixed(1)}%`);

        if (isFinePointer) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const tiltY = ((x - centerX) / centerX) * 5.8;
          const tiltX = -((y - centerY) / centerY) * 5.8;

          card.classList.add('is-tilting');
          card.style.setProperty('--card-tilt-x', `${tiltX.toFixed(2)}deg`);
          card.style.setProperty('--card-tilt-y', `${tiltY.toFixed(2)}deg`);
        }
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-tilting');
        card.style.setProperty('--card-tilt-x', '0deg');
        card.style.setProperty('--card-tilt-y', '0deg');
      });
    });
  }
  window._initCardSpotlightAndTilt = initCardSpotlightAndTilt;
  initCardSpotlightAndTilt();

  // ── 13. OHZI-Inspired Magnetic Interactive Physics for Buttons & Badges ──
  function initMagneticButtons() {
    if (!isFinePointer) return;

    const magneticTargets = document.querySelectorAll(
      '.btn-primary, .btn-secondary, .album-spotify-btn, .spotify-follow-pill, .btn-roll, .session-badge, #theme-toggle'
    );

    magneticTargets.forEach(el => {
      if (el.dataset.magneticInit) return;
      el.dataset.magneticInit = 'true';
      el.setAttribute('data-magnetic', 'true');

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        // Max magnetic pull: 7px
        const pullX = (x / (rect.width / 2)) * 7;
        const pullY = (y / (rect.height / 2)) * 7;

        el.style.transform = `translate(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
      });
    });
  }
  window._initMagneticButtons = initMagneticButtons;
  initMagneticButtons();

  // ── 14. Active Theory Fluid Ocean Ripples & Ambient Stardust Canvas ──
  function initAmbientCanvas() {
    const canvas = document.getElementById('ohzi-ambient-canvas');
    if (!canvas || window._ambientCanvasRunning) return;
    window._ambientCanvasRunning = true;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let lastMouseTime = performance.now();
    let mouseActive = false;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Active Theory Fluid Ocean Ripples Pool
    const ripples = [];
    function addRipple(x, y, isBig = true) {
      if (ripples.length < 14) {
        ripples.push({
          x,
          y,
          radius: 6,
          maxRadius: isBig ? 190 : 80,
          speed: isBig ? 4.2 : 3.0,
          alpha: 0.65,
          color: Math.random() > 0.35 ? 'rgba(0, 212, 200, ' : 'rgba(247, 209, 48, '
        });
      }
    }

    // Velocity-driven cursor wake particles pool
    const wakeParticles = [];

    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastMouseTime);
      const vx = (e.clientX - lastMouseX) / dt;
      const vy = (e.clientY - lastMouseY) / dt;
      const speed = Math.sqrt(vx * vx + vy * vy);

      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      lastMouseTime = now;

      // Active Theory Velocity Cursor Wake (Spawn when moving fast)
      if (speed > 1.4 && wakeParticles.length < 30) {
        wakeParticles.push({
          x: mouseX + (Math.random() - 0.5) * 6,
          y: mouseY + (Math.random() - 0.5) * 6,
          vx: -vx * 0.35 + (Math.random() - 0.5) * 0.6,
          vy: -vy * 0.35 + (Math.random() - 0.5) * 0.6,
          size: Math.random() * 3 + 1.2,
          alpha: 0.65,
          color: Math.random() > 0.4 ? 'rgba(0, 212, 200, ' : 'rgba(247, 209, 48, '
        });
      }

      // 🚀 Active Theory & Lusion RGB Prism Split on Fast Cursor Whip
      if (speed > 1.6) {
        const norm = Math.sqrt(vx * vx + vy * vy) || 1;
        const whipAmp = Math.min(1, (speed - 1.6) / 2.5);
        const whipX = (vx / norm) * whipAmp;
        const whipY = (vy / norm) * whipAmp;
        document.body.style.setProperty('--whip-x', whipX.toFixed(2));
        document.body.style.setProperty('--whip-y', whipY.toFixed(2));
        document.body.classList.add('is-whip-active');
        clearTimeout(window._whipTimer);
        window._whipTimer = setTimeout(() => {
          document.body.classList.remove('is-whip-active');
        }, 130);
      }
    }, { passive: true });

    window.addEventListener('click', (e) => {
      addRipple(e.clientX, e.clientY, true);
    });

    document.addEventListener('mouseleave', () => {
      mouseActive = false;
    });

    // 45 celestial stardust motes in Joel Kids brand hues
    const count = Math.min(50, Math.max(25, Math.floor(width / 32)));
    const particles = [];
    const colors = [
      'rgba(0, 212, 200, ',   // Cyan
      'rgba(247, 209, 48, ',  // Gold
      'rgba(0, 162, 255, ',   // Azure
      'rgba(255, 255, 255, ', // White diamond
      'rgba(255, 122, 0, '    // Sunlit amber
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseSize: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.45 + 0.2,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.18),
        swaySpeed: Math.random() * 0.015 + 0.008,
        swayAngle: Math.random() * Math.PI * 2,
        swayRadius: Math.random() * 0.8 + 0.2
      });
    }

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) requestAnimationFrame(draw);
    });

    function draw() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      const isLight = document.body.classList.contains('light-theme');

      // 🎵 Audio-Reactive Cosmos Synesthesia
      let bassBoost = 0;
      let trebleBoost = 0;
      const isAudioPlaying = previewAudio && !previewAudio.paused && !previewAudio.ended;

      if (isAudioPlaying) {
        document.body.classList.add('audio-is-playing');
        const curTime = previewAudio.currentTime || 0;
        // Rhythmically calculate harmonic frequency swells with natural praise tempo
        bassBoost = (Math.sin(curTime * 7.5) * 0.5 + 0.5) * 0.55;
        trebleBoost = (Math.cos(curTime * 15) * 0.5 + 0.5) * 0.45;

        // Occasional harmonic burst from center on high beats
        if (bassBoost > 0.48 && Math.random() < 0.06 && ripples.length < 12) {
          addRipple(width * 0.5 + (Math.random() - 0.5) * 160, height * 0.5 + (Math.random() - 0.5) * 160, false);
        }

        // Luminous celestial radial breathing aura
        const auraRadius = Math.min(width, height) * (0.32 + bassBoost * 0.16);
        const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, auraRadius);
        grad.addColorStop(0, `rgba(0, 212, 200, ${(bassBoost * 0.07).toFixed(3)})`);
        grad.addColorStop(0.5, `rgba(247, 209, 48, ${(bassBoost * 0.035).toFixed(3)})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else {
        document.body.classList.remove('audio-is-playing');
      }

      // 1. Draw Active Theory Fluid Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= 0.948;
        if (r.alpha < 0.015 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color + r.alpha.toFixed(2) + ')';
        ctx.lineWidth = Math.max(1, 2.6 * (1 - r.radius / r.maxRadius));
        ctx.shadowColor = r.color + '0.7)';
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 2. Draw Active Theory Velocity Wake
      for (let i = wakeParticles.length - 1; i >= 0; i--) {
        const wp = wakeParticles[i];
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.alpha *= 0.93;
        wp.size *= 0.97;
        if (wp.alpha < 0.02 || wp.size < 0.5) {
          wakeParticles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
        ctx.fillStyle = wp.color + wp.alpha.toFixed(2) + ')';
        ctx.shadowColor = wp.color + '0.6)';
        ctx.shadowBlur = wp.size * 2.5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Draw Ambient Celestial Stardust
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.swayAngle += p.swaySpeed;
        p.pulseAngle += p.pulseSpeed;
        p.x += p.vx + Math.sin(p.swayAngle) * p.swayRadius;
        p.y += p.vy;

        // Interactive cursor repulsion / fluid curvature
        if (mouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130 && dist > 0) {
            const force = (1 - dist / 130) * 1.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Screen wrapping
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const alpha = Math.max(0.08, p.baseAlpha + Math.sin(p.pulseAngle) * 0.2 + (isAudioPlaying ? bassBoost * 0.35 : 0)) * (isLight ? 0.7 : 1);
        const size = p.baseSize * (1 + Math.sin(p.pulseAngle) * 0.18 + (isAudioPlaying ? bassBoost * 0.65 : 0));

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + alpha.toFixed(2) + ')';
        ctx.shadowColor = p.color + '0.7)';
        ctx.shadowBlur = size * 3.5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }
  initAmbientCanvas();

  // ── 15. Active Theory Procedural Web Audio Sound Synthesizer ──
  function initActiveTheorySound() {
    let audioCtx = null;
    let soundEnabled = localStorage.getItem('joelkids-sound') === 'enabled';

    function getAudioCtx() {
      if (!audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) audioCtx = new AudioClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    const pentatonicScale = [1046.50, 1174.66, 1318.51, 1567.98, 1760.00, 2093.00];
    let chimeCooldown = 0;

    function playGlassChime(freqIndex = 2) {
      if (!soundEnabled) return;
      const now = performance.now();
      if (now - chimeCooldown < 80) return;
      chimeCooldown = now;

      const ctx = getAudioCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = pentatonicScale[freqIndex % pentatonicScale.length];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.015, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.32);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.33);
    }

    function playWaterBubbleDrop() {
      if (!soundEnabled) return;
      const ctx = getAudioCtx();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.11);

      gain.gain.setValueAtTime(0.065, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.17);
    }

    // Toggle button handler
    const soundToggleBtn = document.getElementById('sound-toggle');
    const soundText = document.getElementById('sound-text');

    function updateSoundBtnUI() {
      if (!soundToggleBtn) return;
      if (soundEnabled) {
        soundToggleBtn.classList.add('is-active');
        if (soundText) soundText.textContent = 'Sound: ON';
      } else {
        soundToggleBtn.classList.remove('is-active');
        if (soundText) soundText.textContent = 'Sound: OFF';
      }
      document.body.classList.toggle('sound-atmosphere-active', soundEnabled);
    }

    updateSoundBtnUI();

    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundEnabled = !soundEnabled;
        localStorage.setItem('joelkids-sound', soundEnabled ? 'enabled' : 'disabled');
        updateSoundBtnUI();
        if (soundEnabled) {
          getAudioCtx();
          setTimeout(() => playGlassChime(0), 0);
          setTimeout(() => playGlassChime(2), 90);
          setTimeout(() => playGlassChime(4), 180);
        }
      });
    }

    // Attach interactive audio hooks
    function bindSoundTriggers() {
      const chimeTargets = document.querySelectorAll(
        '.btn, .nav-link, .schedule-card, .hero-class-card, .small-banner-item, .rainbow-letter, .track-row-item, .album-cover-box, #theme-toggle, #sound-toggle'
      );

      chimeTargets.forEach((target, i) => {
        if (target.dataset.soundInit) return;
        target.dataset.soundInit = 'true';

        target.addEventListener('mouseenter', () => {
          playGlassChime(i);
        });

        target.addEventListener('click', () => {
          playWaterBubbleDrop();
        });
      });
    }

    bindSoundTriggers();
    window._bindSoundTriggers = bindSoundTriggers;
  }
  initActiveTheorySound();

  // ── 13. Kinetic Rolling Button Text Enhancement (OFF+BRAND Style) ──
  const rollButtons = document.querySelectorAll('.btn, .btn-yt-card');
  rollButtons.forEach(btn => {
    if (btn.querySelector('.btn-roll')) return;
    const span = btn.querySelector('span:not(.arrow-right)');
    if (span && span.textContent.trim().length > 0) {
      const text = span.textContent.trim();
      span.innerHTML = `
        <span class="btn-roll">
          <span class="btn-roll-inner">
            <span class="btn-roll-text">${text}</span>
            <span class="btn-roll-text" aria-hidden="true">${text}</span>
          </span>
        </span>
      `;
    }
  });

  // ── 14. Spotify Interactive Audio Preview & Continuous Album Playback ──
  const JOEL_KIDS_PLAYLIST = [
    {
        "title": "Trimakasih Tuhan",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/e2b650b3fbe5da2da6e2aa2eff962202c747c41d",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Bapa Kau Baik",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/5cfa8feedf4fe866557b68167e59d843ed080ce0",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Dia Yesus Sahabatku",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/24f061b3abe03597d5f9a3a67bbee91e3a28724f",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Bapa, ini aku anakMU",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/7e89a4c64b4cd1b1705da356986ffad27a7eaf8a",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Kau Kusembah",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/01f15e7411cfbe83e7b596d0564c6f1399bf56dd",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Tuhan itu Baik",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/38dbc7255cc5759caf0bd6d45d55f2a4c9f53206",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Ku Cinta Tuhan",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/23150f4bc7d9520b00e476fb045e0a81898eb597",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Slamatkan Indonesia",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/75386d1ec61f6148f760b031e8c6b945f014a3a4",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Karna SalibMU",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/1a25458f37889ca0a1ab3d99472c3a2cb67fdc09",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Hip Hip Hore",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/5c7ee526552b80a0b02a3156a6ef91c59bb4f104",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Happy Birthday",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/d820c47d74fdf74dfafb2899ad8fe81c3e6e4d3b",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Heaven Rangers Mega",
        "album": "Faithful God",
        "cover": "asset/albums/faithful_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/7940feb277a8eeb78f0b44523c8ba9a7cfad4582",
        "spotify": "https://open.spotify.com/album/5O3eW2Ea5dsvqrRhSSrO77"
    },
    {
        "title": "Kasih Tuhan",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/d1f48348d0641da13a3af4fb4ee69822b4b364d7",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Berkat Tuhan",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/03a03466c9d972598deb100a7905f9b9873d382a",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Ku Percaya",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/e9f2c716ddee5f8ce334cecfce19944dce1790ae",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Kau yang Utama",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/10e5326854af632408fc524b5e838538841d1042",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Dekat denganMU",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/7924ad147a18a563686f5d9def9cf4582f5b0a59",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Memuji Tuhan Kesukaanku",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/af01c01dc6039b8a0d599850d55552a87463b275",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Penyembahanku",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/ddbdff535bc632f93a87e84c5af6a7ee2ead0f72",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Ku Mau Menyembah",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/6a1ef1f0198516e46d84717cf9d558650f13cf09",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Roh Kudus",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/ed758046615e22bd7832010e3f073aa93c899d27",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Dalam Nama Yesus",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/e76000959d99421127ccb944e5549f3279a2a139",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Ku Bersuka",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/5c88008141166f1ba5ec1853e6cd8c0838dd538d",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Hari Natal",
        "album": "Goodness of God",
        "cover": "asset/albums/goodness_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/33e4c5b2b7b263d25dfbedf038a9438f97527acc",
        "spotify": "https://open.spotify.com/album/2oS0Vhl8qZDxJLZ7H1R32v"
    },
    {
        "title": "Selamat Datang",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/773632a704e792720356c117a501b632ad663ed2",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Bersukacita",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/b322fa6af75927dcd6fd160df87626c29abe2431",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "I Love Jesus",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/c0e170183e5339c3a9f3f6e930ba6827e8b6b9e6",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Muliakan NamaMu",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/e53c11ce489df8e9b69499e1fd005dae11d86ba9",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Kesayanganku",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/2e737493f6528f1a4dd44ca91e544ff9a16150fd",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Ku Cinta Kau",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/7d27f44ff480fcd95408f591a902eb4792263e98",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Ku Mau Percaya",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/ae2abc393dd7f238b793655ac8347d193f57f937",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Tuhan Yesus Baik",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/89f24793d898ce87f8750efdb2baab019247d493",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Hanya Bagi-Mu Tuhan",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/7fa511a3c2206b76c84ffb5b49cd056672c72bbb",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Haleluya",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/6633f90b9e6193a38ed39a25d3a8c6393d1831c5",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Indah",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/6f76e091f4041d1153a9765f9e8b7b54dae60123",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Guru Terbaikku",
        "album": "Love of God",
        "cover": "asset/albums/love_of_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/0d82fd11b762eab2761f7de8eca48f0fe33173f1",
        "spotify": "https://open.spotify.com/album/0MDmr7QVQ0PMnW9GbZFD37"
    },
    {
        "title": "Yesus sgalanya Bagiku",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/06bb0bcf3ba181e9391b0ec90d8027a019debb6d",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Bersinar",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/d205734aad283ec8fb4328ba395ef8f793929663",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Aku Anak Tuhan",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/27337c410e1e65470bf4ad608f21d5c0063f418c",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Terimakasih Bapa",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/9ee4fef94f9411150fd4260644f832fbdbacd6f6",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Glory Haleluya",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/730a813c926d0ca69b2f7c2f1f743fcb4a3bd7a1",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Gembala yang Baik",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/58edcb1e860b88a32d6f9487eb0417497d476d1b",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Kasih",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/5621e79407370fb9fc9029c32a93a7de735b8340",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Ajarku Tuhan",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/b03aa20ce7840b9536d3f3a0ef7ea3e3c77a6806",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Hidupku Menjadi Berkat",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/4a3d5aa515cdeca331712c69195ef110b3f684fe",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Memuji Tuhan",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/9cf9bd6760cb7743978625c13b13e8a6b9b11959",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Kerinduanku",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/b12a49e0bd971c6624424337f580c3b00597cb13",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    },
    {
        "title": "Heaven Rangers",
        "album": "Glory to God",
        "cover": "asset/albums/glory_to_god.jpg",
        "preview": "https://p.scdn.co/mp3-preview/25526026bb237f412c38c98bee5224e294a8293b",
        "spotify": "https://open.spotify.com/album/27sElhRpFMKnMG1a31FjYo"
    }
];

  const miniPlayer = document.getElementById('mini-audio-player');
  const thumbEl = document.getElementById('mini-player-thumb');
  const titleEl = document.getElementById('mini-player-title');
  const albumEl = document.getElementById('mini-player-album');
  const playBtn = document.getElementById('mini-player-play-btn');
  const progressBar = document.getElementById('mini-player-progress');
  const timeline = miniPlayer ? miniPlayer.querySelector('.mini-player-timeline') : null;
  const spotifyLink = document.getElementById('mini-player-spotify-link');
  const closeBtn = document.getElementById('mini-player-close-btn');

  // Shared audio instance across pages
  if (!window._jkAudioInstance) {
    window._jkAudioInstance = new Audio();
    window._jkAudioInstance.preload = 'none';
  }
  const previewAudio = window._jkAudioInstance;
  let currentTrackIndex = -1;

  function updateActiveTrackRows() {
    const currentTrack = JOEL_KIDS_PLAYLIST[currentTrackIndex];
    document.querySelectorAll('.track-row-item').forEach(row => {
      if (currentTrack && row.dataset.preview === currentTrack.preview) {
        row.classList.add('is-playing');
        if (!row.querySelector('.track-equalizer-bars')) {
          const eq = document.createElement('span');
          eq.className = 'track-equalizer-bars';
          eq.setAttribute('aria-hidden', 'true');
          eq.innerHTML = '<span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span>';
          const titleWrap = row.querySelector('.track-title');
          if (titleWrap) titleWrap.appendChild(eq);
        }
      } else {
        row.classList.remove('is-playing');
        const eq = row.querySelector('.track-equalizer-bars');
        if (eq) eq.remove();
      }
    });

    // 💽 Sync active turntable spin to the currently playing album
    document.querySelectorAll('.album-showcase-card').forEach(card => {
      const cardTitle = card.querySelector('.album-card-title');
      const isAlbumPlaying = currentTrack && !previewAudio.paused && cardTitle && currentTrack.album.toLowerCase().includes(cardTitle.textContent.trim().toLowerCase());
      if (isAlbumPlaying) {
        card.classList.add('is-playing');
      } else {
        card.classList.remove('is-playing');
      }
    });
  }

  function saveAudioState(isPlaying) {
    try {
      sessionStorage.setItem('joelkids_audio_state', JSON.stringify({
        index: currentTrackIndex,
        time: previewAudio.currentTime || 0,
        playing: isPlaying,
        ts: Date.now()
      }));
    } catch (e) {}
  }

  function playTrackByIndex(index, resumeTime = 0) {
    if (index < 0 || index >= JOEL_KIDS_PLAYLIST.length) return;

    const track = JOEL_KIDS_PLAYLIST[index];
    currentTrackIndex = index;

    // Update Mini Player UI elements
    if (thumbEl) thumbEl.src = track.cover;
    if (titleEl) titleEl.textContent = track.title;
    if (albumEl) albumEl.textContent = track.album;
    if (spotifyLink) spotifyLink.href = track.spotify;
    if (progressBar) progressBar.style.width = '0%';

    // Slide Mini Player up
    if (miniPlayer) {
      miniPlayer.classList.add('active');
      miniPlayer.setAttribute('aria-hidden', 'false');
    }

    // Update is-playing on tracklist if on album page
    updateActiveTrackRows();

    // Load and play audio
    const isSameSrc = previewAudio.src === track.preview;
    if (!isSameSrc) {
      previewAudio.src = track.preview;
    }
    if (resumeTime > 0) {
      try { previewAudio.currentTime = resumeTime; } catch (e) {}
    } else if (!isSameSrc) {
      previewAudio.currentTime = 0;
    }

    previewAudio.play()
      .then(() => {
        saveAudioState(true);
      })
      .catch(e => {
        console.warn('Audio playback waiting for interaction:', e);
      });
  }

  // Audio Event Listeners
  previewAudio.addEventListener('play', () => {
    if (miniPlayer) miniPlayer.classList.add('is-playing');
    document.body.classList.add('audio-is-playing');
    updateActiveTrackRows();
    saveAudioState(true);
  });

  previewAudio.addEventListener('pause', () => {
    if (miniPlayer) miniPlayer.classList.remove('is-playing');
    document.body.classList.remove('audio-is-playing');
    document.querySelectorAll('.track-row-item.is-playing').forEach(r => r.classList.remove('is-playing'));
    document.querySelectorAll('.album-showcase-card.is-playing').forEach(c => c.classList.remove('is-playing'));
    saveAudioState(false);
  });

  previewAudio.addEventListener('timeupdate', () => {
    if (previewAudio.duration && progressBar) {
      const progress = (previewAudio.currentTime / previewAudio.duration) * 100;
      progressBar.style.width = `${progress.toFixed(1)}%`;
    }
    saveAudioState(!previewAudio.paused);
  });

  // 🚀 Continuous album-to-album playback:
  // When last song on album finishes, automatically advance to first song of next album!
  previewAudio.addEventListener('ended', () => {
    if (progressBar) progressBar.style.width = '100%';
    const nextIndex = (currentTrackIndex + 1) % JOEL_KIDS_PLAYLIST.length;
    playTrackByIndex(nextIndex);
  });

  function attachTrackRowListeners() {
    const trackRows = document.querySelectorAll('.track-row-item');
    trackRows.forEach(row => {
      row.addEventListener('click', (e) => {
        e.preventDefault();
        const previewUrl = row.dataset.preview;
        const foundIdx = JOEL_KIDS_PLAYLIST.findIndex(t => t.preview === previewUrl);
        if (foundIdx !== -1) {
          if (currentTrackIndex === foundIdx) {
            if (previewAudio.paused) {
              previewAudio.play().catch(err => console.warn(err));
            } else {
              previewAudio.pause();
            }
          } else {
            playTrackByIndex(foundIdx);
          }
        }
      });
    });

    const albumCovers = document.querySelectorAll('.album-cover-box');
    albumCovers.forEach(cover => {
      cover.addEventListener('click', () => {
        const card = cover.closest('.album-showcase-card');
        if (card) {
          const firstRow = card.querySelector('.track-row-item');
          if (firstRow) {
            const foundIdx = JOEL_KIDS_PLAYLIST.findIndex(t => t.preview === firstRow.dataset.preview);
            if (foundIdx !== -1) playTrackByIndex(foundIdx);
          }
        }
      });
    });

    updateActiveTrackRows();
  }

  // Mini Player Controls
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (currentTrackIndex === -1) {
        playTrackByIndex(0);
        return;
      }
      if (previewAudio.paused) {
        previewAudio.play().catch(e => console.warn(e));
      } else {
        previewAudio.pause();
      }
    });
  }

  if (timeline) {
    timeline.addEventListener('click', (e) => {
      if (!previewAudio.duration) return;
      const rect = timeline.getBoundingClientRect();
      const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      previewAudio.currentTime = clickRatio * previewAudio.duration;
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      previewAudio.pause();
      if (miniPlayer) {
        miniPlayer.classList.remove('active');
        miniPlayer.setAttribute('aria-hidden', 'true');
      }
      document.querySelectorAll('.track-row-item.is-playing').forEach(r => r.classList.remove('is-playing'));
      try { sessionStorage.removeItem('joelkids_audio_state'); } catch (e) {}
    });
  }

  // Restore saved audio state if user reloaded or navigated
  function restoreSavedAudio() {
    try {
      const savedStr = sessionStorage.getItem('joelkids_audio_state');
      if (savedStr) {
        const saved = JSON.parse(savedStr);
        if (typeof saved.index === 'number' && saved.index >= 0 && saved.index < JOEL_KIDS_PLAYLIST.length) {
          const track = JOEL_KIDS_PLAYLIST[saved.index];
          currentTrackIndex = saved.index;
          if (thumbEl) thumbEl.src = track.cover;
          if (titleEl) titleEl.textContent = track.title;
          if (albumEl) albumEl.textContent = track.album;
          if (spotifyLink) spotifyLink.href = track.spotify;
          if (miniPlayer) {
            miniPlayer.classList.add('active');
            miniPlayer.setAttribute('aria-hidden', 'false');
          }
          updateActiveTrackRows();

          if (saved.playing && previewAudio.paused) {
            // Calculate elapsed time
            const elapsed = saved.time + (Date.now() - saved.ts) / 1000;
            if (elapsed < 30) {
              previewAudio.src = track.preview;
              try { previewAudio.currentTime = elapsed; } catch (e) {}
              previewAudio.play().catch(() => {
                // Autoplay blocked: wait for first click on the document to resume
                const resumeOnInteraction = () => {
                  if (previewAudio.paused && currentTrackIndex === saved.index) {
                    previewAudio.play().catch(() => {});
                  }
                  document.removeEventListener('click', resumeOnInteraction);
                };
                document.addEventListener('click', resumeOnInteraction, { once: true });
              });
            }
          }
        }
      }
    } catch (e) {}
  }

  attachTrackRowListeners();
  restoreSavedAudio();

  // ── 15. Instant Zero-Lag Client-Side Navigation (Continuous Audio Across Tabs) ──
  function setupSeamlessNav() {
    // ⚡ In-Memory Page Cache for 0ms Instant Switching
    const pageCache = {};

    function cacheCurrentDOM() {
      const isAlbum = window.location.pathname.includes('album-lagu');
      const pageKey = isAlbum ? 'album-lagu.html' : 'index.html';
      const mainEl = document.querySelector('main.main-content');
      if (mainEl) {
        pageCache[pageKey] = {
          mainHtml: mainEl.innerHTML,
          title: document.title
        };
      }
    }
    cacheCurrentDOM();

    // Prefetch sibling page in the background immediately
    async function prefetchSibling() {
      const isAlbum = window.location.pathname.includes('album-lagu');
      const targetToPreload = isAlbum ? 'index.html' : 'album-lagu.html';
      try {
        const res = await fetch(targetToPreload);
        if (res.ok) {
          const text = await res.text();
          const doc = new DOMParser().parseFromString(text, 'text/html');
          const main = doc.querySelector('main.main-content');
          if (main) {
            pageCache[targetToPreload] = {
              mainHtml: main.innerHTML,
              title: doc.title || document.title
            };
          }
        }
      } catch (e) {}
    }
    setTimeout(prefetchSibling, 10);

    function updateNavLinksActive(targetHref) {
      document.querySelectorAll('.nav-links .nav-link').forEach(link => {
        const h = link.getAttribute('href') || '';
        if (targetHref.includes(h) || (h.startsWith('#') && targetHref.endsWith(h))) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    document.addEventListener('click', async (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Ignore external or non-HTTP links
      if (link.target === '_blank' || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        return;
      }

      const currentUrl = new URL(window.location.href);
      const targetUrl = new URL(href, window.location.href);

      // Same page anchor scroll (e.g. #jadwal or #about on index.html)
      if (currentUrl.pathname === targetUrl.pathname && targetUrl.hash) {
        const targetEl = document.querySelector(targetUrl.hash);
        if (targetEl) {
          e.preventDefault();
          const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 72;
          window.scrollTo({ top: topPos, behavior: 'instant' });
          history.pushState(null, '', href);
          updateNavLinksActive(href);

          const navMenu = document.getElementById('nav-menu');
          const mobileToggle = document.getElementById('mobile-toggle');
          if (navMenu) navMenu.classList.remove('open');
          if (mobileToggle) mobileToggle.classList.remove('active');
        }
        return;
      }

      // Check if navigating between index.html and album-lagu.html
      const isSwitchingPage = (
        (currentUrl.pathname.includes('album-lagu') && (targetUrl.pathname.includes('index.html') || targetUrl.pathname.endsWith('/'))) ||
        (currentUrl.pathname.includes('index.html') && targetUrl.pathname.includes('album-lagu'))
      );

      if (isSwitchingPage) {
        e.preventDefault();

        // Close mobile menu immediately
        const navMenu = document.getElementById('nav-menu');
        const mobileToggle = document.getElementById('mobile-toggle');
        if (navMenu) navMenu.classList.remove('open');
        if (mobileToggle) mobileToggle.classList.remove('active');

        const targetFile = targetUrl.pathname.includes('album-lagu') ? 'album-lagu.html' : 'index.html';
        const currentMain = document.querySelector('main.main-content');

        // Function to apply DOM swap and instant positioning
        function applySwap(mainHtml, pageTitle) {
          if (!currentMain) return;
          currentMain.innerHTML = mainHtml;
          if (pageTitle) document.title = pageTitle;
          history.pushState(null, '', href);
          updateNavLinksActive(href);

          // ⚡ Instant scroll positioning without slow delay
          if (targetUrl.hash) {
            const targetEl = document.querySelector(targetUrl.hash);
            if (targetEl) {
              const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 72;
              window.scrollTo({ top: topPos, behavior: 'instant' });
            } else {
              window.scrollTo({ top: 0, behavior: 'instant' });
            }
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }

          // Re-bind dynamic modules immediately
          attachTrackRowListeners();
          if (window._initGodsHeroes3D) window._initGodsHeroes3D();
          if (window._initCardSpotlightAndTilt) window._initCardSpotlightAndTilt();
          if (window._initMagneticButtons) window._initMagneticButtons();
          if (window._bindSoundTriggers) window._bindSoundTriggers();
          if (window._initHeroAmbientVideo) window._initHeroAmbientVideo();
          if (window._initCinematicScrollHorizon) window._initCinematicScrollHorizon();
        }

        // 🚀 Check Instant In-Memory Cache first (0ms latency!)
        if (pageCache[targetFile]) {
          applySwap(pageCache[targetFile].mainHtml, pageCache[targetFile].title);
          return;
        }

        // Fallback: Fetch if not yet in cache
        try {
          const res = await fetch(targetUrl.href);
          if (!res.ok) throw new Error('Fetch failed');
          const htmlText = await res.text();
          const doc = new DOMParser().parseFromString(htmlText, 'text/html');
          const newMain = doc.querySelector('main.main-content');
          if (newMain) {
            pageCache[targetFile] = {
              mainHtml: newMain.innerHTML,
              title: doc.title || document.title
            };
            applySwap(newMain.innerHTML, doc.title);
          } else {
            window.location.href = href;
          }
        } catch (err) {
          window.location.href = href;
        }
      }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      const targetFile = window.location.pathname.includes('album-lagu') ? 'album-lagu.html' : 'index.html';
      const currentMain = document.querySelector('main.main-content');
      if (pageCache[targetFile] && currentMain) {
        currentMain.innerHTML = pageCache[targetFile].mainHtml;
        if (pageCache[targetFile].title) document.title = pageCache[targetFile].title;
        if (window.location.hash) {
          const targetEl = document.querySelector(window.location.hash);
          if (targetEl) {
            const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - 72;
            window.scrollTo({ top: topPos, behavior: 'instant' });
          }
        }
        attachTrackRowListeners();
        if (window._initGodsHeroes3D) window._initGodsHeroes3D();
        if (window._initCardSpotlightAndTilt) window._initCardSpotlightAndTilt();
        if (window._initMagneticButtons) window._initMagneticButtons();
        if (window._bindSoundTriggers) window._bindSoundTriggers();
        if (window._initHeroAmbientVideo) window._initHeroAmbientVideo();
        if (window._initCinematicScrollHorizon) window._initCinematicScrollHorizon();
      } else {
        window.location.reload();
      }
    });
  }

  // ── Landon Norris-Inspired Hero Ambient Video Controller ──
  function initHeroAmbientVideo() {
    const heroSection = document.getElementById('hero') || document.querySelector('.hero-section');
    const heroVideo = document.getElementById('hero-bg-video');

    if (!heroVideo || !heroSection) return;

    // 1. Ensure Autoplay Muted
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      const startPlay = () => {
        heroVideo.play();
        window.removeEventListener('click', startPlay);
        window.removeEventListener('touchstart', startPlay);
      };
      window.addEventListener('click', startPlay, { once: true });
      window.addEventListener('touchstart', startPlay, { once: true });
    });
  }
  window._initHeroAmbientVideo = initHeroAmbientVideo;

  // ── 16. Awwwards Creative: Liquid Bioluminescence Fluid Wake Canvas ──
  function initBiolumFluidCanvas() {
    const canvas = document.getElementById('biolum-fluid-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isRunning = false;
    let particles = [];
    const maxParticles = 42;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const colorPalettes = [
      { r: 0, g: 229, b: 255 },  // Electric Cyan
      { r: 255, g: 215, b: 0 },  // Celestial Gold
      { r: 0, g: 255, b: 170 },  // Biolum Emerald
      { r: 168, g: 85, b: 247 }  // Deep Lavender
    ];

    function addParticle(x, y, vx, vy) {
      if (particles.length >= maxParticles) {
        particles.shift();
      }
      const color = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (vx * 0.16 + (Math.random() - 0.5) * 1.1),
        vy: (vy * 0.16 + (Math.random() - 0.5) * 1.1) - 0.3,
        radius: Math.random() * 20 + 12,
        maxRadius: Math.random() * 36 + 24,
        alpha: 0.52,
        life: 1.0,
        decay: Math.random() * 0.016 + 0.013,
        color
      });

      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(loop);
      }
    }

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    function onPointerMove(e) {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      if (!clientX && !clientY) return;

      const vx = ((clientX - lastX) / dt) * 16;
      const vy = ((clientY - lastY) / dt) * 16;
      lastX = clientX;
      lastY = clientY;
      lastTime = now;

      addParticle(clientX, clientY, vx, vy);
      if (Math.random() > 0.45) {
        addParticle(clientX + (Math.random() - 0.5) * 14, clientY + (Math.random() - 0.5) * 14, vx * 0.6, vy * 0.6);
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    function loop() {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.radius += (p.maxRadius - p.radius) * 0.045;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const curAlpha = p.alpha * p.life;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${curAlpha.toFixed(3)})`);
        grad.addColorStop(0.38, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${(curAlpha * 0.4).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (particles.length > 0) {
        requestAnimationFrame(loop);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, width, height);
      }
    }
  }

  // ── 17. Awwwards Creative: Cinematic Scroll Horizon Transition ──
  function initCinematicScrollHorizon() {
    const heroContent = document.querySelector('.hero-content');
    const heroVideo = document.getElementById('hero-bg-video');
    if (!heroContent) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight || 800;
          const progress = Math.min(Math.max(scrollY / (vh * 0.8), 0), 1);

          if (progress > 0) {
            heroContent.style.transform = `translate3d(0, -${(progress * 26).toFixed(1)}px, 0) scale(${(1 - progress * 0.05).toFixed(3)})`;
            heroContent.style.opacity = (1 - progress * 0.82).toFixed(2);
            if (heroVideo) {
              heroVideo.style.transform = `scale(${(1 + progress * 0.05).toFixed(3)})`;
            }
          } else {
            heroContent.style.transform = '';
            heroContent.style.opacity = '';
            if (heroVideo) heroVideo.style.transform = '';
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  window._initCinematicScrollHorizon = initCinematicScrollHorizon;

  initHeroAmbientVideo();
  initBiolumFluidCanvas();
  initCinematicScrollHorizon();
  setupSeamlessNav();
});
