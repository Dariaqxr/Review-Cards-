document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на элементы DOM
    const lightThemeBtn = document.getElementById('light-theme-btn');
    const darkThemeBtn = document.getElementById('dark-theme-btn');
    const body = document.body;
    const cards = document.querySelectorAll('.card'); // Все элементы карточек

    // Функция для применения выбранной темы
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('theme-dark'); // Добавляем класс для темной темы
            // Обновляем состояние кнопок: темная активна, светлая неактивна
            lightThemeBtn.classList.remove('active-theme');
            darkThemeBtn.classList.add('active-theme');
            localStorage.setItem('theme', 'dark'); // Сохраняем выбор темы в локальном хранилище браузера
        } else {
            body.classList.remove('theme-dark'); // Удаляем класс для темной темы
            // Обновляем состояние кнопок: светлая активна, темная неактивна
            darkThemeBtn.classList.remove('active-theme');
            lightThemeBtn.classList.add('active-theme');
            localStorage.setItem('theme', 'light'); // Сохраняем выбор темы
        }
    };

    // При загрузке страницы:
    // 1. Проверяем, была ли тема сохранена пользователем ранее
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme); // Если да, применяем сохраненную тему
    } else {
        // 2. Если нет, проверяем системные предпочтения пользователя (например, темный режим в ОС)
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark'); // Если система предпочитает темную, устанавливаем темную
        } else {
            applyTheme('light'); // Иначе, по умолчанию ставим светлую
        }
    }

    // Добавляем обработчики событий для кнопок переключения тем
    lightThemeBtn.addEventListener('click', () => applyTheme('light'));
    darkThemeBtn.addEventListener('click', () => applyTheme('dark'));

    // Динамическое добавление задержки анимации для каждой карточки
    // Это создает эффект "волны" при появлении карточек
    cards.forEach((card, index) => {
        // Задержка: 0.1 секунды на каждую карточку, начиная после 1.8 секунды (чтобы заголовок успел появиться)
        card.style.animationDelay = `${0.1 * index + 1.8}s`;
    });
});