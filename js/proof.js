document.addEventListener('DOMContentLoaded', function() {
    const transactionsPerPage = 10;
    let currentPage = 1;
    const transactionsContainer = document.getElementById('transactions');
    const paginationContainer = document.getElementById('pagination');
  
    // Example transactions data
    const transactions = [
      {
        img: 'https://cdn-icons-png.flaticon.com/512/906/906377.png',
        username: 'User1',
        hash: 'https://example.com/transaction1'
      },
      {
        img: 'https://cdn-icons-png.flaticon.com/512/906/906377.png',
        username: 'User2',
        hash: 'https://example.com/transaction2'
      }
      // Add more transactions as needed
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
          <img src="${transaction.img}" alt="${transaction.username}">
          <div class="transaction-info">
            <p class="transaction-username"><strong>${transaction.username}</strong></p>
            <p class="transaction-hash"><a href="${transaction.hash}" target="_blank">View Transaction</a></p>
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
  
  document.addEventListener("DOMContentLoaded", function() {
    const moreBtn = document.getElementById("more-btn");
    const hiddenButtonsContainer = document.getElementById("hidden-buttons");
  
    moreBtn.addEventListener("click", function() {
      hiddenButtonsContainer.classList.toggle("show");
    });
  
    document.getElementById("left-arrow").addEventListener("click", function() {
      scrollHiddenButtons(-1);
    });
  
    document.getElementById("right-arrow").addEventListener("click", function() {
      scrollHiddenButtons(1);
    });
  
    function scrollHiddenButtons(direction) {
      const container = document.getElementById("hidden-button-container");
      container.scrollBy({
        left: direction * 100,
        behavior: 'smooth'
      });
    }
  });
  