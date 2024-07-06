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
