/* alex tt — минимум JS: скролл-появление разделов.
   Без JS (или без IntersectionObserver) всё видно сразу:
   класс .js ставится только здесь. */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  root.classList.add("js");

  // стагер 90 мс внутри групп [data-stagger]
  Array.prototype.forEach.call(document.querySelectorAll("[data-stagger]"), function (group) {
    Array.prototype.forEach.call(group.querySelectorAll(":scope > .reveal"), function (el, i) {
      el.style.transitionDelay = i * 90 + "ms";
    });
  });

  function showAll() {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (reduce || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  reveals.forEach(function (el) {
    io.observe(el);
  });
})();
