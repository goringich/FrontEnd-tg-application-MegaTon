document.addEventListener('DOMContentLoaded', function () {
  const body = document.body.querySelector(".container2");

  // Создание контейнера
  const box = document.createElement('div');
  box.className = 'box';
  body.appendChild(box);

  // Создание контейнера для карт
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards is-active';
  box.appendChild(cardsContainer);

  // Загрузка данных из JSON
  fetch('../js/cardsData.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(cardsData => {
      // Функция для создания карт
      function createCard(data, index) {
        const card = document.createElement('div');
        card.className = `card card--${index + 1}`;
        card.style.transform = `translateY(calc(${index * 15.2857}% - ${index * 0.214286}rem))`;
        if (index === 2) card.classList.add('is-active');

        const cardTitle = document.createElement('h2');
        cardTitle.className = 'card__title';
        cardTitle.textContent = `Card ${index + 1}`;
        card.appendChild(cardTitle);

        const schedules = document.createElement('dl');
        schedules.className = 'schedules';
        data.times.forEach((time, i) => {
          const dt = document.createElement('dt');
          dt.className = 'schedules__time';
          dt.textContent = time;
          schedules.appendChild(dt);

          const dd = document.createElement('dd');
          dd.className = 'schedules__info';
          const p = document.createElement('p');
          const img = document.createElement('img');
          img.width = 400;
          img.height = 120;
          img.alt = `Google Map of ${data.locations[i % data.locations.length]}`;
          p.appendChild(img);
          dd.appendChild(p);

          const span = document.createElement('span');
          span.textContent = data.texts[i];
          dd.appendChild(span);

          schedules.appendChild(dd);
        });

        card.appendChild(schedules);
        return card;
      }

      // Генерация карт на основе данных
      cardsData.forEach((data, index) => {
        const card = createCard(data, index);
        cardsContainer.appendChild(card);
      });

      let card = {};

      card.wrap = document.querySelector('.cards');
      card.new = document.querySelector('.new-card');

      card.wrap.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__title')) {
          let parentCard = e.target.parentElement;
          let isActive = parentCard.classList.contains('is-active');
          let activedItem = card.wrap.querySelector('.card.is-active');

          if (!isActive && !!activedItem) {
            activedItem.classList.toggle('is-active');
          }
          parentCard.classList.toggle('is-active');
          card.wrap.classList.toggle('is-active', !isActive);
        }
      });

      let reCalcPos = () => {
        let cards = [].slice.call(card.wrap.querySelectorAll('.card'));
        let count = cards.length;

        cards.forEach((card, i) => {
          card.style.transform = `translateY(calc(${i / count} * (100% - 1.5rem)))`;
        });
      };
    })
    .catch(error => console.error('Error loading data:', error));
});
