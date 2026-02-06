/**
 * Dropdown menu utilities
 * Handles opening, closing, and keyboard navigation
 */

export interface DropdownElements {
    container: Element;
    trigger: HTMLElement;
    menu: HTMLElement;
    chevron?: HTMLElement;
}

export interface DropdownOptions {
    closeDelay?: number;
    openClasses?: string[];
    closeClasses?: string[];
}

const DEFAULT_OPTIONS: Required<DropdownOptions> = {
    closeDelay: 120,
    openClasses: ['opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto'],
    closeClasses: ['opacity-0', 'invisible', 'translate-y-1', 'pointer-events-none'],
};

/**
 * Toggles dropdown state
 */
export function toggleDropdown(
    elements: DropdownElements,
    isOpen: boolean,
    options: DropdownOptions = {}
): void {
    const { trigger, menu, chevron } = elements;
    const { openClasses, closeClasses } = { ...DEFAULT_OPTIONS, ...options };

    if (isOpen) {
        menu.classList.remove(...closeClasses);
        menu.classList.add(...openClasses);
        trigger.setAttribute('aria-expanded', 'true');
        chevron?.classList.add('rotate-180');
    } else {
        menu.classList.add(...closeClasses);
        menu.classList.remove(...openClasses);
        trigger.setAttribute('aria-expanded', 'false');
        chevron?.classList.remove('rotate-180');
    }
}

/**
 * Creates a dropdown controller with hover and click support
 */
export function createDropdown(
    selector: string,
    options: DropdownOptions = {}
): (() => void) | null {
    const container = document.querySelector(selector);
    if (!container) {
        console.warn(`Dropdown container not found: ${selector}`);
        return null;
    }

    const trigger = container.querySelector('.nav-dropdown-trigger') as HTMLElement;
    const menu = container.querySelector('.nav-dropdown-menu') as HTMLElement;
    const chevron = container.querySelector('.nav-dropdown-chevron') as HTMLElement;

    if (!trigger || !menu) {
        console.warn('Dropdown trigger or menu not found');
        return null;
    }

    const elements: DropdownElements = { container, trigger, menu, chevron };
    const { closeDelay } = { ...DEFAULT_OPTIONS, ...options };
    let closeTimeout: ReturnType<typeof setTimeout> | null = null;

    const open = () => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
        }
        toggleDropdown(elements, true, options);
    };

    const close = () => {
        closeTimeout = setTimeout(() => {
            toggleDropdown(elements, false, options);
        }, closeDelay);
    };

    const handleClick = () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            if (closeTimeout) clearTimeout(closeTimeout);
            toggleDropdown(elements, false, options);
        } else {
            open();
        }
    };

    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
            if (closeTimeout) clearTimeout(closeTimeout);
            toggleDropdown(elements, false, options);
            trigger.focus();
        }
    };

    // Event listeners
    container.addEventListener('mouseenter', open);
    container.addEventListener('mouseleave', close);
    trigger.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);

    // Cleanup function
    return () => {
        container.removeEventListener('mouseenter', open);
        container.removeEventListener('mouseleave', close);
        trigger.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleEscape);
    };
}
