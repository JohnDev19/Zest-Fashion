document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const header = document.getElementById('header');
    const scrollThreshold = 100;

    function handleHeaderScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarOverlay = document.createElement('div');
    
    sidebarOverlay.classList.add('sidebar-overlay');
    document.body.appendChild(sidebarOverlay);

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        
        document.body.style.overflow = sidebar.classList.contains('active') 
            ? 'hidden' 
            : 'auto';
    }

    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSidebar();
    });

    sidebarClose.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);

    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            const dropdown = trigger.nextElementSibling;
            const icon = trigger.querySelector('.toggle-dropdown');
            
            trigger.classList.toggle('active');
            dropdown.classList.toggle('active');
            
            if (icon) {
                icon.classList.toggle('rotated');
            }

            dropdownTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    const otherDropdown = otherTrigger.nextElementSibling;
                    const otherIcon = otherTrigger.querySelector('.toggle-dropdown');
                    
                    otherTrigger.classList.remove('active');
                    otherDropdown.classList.remove('active');
                    
                    if (otherIcon) {
                        otherIcon.classList.remove('rotated');
                    }
                }
            });
        });
    });

    sidebar.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    function handleResponsiveness() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    window.addEventListener('resize', handleResponsiveness);

    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            alert(`Searching for: ${query}`);
        }
    }

    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function animateCount(element, target) {
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const countTo = parseInt(target);
        const increment = countTo / totalFrames;

        const counter = setInterval(() => {
            frame++;
            const currentCount = Math.round(increment * frame);

            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = countTo.toLocaleString() + '+';
            } else {
                element.textContent = Math.round(currentCount).toLocaleString() + '+';
            }
        }, frameDuration);
    }

    const countElements = document.querySelectorAll('.count');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = target.getAttribute('data-target');
                animateCount(target, targetNumber);
                
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.1
    });

    countElements.forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    function handleHeaderScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease-in-out';
        } else if (currentScrollTop < lastScrollTop) {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScrollTop;
    }

    window.addEventListener('scroll', handleHeaderScroll);
});

document.addEventListener('DOMContentLoaded', () => {
    const goToTopButton = document.getElementById('go-to-top');

    function smoothScrollToTop() {
        const scrollDuration = 800;
        const cosParameter = window.scrollY / 2;
        let scrollCount = 0;
        let oldTimestamp = null;

        function step(newTimestamp) {
            if (oldTimestamp !== null) {
                scrollCount += Math.PI * (newTimestamp - oldTimestamp) / scrollDuration;
                
                if (scrollCount >= Math.PI) {
                    window.scrollTo(0, 0);
                    return;
                }
                
                window.scrollTo(0, Math.round(cosParameter - cosParameter * Math.cos(scrollCount)));
            }
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
        
        window.requestAnimationFrame(step);
    }

    function toggleGoToTopButton() {
        const scrollThreshold = 300;
        
        if (window.scrollY > scrollThreshold) {
            goToTopButton.classList.add('show');
            
            setTimeout(() => {
                goToTopButton.classList.add('pulse');
            }, 5000);
        } else {
            goToTopButton.classList.remove('show', 'pulse');
        }
    }

    goToTopButton.addEventListener('click', () => {
        goToTopButton.classList.remove('pulse');
        
        smoothScrollToTop();
    });

    window.addEventListener('scroll', toggleGoToTopButton);

    goToTopButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            smoothScrollToTop();
        }
    });

    goToTopButton.setAttribute('aria-label', 'Scroll to top');
    goToTopButton.setAttribute('tabindex', '0');
});

      function initializeCountdown(daysId, hoursId, minutesId, endDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            document.getElementById(daysId).textContent = '00';
            document.getElementById(hoursId).textContent = '00';
            document.getElementById(minutesId).textContent = '00';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById(daysId).textContent = days.toString().padStart(2, '0');
        document.getElementById(hoursId).textContent = hours.toString().padStart(2, '0');
        document.getElementById(minutesId).textContent = minutes.toString().padStart(2, '0');
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
}

document.addEventListener('DOMContentLoaded', () => {
    const deal1EndDate = new Date();
    deal1EndDate.setDate(deal1EndDate.getDate() + 7);
    deal1EndDate.setHours(23, 59, 59, 999);

    const deal2EndDate = new Date();
    deal2EndDate.setDate(deal2EndDate.getDate() + 14);
    deal2EndDate.setHours(23, 59, 59, 999);

    initializeCountdown('days', 'hours', 'minutes', deal1EndDate.getTime());
    initializeCountdown('days2', 'hours2', 'minutes2', deal2EndDate.getTime());
});

document.addEventListener('DOMContentLoaded', () => {
    const elementContainer = document.querySelector('.about-element-container');
    const elementImage = document.querySelector('.about-element-image');

    function rotateElementOnScroll() {
        const scrollPosition = window.pageYOffset;

        const maxRotation = 10;
        const rotation = Math.min(
            maxRotation, 
            Math.max(-maxRotation, scrollPosition * 0.03)
        );

        elementImage.style.transform = `rotate(${rotation}deg)`;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.addEventListener('scroll', rotateElementOnScroll);
            } else {
                window.removeEventListener('scroll', rotateElementOnScroll);
                
                elementImage.style.transform = 'rotate(0deg)';
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(elementContainer);

    elementContainer.addEventListener('mouseenter', () => {
        elementContainer.style.transform = 'scale(1.02)';
    });

    elementContainer.addEventListener('mouseleave', () => {
        elementContainer.style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function updateBadge(selector, count) {
        const badge = document.querySelector(selector);
        if (badge) {
            badge.textContent = count;
            
            if (count === 0) {
                badge.style.display = 'none';
            } else {
                badge.style.display = 'flex';
            }
        }
    }

    updateBadge('.products-badge', 3);
    updateBadge('.favorites-badge', 5);
});