document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initFormSubmission();
    initScrollAnimations();
    initStatsCounter();
});

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

function initFormSubmission() {
    const form = document.querySelector('.join-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            
            if (validateForm(name, phone, email)) {
                showSuccessMessage(name);
                form.reset();
            }
        });
    }
}

function validateForm(name, phone, email) {
    if (!name.trim()) {
        alert('请输入您的姓名');
        return false;
    }
    
    if (!phone.trim() || !/^\d{11}$/.test(phone.replace(/\D/g, ''))) {
        alert('请输入有效的手机号码');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('请输入有效的邮箱地址');
        return false;
    }
    
    return true;
}

function showSuccessMessage(name) {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #27ae60, #2ecc71);
        color: white;
        padding: 40px 60px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        animation: fadeIn 0.3s ease;
    `;
    
    message.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 20px;">🎉</div>
        <h3 style="font-size: 1.8rem; margin-bottom: 15px;">报名成功！</h3>
        <p style="font-size: 1.1rem; opacity: 0.9;">感谢您，${name}！我们会尽快与您联系。</p>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.activity-card, .stat-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateNumbers();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateNumbers() {
    const targets = [500, 2000, 300];
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((el, index) => {
        const target = targets[index];
        let current = 0;
        const increment = target / 60;
        const suffix = el.textContent.includes('+') ? '+' : '';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(style);
