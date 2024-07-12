document.addEventListener('DOMContentLoaded', () => {
    const upgradeBtn = document.querySelector('.upgrade-btn');
    const popup = document.getElementById('popup');
    const secondaryClosePopup = document.getElementById('secondary-close-popup');
    const boosterOptions = document.querySelectorAll('.booster-option');
    const connectWalletBtn = document.querySelector('.connect-wallet-btn');

    const mintingPower = document.getElementById('minting-power');
    const rentPeriod = document.getElementById('rent-period');
    const rentPrice = document.getElementById('rent-price');
    const maxInvestPrice = document.getElementById('max-invest-price');
    const profit30DaysPercentage = document.getElementById('profit-30days-percentage');
    const dailyProfitPercentage = document.getElementById('daily-profit-percentage');

    const optionsData = {
        option1: {
            power: '10 GH/s',
            period: '30 days',
            price: '1.5 TON',
            maxPrice: '347 TON',
            profit30Days: '125% TON',
            dailyProfit: '4,16% TON',
            pngImage: 'images/turbino-mini.png',
            gifImage: 'images/turbino-mini.gif'
        },
        option2: {
            power: '100 GH/s',
            period: '30 days',
            price: '5 TON',
            maxPrice: '693 TON',
            profit30Days: '130% TON',
            dailyProfit: '4,33% TON',
            pngImage: 'images/turbino-medium.png',
            gifImage: 'images/turbino-medium.gif'
        },
        option3: {
            power: '1,000 GH/s',
            period: '30 days',
            price: '15 TON',
            maxPrice: '1387 TON',
            profit30Days: '135% TON',
            dailyProfit: '4,50% TON',
            pngImage: 'images/turbino-large.png',
            gifImage: 'images/turbino-large.gif'
        }
    };

    let selectedOption = 'option1';

    upgradeBtn.addEventListener('click', () => {
        // popup.style.display = 'flex';
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
    };

    secondaryClosePopup.addEventListener('click', closePopupFunction);

    window.addEventListener('click', (event) => {
        const popupContent = document.querySelector(".popup-content");
        if (!popupContent.contains(event.target) && event.target !== connectWalletBtn) {
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

            selectedOption = option.id;
            const data = optionsData[selectedOption];

            mintingPower.textContent = data.power;
            rentPeriod.textContent = data.period;
            rentPrice.textContent = data.price;
            maxInvestPrice.textContent = data.maxPrice;
            profit30DaysPercentage.textContent = data.profit30Days;
            dailyProfitPercentage.textContent = data.dailyProfit;

            option.querySelector('img').src = data.gifImage;
        });
    });

    // Initialize with the first option
    boosterOptions[0].classList.add('active');
    const initialData = optionsData['option1'];
    mintingPower.textContent = initialData.power;
    rentPeriod.textContent = initialData.period;
    rentPrice.textContent = initialData.price;
    maxInvestPrice.textContent = initialData.maxPrice;
    profit30DaysPercentage.textContent = initialData.profit30Days;
    dailyProfitPercentage.textContent = initialData.dailyProfit;
    boosterOptions[0].querySelector('img').src = initialData.gifImage;

    connectWalletBtn.addEventListener('click', () => {
        popup.style.display = "none";
        const selectedData = optionsData[selectedOption];
        const walletPopup = document.createElement('div');
        walletPopup.className = 'popup2 show';
        walletPopup.innerHTML = `
            <div class="popup-content">
                <style>
                    
                    .popup2.show {
                        display: flex;
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                    .popup-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .popup-header img {
                        width: 100px;
                    }
                    .popup-inner-content p {
                        margin: 10px 0;
                    }
                    .connect-wallet-btn, .close-btn {
                        margin: 10px;
                    }
                </style>
                <div class="popup-inner-content">
                    <div class="popup-header">
                        <img src="${selectedData.gifImage}" alt="Logo" class="header-logo">
                        <div class="header-text">
                            <span>${selectedData.power}</span>
                        </div>
                    </div>
                    <p>Minting Power ⚡<span>${selectedData.power}</span></p>
                    <p>Rent Period ⚡<span>${selectedData.period}</span></p>
                    <p>Minimum Invest price ⚡<span>${selectedData.price}</span></p>
                    <p>Max Invest price ⚡<span>${selectedData.maxPrice}</span></p>
                    <p>30 Days Profit 🔥 <span>${selectedData.profit30Days}</span></p>
                    <p>Daily 🔥 <span>${selectedData.dailyProfit}</span></p>
                    <input type="number" placeholder="Write the number of TON">
                    <button class="connect-wallet-btn">CONNECT WALLET</button>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(walletPopup);
    });
});
