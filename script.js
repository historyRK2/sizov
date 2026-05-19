// Управление вкладками
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все ссылки навигации и все вкладки
    const navLinks = document.querySelectorAll('.nav-link');
    const tabs = document.querySelectorAll('.tab-content');

    // Функция переключения вкладок
    function switchTab(tabId) {
        // Скрыть все вкладки
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        // Показать выбранную
        const activeTab = document.getElementById(tabId + 'Tab');
        if (activeTab) activeTab.classList.add('active');

        // Обновить активный класс в навигации
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-tab') === tabId) {
                link.classList.add('active');
            }
        });

        // Пролистать страницу вверх при смене вкладки
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Обработчик кликов по навигации
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            if (tabId) switchTab(tabId);
        });
    });

    // Обработчик для карточек на главной (клик по превью)
    const previewCards = document.querySelectorAll('.preview-card');
    previewCards.forEach(card => {
        card.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            if (tabId) switchTab(tabId);
        });
    });

    // Мобильное меню: открытие/закрытие
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });
    }

    // Закрываем мобильное меню при клике по ссылке
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
            }
        });
    });

    // Если на главной, показываем homeTab
    const activeLink = document.querySelector('.nav-link.active');
    if (!activeLink || activeLink.getAttribute('data-tab') === 'home') {
        switchTab('home');
    }
});