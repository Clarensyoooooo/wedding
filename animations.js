// GSAP is loaded from CDN in index.html
// ScrollTrigger plugin is also loaded from CDN
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════════════════════
// FLOATING FLOWER PARTICLES - Creates romantic floating elements
// ═══════════════════════════════════════════════════════════════════════
function createFloatingFlowers() {
  const container = document.body;
  const flowerEmojis = ['🌸', '🌹', '💐', '🌺', '🌼', '🌻', '🥀'];
  
  // Create floating flower particles
  for (let i = 0; i < 15; i++) {
    const flower = document.createElement('div');
    flower.innerHTML = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.position = 'fixed';
    flower.style.pointerEvents = 'none';
    flower.style.fontSize = Math.random() * 30 + 20 + 'px';
    flower.style.opacity = Math.random() * 0.3 + 0.1;
    flower.style.left = Math.random() * 100 + '%';
    flower.style.top = Math.random() * 100 + '%';
    flower.style.zIndex = 1;
    
    container.appendChild(flower);
    
    // Floating animation
    gsap.to(flower, {
      y: gsap.utils.random(-100, 100),
      x: gsap.utils.random(-100, 100),
      rotation: gsap.utils.random(-360, 360),
      duration: gsap.utils.random(8, 15),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════
// SCROLL-TRIGGERED ENTRANCE ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════

function initScrollAnimations() {
  // Hero section fade-in with scale
  const hero = document.querySelector('.sec-hero');
  if (hero) {
    const heroContent = hero.querySelectorAll('h1, .hero-subtitle, .hero-date');
    gsap.set(heroContent, { opacity: 0, y: 30 });
    gsap.to(heroContent, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: hero,
        start: 'top center'
      }
    });
  }

  // Section headings with elegant line animation
  document.querySelectorAll('h2').forEach((heading) => {
    gsap.set(heading, { opacity: 0, y: 20 });
    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%'
      }
    });
  });

  // Story cards with staggered entrance
  document.querySelectorAll('.story-card, .story-item').forEach((card) => {
    gsap.set(card, { opacity: 0, scale: 0.9, y: 30 });
    gsap.to(card, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: 'back.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    });
  });

  // Timeline trail items with sophisticated slide-in
  document.querySelectorAll('.trail-item').forEach((item, index) => {
    const isRight = item.classList.contains('fi') && index % 2 === 0;
    gsap.set(item, { opacity: 0, x: isRight ? 100 : -100, y: 30 });
    gsap.to(item, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.9,
      delay: index * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%'
      }
    });

    // Animate the polaroid photos with a flip effect
    const polaroid = item.querySelector('.polaroid');
    if (polaroid) {
      gsap.set(polaroid, { rotationY: -90, transformPerspective: 1000 });
      gsap.to(polaroid, {
        rotationY: 0,
        duration: 1,
        delay: (index * 0.1) + 0.2,
        ease: 'back.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%'
        }
      });
    }

    // Trail dots pulse
    const dot = item.querySelector('.trail-dot-inner');
    if (dot) {
      gsap.set(dot, { scale: 0, opacity: 0 });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: (index * 0.1) + 0.3,
        ease: 'back.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%'
        }
      });

      // Pulsing animation on dots
      gsap.to(dot, {
        boxShadow: '0 0 15px rgba(200, 113, 74, 0.6)',
        scale: 1.2,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        delay: (index * 0.1) + 0.3
      });
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════
// PARALLAX EFFECTS ON SCROLL
// ═══════════════════════════════════════════════════════════════════════

function initParallax() {
  // Parallax background sections
  document.querySelectorAll('.sec-bg').forEach((bg) => {
    gsap.to(bg, {
      y: (i, target) => gsap.utils.unitize(
        gsap.getProperty(target, 'offsetHeight') * 0.5
      ),
      ease: 'none',
      scrollTrigger: {
        trigger: bg.parentElement,
        scrub: 1,
        start: 'top center',
        end: 'bottom center'
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// INTERACTIVE HOVER ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════

function initHoverAnimations() {
  // Story cards hover effect
  document.querySelectorAll('.story-card, .story-item').forEach((card) => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
        boxShadow: '0 20px 40px rgba(200, 113, 74, 0.3)'
      });
    });

    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });

  // Polaroid photos hover effect
  document.querySelectorAll('.polaroid').forEach((photo) => {
    photo.addEventListener('mouseenter', function() {
      gsap.to(this, {
        rotationZ: gsap.utils.random(-3, 3),
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });

    photo.addEventListener('mouseleave', function() {
      gsap.to(this, {
        rotationZ: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// TEXT ANIMATIONS - Letter-by-letter, word reveals
// ═══════════════════════════════════════════════════════════════════════

function initTextAnimations() {
  // Hero title elaborate animation
  const heroTitle = document.querySelector('.sec-hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = 0;
      span.style.display = 'inline-block';
      span.style.transformOrigin = 'center';
      heroTitle.appendChild(span);
    });

    gsap.to('.sec-hero h1 span', {
      opacity: 1,
      duration: 0.05,
      stagger: 0.08,
      ease: 'power2.out'
    });
  }

  // Eyebrow text with elegant reveal
  document.querySelectorAll('.eyebrow').forEach((eyebrow) => {
    gsap.set(eyebrow, { opacity: 0, x: -20 });
    gsap.to(eyebrow, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: eyebrow,
        start: 'top 85%'
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// MORPHING SHAPES & DECORATIVE ELEMENTS
// ═══════════════════════════════════════════════════════════════════════

function initDecorativeAnimations() {
  // Floral accents
  document.querySelectorAll('.floral-accent').forEach((accent) => {
    gsap.to(accent, {
      opacity: gsap.utils.random(0.4, 0.8),
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Subtle rotation
    gsap.to(accent, {
      rotation: gsap.utils.random(-5, 5),
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });

  // Delicate frame entrance
  document.querySelectorAll('.delicate-frame').forEach((frame) => {
    gsap.set(frame, { opacity: 0, scale: 0.95, y: 20 });
    gsap.to(frame, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: frame,
        start: 'top 75%'
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// BUTTON & CTA ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════

function initButtonAnimations() {
  document.querySelectorAll('button, a[class*="btn"], .btn').forEach((btn) => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.08,
        duration: 0.3,
        ease: 'back.out'
      });

      gsap.to(this, {
        boxShadow: '0 15px 35px rgba(200, 113, 74, 0.4)',
        duration: 0.3
      });
    });

    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(this, {
        boxShadow: '0 5px 15px rgba(200, 113, 74, 0.2)',
        duration: 0.3
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SCROLL-DEPENDENT BLOOM EFFECT
// ═══════════════════════════════════════════════════════════════════════

function initBloomEffect() {
  // Create bloom overlay elements
  const bloomElements = document.querySelectorAll('[class*="bloom"], [class*="accent"]');
  
  bloomElements.forEach((el) => {
    const bloomDot = document.createElement('div');
    bloomDot.style.position = 'absolute';
    bloomDot.style.borderRadius = '50%';
    bloomDot.style.pointerEvents = 'none';
    bloomDot.style.background = 'radial-gradient(circle, rgba(200, 113, 74, 0.2) 0%, transparent 70%)';
    bloomDot.style.width = '100px';
    bloomDot.style.height = '100px';
    bloomDot.style.left = '-50px';
    bloomDot.style.top = '-50px';
    
    // Animate bloom
    gsap.to(bloomDot, {
      scale: gsap.utils.random(0.8, 1.2),
      opacity: gsap.utils.random(0.3, 0.6),
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE LOAD ANIMATION
// ═══════════════════════════════════════════════════════════════════════

function initPageLoadAnimation() {
  // Fade in page content
  document.body.style.opacity = '0';
  gsap.to(document.body, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  });

  // Subtle intro animation for first section
  const firstSection = document.querySelector('.sec');
  if (firstSection) {
    gsap.set(firstSection, { scale: 0.98, opacity: 0 });
    gsap.to(firstSection, {
      scale: 1,
      opacity: 1,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out'
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════
// CURSOR FOLLOW EFFECT (Subtle glow)
// ═══════════════════════════════════════════════════════════════════════

function initCursorGlow() {
  const cursorGlow = document.createElement('div');
  cursorGlow.style.position = 'fixed';
  cursorGlow.style.width = '300px';
  cursorGlow.style.height = '300px';
  cursorGlow.style.borderRadius = '50%';
  cursorGlow.style.background = 'radial-gradient(circle, rgba(200, 113, 74, 0.15) 0%, transparent 70%)';
  cursorGlow.style.pointerEvents = 'none';
  cursorGlow.style.zIndex = '0';
  cursorGlow.style.filter = 'blur(40px)';
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
      x: e.clientX - 150,
      y: e.clientY - 150,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════
// INITIALIZE ALL ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Create floating elements
  createFloatingFlowers();

  // Initialize all animation systems
  initPageLoadAnimation();
  initScrollAnimations();
  initParallax();
  initHoverAnimations();
  initTextAnimations();
  initDecorativeAnimations();
  initButtonAnimations();
  initCursorGlow();
  
  console.log('✨ Wedding animations initialized - romantic, flowery, and classy!');
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
