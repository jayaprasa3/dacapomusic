// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Smooth scrolling for Anchor links to offset for fixed navbar
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // EmailJS Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Initialize EmailJS with the public key
        emailjs.init("Hw6h3J8XAj605NBMx");

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const templateParams = {
                from_name: document.getElementById('from_name').value,
                from_email: document.getElementById('from_email').value,
                course: document.getElementById('course').value,
                message: document.getElementById('message').value
            };

            emailjs.send('service_dhr798u', 'template_dngt8zd', templateParams)
                .then(function () {
                    submitBtn.innerText = 'Sent Successfully!';
                    submitBtn.style.background = '#10B981'; // Success green
                    submitBtn.style.color = '#fff';
                    contactForm.reset();

                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.color = '';
                        submitBtn.disabled = false;
                    }, 4000);
                }, function (error) {
                    console.error('FAILED...', error);
                    submitBtn.innerText = 'Failed to send';
                    submitBtn.style.background = '#EF4444'; // Error red
                    submitBtn.style.color = '#fff';

                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.color = '';
                        submitBtn.disabled = false;
                    }, 4000);
                });
        });
    }
});
