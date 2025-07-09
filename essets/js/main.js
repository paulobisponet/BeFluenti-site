/**
 * Befluent - Script Principal
 * Plataforma educacional criada por Paulo e Mônica Bispo
 * Funcionalidades: navegação, scroll suave, animações e interações
 */

'use strict';

// ===== CONFIGURAÇÕES GLOBAIS =====
const config = {
    scrollOffset: 100,
    animationDuration: 300,
    debounceDelay: 100
};

// ===== UTILITÁRIOS =====
const utils = {
    /**
     * Debounce para otimizar performance em eventos
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Verifica se elemento está visível na viewport
     */
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Scroll suave para elemento
     */
    smoothScrollTo(element) {
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },

    /**
     * Adiciona classe com animação
     */
    addClassWithAnimation(element, className) {
        element.classList.add(className);
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
};

// ===== NAVEGAÇÃO MOBILE =====
class MobileNavigation {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;
        
        this.init();
    }

    init() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
            
            // Fechar menu ao clicar em link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });

            // Fechar menu ao clicar fora
            document.addEventListener('click', (e) => {
                if (this.isOpen && !e.target.closest('.nav-container')) {
                    this.closeMenu();
                }
            });

            // Fechar menu com ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.navToggle.setAttribute('aria-expanded', this.isOpen);
        
        // Prevenir scroll do body quando menu estiver aberto
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    closeMenu() {
        this.isOpen = false;
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// ===== SCROLL EFFECTS =====
class ScrollEffects {
    constructor() {
        this.header = document.querySelector('.header');
        this.scrollTopBtn = document.querySelector('.scroll-top');
        this.lastScrollTop = 0;
        
        this.init();
    }

    init() {
        const debouncedScroll = utils.debounce(() => this.handleScroll(), config.debounceDelay);
        window.addEventListener('scroll', debouncedScroll);
        
        if (this.scrollTopBtn) {
            this.scrollTopBtn.addEventListener('click', () => this.scrollToTop());
        }

        // Observador para animações de entrada
        this.setupIntersectionObserver();
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header shadow on scroll
        if (this.header) {
            if (scrollTop > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }

        // Show/hide scroll to top button
        if (this.scrollTopBtn) {
            if (scrollTop > config.scrollOffset) {
                this.scrollTopBtn.classList.add('visible');
            } else {
                this.scrollTopBtn.classList.remove('visible');
            }
        }

        this.lastScrollTop = scrollTop;
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Adicionar animações baseadas na classe
                    if (element.classList.contains('feature-card')) {
                        utils.addClassWithAnimation(element, 'animate-fade-up');
                    } else if (element.classList.contains('founder')) {
                        utils.addClassWithAnimation(element, 'animate-fade-up');
                    } else if (element.classList.contains('stat')) {
                        utils.addClassWithAnimation(element, 'animate-fade-up');
                        this.animateCounter(element);
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const elementsToAnimate = document.querySelectorAll(
            '.feature-card, .founder, .stat, .hero-content, .about-text'
        );
        
        elementsToAnimate.forEach(el => observer.observe(el));
    }

    animateCounter(statElement) {
        const numberElement = statElement.querySelector('.stat-number');
        if (!numberElement) return;

        const finalValue = numberElement.textContent;
        const isNumber = !isNaN(parseFloat(finalValue));
        
        if (isNumber) {
            const target = parseFloat(finalValue);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                numberElement.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
            }, 16);
        }
    }
}

// ===== FORMULÁRIOS =====
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Validação em tempo real
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearErrors(input));
            });
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const isValid = this.validateForm(form);
        
        if (isValid) {
            this.submitForm(form);
        }
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        // Limpar erros anteriores
        this.clearErrors(field);

        // Validar campo obrigatório
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Este campo é obrigatório.';
            isValid = false;
        }
        // Validar email
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Por favor, insira um email válido.';
                isValid = false;
            }
        }
        // Validar telefone
        else if (field.name === 'phone' && value) {
            const phoneRegex = /^[\(\)\d\s\-\+]+$/;
            if (!phoneRegex.test(value)) {
                errorMessage = 'Por favor, insira um telefone válido.';
                isValid = false;
            }
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.setAttribute('role', 'alert');
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearErrors(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Estado de loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
            // Simular envio (substituir por integração real)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mostrar sucesso
            this.showSuccessMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
            
        } catch (error) {
            this.showErrorMessage('Erro ao enviar mensagem. Tente novamente.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const style = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 350px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        `;
        
        notification.style.cssText = style;
        notification.style.backgroundColor = type === 'success' ? '#10b981' : '#ef4444';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// ===== CHATBOT INTEGRATION =====
class ChatbotIntegration {
    constructor() {
        this.chatbotBtn = document.querySelector('.chatbot-float');
        this.init();
    }

    init() {
        if (this.chatbotBtn) {
            this.chatbotBtn.addEventListener('click', () => this.openChatbot());
        }
    }

    openChatbot() {
        // Abrir em nova aba ou modal
        window.open('chatbot/chatbot.html', '_blank', 'width=400,height=600,resizable=yes,scrollbars=yes');
        
        // Alternativa: abrir na mesma aba
        // window.location.href = 'chatbot/chatbot.html';
    }
}

// ===== PERFORMANCE E ACESSIBILIDADE =====
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupReducedMotion();
    }

    setupKeyboardNavigation() {
        // Navegação por teclado para elementos interativos
        document.addEventListener('keydown', (e) => {
            // Esc para fechar modais/menus
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    this.closeModal(activeModal);
                }
            }
            
            // Enter/Space para botões
            if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('btn')) {
                e.preventDefault();
                e.target.click();
            }
        });
    }

    setupFocusManagement() {
        // Gerenciar foco para elementos dinâmicos
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('focusin', (e) => {
            // Garantir que elementos focados estejam visíveis
            const element = e.target;
            if (element && typeof element.scrollIntoView === 'function') {
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    setupReducedMotion() {
        // Respeitar preferência de movimento reduzido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            
            // Remover animações CSS
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===== INICIALIZAÇÃO =====
class App {
    constructor() {
        this.init();
    }

    init() {
        // Aguardar DOM estar carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startApp());
        } else {
            this.startApp();
        }
    }

    startApp() {
        try {
            // Inicializar módulos
            new MobileNavigation();
            new ScrollEffects();
            new FormHandler();
            new ChatbotIntegration();
            new AccessibilityEnhancements();
            
            // Configurações adicionais
            this.setupExternalLinks();
            this.setupLazyLoading();
            
            console.log('Befluent: Aplicação inicializada com sucesso!');
            
        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error);
        }
    }

    setupExternalLinks() {
        // Abrir links externos em nova aba
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
        externalLinks.forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }

    setupLazyLoading() {
        // Lazy loading para imagens (se houver)
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
}

// ===== INICIALIZAR APLICAÇÃO =====
new App();

// ===== EXPORTAR PARA REUTILIZAÇÃO =====
window.BefluentApp = {
    utils,
    MobileNavigation,
    ScrollEffects,
    FormHandler,
    ChatbotIntegration,
    AccessibilityEnhancements
};
