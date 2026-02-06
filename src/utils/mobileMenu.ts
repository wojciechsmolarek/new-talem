/**
 * Mobile menu utilities
 * Handles mobile navigation menu toggle, animations, and accordion submenu
 */

export interface MobileMenuElements {
    button: HTMLElement;
    menu: HTMLElement;
    overlay?: HTMLElement;
    menuIcon?: HTMLElement;
    closeIcon?: HTMLElement;
}

/**
 * Toggles mobile menu state
 */
export function toggleMobileMenu(elements: MobileMenuElements, isOpen: boolean): void {
    const { button, menu, overlay, menuIcon, closeIcon } = elements;

    if (isOpen) {
        menu.classList.remove('translate-x-full');
        menu.classList.add('translate-x-0');
        overlay?.classList.remove('opacity-0', 'pointer-events-none');
        overlay?.classList.add('opacity-100', 'pointer-events-auto');
        button.setAttribute('aria-expanded', 'true');

        // Toggle icons
        menuIcon?.classList.add('hidden');
        closeIcon?.classList.remove('hidden');

        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        menu.classList.add('translate-x-full');
        menu.classList.remove('translate-x-0');
        overlay?.classList.add('opacity-0', 'pointer-events-none');
        overlay?.classList.remove('opacity-100', 'pointer-events-auto');
        button.setAttribute('aria-expanded', 'false');

        // Toggle icons
        menuIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');

        document.body.style.overflow = ''; // Restore scrolling
    }
}

/**
 * Creates a mobile services accordion controller
 */
function createServicesAccordion(): (() => void) | null {
    const toggle = document.querySelector('[data-mobile-services-toggle]') as HTMLElement;
    const submenu = document.querySelector('[data-mobile-services-menu]') as HTMLElement;
    const chevron = document.querySelector('[data-mobile-services-chevron]') as HTMLElement;

    if (!toggle || !submenu) {
        return null;
    }

    const handleToggle = () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            submenu.style.maxHeight = '0';
            toggle.setAttribute('aria-expanded', 'false');
            chevron?.classList.remove('rotate-180');
        } else {
            submenu.style.maxHeight = submenu.scrollHeight + 'px';
            toggle.setAttribute('aria-expanded', 'true');
            chevron?.classList.add('rotate-180');
        }
    };

    toggle.addEventListener('click', handleToggle);

    // Cleanup function
    return () => {
        toggle.removeEventListener('click', handleToggle);
    };
}

/**
 * Creates a mobile menu controller
 */
export function createMobileMenu(): (() => void) | null {
    const button = document.querySelector('[data-mobile-menu-button]') as HTMLElement;
    const menu = document.querySelector('[data-mobile-menu]') as HTMLElement;
    const overlay = document.querySelector('[data-mobile-menu-overlay]') as HTMLElement;
    const menuIcon = document.querySelector('[data-menu-icon]') as HTMLElement;
    const closeIcon = document.querySelector('[data-close-icon]') as HTMLElement;

    if (!button || !menu) {
        console.warn('Mobile menu button or menu not found');
        return null;
    }

    const elements: MobileMenuElements = { button, menu, overlay, menuIcon, closeIcon };

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

    // Close menu when clicking on links (except accordion toggle)
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach((link) => {
        link.addEventListener('click', handleClose);
    });

    // Initialize services accordion
    const cleanupAccordion = createServicesAccordion();

    // Cleanup function
    return () => {
        button.removeEventListener('click', handleToggle);
        overlay?.removeEventListener('click', handleClose);
        document.removeEventListener('keydown', handleEscape);
        menuLinks.forEach((link) => {
            link.removeEventListener('click', handleClose);
        });
        cleanupAccordion?.();
    };
}
