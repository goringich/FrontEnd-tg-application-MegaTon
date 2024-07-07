document.addEventListener('DOMContentLoaded', function() {
    const transactionsPerPage = 10;
    let currentPage = 1;
    const transactionsContainer = document.getElementById('transactions');
    const paginationContainer = document.getElementById('pagination');
  
    const transactions = [
      {
        img: '../images/user2.jpg',
        username: 'User1',
        hash: '0e8724*******2ccfa1ccb',
        user_account: 'https://example.com/user1',
        user_trans: 'https://example.com/trans1',
        ton: 33
      },
      {
        img: '../images/user2.jpg',
        username: 'User2',
        hash: '0e8724*******2ccfa1ccb',
        user_account: 'https://example.com/user2',
        user_trans: 'https://example.com/trans2',
        ton: 23
      }
    ];
  
    function renderTransactions() {
      transactionsContainer.innerHTML = '';
      const start = (currentPage - 1) * transactionsPerPage;
      const end = start + transactionsPerPage;
      const transactionsToDisplay = transactions.slice(start, end);
  
      transactionsToDisplay.forEach(transaction => {
        const transactionElement = document.createElement('div');
        transactionElement.className = 'transaction';
        transactionElement.innerHTML = `
            <div class='transaction_left'>
                <img src="${transaction.img}" alt="${transaction.username}">
                <div class="transaction-info">
                    <p class="transaction-username"><strong>${transaction.username}</strong> (+${transaction.ton}<img src="../images/toncoin.png">)</p>
                    <button class="check-button" onclick="window.open('${transaction.user_trans}')">check transaction</button>
                </div>
            </div>
            <div class='transaction_right'>
                <div class="transaction-buttons">
                    <button class="mission-button check_user withdraw-btn" onclick="window.open('${transaction.user_account}')">check user</button>
                </div>
            </div>
        `;
        transactionsContainer.appendChild(transactionElement);
      });
    }

    
  
    function renderPagination() {
      paginationContainer.innerHTML = '';
      const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  
      const prevButton = document.createElement('button');
      prevButton.textContent = '«';
      prevButton.disabled = currentPage === 1;
      prevButton.onclick = function() {
        if (currentPage > 1) {
          currentPage--;
          renderTransactions();
          renderPagination();
        }
      };
      paginationContainer.appendChild(prevButton);
  
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = currentPage === i ? 'active' : '';
        pageButton.onclick = function() {
          currentPage = i;
          renderTransactions();
          renderPagination();
        };
        paginationContainer.appendChild(pageButton);
      }
  
      const nextButton = document.createElement('button');
      nextButton.textContent = '»';
      nextButton.disabled = currentPage === totalPages;
      nextButton.onclick = function() {
        if (currentPage < totalPages) {
          currentPage++;
          renderTransactions();
          renderPagination();
        }
      };
      paginationContainer.appendChild(nextButton);
    }
  
    renderTransactions();
    renderPagination();
  });

  

  function navigateTo(page) {
    window.location.href = page;
  }