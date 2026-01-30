// Бегущая строка
const phrases = [
    "Breakfast all day",
    "Be my ami",
    "Breakfast all day",
    "Be my ami",
    "Breakfast all day",
    "Be my ami",
    "Breakfast all day",
    "Be my ami"
];

function initMarquee() {
    const marqueeWrapper = document.querySelector('.marquee-wrapper');
    const marquee = document.querySelector('.marquee');
    
    if (!marqueeWrapper || !marquee) return;
    
    marquee.innerHTML = '';
    
    // Создаем и добавляем элементы
    phrases.forEach((phrase, index) => {
        const item = document.createElement('span');
        item.className = 'marquee-item';
        item.textContent = phrase;
        if (index < phrases.length - 1) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            item.appendChild(dot);
        }
        marquee.appendChild(item);
    });
    
    // Дублируем для бесконечной анимации
    const marqueeContent = marquee.innerHTML;
    marquee.innerHTML += marqueeContent;
    
    // Устанавливаем анимацию
    const marqueeWidth = marquee.scrollWidth / 2;
    const duration = marqueeWidth / 50;
    marquee.style.animation = `marqueeScroll ${duration}s linear infinite`;
    
    // Обновление при ресайзе
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newWidth = marquee.scrollWidth / 2;
            const newDuration = newWidth / 50;
            marquee.style.animation = `marqueeScroll ${newDuration}s linear infinite`;
        }, 250);
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

// Popup для "Подробнее"
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация бегущей строки
    setTimeout(initMarquee, 100);
    
    // Popup
    const detailButtons = document.querySelectorAll('.block__text.next');
    const popup = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const popupImage = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');
    const popupDesc = document.getElementById('popupDescription');
    
    const popupData = [
        {
            title: 'Лучший завтрак в 2025 году!',
            image: './src/img/col1.png',
            description: 'Участие в фестивале Breakfest дважды, победители номинации «лучший завтрак» зимой 2025 года'
        },
        {
            title: 'Альпина Паблишер х AMI CHAISE',
            image: './src/img/popup1.png',
            description: 'С 12 ноября в ресторанах AMI CHAISE запускали спешл-меню, вдохновлённое серией книг о самоподдержке, внимании к себе и поиске внутреннего равновесия под названием «Дневники самотерапии».'
        },
        {
            title: 'RESHAPE X ИЛЬ ДЕ БОТЭ Х AMI CHAISE',
            image: './src/img/popup2.png',
            description: 'В декабре 2025 года предновогодний сезон в Ami Chaise открывала новая коллаборация сразу с пятью популярными брендами.<br><br>При заказе спешл-позиции каждому гостю дарили колбу от бренда текстильной канцелярии micielo studio с хлопковым изделием, в которой было спрятано пожелания на 2026 год, а также сюрпризы от брендов-партнёров: магазина косметики и парфюмерии ИЛЬ ДЕ БОТЭ, сети фитнес-студий Reshape, бренда сумок и аксессуаров Around the World и сети массажных салонов LITEBODY17'
        }
    ];
    
    detailButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            
            // Находим ближайший слайд
            const slide = this.closest('.swiper-slide');
            // Получаем индекс слайда
            const slideIndex = Array.from(slide.parentElement.children).indexOf(slide);
            
            const data = popupData[slideIndex];
            if (!data) return;
            
            popupImage.src = data.image;
            popupImage.alt = data.title;
            popupTitle.textContent = data.title;
            popupDesc.innerHTML = data.description;
            
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // При открытии попапа останавливаем автопрокрутку Swiper
            if (swiper.autoplay && swiper.autoplay.running) {
                swiper.autoplay.stop();
            }
        });
    });
    
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        
        // При закрытии попапа возобновляем автопрокрутку Swiper (если была)
        if (swiper.autoplay && !swiper.autoplay.running) {
            swiper.autoplay.start();
        }
    }
    
    popupClose.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => e.target === popup && closePopup());
    document.addEventListener('keydown', (e) => e.key === 'Escape' && popup.classList.contains('active') && closePopup());


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
        link.addEventListener('click', function(e) {
            e.preventDefault();
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



    const swiper = new Swiper('.mySwiper', {
        // Параметры по умолчанию
        slidesPerView: 'auto',
        spaceBetween: 25,
        loop: false,

        breakpoints: {
            390: {
                slidesPerView: 'auto'
            },
            590: {
                slidesPerView: 2
            },
            871: {
                slidesPerView: 3,
                spaceBetween: 25
            }
        },
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Высота вашей навигации (подставьте актуальную)
            const navHeight = 80;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});