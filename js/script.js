/* ── Language Toggle ── */
function toggleLang() {
  const html = document.documentElement;
  if (html.lang === "fa") {
    html.lang = "en";
    html.dir = "ltr";
  } else {
    html.lang = "fa";
    html.dir = "rtl";
  }
}

/* ── Starfield ── */
function initStarfield() {
  const c = document.getElementById("starfield");
  if (!c) return;
  const ctx = c.getContext("2d");
  let stars = [];

  function resize() {
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
    if (c.width === 0 || c.height === 0) return;
    init();
  }

  function init() {
    stars = [];
    const n = Math.floor((c.width * c.height) / 3800);
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.3 + 0.2,
        o: Math.random() * 0.5 + 0.08,
        spd: Math.random() * 0.004 + 0.001,
        dir: Math.random() > 0.5 ? 1 : -1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach(function (s) {
      s.o += s.spd * s.dir;
      if (s.o > 0.65 || s.o < 0.05) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(106,173,255," + s.o + ")";
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () {
            e.target.classList.add("visible");
          }, i * 80);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  els.forEach(function (el) { io.observe(el); });
}

/* ── Swiper ── */
function initSwiper() {
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 15,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () { animateVisibleSlides(this); },
      slideChangeTransitionEnd: function () { animateVisibleSlides(this); }
    }
  });
}

function animateVisibleSlides(swiper) {
  swiper.slides.forEach(function (slide) {
    slide.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.remove("visible");
    });
  });
  swiper.el
    .querySelectorAll(".swiper-slide-active, .swiper-slide-next")
    .forEach(function (slide) {
      slide.querySelectorAll(".reveal").forEach(function (el) {
        void el.offsetWidth;
        el.classList.add("visible");
      });
    });
}

/* ── Preloader ── */
document.addEventListener("DOMContentLoaded", function () {
  var preloader = document.getElementById("preloader");
  var preloaderText = document.getElementById("preloader-text");
  var text = preloaderText.innerText.trim();

  preloaderText.innerHTML = "";

  text.split("").forEach(function (char, index) {
    var span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.animationDelay = (index * 0.1) + "s";
    preloaderText.appendChild(span);
  });

  var typingDuration = text.length * 100 + 1000;

  var removed = false;
  function removePreloader() {
    if (removed) return;
    removed = true;

    preloaderText.classList.add("text-exit");

    setTimeout(function () {
      preloader.classList.add("fade-out");
      // Init everything AFTER preloader is gone
      initStarfield();
      initScrollReveal();
      initSwiper();
    }, 800);
  }

  window.addEventListener("load", function () {
    setTimeout(removePreloader, typingDuration);
  });

  // Fallback
  setTimeout(removePreloader, typingDuration + 3000);
});