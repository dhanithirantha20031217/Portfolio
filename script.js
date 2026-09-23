/* ============================================================
   DHANITH IRANTHA PORTFOLIO — script.js
   ============================================================ */

/* ============================================================
   1. LOADER
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    startHeroAnimations();
  }, 2200);
});

function startHeroAnimations() {
  document.querySelectorAll('.hero .reveal').forEach(el => {
    el.classList.add('visible');
  });
}

/* ============================================================
   2. CUSTOM CURSOR
   ============================================================ */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, folX = 0, folY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateFollower() {
  folX += (mouseX - folX) * 0.12;
  folY += (mouseY - folY) * 0.12;
  follower.style.left = folX + 'px';
  follower.style.top  = folY + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, input, textarea, .project-card, .cert-card, .edu-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
    follower.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.transform = 'translate(-50%,-50%) scale(1)';
    follower.style.opacity = '0.5';
  });
});

/* ============================================================
   3. NAVIGATION
   ============================================================ */
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const mobileMenu= document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// close menu on outside click
document.addEventListener('click', e => {
  if (!mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

/* ============================================================
   4. TYPING ANIMATION
   ============================================================ */
const roles = [
  'Software Engineering Undergraduate',
  'Full Stack Developer',
  'Problem Solver',
  'Tech Enthusiast',
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
    setTimeout(typeEffect, 85);
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeEffect, 45);
  }
}
setTimeout(typeEffect, 2400);

/* ============================================================
   5. PARTICLE CANVAS BACKGROUND
   ============================================================ */
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.a  = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${this.a})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.floor((W * H) / 14000);
    particles = Array.from({ length: count }, () => new Particle());
  }
  initParticles();

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ============================================================
   6. SCROLL REVEAL (fade-up elements)
   ============================================================ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.edu-card, .project-card, .cert-card, .skill-cat, .contact-item, .contact-form, .contact-info, .about-grid > *').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

/* ============================================================
   7. SKILL BARS ANIMATION
   ============================================================ */
function buildSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const pct   = bar.getAttribute('data-pct');
    const label = bar.getAttribute('data-skill');

    // build DOM inside the bar element
    const bgDiv = document.createElement('div');
    bgDiv.style.cssText = `height:5px;background:var(--bg3);border-radius:4px;overflow:hidden;position:relative;margin-top:8px;`;

    const fill = document.createElement('div');
    fill.classList.add('skill-bar-fill');
    fill.style.width = '0%';
    bgDiv.appendChild(fill);

    const pctLabel = document.createElement('div');
    pctLabel.classList.add('skill-bar-pct');
    pctLabel.textContent = pct + '%';

    bar.appendChild(bgDiv);
    bar.appendChild(pctLabel);

    // animate when visible
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => { fill.style.width = pct + '%'; }, 200);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(bar);
  });
}
buildSkillBars();

/* ============================================================
   8. CONTACT FORM
   ============================================================ */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate form submission (replace with your actual backend/email API)
  setTimeout(() => {
    document.getElementById('formSuccess').classList.add('visible');
    this.reset();
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    setTimeout(() => {
      document.getElementById('formSuccess').classList.remove('visible');
    }, 5000);
  }, 1500);
});

/* ============================================================
   9. ACTIVE NAV LINK ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sec.id) {
          link.classList.add('active');
        }
      });
    }
  });
});

/* active link style */
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--accent); } .nav-link.active::after { width: 100%; }`;
document.head.appendChild(style);

/* ============================================================
   10. SMOOTH COUNTER (optional stat numbers if added)
   ============================================================ */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    el.textContent = Math.min(Math.floor(start), target);
    if (start >= target) clearInterval(timer);
  }, 16);
}

// Auto-fire for any [data-count] elements
document.querySelectorAll('[data-count]').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounter(el, parseInt(el.getAttribute('data-count')));
      obs.disconnect();
    }
  }, { threshold: 0.6 });
  obs.observe(el);
});

/* ============================================================
   11. BACK TO TOP VISIBILITY
   ============================================================ */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.style.opacity = window.scrollY > 400 ? '1' : '0';
  backTop.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
});
backTop.style.opacity = '0';
backTop.style.transition = 'opacity 0.3s';

/* ============================================================
   12. GLITCH HOVER on hero name (fun extra)
   ============================================================ */
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.style.textShadow = `
      2px 0 var(--accent2), -2px 0 var(--accent),
      0 0 20px var(--accent-glow)
    `;
    setTimeout(() => { heroName.style.textShadow = ''; }, 300);
  });
}

console.log('%c🚀 Portfolio by Dhanith Irantha', 'color:#00d4ff;font-size:1.2rem;font-weight:bold;');
console.log('%c✉ Contact: dhanith@email.com', 'color:#8899aa;');
