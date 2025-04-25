document.addEventListener("DOMContentLoaded", () => {
    // Animação de seções aparecendo
    const sections = document.querySelectorAll(".section");

    const revealOnScroll = () => {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.8) {
                section.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Hover animado nas letras do logo
    const logo = document.querySelector(".logo");
    const letters = document.querySelectorAll(".logo .letter");

    logo.addEventListener("mouseenter", () => {
        letters.forEach((letter, index) => {
            letter.style.transition = `transform 0.3s ease-in-out ${index * 0.05}s`;
            letter.style.transform = "translateY(-5px)";
        });
    });

    logo.addEventListener("mouseleave", () => {
        letters.forEach((letter, index) => {
            letter.style.transition = `transform 0.3s ease-in-out ${index * 0.05}s`;
            letter.style.transform = "translateY(0)";
        });
    });

    // Botão principal animado
    const heroBtn = document.querySelector(".hero-btn");
    heroBtn.addEventListener("mouseenter", () => {
        heroBtn.style.transform = "scale(1.1)";
    });
    heroBtn.addEventListener("mouseleave", () => {
        heroBtn.style.transform = "scale(1)";
    });

    // Efeito tilt na imagem do Matteo
    const imageMatteo = document.querySelector(".image-matteo");
    if (imageMatteo) {
        imageMatteo.addEventListener("mousemove", (e) => {
            const rect = imageMatteo.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            imageMatteo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        imageMatteo.addEventListener("mouseleave", () => {
            imageMatteo.style.transform = "rotateX(0) rotateY(0)";
        });
    }

    // Animação hover nos cards de projeto
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            item.style.transform = "translateY(-10px)";
            item.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
        });
        item.addEventListener("mouseleave", () => {
            item.style.transform = "translateY(0)";
            item.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
        });
    });

    // Tilt leve ao mover mouse nos cards
    projectItems.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -2;
            const rotateY = ((x - centerX) / centerX) * 2;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0) rotateY(0)";
        });
    });

    // Botões de preview
    const previewButtons = document.querySelectorAll(".preview-button");
    previewButtons.forEach(button => {
        button.addEventListener("click", () => {
            const videoSrc = button.getAttribute("data-video");
            const existingVideo = button.parentElement.querySelector(".video-container");
            if (existingVideo) existingVideo.remove();

            const videoContainer = document.createElement("div");
            videoContainer.classList.add("video-container");

            const videoElement = document.createElement("video");
            videoElement.setAttribute("controls", true);
            videoElement.innerHTML = `<source src="${videoSrc}" type="video/mp4">Seu navegador não suporta o vídeo.`;

            const closeButton = document.createElement("button");
            closeButton.classList.add("close-button");
            closeButton.innerHTML = "×";
            closeButton.addEventListener("click", () => {
                videoContainer.remove();
            });

            videoContainer.appendChild(videoElement);
            videoContainer.appendChild(closeButton);
            button.parentElement.appendChild(videoContainer);
            videoContainer.style.display = "block";
        });

        // Bounce ao clicar
        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.95)";
        });
        button.addEventListener("mouseup", () => {
            button.style.transform = "scale(1)";
        });
    });

    // Scroll suave e destaque nos links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
                link.classList.add("active-highlight");
                setTimeout(() => link.classList.remove("active-highlight"), 800);
            }
        });
    });

    // Animação de fade-in nos títulos das seções
    document.querySelectorAll(".section h1").forEach((title, index) => {
        title.style.opacity = 0;
        title.style.transition = "opacity 1s ease";
        setTimeout(() => {
            title.style.opacity = 1;
        }, index * 400);
    });

    // Fade do body ao carregar
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");
    });

    // Botão voltar ao topo
    const backToTopButton = document.getElementById("back-to-top");

    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Scroll suave para fallback
window.onscroll = function () {
    const backToTopButton = document.getElementById("back-to-top");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

document.getElementById("back-to-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
