/**
 * PORTFÓLIO MODERNO - JAVASCRIPT SIMPLIFICADO
 * Tudo em um único arquivo, sem localStorage
 */

class Portfolio {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navLinks = document.querySelector('.nav-links');
    this.backToTop = document.getElementById('back-to-top');
    
    this.init();
  }

  init() {
    this.setupNavbar();
    this.setupMobileMenu();
    this.setupBackToTop();
    this.setupVideoModals();
    this.setupSmoothScroll();
    this.setupProjectFilter();
    this.setupTypewriter();
    this.setupThemeToggle();
  }

  // === NAVBAR ===
  setupNavbar() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      // Adiciona classe quando rola
      if (currentScroll > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // === MENU MOBILE ===
  setupMobileMenu() {
    if (!this.menuToggle || !this.navLinks) return;
    
    this.menuToggle.addEventListener('click', () => {
      this.navLinks.classList.toggle('active');
    });
    
    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        this.navLinks.classList.remove('active');
      });
    });
    
    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        this.navLinks.classList.remove('active');
      }
    });
  }

  // === BACK TO TOP ===
  setupBackToTop() {
    if (!this.backToTop) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        this.backToTop.classList.add('visible');
      } else {
        this.backToTop.classList.remove('visible');
      }
    });
    
    this.backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  
  // === VIDEO MODALS ===
  setupVideoModals() {
    const previewButtons = document.querySelectorAll('.preview-button');
    
    previewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const videoSrc = button.getAttribute('data-video');
        this.openVideoModal(videoSrc);
      });
    });
  }

  openVideoModal(videoSrc) {
    // Remove modal existente se houver
    const existingModal = document.querySelector('.video-modal-overlay');
    if (existingModal) existingModal.remove();
    
    // Cria o modal
    const modal = document.createElement('div');
    modal.className = 'video-modal-overlay';
    modal.innerHTML = `
      <div class="video-modal-content">
        <video controls autoplay>
          <source src="${videoSrc}" type="video/mp4">
          Seu navegador não suporta vídeo.
        </video>
        <button class="close-button" aria-label="Fechar">&times;</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Ativa o modal
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Bloqueia scroll
    document.body.style.overflow = 'hidden';
    
    // Eventos de fechar
    const closeBtn = modal.querySelector('.close-button');
    
    closeBtn.addEventListener('click', () => this.closeVideoModal(modal));
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeVideoModal(modal);
    });
    
    // ESC para fechar
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        this.closeVideoModal(modal);
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  }

  closeVideoModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => modal.remove(), 300);
  }

  // === SMOOTH SCROLL ===
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignora links vazios
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // === FILTRO DE PROJETOS ===
  setupProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active de todos
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // === TYPEWRITER ANIMATION ===
  setupTypewriter() {
    const title = document.getElementById('typewriter-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        title.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Velocidade de digitação
      }
    };
    typeWriter();
  }

  // === THEME TOGGLE ===
  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // Verifica se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      
      if (isLight) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }
    });
  }
}

// === SCROLL REVEAL (OPCIONAL) ===
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.reveal');
    this.init();
  }

  init() {
    if (!this.elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    this.elements.forEach(el => observer.observe(el));
  }
}
  // === CARROSSEL DE IMAGENS ===
class ImageCarousel {
  constructor() {
    this.carousels = document.querySelectorAll('.carousel-container');
    this.intervals = new Map();
    this.init();
  }

  init() {
    this.carousels.forEach((carousel) => {
      const images = carousel.querySelectorAll('.carousel-image');
      const indicators = carousel.querySelectorAll('.indicator');
      
      if (images.length === 0) return;
      
      let currentIndex = 0;
      let isHovering = false; // 👈 Controla se o mouse está em cima
      
      // Função para mudar de imagem
      const changeImage = (newIndex) => {
        images.forEach(img => img.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        images[newIndex].classList.add('active');
        indicators[newIndex].classList.add('active');
        
        currentIndex = newIndex;
      };
      
      // Auto-rotate a cada 10 segundos
      const intervalId = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        changeImage(nextIndex);
      }, 10000);
      
      this.intervals.set(carousel, intervalId);
      
      // Click nos indicadores
      indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
          // Para o intervalo atual
          clearInterval(this.intervals.get(carousel));
          
          // Muda para a imagem clicada
          changeImage(idx);
          
          // Só cria novo intervalo se o mouse NÃO estiver em cima
          if (!isHovering) {
            const newInterval = setInterval(() => {
              const nextIndex = (currentIndex + 1) % images.length;
              changeImage(nextIndex);
            }, 10000);
            this.intervals.set(carousel, newInterval);
          }
        });
      });
      
      // Pausa quando mouse está em cima
      carousel.addEventListener('mouseenter', () => {
        isHovering = true; // 👈 Marca que o mouse está em cima
        clearInterval(this.intervals.get(carousel));
      });
      
      // Retoma quando mouse sai
      carousel.addEventListener('mouseleave', () => {
        isHovering = false; // 👈 Marca que o mouse saiu
        const newInterval = setInterval(() => {
          const nextIndex = (currentIndex + 1) % images.length;
          changeImage(nextIndex);
        }, 10000);
        this.intervals.set(carousel, newInterval);
      });
    });
  }
  
  // Limpa todos os intervalos (útil para cleanup)
  destroy() {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
  }
}

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfólio carregado!');
  
  new Portfolio();
  new ScrollReveal();
  new ImageCarousel(); // 👈 Inicializa o carrossel
});

// === PERFORMANCE ===
// Preload de fontes críticas
if ('fonts' in document) {
  Promise.all([
    document.fonts.load('700 1em Space Grotesk'),
    document.fonts.load('400 1em Inter')
  ]).then(() => {
    document.body.classList.add('fonts-loaded');
  });
}

// Lazy loading de imagens
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback para navegadores que não suportam lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}
