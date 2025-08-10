// Landing Page JavaScript for JimNotes
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeFAQs();
});

// Scroll Animations
function initializeScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section-title, .feature-card, .testimonial, .step').forEach(el => {
            observer.observe(el);
        });
    }
}

// Smooth Scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// FAQ Toggle Functionality
function initializeFAQs() {
    // Add event listeners to all FAQ questions
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    
    // Toggle active states
    button.classList.toggle('active');
    answer.classList.toggle('active');
    
    // Update icon
    if (button.classList.contains('active')) {
        icon.textContent = '−';
    } else {
        icon.textContent = '+';
    }
    
    // Close other open FAQs in the same category
    const faqCategory = button.closest('.faq-category');
    const otherQuestions = faqCategory.querySelectorAll('.faq-question');
    
    otherQuestions.forEach(otherQuestion => {
        if (otherQuestion !== button && otherQuestion.classList.contains('active')) {
            const otherAnswer = otherQuestion.nextElementSibling;
            const otherIcon = otherQuestion.querySelector('.faq-icon');
            
            otherQuestion.classList.remove('active');
            otherAnswer.classList.remove('active');
            otherIcon.textContent = '+';
        }
    });
}