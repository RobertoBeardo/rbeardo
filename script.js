/* ============================================
   PORTFOLIO — Roberto Beardo García
   script.js — Interactividad completa
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. DARK / LIGHT MODE ==========
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Recuperar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light');
        const isLight = body.classList.contains('light');
        themeIcon.classList.replace(
            isLight ? 'fa-moon' : 'fa-sun',
            isLight ? 'fa-sun' : 'fa-moon'
        );
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    // ========== 2. TYPING EFFECT ==========
    const typedText = document.getElementById('typed-text');
    // EDITAR: Cambia estos strings por los que quieras mostrar
    const strings = [
        'Estudiante de ASIR',
        'Sysadmin en formación',
        'Militar en Activo'
    ];
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 40;
    const pauseEnd = 2000;
    const pauseStart = 500;

    function typeLoop() {
        const current = strings[stringIndex];

        if (!isDeleting) {
            typedText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeLoop, pauseEnd);
                return;
            }
            setTimeout(typeLoop, typeSpeed);
        } else {
            typedText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % strings.length;
                setTimeout(typeLoop, pauseStart);
                return;
            }
            setTimeout(typeLoop, deleteSpeed);
        }
    }

    typeLoop();

    // ========== 3. MENU HAMBURGUESA ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Cerrar menu al hacer click en un link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // ========== 4. ACTIVE LINK EN NAVBAR ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ========== 5. FADE-IN POR SCROLL ==========
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

});
