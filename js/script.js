document.addEventListener('DOMContentLoaded', () => {
    // ハンバーガーメニューの切り替え
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Intersection Observerによるフェードインアニメーション
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Initialize Academy Sliders if they exist on the page
    initAcademySlider('.cram-slider', '.cram-prev', '.cram-next');
    initAcademySlider('.kobekatsu-slider', '.kobekatsu-prev', '.kobekatsu-next');

    // Initialize Features Slider
    initFeaturesSlider();
});

// Features Slider 初期化
function initFeaturesSlider() {
    const tabs = document.querySelectorAll('.features-tab');
    const slides = document.querySelectorAll('.features-slide');
    const progressBar = document.querySelector('.features-progress-bar');
    
    if (tabs.length === 0 || slides.length === 0) return;

    let currentIndex = 0;
    let slideTimer;
    const duration = 5000; // 5秒で切り替え
    let startTime;

    // タブクリック時の処理
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // スライド切り替え関数
    function goToSlide(index) {
        // アクティブクラスの切り替え
        tabs.forEach(t => t.classList.remove('active'));
        slides.forEach(s => s.classList.remove('active'));

        tabs[index].classList.add('active');
        slides[index].classList.add('active');
        currentIndex = index;

        // タイマーリセット
        startAutoSlide();
    }

    // 自動スライド
    function startAutoSlide() {
        clearInterval(slideTimer);
        startTime = Date.now();
        
        // アニメーション用タイマー
        slideTimer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / duration) * 100, 100);
            
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }

            if (elapsed >= duration) {
                // 次のスライドへ
                const nextIndex = (currentIndex + 1) % tabs.length;
                goToSlide(nextIndex);
            }
        }, 30);
    }

    // 初回起動
    startAutoSlide();
}

// アカデミーページ用スライドショー初期化関数
function initAcademySlider(sliderSelector, prevBtnSelector, nextBtnSelector) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const slides = slider.querySelectorAll('.academy-slide');
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.remove('active-slide');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // 自動スライド
    function startSlide() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function stopSlide() {
        clearInterval(slideInterval);
    }

    slider.addEventListener('mouseenter', stopSlide);
    slider.addEventListener('mouseleave', startSlide);

    startSlide();
}
