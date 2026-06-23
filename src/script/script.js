// Navbar Scroll Effect (Igual ao site do GW2, fixando ao rolar)
const navbar = document.getElementById('navbar');
const announcementBar = document.querySelector('.bg-brand-red');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('nav-scrolled');
        navbar.classList.remove('mt-9'); // Remove a margem da barra de anúncios
        navbar.style.top = '0';
    } else {
        navbar.classList.remove('nav-scrolled');
        navbar.classList.add('mt-9');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scroll para âncoras (opcional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Compensa o tamanho do header fixo
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        // Fecha menu mobile ao clicar
        if(!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});