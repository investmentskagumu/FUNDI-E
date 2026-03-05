// =============================
// HERO ANIMATION ON LOAD
// =============================
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-content');
  hero.classList.add('animate-hero');
});

// =============================
// SIMPLE SECTION FADE-IN (scroll)
// =============================
const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(40px)";
  section.style.transition = "all 0.8s ease";
  sectionObserver.observe(section);
});

// =============================
// COUNT-UP ANIMATION FOR METRICS
// =============================
function countUp(el, start, end, duration) {
  let current = start;
  const range = end - start;
  const increment = range / (duration / 16); // approx 60fps
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    el.innerText = formatNumber(Math.floor(current));
  }, 16);
}

function formatNumber(num) {
  if (num >= 1000000) return (num/1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num/1000).toFixed(1) + 'K';
  return num;
}

function parseMetric(text) {
  if (text.includes('K')) return parseFloat(text) * 1000;
  if (text.includes('M')) return parseFloat(text) * 1000000;
  if (text.includes('KES')) return parseFloat(text.replace('KES','').replace(/,/g,'')); 
  return parseInt(text);
}

// Trigger count-up when metrics come into view
function animateMetrics() {
  const metrics = document.querySelectorAll('.metric-card h3, .stat h3');
  const triggerPoint = window.innerHeight * 0.8;
  metrics.forEach(metric => {
    const rect = metric.getBoundingClientRect();
    if (rect.top < triggerPoint && !metric.dataset.animated) {
      metric.dataset.animated = true;
      const endValue = parseMetric(metric.innerText);
      countUp(metric, 0, endValue, 1500);
    }
  });
}
window.addEventListener('scroll', animateMetrics);
window.addEventListener('load', animateMetrics);

// =============================
// FADE-IN ON SCROLL FOR SECTIONS
// =============================
const faders = document.querySelectorAll('.text-block, .story-card, .money-card, .app-text, .stat');

faders.forEach(fader => fader.classList.add('before-appear'));

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// =============================
// SMOOTH SCROLL FOR NAV LINKS
// =============================
document.querySelectorAll('.nav-links a, .cta, .btn-primary, .btn-secondary').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70, // navbar offset
        behavior: 'smooth'
      });
    }
  });
});

// =============================
// PARALLAX BACKGROUND
// =============================
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  const purpose = document.querySelector('.purpose-bg');
  const scrollY = window.scrollY;

  if(hero) hero.style.backgroundPosition = `center ${scrollY * 0.3}px`;
  if(purpose) purpose.style.backgroundPosition = `center ${scrollY * 0.2}px`;
});

// =============================
// HERO & STORY ANIMATION CLASSES (CSS dependent)
// =============================
// Add in style.css:
/*
.hero-content { opacity:0; transform:translateY(30px); transition: all 1s ease-out; }
.hero-content.animate-hero { opacity:1; transform:translateY(0); }

.before-appear { opacity:0; transform:translateY(50px); transition: all 0.8s ease-out; }
.appear { opacity:1; transform:translateY(0); }

.story-card { overflow:hidden; transition: transform 0.5s ease; }
.story-card:hover { transform:scale(1.05); }
.story-overlay { transform:translateY(100%); transition: transform 0.5s ease; }
.story-card:hover .story-overlay { transform:translateY(0); }
*/