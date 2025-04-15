document.addEventListener("DOMContentLoaded", function () {
    // Add 'loaded' class after page load for smooth transition effect
    document.body.classList.add("loaded");

    // Smooth transition when clicking navbar links
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const destination = this.getAttribute("href");

            document.body.style.opacity = "0"; // Fade out effect
            setTimeout(() => {
                window.location.href = destination;
            }, 300);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Load the navbar dynamically
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        });

    // Smooth Page Transition Effect
    document.body.classList.add("loaded");
});
