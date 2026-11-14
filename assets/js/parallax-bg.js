// Parallax Background Color System
// Changes background color based on which section is in view

document.addEventListener('DOMContentLoaded', function() {
    const sections = [
        { selector: '.header', bgClass: 'bg-header' },
        { selector: '.invitation.section', bgClass: 'bg-invitation' },
        { selector: '.events.section', bgClass: 'bg-events' },
        { selector: '.love-story.section', bgClass: 'bg-love-story' },
        { selector: '.dress-code.section', bgClass: 'bg-dress-code' },
        { selector: '.color-palette-section.section', bgClass: 'bg-color-palette' },
        { selector: '.rsvp-section.section', bgClass: 'bg-rsvp' },
        { selector: '.question.section', bgClass: 'bg-faq' }
    ];

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find which section is intersecting
                const section = sections.find(s => entry.target === document.querySelector(s.selector));
                if (section) {
                    // Remove all bg classes
                    sections.forEach(s => document.body.classList.remove(s.bgClass));
                    // Add the current section's bg class
                    document.body.classList.add(section.bgClass);
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        const element = document.querySelector(section.selector);
        if (element) {
            observer.observe(element);
        }
    });

    // Set initial background color
    const firstSection = document.querySelector(sections[0].selector);
    if (firstSection) {
        document.body.classList.add(sections[0].bgClass);
    }
});
