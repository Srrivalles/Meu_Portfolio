document.addEventListener("DOMContentLoaded", () => {
    // Modo escuro/claro
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    themeToggle.addEventListener("change", () => {
        body.classList.toggle("dark-theme");
        localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
    });

    // Mantém a preferência do usuário
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-theme");
        themeToggle.checked = true;
    }

    // Efeito de rolagem animada
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

    // Efeito de hover na logo
    const logo = document.querySelector(".logo");
    logo.addEventListener("mouseenter", () => {
        logo.style.letterSpacing = "5px";
    });

    logo.addEventListener("mouseleave", () => {
        logo.style.letterSpacing = "normal";
    });

    // Animação de botão na página inicial
    const heroBtn = document.querySelector(".hero-btn");

    heroBtn.addEventListener("mouseenter", () => {
        heroBtn.style.transform = "scale(1.1)";
    });

    heroBtn.addEventListener("mouseleave", () => {
        heroBtn.style.transform = "scale(1)";
    });

    // Interatividade nos projetos
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

    // Exibir vídeo ao clicar no botão de preview
    const previewButtons = document.querySelectorAll(".preview-button");

    previewButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const videoSrc = button.getAttribute("data-video");

            // Remove qualquer vídeo existente antes de adicionar um novo
            const existingVideo = button.parentElement.querySelector(".video-container");
            if (existingVideo) {
                existingVideo.remove();
            }

            // Cria o contêiner do vídeo
            const videoContainer = document.createElement("div");
            videoContainer.classList.add("video-container");

            // Cria o elemento de vídeo
            const videoElement = document.createElement("video");
            videoElement.setAttribute("controls", true);
            videoElement.innerHTML = `<source src="${videoSrc}" type="video/mp4">Seu navegador não suporta o vídeo.`;

            // Cria o botão de fechar
            const closeButton = document.createElement("button");
            closeButton.classList.add("close-button");
            closeButton.innerHTML = "×";

            // Adiciona o evento para fechar o vídeo
            closeButton.addEventListener("click", () => {
                videoContainer.remove();
            });

            // Adiciona o vídeo e o botão de fechar ao contêiner
            videoContainer.appendChild(videoElement);
            videoContainer.appendChild(closeButton);

            // Adiciona o contêiner ao DOM
            button.parentElement.appendChild(videoContainer);
            videoContainer.style.display = "block";
        });
    });
}); 
document.addEventListener("DOMContentLoaded", () => {
    // Animação de revelação na seção de contato
    const contactSection = document.querySelector("#contact");

    const revealContact = () => {
        const contactTop = contactSection.getBoundingClientRect().top;
        if (contactTop < window.innerHeight * 0.8) {
            contactSection.classList.add("visible");
        }
    };

    window.addEventListener("scroll", revealContact);
    revealContact();
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links-container");

    menuToggle.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active");
    });

    // Fechar o menu ao clicar em um link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinksContainer.classList.remove("active");
        });
    });
});
// Script para o menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links-container');

    menuToggle.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });
});
