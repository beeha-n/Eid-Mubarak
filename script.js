// ============================================
// DOM ELEMENTS
// ============================================
const welcomeSection = document.getElementById('welcome-section');
const envelopeSection = document.getElementById('envelope-section');
const greetingSection = document.getElementById('greeting-section');
const messageSection = document.getElementById('message-section');

const continueBtn = document.getElementById('continueBtn');
const userNameInput = document.getElementById('userName');
const greetingName = document.getElementById('greetingName');
const displayName = document.getElementById('displayName');

const envelope = document.getElementById('envelope');
const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');

const confettiContainer = document.getElementById('confetti-container');
const typewriterText = document.getElementById('typewriter-text');
const eidBadge = document.getElementById('eidBadge');

const closeBtn = document.getElementById('closeBtn');
const closingOverlay = document.getElementById('closing-overlay');
const restartBtn = document.getElementById('restartBtn');

// ============================================
// VARIABLES
// ============================================
let userName = 'Friend';
let messageSectionShown = false;
let typewriterInterval = null;

// ============================================
// GREETING MESSAGE
// ============================================
const greetingMessage = `As the moon graces the sky and marks the end of Ramadan, may your heart be filled with peace, joy, and endless blessings.

May this Eid bring you closer to your loved ones, fill your home with laughter, and shower you with happiness that lasts throughout the year.

Wishing you delicious feasts, beautiful moments, and memories to cherish forever.

May Allah accept your prayers and grant you everything your heart desires.

With love and warm wishes on this blessed day! 🌙✨

~beeha ♡`;

// ============================================
// HELPER FUNCTIONS
// ============================================

// Show a specific section
function showSection(sectionToShow) {
    // Hide all sections
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the target section
    sectionToShow.classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Create confetti effect
function createConfetti() {
    const colors = [
        '#FFB6C1', // Pink
        '#FF69B4', // Hot Pink
        '#C8A2C8', // Lilac
        '#DDA0DD', // Plum
        '#FFC0CB', // Light Pink
        '#E6E6FA', // Lavender
        '#b7e3f7', // Sky Blue
        '#FFD700'  // Gold
    ];

    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 12 + 6;
            const left = Math.random() * 100;
            const duration = Math.random() * 2 + 3;
            const delay = Math.random() * 0.5;

            // Apply styles
            confetti.style.left = `${left}%`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;

            // Random shapes
            const shapeRandom = Math.random();
            if (shapeRandom < 0.33) {
                // Circle
                confetti.style.borderRadius = '50%';
            } else if (shapeRandom < 0.66) {
                // Square
                confetti.style.borderRadius = '2px';
            } else {
                // Star/Triangle
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = `${size / 2}px solid transparent`;
                confetti.style.borderRight = `${size / 2}px solid transparent`;
                confetti.style.borderBottom = `${size}px solid ${color}`;
            }

            confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, (duration + delay) * 1000 + 500);

        }, i * 20);
    }
}

// Typewriter effect
function startTypewriter(text, element, speed = 30) {
    let index = 0;
    element.textContent = '';
    element.classList.remove('done');

    // Clear any existing interval
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }

    typewriterInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typewriterInterval);
            typewriterInterval = null;
            element.classList.add('done');
        }
    }, speed);
}

// Shake input animation
function shakeInput(inputElement) {
    inputElement.style.animation = 'shake 0.5s ease';
    inputElement.style.borderColor = '#ff6b6b';

    setTimeout(() => {
        inputElement.style.animation = '';
        inputElement.style.borderColor = '';
    }, 500);
}

// ============================================
// ADD SHAKE KEYFRAMES DYNAMICALLY
// ============================================
const shakeKeyframes = document.createElement('style');
shakeKeyframes.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-10px); }
        30% { transform: translateX(10px); }
        50% { transform: translateX(-10px); }
        70% { transform: translateX(10px); }
        90% { transform: translateX(-5px); }
    }
`;
document.head.appendChild(shakeKeyframes);

// ============================================
// EVENT LISTENERS
// ============================================

// 1. Continue Button (Welcome Section -> Envelope Section)
continueBtn.addEventListener('click', function () {
    const name = userNameInput.value.trim();

    if (name === '') {
        shakeInput(userNameInput);
        userNameInput.focus();
        return;
    }

    // Save the name
    userName = name;

    // Update name displays
    greetingName.textContent = name;
    displayName.textContent = name;

    // Show envelope section
    showSection(envelopeSection);
});

// Enter key support for input
userNameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        continueBtn.click();
    }
});

// 2. Open Envelope Button (Envelope Section -> Greeting Section)
openEnvelopeBtn.addEventListener('click', function () {
    // Create confetti burst
    createConfetti();

    // Hide the button
    openEnvelopeBtn.classList.add('hidden');

    // Start envelope open animation
    setTimeout(() => {
        envelope.classList.add('open');
    }, 400);

    // Transition to greeting section after animation
    setTimeout(() => {
        showSection(greetingSection);

        // Enable scrolling
        document.body.style.overflowY = 'auto';
    }, 2000);
});

// 3. Scroll Handler (Greeting Section -> Message Section)
function handleScroll() {
    // Only handle if greeting section is active
    if (!greetingSection.classList.contains('active')) {
        return;
    }

    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.3;

    if (scrollY > triggerPoint && !messageSectionShown) {
        messageSectionShown = true;

        // Activate message section
        messageSection.classList.add('active');

        // Show Eid badge
        setTimeout(() => {
            eidBadge.classList.add('visible');
        }, 300);

        // Start typewriter effect
        setTimeout(() => {
            startTypewriter(greetingMessage, typewriterText, 28);
        }, 600);
    }
}

// Add scroll listener
window.addEventListener('scroll', handleScroll);

// 4. Touch Support for Mobile
let touchStartY = 0;

document.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', function (e) {
    if (!greetingSection.classList.contains('active')) {
        return;
    }

    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;

    // If swiping up more than 50px
    if (diff > 50 && !messageSectionShown) {
        messageSectionShown = true;

        messageSection.classList.add('active');

        setTimeout(() => {
            eidBadge.classList.add('visible');
        }, 300);

        setTimeout(() => {
            startTypewriter(greetingMessage, typewriterText, 28);
        }, 600);
    }
}, { passive: true });

// 5. Close Button (Message Section -> Closing Overlay)
closeBtn.addEventListener('click', function () {
    closingOverlay.classList.add('active');
});

// 6. Restart Button (Closing Overlay -> Welcome Section)
restartBtn.addEventListener('click', function () {
    // Hide closing overlay
    closingOverlay.classList.remove('active');

    // Reset all sections
    messageSection.classList.remove('active');
    greetingSection.classList.remove('active');
    envelopeSection.classList.remove('active');

    // Reset envelope state
    envelope.classList.remove('open');
    openEnvelopeBtn.classList.remove('hidden');

    // Reset Eid badge
    eidBadge.classList.remove('visible');

    // Reset typewriter
    typewriterText.textContent = '';
    typewriterText.classList.remove('done');
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
        typewriterInterval = null;
    }

    // Reset input field
    userNameInput.value = '';

    // Reset variables
    messageSectionShown = false;
    userName = 'Friend';

    // Reset scroll position
    window.scrollTo(0, 0);

    // Disable scrolling initially
    document.body.style.overflowY = 'hidden';

    // Show welcome section
    showSection(welcomeSection);

    // Focus on input after a brief delay
    setTimeout(() => {
        userNameInput.focus();
    }, 500);
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Disable scrolling initially
    document.body.style.overflowY = 'hidden';

    // Focus on input field
    setTimeout(() => {
        userNameInput.focus();
    }, 800);

    // Log ready message
    console.log('🌸 Eid Mubarak Website Ready! 🌙');
    console.log('Created with love ✨');
});

// ============================================
// BONUS FEATURES
// ============================================

// Double-click anywhere for bonus confetti
document.addEventListener('dblclick', function (e) {
    // Only on greeting or message sections
    if (greetingSection.classList.contains('active') || messageSection.classList.contains('active')) {
        createConfetti();
    }
});

// Keyboard shortcut: Press 'E' for confetti easter egg
document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() === 'e') {
        if (greetingSection.classList.contains('active') || messageSection.classList.contains('active')) {
            createConfetti();
        }
    }
});

// Prevent default scroll on welcome and envelope sections
document.addEventListener('wheel', function (e) {
    if (welcomeSection.classList.contains('active') || envelopeSection.classList.contains('active')) {
        // Allow no scrolling
        return;
    }
}, { passive: true });

// ============================================
// INTERSECTION OBSERVER (Alternative scroll detection)
// ============================================
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && greetingSection.classList.contains('active') && !messageSectionShown) {
            // Trigger message section
            messageSectionShown = true;
            messageSection.classList.add('active');

            setTimeout(() => {
                eidBadge.classList.add('visible');
            }, 300);

            setTimeout(() => {
                startTypewriter(greetingMessage, typewriterText, 28);
            }, 600);
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

// Observe the scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollObserver.observe(scrollIndicator);
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
window.addEventListener('resize', function () {
    // Adjust any necessary elements on resize
    // Currently, CSS handles most responsive behavior
});

// ============================================
// VISIBILITY CHANGE HANDLER
// ============================================
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // Page is hidden, pause typewriter if running
        if (typewriterInterval) {
            // Could pause here if needed
        }
    } else {
        // Page is visible again
    }
});
