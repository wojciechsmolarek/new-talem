/**
 * Shared Intersection Observer utility for scroll-triggered animations
 * Reduces code duplication across Hero, StatsBar, CaseStudies, and Process components
 */

export interface ObserverOptions {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

/**
 * Observes elements matching a selector and triggers a callback when they intersect
 * @param selector - CSS selector for elements to observe
 * @param callback - Function to call when element intersects
 * @param options - Intersection Observer options
 */
export function observeOnScroll(
    selector: string,
    callback: (element: Element) => void,
    options: ObserverOptions = {}
): IntersectionObserver {
    const { threshold = 0.1, rootMargin = '0px', once = true } = options;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    if (once) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        },
        { threshold, rootMargin }
    );

    document.querySelectorAll(selector).forEach((el) => observer.observe(el));

    return observer;
}

/**
 * Convenience function for animating elements on scroll
 * Adds a CSS class when element becomes visible
 * @param selector - CSS selector for elements to observe
 * @param className - CSS class to add on intersection
 * @param options - Intersection Observer options
 */
export function animateOnScroll(
    selector: string,
    className: string = 'is-visible',
    options: ObserverOptions = {}
): IntersectionObserver {
    return observeOnScroll(
        selector,
        (element) => {
            element.classList.add(className);
        },
        options
    );
}
