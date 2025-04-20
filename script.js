// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile navigation menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calculate the top position
            const navHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            // Scroll smoothly
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Handle file upload demo in the disease detection section
    const uploadPlaceholder = document.querySelector('.upload-placeholder');
    const analyzeButton = document.querySelector('.upload-demo .btn');
    
    if (uploadPlaceholder && analyzeButton) {
        uploadPlaceholder.addEventListener('click', function() {
            simulateUpload();
        });
        
        analyzeButton.addEventListener('click', function() {
            simulateAnalysis();
        });
    }
    
    // Simulate file upload functionality
    function simulateUpload() {
        const uploadPlaceholder = document.querySelector('.upload-placeholder');
        
        // Change the upload placeholder appearance
        uploadPlaceholder.innerHTML = `
            <i class="fas fa-check-circle" style="color: #27ae60;"></i>
            <p>Image uploaded successfully!</p>
            <p style="font-size: 0.8rem; color: #777; margin-top: 0.5rem;">plant-leaf-sample.jpg</p>
        `;
        
        // Change the button text
        document.querySelector('.upload-demo .btn').textContent = 'Analyze Image';
    }
    
    // Simulate disease analysis functionality
    function simulateAnalysis() {
        const uploadDemo = document.querySelector('.upload-demo');
        
        // Show loading state
        uploadDemo.innerHTML = `
            <div class="analysis-result">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: #2ecc71; margin-bottom: 1rem;"></i>
                    <p>Analyzing image...</p>
                </div>
            </div>
        `;
        
        // Simulate analysis delay
        setTimeout(function() {
            uploadDemo.innerHTML = `
                <div class="analysis-result">
                    <h3 style="color: #e74c3c; margin-bottom: 1rem;">Detected: Powdery Mildew</h3>
                    <div class="detection-details">
                        <div class="confidence">
                            <span>Confidence:</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: 94%;"></div>
                            </div>
                            <span>94%</span>
                        </div>
                    </div>
                    <div class="treatment">
                        <h4>Recommended Treatment:</h4>
                        <ul>
                            <li>Remove and destroy affected leaves</li>
                            <li>Apply neem oil spray every 7-14 days</li>
                            <li>Increase air circulation around plants</li>
                        </ul>
                    </div>
                    <button class="btn primary" onclick="location.reload()">Scan Another Plant</button>
                </div>
            `;
        }, 2000);
    }
    
    // Implement scroll animations
    const scrollElements = document.querySelectorAll('.feature-card, .hero-content, .hero-image, .disease-content, .disease-image, .analytics-content, .analytics-image');
    
    // Check if element is in view
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;
        
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    // Add animation class when element is in view
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    // Hide initially
    scrollElements.forEach(el => {
        el.classList.add('scroll-animation');
    });
    
    // Add scroll event
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Run on load
    setTimeout(handleScrollAnimation, 100);
    
    // Run on scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Add active state to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        scrollLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-link');
            }
        });
    });
});
