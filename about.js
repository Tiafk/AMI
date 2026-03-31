document.addEventListener('DOMContentLoaded', function() {

// Бургер-меню
    const burgerDesc = document.getElementById('burger-desc');
    const burger = document.getElementById('burger');
    const burgerMenu = document.getElementById('burgerMenu');
    const burgerOverlay = document.getElementById('burgerOverlay');
    const burgerLinks = document.querySelectorAll('.burger-dropdown__link');
    
    function openBurgerMenu() {
        burgerMenu.classList.add('active');
        burgerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.addEventListener('click', handleOutsideClick);
    }
    
    function closeBurgerMenu() {
        burgerMenu.classList.remove('active');
        burgerOverlay.classList.remove('active');
        document.body.style.overflow = 'visible';
        document.removeEventListener('click', handleOutsideClick);
    }
    
    function handleOutsideClick(event) {
        if (!burgerMenu.contains(event.target) && 
            !burger.contains(event.target) && 
            !burgerDesc?.contains(event.target)) {
            closeBurgerMenu();
        }
    }
    
    function toggleBurgerMenu(event) {
        event.stopPropagation();
        if (burgerMenu.classList.contains('active')) {
            closeBurgerMenu();
        } else {
            openBurgerMenu();
        }
    }
    
    if (burger) burger.addEventListener('click', toggleBurgerMenu);
    if (burgerDesc) burgerDesc.addEventListener('click', toggleBurgerMenu);
    
    burgerOverlay.addEventListener('click', closeBurgerMenu);
    
    burgerLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeBurgerMenu();
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burgerMenu.classList.contains('active')) {
            closeBurgerMenu();
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && burgerMenu.classList.contains('active')) {
            closeBurgerMenu();
        }
    });
    
    const burgerBtn = document.querySelector('.burger-dropdown__btn');
    if (burgerBtn) {
        burgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeBurgerMenu();
        });
    }



    // Scroll эффект для header
    let scrollTimer;
    let isScrolling = false;
    
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        const shadowTop = document.querySelector(".shadow-top");
        
        // Если еще не начали скроллить, добавляем класс скролла
        if (!isScrolling) {
            isScrolling = true;
            header.classList.add("scrolling");
        }
        
        // Основная логика скролла
        if (window.scrollY > 10) {
            header.classList.add("scrolled");
            if (shadowTop) shadowTop.style.display = "none";
        } else {
            header.classList.remove("scrolled");
            if (shadowTop) shadowTop.style.display = "block";
        }
        
        // Сбрасываем таймер при каждом движении
        clearTimeout(scrollTimer);
        
        // После остановки скролла (через 100мс без движения)
        scrollTimer = setTimeout(() => {
            isScrolling = false;
            header.classList.remove("scrolling");
            header.classList.add("scroll-stopped");
            
            // Убираем класс через время для следующего цикла
            setTimeout(() => {
                header.classList.remove("scroll-stopped");
            }, 0);
        }, 0);
    });

    const swiper = new Swiper(".mySwiper_about", {
        // Навигация
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Скроллбар
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
        // Основные настройки
        slidesPerView: 'auto',
        spaceBetween: 10,
        loop: false,
        // Эффекты
        effect: "slide",
        speed: 800,
    });
});