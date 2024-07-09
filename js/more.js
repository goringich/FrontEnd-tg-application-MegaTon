document.addEventListener('DOMContentLoaded', () => {
    const moreBtn = document.getElementById('more-btn');
    const navigation = document.querySelector('.navigation');
    const hiddenButtons = document.querySelector('.hidden-buttons-container');
    const navItems = document.querySelectorAll('.nav-item');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    const hiddenButtonContainer = document.querySelector('.hidden-button-container');
    const hiddenButtonElements = document.querySelectorAll('.hidden-button');
    let currentIndex = 0;
  
    // Функция для переключения видимости скрытых кнопок
    const toggleHiddenButtons = () => {
      const isVisible = hiddenButtons.classList.toggle('show');
      navigation.classList.toggle('show');
  
      if (isVisible) {
        moreBtn.classList.add('blinking');
      } else {
        moreBtn.classList.remove('blinking');
      }
    };
  
    moreBtn.addEventListener('click', toggleHiddenButtons);
  
    // Добавляем обработчики для всех кнопок навигации, чтобы скрыть нижнее меню
    navItems.forEach(item => {
      if (item !== moreBtn) {
        item.addEventListener('click', () => {
          hiddenButtons.classList.remove('show');
          navigation.classList.remove('show');
          moreBtn.classList.remove('blinking');
        });
      }
    });
  
    const updateSlider = () => {
      const totalItems = hiddenButtonElements.length;
      const itemWidth = hiddenButtonElements[currentIndex].offsetWidth;
      const offset = currentIndex * itemWidth;
  
      hiddenButtonContainer.style.transform = `translateX(-${offset}px)`;
  
      // Показываем или скрываем стрелки в зависимости от текущего индекса
      leftArrow.style.display = currentIndex === 0 ? 'none' : 'block';
      rightArrow.style.display = currentIndex >= totalItems - maxVisibleItems ? 'none' : 'block';
    };
  
    leftArrow.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  
    rightArrow.addEventListener('click', () => {
      if (currentIndex < hiddenButtonElements.length - maxVisibleItems) {
        currentIndex++;
        updateSlider();
      }
    });
  
    updateSlider(); // Обновить кнопки в начале
  });
  