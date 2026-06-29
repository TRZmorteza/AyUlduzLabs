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
(function () {
  const c = document.getElementById("starfield");
  const ctx = c.getContext("2d");
  let stars = [];

  function resize() {
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
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
    stars.forEach((s) => {
      s.o += s.spd * s.dir;
      if (s.o > 0.65 || s.o < 0.05) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(106,173,255,${s.o})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();

/* ── Scroll Reveal ── */
(function () {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 80);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
})();





function revealElement(el) {
  el.classList.remove("visible");

  // force reflow
  el.offsetHeight;

  el.classList.add("visible");
}
//------------------------------------------------------------------
var swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 15,

  on: {
  init() {
    animateVisibleSlides(this);
  },
  slideChangeTransitionEnd() {
    animateVisibleSlides(this);
  }
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
});

function animateVisibleSlides(swiper) {
  // Remove visible from everything
  swiper.slides.forEach((slide) => {
    slide.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("visible");
    });
  });

  // Animate the two visible slides
  swiper.el
    .querySelectorAll(".swiper-slide-active, .swiper-slide-next")
    .forEach((slide) => {
      slide.querySelectorAll(".reveal").forEach((el) => {
        void el.offsetWidth;
        el.classList.add("visible");
      });
    });

}