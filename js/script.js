document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('beforeAfterContainer');
    const handle = document.getElementById('sliderHandle');
    const afterImage = document.querySelector('.ba-after-image');
    const images = document.querySelectorAll('.ba-before-image, .ba-after-image');
    
    // منع سحب الصور
    images.forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
        img.addEventListener('contextmenu', (e) => e.preventDefault());
    });
    
    let sliderPosition = 50;
    let autoAnimationActive = true;
    let userHasInteracted = false;
    let animationFrameId = null;
    let animationDirection = 1;

    // تحديث موضع السلايدر - بدون transition للسرعة
    function updatePosition(percentage) {
        sliderPosition = Math.max(0, Math.min(100, percentage));
        handle.style.transition = 'none';
        afterImage.style.transition = 'none';
        handle.style.left = sliderPosition + '%';
        afterImage.style.clipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;
    }

    // الحركة التلقائية
    function autoAnimate() {
        if (!autoAnimationActive || userHasInteracted) return;
        
        sliderPosition += 0.3 * animationDirection;
        
        if (sliderPosition >= 80) {
            sliderPosition = 80;
            animationDirection = -1;
        } else if (sliderPosition <= 20) {
            sliderPosition = 20;
            animationDirection = 1;
        }
        
        updatePosition(sliderPosition);
        animationFrameId = requestAnimationFrame(autoAnimate);
    }

    // إيقاف الحركة التلقائية
    function stopAutoAnimation() {
        if (userHasInteracted) return;
        userHasInteracted = true;
        autoAnimationActive = false;
        container.classList.add('user-interacted');
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }

    // الحصول على النسبة المئوية من موضع الماوس/اللمس
    function getPercentage(e) {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        return (x / rect.width) * 100;
    }

    // الضغط على أي مكان للانتقال المباشر - أسرع
    container.addEventListener('mousedown', (e) => {
        if (e.target === handle || handle.contains(e.target)) return;
        stopAutoAnimation();
        updatePosition(getPercentage(e));
        e.preventDefault();
    });

    container.addEventListener('touchstart', (e) => {
        if (e.target === handle || handle.contains(e.target)) return;
        stopAutoAnimation();
        updatePosition(getPercentage(e));
        e.preventDefault();
    }, { passive: false });

    // السحب
    let isDragging = false;
    
    handle.addEventListener('mousedown', (e) => {
        stopAutoAnimation();
        isDragging = true;
        e.preventDefault();
    });

    handle.addEventListener('touchstart', (e) => {
        stopAutoAnimation();
        isDragging = true;
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updatePosition(getPercentage(e));
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        updatePosition(getPercentage(e));
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('touchend', () => isDragging = false);

    // بدء الحركة التلقائية
    container.classList.add('auto-animate');
    autoAnimate();
    
    // الموضع الابتدائي
    updatePosition(50);
});

// Product Images Animation
document.addEventListener('DOMContentLoaded', function() {
    const product1 = document.querySelector('.prod-img-1');
    const product2 = document.querySelector('.prod-img-2');
    const product3 = document.querySelector('.prod-img-3');
    
    if (product1 && product2 && product3) {
        // الصورة الأولى تبدأ فوراً
        setTimeout(() => {
            product1.classList.add('animate');
        }, 100);
        
        // الصورة الثانية تبدأ بعد ظهور الصورة الأولى (بعد 700ms)
        setTimeout(() => {
            product2.classList.add('animate');
        }, 700);
        
        // الصورة الثالثة تبدأ بعد انتهاء الصورة الثانية (700ms + 2000ms = 2700ms)
        setTimeout(() => {
            product3.classList.add('animate');
        }, 2700);
    }
});

// FAQ Toggle Function
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const faqIcon = element.querySelector('.faq-icon');
    
    // إغلاق جميع الأسئلة الأخرى
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = '0';
            answer.style.padding = '0';
        }
    });
    
    // فتح/إغلاق السؤال الحالي
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        faqAnswer.style.maxHeight = '0';
        faqAnswer.style.padding = '0';
    } else {
        faqItem.classList.add('active');
        const answerContent = faqAnswer.querySelector('.faq-answer-content');
        const height = answerContent ? answerContent.scrollHeight : 200;
        faqAnswer.style.maxHeight = height + 'px';
        faqAnswer.style.padding = '0 0 20px 0';
    }
}
