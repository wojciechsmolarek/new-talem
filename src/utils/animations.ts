/**
 * Animation utilities for number counters and scroll-triggered animations
 */

/**
 * Animates a number from 0 to target value
 * @param element - HTML element to animate
 * @param targetValue - Target number to count to
 * @param duration - Animation duration in milliseconds
 */
export function animateNumber(
    element: HTMLElement,
    targetValue: number,
    duration: number = 2000
): void {
    let currentValue = 0;
    const increment = targetValue / (duration / 16); // 60fps

    const updateCount = () => {
        currentValue += increment;
        if (currentValue < targetValue) {
            element.innerText = Math.floor(currentValue).toString();
            requestAnimationFrame(updateCount);
        } else {
            element.innerText = targetValue.toString();
        }
    };

    updateCount();
}

/**
 * Reveals element with fade and slide animation
 * @param element - Element to reveal
 */
export function revealElement(element: Element): void {
    const htmlElement = element as HTMLElement;
    htmlElement.style.opacity = '1';
    htmlElement.style.transform = 'translateY(0)';
}

/**
 * Slides element in from left
 * @param element - Element to slide in
 */
export function slideInElement(element: Element): void {
    const htmlElement = element as HTMLElement;
    htmlElement.style.opacity = '1';
    htmlElement.style.transform = 'translateX(0)';
}

/**
 * Sets up transition styles for an element
 * @param element - Element to add transition to
 * @param transition - CSS transition value
 */
export function setTransition(element: HTMLElement, transition: string): void {
    element.style.transition = transition;
}
