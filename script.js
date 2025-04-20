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
        const uploadDemo = document.querySelector('.
