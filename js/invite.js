document.addEventListener('DOMContentLoaded', function() {
  const inviteeList = document.getElementById('invitee-list');
  const pagination = document.getElementById('pagination');
  const itemsPerPage = 15;
  let currentPage = 1;
  let users = [];

  fetch('../jsons/invite.json')
  .then(response => response.json())
  .then(data => {
    users = data;
    displayPage(currentPage);
    if (users.length <= itemsPerPage) {
      pagination.style.display = 'none';
    }
  })
  .catch(error => console.error('Error loading data:', error));

  function displayPage(page) {
    inviteeList.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = users.slice(start, end);

    paginatedItems.forEach(user => {
      const inviteeItem = document.createElement('div');
      inviteeItem.className = 'invitee-item';

      const inviteeDetails = document.createElement('div');
      inviteeDetails.className = 'invitee-details';
      
      const avatar = document.createElement('img');
      avatar.src = user.avatar;
      avatar.alt = user.name;

      const name = document.createElement('p');
      name.textContent = user.name;

      inviteeDetails.appendChild(avatar);
      inviteeDetails.appendChild(name);

      const inviteeActions = document.createElement('div');
      inviteeActions.className = 'invitee-actions';

      const reward = document.createElement('span');
      reward.className = 'invitee-reward';
      reward.innerHTML = `(+${user.reward}) <img src="../images/toncoin.png" class="small-avatar" alt="avatar">`;

      inviteeActions.appendChild(reward);

      inviteeItem.appendChild(inviteeDetails);
      inviteeItem.appendChild(inviteeActions);

      inviteeList.appendChild(inviteeItem);
    });

    updatePagination();
  }

  function updatePagination() {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (currentPage === 1) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }

    if (currentPage === totalPages) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }

  window.nextPage = function() {
    if (currentPage < Math.ceil(users.length / itemsPerPage)) {
      currentPage++;
      displayPage(currentPage);
    }
  };

  window.prevPage = function() {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  };
})
