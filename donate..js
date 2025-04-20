document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for scrolling
    window.addEventListener('scroll', function() {
        const parallaxSections = document.querySelectorAll('.parallax');
        
        parallaxSections.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Only apply parallax if section is in view
            if (scrollPosition > sectionTop - window.innerHeight && 
                scrollPosition < sectionTop + sectionHeight) {
                const yValue = (scrollPosition - sectionTop) * 0.5;
                section.style.backgroundPositionY = `-${yValue}px`;
            }
        });
    });
    
    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll('.info-card, .feature, .form-container, .footer-content');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // File upload preview
    const fileInput = document.getElementById('plant-image');
    const filePreview = document.getElementById('file-preview');
    
    if (fileInput && filePreview) {
        fileInput.addEventListener('change', function() {
            filePreview.innerHTML = '';
            
            if (this.files.length === 0) {
                filePreview.innerHTML = '<p>No files selected</p>';
                return;
            }
            
            const fragment = document.createDocumentFragment();
            
            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                
                // Only process image files
                if (!file.type.match('image.*')) {
                    continue;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.alt = file.name;
                    img.title = file.name;
                    fragment.appendChild(img);
                    
                    // If this is the last file, append fragment to preview
                    if (i === fileInput.files.length - 1) {
                        filePreview.appendChild(fragment);
                    }
                };
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Form validation
    const form = document.querySelector('form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            // Validate name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                event.preventDefault();
                alert('Please enter your name');
                nameInput.focus();
                return;
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                event.preventDefault();
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }
            
            // Validate file upload
            const fileInput = document.getElementById('plant-image');
            if (fileInput.files.length === 0) {
                event.preventDefault();
                alert('Please select at least one image file');
                return;
            }
            
            // Validate consent
            const consentInput = document.getElementById('consent');
            if (!consentInput.checked) {
                event.preventDefault();
                alert('You must consent to image usage');
                consentInput.focus();
                return;
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Create futuristic particle background effect
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.getElementById('hero');
    
    if (hero) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '0';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        hero.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        
        // Particle array
        const particles = [];
        const particleCount = 100;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: `rgba(129, 199, 132, ${Math.random() * 0.5 + 0.2})`,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1
            });
        }
        
        // Draw particles and connections
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX = -particle.speedX;
                }
                
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY = -particle.speedY;
                }
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                // Draw connections
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(129, 199, 132, ${0.2 - (distance / 500)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(drawParticles);
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
        
        // Start animation
        drawParticles();
    }
});