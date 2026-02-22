/* =========================================
   Fleurir — JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ── Hamburger menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ── Scroll animations (Intersection Observer) ──
  const animElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations for sibling elements
        const parent = entry.target.parentElement;
        const siblings = parent.querySelectorAll('[data-animate]');
        let delay = 0;
        
        siblings.forEach((sibling, i) => {
          if (sibling === entry.target) {
            delay = i * 120;
          }
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  animElements.forEach(el => observer.observe(el));

  // ── Smooth scroll for navigation links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Parallax effect on hero ──
  const heroBg = document.querySelector('.hero-bg img');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset < window.innerHeight) {
      const offset = window.pageYOffset * 0.3;
      heroBg.style.transform = `scale(1.05) translateY(${offset}px)`;
    }
  });

});

// ── Toast notification ──
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
