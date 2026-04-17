/**
 * PORTFOLIO WEBSITE JAVASCRIPT
 * Author: Shreya Gupta
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================
       PAGE LOADER
       ============================================== */
    const loader = document.getElementById('loader');
    
    // Simulate loading time for visual effect (min 1s)
    setTimeout(() => {
        window.addEventListener('load', () => {
            loader.classList.add('hidden');
        });
        
        // Fallback if load event already fired
        if (document.readyState === 'complete') {
            loader.classList.add('hidden');
        }
    }, 500);

    /* ==============================================
       TYPING ANIMATION
       ============================================== */
    const typingText = document.getElementById('typing-text');
    const words = ["Developer", "Problem Solver", "Tech Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!typingText) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);


    /* ==============================================
       NAVBAR & SCROLL PROGRESS
       ============================================== */
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        // Sticky Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    /* ==============================================
       MOBILE MENU TOGGLE
       ============================================== */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                body.style.overflow = 'hidden'; // Make body unscrollable
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
            body.style.overflow = 'auto';
        });
    });


    /* ==============================================
       SCROLL ANIMATIONS (AOS Alternative)
       & SKILLS PROGRESS BARS
       ============================================== */
    const animatedElements = document.querySelectorAll('[data-aos]');
    const progressFills = document.querySelectorAll('.progress-fill');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                // Add animate class for general AOS items
                entry.target.classList.add('aos-animate');
                
                // If it's a progress bar, animate width
                if (entry.target.classList.contains('progress-fill')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }

                // Unobserve if you only want it to animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all AOS elements
    animatedElements.forEach(el => scrollObserver.observe(el));
    
    // Also explicitly observe progress fills
    progressFills.forEach(el => scrollObserver.observe(el));

    // Handle delays added via data-aos-delay attribute
    animatedElements.forEach(el => {
        const delay = el.getAttribute('data-aos-delay');
        if (delay) {
            el.style.transitionDelay = delay + 'ms';
        }
    });


    /* ==============================================
       CONTACT FORM VALIDATION
       ============================================== */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Get inputs
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Reusable validation function
            const validateField = (field, errorId, errorMsg, condition) => {
                const formGroup = field.parentElement;
                const errorSpan = document.getElementById(errorId);
                
                if (condition) {
                    formGroup.classList.add('error');
                    errorSpan.textContent = errorMsg;
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                    errorSpan.textContent = '';
                }
            };

            // Validations
            validateField(name, 'nameError', 'Name is required.', name.value.trim() === '');
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateField(email, 'emailError', 'Please enter a valid email address.', !emailRegex.test(email.value.trim()));
            
            validateField(subject, 'subjectError', 'Subject is required.', subject.value.trim() === '');
            validateField(message, 'messageError', 'Message cannot be empty.', message.value.trim() === '');

            // Mock Submit
            if (isValid) {
                const btn = contactForm.querySelector('button');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;
                
                // Simulate network request
                setTimeout(() => {
                    btn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
                    btn.style.background = '#00c853';
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        // Reset button
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        btn.style.background = '';
                    }, 3000);
                    
                }, 1500);
            }
        });
    }

});
