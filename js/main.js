// Simple scroll fade-in
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(40px)";
  section.style.transition = "all 0.8s ease";
  observer.observe(section);
});

// Count-up animation for metrics
const counters = document.querySelectorAll(".metric-card h3");

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const value = el.innerText.replace(/[^0-9.]/g, "");
    let start = 0;
    const end = parseFloat(value);

    const step = end / 60;

    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        el.innerText = el.innerText;
        clearInterval(interval);
      }
    }, 20);

    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });

counters.forEach(counter => countObserver.observe(counter));

// =============================
// SMOOTH SCROLL FOR NAV LINKS
// =============================
document.querySelectorAll('.nav-links a, .cta, .btn-primary, .btn-secondary').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70, // offset for navbar
        behavior: 'smooth'
      });
    }
  });
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

// Trigger count-up when dashboard is in view
function animateMetrics() {
  const metrics = document.querySelectorAll('.metric-card h3');
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

function parseMetric(text) {
  if (text.includes('K')) return parseFloat(text) * 1000;
  if (text.includes('M')) return parseFloat(text) * 1000000;
  if (text.includes('KES')) return parseFloat(text.replace('KES','').replace(/,/g,'')); 
  return parseInt(text);
}

window.addEventListener('scroll', animateMetrics);
window.addEventListener('load', animateMetrics);

// =============================
// FADE-IN ON SCROLL FOR SECTIONS
// =============================
const faders = document.querySelectorAll('.text-block, .story-card, .money-card, .app-text, .stat');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.classList.add('before-appear'); // initial hidden state
  appearOnScroll.observe(fader);
});
