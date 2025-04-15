// Scroll Animation
const sections = document.querySelectorAll('.mining-info');

const checkVisibility = () => {
    const triggerBottom = window.innerHeight / 5 * 4;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
};
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload(); // Force full reload if coming from cache
  }
});


window.addEventListener('scroll', checkVisibility);

// Initial check to load any sections in view when page loads
checkVisibility();

// Fade-in effect on page load
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
});

// Smooth transition on link click
document.querySelectorAll('a').forEach(link => {
    if (link.href && !link.href.includes("#")) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = this.href;
        }, 400); // Same as CSS transition duration
      });
    }
  });
  
  // Fade in on page load
  window.addEventListener("load", () => {
    document.body.classList.remove('fade-out');
  });
  
  
  document.getElementById("start-chat-link").addEventListener("click", function (e) {
    e.preventDefault(); // Stop default instant redirect
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = this.href;
    }, 400); // Match the CSS transition time
  });

  window.addEventListener('pageshow', function (event) {
    const video = document.querySelector("video");
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        if (video) {
            video.load();
            video.play().catch(() => {});
        }
    }
});
  