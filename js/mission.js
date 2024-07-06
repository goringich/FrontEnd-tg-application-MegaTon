document.addEventListener('DOMContentLoaded', function() {
  const tasksPerPage = 10;
  let currentPage = 1;
  const tasksContainer = document.getElementById('tasks');
  const paginationContainer = document.getElementById('pagination');

  // Example tasks data
  const tasks = Array.from({ length: 25 }, (_, i) => ({
    title: `Task ${i + 1}`,
    reward: `${(i + 1) * .1}`,
    img: "../images/toncoin.png",
    name: "telegram"
  }));

  function renderTasks() {
    tasksContainer.innerHTML = '';
    const start = (currentPage - 1) * tasksPerPage;
    const end = start + tasksPerPage;
    const tasksToDisplay = tasks.slice(start, end);

    tasksToDisplay.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task';
      taskElement.innerHTML = `
        <img src="${task.img}" alt="${task.name}">
        <div class="task-info">
          <p class="task-title"><strong>${task.title}</strong></p>
          <p class="task-reward">+ ${task.reward} <img style="width: 25px; transform: translateY(7px)" src="../images/toncoin.png"/></p>
        </div>
        <i class="fas fa-times-circle"></i>
      `;
      taskElement.onclick = function() {
        toggleTask(taskElement);
      };
      tasksContainer.appendChild(taskElement);
    });
  }

  function renderPagination() {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const prevButton = document.createElement('button');
    prevButton.textContent = '«';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = function() {
      if (currentPage > 1) {
        currentPage--;
        renderTasks();
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
        renderTasks();
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
        renderTasks();
        renderPagination();
      }
    };
    paginationContainer.appendChild(nextButton);
  }

  function toggleTask(element) {
    if (element.classList.contains('completed')) {
      element.classList.remove('completed');
      element.querySelector('i').classList.remove('fa-check-circle');
      element.querySelector('i').classList.add('fa-times-circle');
    } else {
      element.classList.add('completed');
      element.querySelector('i').classList.remove('fa-times-circle');
      element.querySelector('i').classList.add('fa-check-circle');
    }
  }

  renderTasks();
  renderPagination();
});
