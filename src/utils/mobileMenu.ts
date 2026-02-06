/**
 * Mobile menu utilities
 * Handles mobile navigation menu toggle and animations
 */

export interface MobileMenuElements {
    button: HTMLElement;
    menu: HTMLElement;
    overlay?: HTMLElement;
}

/**
 * Toggles mobile menu state
 */
export function toggleMobileMenu(elements: MobileMenuElements, isOpen: boolean): void {
    const { button, menu, overlay } = elements;

    if (isOpen) {
        menu.classList.remove('translate-x-full');
        menu.classList.add('translate-x-0');
        overlay?.classList.remove('opacity-0', 'pointer-events-none');
        overlay?.classList.add('opacity-100', 'pointer-events-auto');
        button.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        menu.classList.add('translate-x-full');
        menu.classList.remove('translate-x-0');
        overlay?.classList.add('opacity-0', 'pointer-events-none');
        overlay?.classList.remove('opacity-100', 'pointer-events-auto');
        button.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

/**
 * Creates a mobile menu controller
 */
export function createMobileMenu(): (() => void) | null {
    const button = document.querySelector('[data-mobile-menu-button]') as HTMLElement;
    const menu = document.querySelector('[data-mobile-menu]') as HTMLElement;
    const overlay = document.querySelector('[data-mobile-menu-overlay]') as HTMLElement;

    if (!button || !menu) {
        console.warn('Mobile menu button or menu not found');
        return null;
    }

    const elements: MobileMenuElements = { button, menu, overlay };

    const handleToggle = () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        toggleMobileMenu(elements, !isOpen);
    };

    const handleClose = () => {
        toggleMobileMenu(elements, false);
    };

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
            handleClose();
            button.focus();
        }
    };

    // Event listeners
    button.addEventListener('click', handleToggle);
    overlay?.addEventListener('click', handleClose);
    document.addEventListener('keydown', handleEscape);

    // Close menu when clicking on links
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach((link) => {
        link.addEventListener('click', handleClose);
    });

    // Cleanup function
    return () => {
        button.removeEventListener('click', handleToggle);
        overlay?.removeEventListener('click', handleClose);
        document.removeEventListener('keydown', handleEscape);
        menuLinks.forEach((link) => {
            link.removeEventListener('click', handleClose);
        });
    };
}
