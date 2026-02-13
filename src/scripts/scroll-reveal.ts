/**
 * Shared scroll reveal animation
 * Usage: Add data-reveal attribute to elements you want to animate
 * Optional: data-reveal="slide-left" for left slide animation
 */
export function initScrollReveal(): void {
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (revealElements.length === 0) return;

  const revealOnScroll = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement;
        target.style.opacity = "1";
        target.style.transform = "translate(0)";
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, {
    threshold: 0.1,
  });

  revealElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const type = el.getAttribute("data-reveal");

    htmlEl.style.opacity = "0";
    htmlEl.style.transition = "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";

    if (type === "slide-left") {
      htmlEl.style.transform = "translateX(-20px)";
    } else {
      htmlEl.style.transform = "translateY(32px)";
    }

    observer.observe(el);
  });
}

/**
 * Animate numbers on scroll
 * Usage: Add data-count-to="123" attribute to elements
 */
export function initCountAnimation(): void {
  const countElements = document.querySelectorAll("[data-count-to]");

  if (countElements.length === 0) return;

  const animateCount = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement;
        const countTo = parseInt(target.getAttribute("data-count-to") || "0");
        let count = 0;
        const duration = 2000;
        const increment = countTo / (duration / 16);

        const updateCount = () => {
          count += increment;
          if (count < countTo) {
            target.innerText = Math.floor(count).toString();
            requestAnimationFrame(updateCount);
          } else {
            target.innerText = countTo.toString();
          }
        };

        updateCount();
        observer.unobserve(target);
      }
    });
  };

  const observer = new IntersectionObserver(animateCount, {
    threshold: 0.1,
  });

  countElements.forEach((el) => observer.observe(el));
}

// Auto-init when DOM is ready
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initCountAnimation();
  });
}
