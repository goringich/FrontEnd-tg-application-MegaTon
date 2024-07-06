document.addEventListener('DOMContentLoaded', () => {
    const upgradeBtn = document.querySelector('.upgrade-btn');
    const popup = document.getElementById('popup');
    const popupShadow = document.getElementById('popup-shadow');
    const secondaryClosePopup = document.getElementById('secondary-close-popup');
    const boosterOptions = document.querySelectorAll('.booster-option');
    const mintingPower = document.getElementById('minting-power');
    const rentPeriod = document.getElementById('rent-period');
    const rentPrice = document.getElementById('rent-price');
    const profit30Days = document.getElementById('profit-30days');
    const dailyProfit = document.getElementById('daily-profit');

    const optionsData = {
        option1: {
            power: '10 GH/s',
            period: '30 days',
            price: '1.42 TON',
            profit30Days: '2.0736 TON',
            dailyProfit: '0.06912 TON',
            pngImage: 'images/turbino-mini.png',
            gifImage: 'images/turbino-mini.gif'
        },
        option2: {
            power: '100 GH/s',
            period: '30 days',
            price: '14.2 TON',
            profit30Days: '20.736 TON',
            dailyProfit: '0.6912 TON',
            pngImage: 'images/turbino-medium.png',
            gifImage: 'images/turbino-medium.gif'
        },
        option3: {
            power: '1,000 GH/s',
            period: '30 days',
            price: '142 TON',
            profit30Days: '207.36 TON',
            dailyProfit: '6.912 TON',
            pngImage: 'images/turbino-large.png',
            gifImage: 'images/turbino-large.gif'
        }
    };

    upgradeBtn.addEventListener('click', () => {
        popupShadow.style.display = 'block';
        requestAnimationFrame(() => {
            popupShadow.classList.add('show');
        });

        popup.style.display = 'flex';
        requestAnimationFrame(() => {
            popup.classList.add('show');
        });
    });

    const closePopupFunction = () => {
        popup.classList.remove('show');
        popup.addEventListener('transitionend', () => {
            if (!popup.classList.contains('show')) {
                popup.style.display = 'none';
            }
        }, { once: true });

        popupShadow.classList.remove('show');
        popupShadow.addEventListener('transitionend', () => {
            if (!popupShadow.classList.contains('show')) {
                popupShadow.style.display = 'none';
            }
        }, { once: true });
    };

    secondaryClosePopup.addEventListener('click', closePopupFunction);

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            closePopupFunction();
        }
    });

    boosterOptions.forEach(option => {
        option.addEventListener('click', () => {
            boosterOptions.forEach(opt => {
                opt.classList.remove('active');
                const optId = opt.id;
                opt.querySelector('img').src = optionsData[optId].pngImage;
            });

            option.classList.add('active');

            const optionId = option.id;
            const data = optionsData[optionId];

            mintingPower.textContent = data.power;
            rentPeriod.textContent = data.period;
            rentPrice.textContent = data.price;
            profit30Days.textContent = data.profit30Days;
            dailyProfit.textContent = data.dailyProfit;

            option.querySelector('img').src = data.gifImage;
        });
    });

    boosterOptions[0].classList.add('active');
    const initialData = optionsData['option1'];
    mintingPower.textContent = initialData.power;
    rentPeriod.textContent = initialData.period;
    rentPrice.textContent = initialData.price;
    profit30Days.textContent = initialData.profit30Days;
    dailyProfit.textContent = initialData.dailyProfit;

    boosterOptions[0].querySelector('img').src = initialData.gifImage;
});
