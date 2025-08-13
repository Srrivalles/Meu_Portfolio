// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Navigation elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavClose = document.querySelector('.mobile-nav-close');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('active');
});

mobileNavClose.addEventListener('click', () => {
    mobileNav.classList.remove('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileNav.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
const allNavLinks = [...navLinks, ...mobileNavLinks];
allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu
        mobileNav.classList.remove('active');

        // Update active link
        allNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });

    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations com múltiplos tipos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar diferentes tipos de animação
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.fade-in-left').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.fade-in-right').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.fade-in-scale').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('.fade-in-rotate').forEach(el => {
    observer.observe(el);
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project preview functionality
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');
const previewBtns = document.querySelectorAll('.preview-btn');

previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const videoSrc = btn.getAttribute('data-video');
        modalVideo.querySelector('source').src = videoSrc;
        modalVideo.load();
        videoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    videoModal.style.display = 'none';
    modalVideo.pause();
    document.body.style.overflow = 'auto';
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        modalVideo.pause();
        document.body.style.overflow = 'auto';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Typing effect for hero title aprimorado
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const titleText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '3px solid var(--accent-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < titleText.length) {
            heroTitle.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100 + Math.random() * 50); // Velocidade variável para parecer mais humano
        } else {
            // Piscar cursor algumas vezes e depois remover
            let blinkCount = 0;
            const blinkCursor = setInterval(() => {
                heroTitle.style.borderRight = heroTitle.style.borderRight === 'none' ? '3px solid var(--accent-color)' : 'none';
                blinkCount++;
                if (blinkCount >= 6) {
                    clearInterval(blinkCursor);
                    heroTitle.style.borderRight = 'none';
                }
            }, 500);
        }
    };

    // Start typing effect after loading
    setTimeout(typeWriter, 1500);
}

// Animação de entrada para elementos do hero
setTimeout(() => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'slideInLeft 0.8s ease-out 2.5s both';
    }
    
    if (heroCta) {
        heroCta.style.animation = 'fadeInUp 0.8s ease-out 3s both';
    }
}, 100);

// Skill tags hover effect com animações extras
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    // Animação de entrada escalonada
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in-scale');
    
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-5px) scale(1.1) rotate(3deg)';
        tag.style.zIndex = '10';
        
        // Efeito ripple
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255,255,255,0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        tag.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        tag.style.zIndex = '1';
    });
});

// Adicionar animação ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 100px; height: 100px; opacity: 0; }
    }
`;
document.head.appendChild(style);

// Project card tilt effect aprimorado
document.querySelectorAll('.project-card').forEach((card, index) => {
    // Animação de entrada escalonada
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('fade-in-up');
    
    card.addEventListener('mouseenter', () => {
        // Adicionar partículas animadas
        createParticles(card);
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        // Remover partículas
        const particles = card.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
    });
});

// Função para criar partículas
function createParticles(container) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${2 + Math.random() * 3}s ease-in-out infinite;
            opacity: 0.7;
            pointer-events: none;
            z-index: 10;
        `;
        container.appendChild(particle);
    }
}

// Adicionar CSS para partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
        50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
    }
`;
document.head.appendChild(particleStyle);

// Add smooth reveal animation to elements com delays escalonados
const revealElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
revealElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.15}s`;
    // Adicionar diferentes tipos de animação baseado no índice
    const animationTypes = ['fade-in-up', 'fade-in-left', 'fade-in-right', 'fade-in-scale'];
    const animationType = animationTypes[index % animationTypes.length];
    element.classList.add(animationType);
});

// Animação para os números das estatísticas
const animateNumbers = () => {
    document.querySelectorAll('.stat-number').forEach((number, index) => {
        const finalValue = parseInt(number.textContent.replace(/\D/g, ''));
        let currentValue = 0;
        const increment = finalValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                number.textContent = number.textContent.replace(/\d+/, finalValue);
                clearInterval(timer);
            } else {
                number.textContent = number.textContent.replace(/\d+/, Math.floor(currentValue));
            }
        }, 30);
    });
};

// Observar quando a seção about fica visível para animar números
const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Enhanced scroll performance com efeitos visuais extras
let ticking = false;

function updateScrollEffects() {
    const scrollY = window.pageYOffset;
    
    // Back to top button
    if (scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // Navbar effect
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax effect para múltiplos elementos
    const parallaxElements = document.querySelectorAll('.floating');
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05}deg)`;
    });

    // Efeito de movimento no background do hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
            hero.style.backgroundPosition = `${scrollY * 0.5}px ${scrollY * 0.3}px`;
        }
    }

    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate);

// Adicionar animações especiais em intervalos
setInterval(() => {
    // Fazer logo "piscar" ocasionalmente
    const logo = document.querySelector('.logo');
    if (logo && Math.random() > 0.95) {
        logo.style.animation = 'heartbeat 0.8s ease-in-out';
        setTimeout(() => {
            logo.style.animation = '';
        }, 800);
    }
    
    // Fazer skill tags "dançarem" ocasionalmente
    const skillTags = document.querySelectorAll('.skill-tag');
    if (skillTags.length && Math.random() > 0.98) {
        const randomTag = skillTags[Math.floor(Math.random() * skillTags.length)];
        randomTag.style.animation = 'wiggle 0.5s ease-in-out';
        setTimeout(() => {
            randomTag.style.animation = '';
        }, 500);
    }
}, 3000);

// Efeito de "chuva de código" no background (Matrix style)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.03;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01{}();[]<>/';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// Iniciar chuva de código
setTimeout(createMatrixRain, 3000);
