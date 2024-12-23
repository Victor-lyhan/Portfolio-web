document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");

    window.addEventListener("resize", () => {
        const navLinks = document.querySelectorAll(".navbar a");
        navLinks.forEach(link => {
            link.style.fontSize = "1.2rem";
        });
    });
});
