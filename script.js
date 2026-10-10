/**
 * HARSHAL KURREY — BEYOND THE INTERFACE | PORTFOLIO 2.0
 * Master Script: Motion, 3D Canvas Simulations, Interactive Labs, and Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── 00. CYBERNETIC LOADING EXPERIENCE ─── */
    const loader = document.getElementById('loader-screen');
    const progressBar = document.getElementById('loader-progress-bar');
    const counterText = document.getElementById('loader-counter');
    const statusText = document.getElementById('loader-status-text');
    const skipBtn = document.getElementById('loader-skip-btn');
    const pillarItems = document.querySelectorAll('.pillar-item');

    if (loader && progressBar) {
        let progress = 0;
        let isComplete = false;

        const statusPhases = [
            { at: 0, text: 'INITIALIZING QUANTUM CORE...' },
            { at: 28, text: 'SYNCHRONIZING DIGITAL EXPERIENCES...' },
            { at: 62, text: 'CALIBRATING 3D NEURAL ORBIT...' },
            { at: 88, text: 'LAUNCHING HK ENGINE...' },
            { at: 100, text: 'ORBITAL ENGINE ONLINE 100%' }
        ];

        const finishLoader = () => {
            if (isComplete) return;
            isComplete = true;

            progress = 100;
            progressBar.style.width = '100%';
            if (counterText) counterText.textContent = '100%';
            if (statusText) statusText.textContent = 'ORBITAL ENGINE ONLINE 100%';

            pillarItems.forEach(p => p.classList.add('active'));

            setTimeout(() => {
                loader.classList.add('loader-hidden');
                document.body.classList.add('page-loaded');

                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.classList.add('entrance-finished');
                }, 900);
            }, 120);
        };

        const startTime = performance.now();
        const duration = 1100; // Snappy 1.1s duration for immediate wow factor without waiting

        const tick = (now) => {
            if (isComplete) return;
            const elapsed = now - startTime;
            const rawProgress = Math.min(elapsed / duration, 1);

            // Fast dynamic exponential acceleration
            const ease = rawProgress < 0.7 
                ? (rawProgress / 0.7) * 0.72 
                : 0.72 + Math.pow((rawProgress - 0.7) / 0.3, 1.2) * 0.28;

            progress = Math.min(Math.floor(ease * 100), 100);

            progressBar.style.width = `${progress}%`;
            if (counterText) counterText.textContent = `${progress}%`;

            const currentPhase = [...statusPhases].reverse().find(phase => progress >= phase.at);
            if (currentPhase && statusText && statusText.textContent !== currentPhase.text) {
                statusText.textContent = currentPhase.text;
            }

            const activeIdx = Math.min(Math.floor((progress / 100) * pillarItems.length), pillarItems.length - 1);
            pillarItems.forEach((p, idx) => {
                if (idx <= activeIdx) p.classList.add('active');
                else p.classList.remove('active');
            });

            if (rawProgress >= 1) {
                finishLoader();
            } else {
                requestAnimationFrame(tick);
            }
        };

        requestAnimationFrame(tick);

        if (skipBtn) skipBtn.addEventListener('click', finishLoader);
        loader.addEventListener('click', finishLoader);
        window.addEventListener('keydown', () => finishLoader(), { once: true });
    } else {
        document.body.classList.add('page-loaded');
        setTimeout(() => {
            document.body.classList.add('entrance-finished');
        }, 900);
    }

    /* ─── 01. GLOBAL HEADER & SCROLL PROGRESS ─── */
    const header = document.getElementById('site-header');
    const scrollBar = document.getElementById('scroll-progress-bar');
    const backToTopBtn = document.getElementById('btn-back-to-top');

    const updateScrollMetrics = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollBar) {
            scrollBar.style.width = `${progress}%`;
        }

        if (header) {
            if (scrollTop > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    updateScrollMetrics();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ─── 02. ACTIVE SECTION TRACKING (INTERSECTION OBSERVER) ─── */
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));

    /* ─── 03. MOBILE NAVIGATION DRAWER ─── */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const openMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    /* ─── 04. FLOATING PARTICLES & NEURAL LIVING CONSTELLATION ─── */
    const starCanvas = document.getElementById('stars-canvas');
    if (starCanvas) {
        const sCtx = starCanvas.getContext('2d');
        let particles = [];
        let sWidth = window.innerWidth;
        let sHeight = window.innerHeight;
        let animationFrameId = null;
        let isTabActive = !document.hidden;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Curated cosmic particle colors: cyan, sky blue, deep indigo, violet, radiant lavender
        const colorPalette = [
            { r: 0, g: 242, b: 254 },    // Cyan #00f2fe
            { r: 56, g: 189, b: 248 },   // Sky blue #38bdf8
            { r: 59, g: 130, b: 246 },   // Indigo/Blue #3b82f6
            { r: 168, g: 85, b: 247 },  // Violet #a855f7
            { r: 192, g: 132, b: 252 }  // Lavender/Purple #c084fc
        ];

        const createParticle = (depthTier) => {
            // Depths: 1 = Far, 2 = Mid, 3 = Near (foreground)
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            let radius, speed, baseAlpha, parallaxFactor;

            if (depthTier === 1) {
                // Far depth
                radius = Math.random() * 0.7 + 0.6;
                speed = Math.random() * 0.18 + 0.08;
                baseAlpha = Math.random() * 0.28 + 0.22;
                parallaxFactor = 0.25;
            } else if (depthTier === 2) {
                // Mid depth
                radius = Math.random() * 0.9 + 1.2;
                speed = Math.random() * 0.32 + 0.15;
                baseAlpha = Math.random() * 0.35 + 0.38;
                parallaxFactor = 0.6;
            } else {
                // Near depth
                radius = Math.random() * 1.1 + 1.9;
                speed = Math.random() * 0.45 + 0.22;
                baseAlpha = Math.random() * 0.32 + 0.55;
                parallaxFactor = 1.0;
            }

            const angle = Math.random() * Math.PI * 2;

            return {
                x: Math.random() * sWidth,
                y: Math.random() * sHeight,
                vx: Math.cos(angle) * speed * 0.6,
                vy: -Math.abs(Math.sin(angle) * speed) - 0.06, // subtle upward drift
                radius,
                baseAlpha,
                currentAlpha: baseAlpha,
                pulseSpeed: Math.random() * 0.003 + 0.0015,
                pulseOffset: Math.random() * Math.PI * 2,
                color,
                depth: depthTier,
                parallaxFactor,
                connections: 0
            };
        };

        const setupParticles = () => {
            const isDesktop = window.innerWidth >= 1024;
            const isTablet = window.innerWidth >= 641 && window.innerWidth < 1024;
            // Strict device budget for steady 60fps on ordinary laptops and phones
            const targetCount = isDesktop ? 55 : (isTablet ? 36 : 12);

            particles = [];
            for (let i = 0; i < targetCount; i++) {
                // Distribute across depths: 50% far, 35% mid, 15% near
                const tier = i < targetCount * 0.5 ? 1 : (i < targetCount * 0.85 ? 2 : 3);
                particles.push(createParticle(tier));
            }
        };

        const resizeCanvas = () => {
            sWidth = window.innerWidth;
            sHeight = window.innerHeight;
            // Dramatically improves mobile performance by reducing pixel fill rate
            const dpr = window.innerWidth <= 768 ? 1 : Math.min(window.devicePixelRatio || 1, 2);
            starCanvas.width = sWidth * dpr;
            starCanvas.height = sHeight * dpr;
            sCtx.scale(dpr, dpr);
            setupParticles();
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        // Gentle mouse parallax offsets for canvas particles
        let mouseXOffset = 0;
        let mouseYOffset = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        if (window.innerWidth >= 1024 && !window.matchMedia('(hover: none)').matches) {
            window.addEventListener('mousemove', (e) => {
                targetMouseX = (e.clientX / window.innerWidth - 0.5) * 20;
                targetMouseY = (e.clientY / window.innerHeight - 0.5) * 20;
            }, { passive: true });
        }

        const maxConnectDist = window.innerWidth >= 1024 ? 90 : 65;
        const maxConnectDistSq = maxConnectDist * maxConnectDist;

        const renderFrame = (timestamp) => {
            if (!isTabActive) return;

            sCtx.clearRect(0, 0, sWidth, sHeight);

            // Interpolate mouse offset smoothly
            mouseXOffset += (targetMouseX - mouseXOffset) * 0.05;
            mouseYOffset += (targetMouseY - mouseYOffset) * 0.05;

            // Reset connection counters
            const pCount = particles.length;
            for (let i = 0; i < pCount; i++) {
                particles[i].connections = 0;
            }

            // Draw neural connections between nearby particles (subtle, living neural-universe lines)
            if (!prefersReducedMotion) {
                for (let i = 0; i < pCount; i++) {
                    const p1 = particles[i];
                    if (p1.connections >= 3) continue;

                    const p1x = p1.x + mouseXOffset * p1.parallaxFactor;
                    const p1y = p1.y + mouseYOffset * p1.parallaxFactor;

                    for (let j = i + 1; j < pCount; j++) {
                        const p2 = particles[j];
                        if (p2.connections >= 3) continue;

                        const p2x = p2.x + mouseXOffset * p2.parallaxFactor;
                        const p2y = p2.y + mouseYOffset * p2.parallaxFactor;

                        const dx = p1x - p2x;
                        const dy = p1y - p2y;
                        const distSq = dx * dx + dy * dy;

                        if (distSq < maxConnectDistSq) {
                            const dist = Math.sqrt(distSq);
                            const lineAlpha = (1 - dist / maxConnectDist) * 0.16;

                            sCtx.beginPath();
                            sCtx.moveTo(p1x, p1y);
                            sCtx.lineTo(p2x, p2y);
                            sCtx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${lineAlpha})`;
                            sCtx.lineWidth = 0.75;
                            sCtx.stroke();

                            p1.connections++;
                            p2.connections++;
                            if (p1.connections >= 3) break;
                        }
                    }
                }
            }

            // Draw floating particles with glowing depth
            for (let i = 0; i < pCount; i++) {
                const p = particles[i];

                if (!prefersReducedMotion) {
                    // Update positions with slow organic floating
                    p.x += p.vx + Math.sin(timestamp * 0.001 + p.pulseOffset) * 0.08;
                    p.y += p.vy;

                    // Smooth screen wrap
                    if (p.x < -20) p.x = sWidth + 20;
                    else if (p.x > sWidth + 20) p.x = -20;
                    if (p.y < -20) p.y = sHeight + 20;
                    else if (p.y > sHeight + 20) p.y = -20;

                    // Subtle breathing pulse
                    p.currentAlpha = p.baseAlpha * (0.75 + 0.25 * Math.sin(timestamp * p.pulseSpeed + p.pulseOffset));
                }

                const px = p.x + mouseXOffset * p.parallaxFactor;
                const py = p.y + mouseYOffset * p.parallaxFactor;

                sCtx.beginPath();
                sCtx.arc(px, py, p.radius, 0, Math.PI * 2);
                sCtx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.currentAlpha})`;

                if (p.depth === 3 && p.currentAlpha > 0.5) {
                    sCtx.shadowBlur = 8;
                    sCtx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.6)`;
                    sCtx.fill();
                    sCtx.shadowBlur = 0; // reset
                } else {
                    sCtx.fill();
                }
            }

            if (!prefersReducedMotion) {
                animationFrameId = requestAnimationFrame(renderFrame);
            }
        };

        // Tab visibility listener to pause background animations when tab is hidden
        document.addEventListener('visibilitychange', () => {
            isTabActive = !document.hidden;
            if (isTabActive && !prefersReducedMotion) {
                animationFrameId = requestAnimationFrame(renderFrame);
            } else if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        });

        // Initial render
        animationFrameId = requestAnimationFrame(renderFrame);
    }

    /* ─── 05. HERO DECORATIVE MOTION PARALLAX (DESKTOP ONLY) ─── */
    // Keeps hero text (.hero-content) and navbar (.site-header) strictly stationary!
    const heroSection = document.getElementById('home');
    const heroBgImg = document.querySelector('.hero-cosmic-bg-img');
    const ambientNebula = document.querySelector('.hero-ambient-nebula');
    const orbitalWrapper = document.getElementById('hero-orbital-wrapper');
    const hudCards = document.querySelectorAll('.hud-status-card');

    const heroPrefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktopParallax = window.innerWidth >= 1024 && !window.matchMedia('(hover: none)').matches;

    if (heroSection && isDesktopParallax && !heroPrefersReduced) {
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let parallaxFrameId = null;
        let isHeroInView = true;

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            targetX = (e.clientX - rect.left) / rect.width - 0.5;
            targetY = (e.clientY - rect.top) / rect.height - 0.5;
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        });

        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isHeroInView = entry.isIntersecting;
                if (isHeroInView && !document.hidden && !parallaxFrameId) {
                    parallaxFrameId = requestAnimationFrame(animateHeroParallax);
                }
            });
        }, { threshold: 0.05 });
        heroObserver.observe(heroSection);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && parallaxFrameId) {
                cancelAnimationFrame(parallaxFrameId);
                parallaxFrameId = null;
            } else if (!document.hidden && isHeroInView && !parallaxFrameId) {
                parallaxFrameId = requestAnimationFrame(animateHeroParallax);
            }
        });

        const animateHeroParallax = () => {
            if (document.hidden || !isHeroInView) {
                parallaxFrameId = null;
                return;
            }

            // Smooth 60fps lerp
            mouseX += (targetX - mouseX) * 0.05;
            mouseY += (targetY - mouseY) * 0.05;

            // 1. Decorative cosmic background artwork (slight translation, stationary hero text)
            if (heroBgImg) {
                heroBgImg.style.transform = `scale(1.03) translate3d(${mouseX * -10}px, ${mouseY * -8}px, 0)`;
            }

            // 2. Decorative ambient nebula layer
            if (ambientNebula) {
                ambientNebula.style.transform = `translate3d(${mouseX * -14}px, ${mouseY * -10}px, 0)`;
            }

            // 3. Orbital visual container (subtle 3D perspective tilt)
            if (orbitalWrapper) {
                orbitalWrapper.style.transform = `perspective(1000px) rotateY(${mouseX * 4}deg) rotateX(${-mouseY * 4}deg)`;
            }

            // 4. Floating HUD status cards (slight depth offset)
            if (hudCards.length > 0) {
                hudCards.forEach((card, idx) => {
                    const cardDepth = idx === 0 ? 8 : -7;
                    card.style.transform = `translate3d(${mouseX * cardDepth}px, ${mouseY * cardDepth}px, 0)`;
                });
            }

            parallaxFrameId = requestAnimationFrame(animateHeroParallax);
        };

        parallaxFrameId = requestAnimationFrame(animateHeroParallax);
    }

    /* ─── 06. PROJECT FILTERING ─── */
    const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    /* ─── 07. PROJECT CASE STUDY MODAL ─── */
    const caseStudyModal = document.getElementById('case-study-modal');
    const openCaseStudyBtns = document.querySelectorAll('.open-case-study');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalBackLink = document.getElementById('modal-back-link');

    const openModal = () => {
        if (!caseStudyModal) return;
        caseStudyModal.classList.add('open');
        caseStudyModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!caseStudyModal) return;
        caseStudyModal.classList.remove('open');
        caseStudyModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    openCaseStudyBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (modalBackLink) modalBackLink.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && caseStudyModal && caseStudyModal.classList.contains('open')) {
            closeModal();
        }
    });

    /* ─── 08. CREATIVE LAB EXPERIMENT 1: PARTICLE CONSTELLATION ─── */
    const pCanvas = document.getElementById('particle-lab-canvas');
    if (pCanvas) {
        const pCtx = pCanvas.getContext('2d');
        let pWidth = pCanvas.parentElement.clientWidth;
        let pHeight = pCanvas.parentElement.clientHeight;
        pCanvas.width = pWidth;
        pCanvas.height = pHeight;

        let particles = [];
        const count = 45;
        let mouseP = { x: -999, y: -999 };
        let gravityMode = 1; // 1 = attract, -1 = repel

        const initLabParticles = () => {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * pWidth,
                    y: Math.random() * pHeight,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    radius: Math.random() * 2 + 1.5,
                    color: i % 2 === 0 ? '#00f2fe' : '#a855f7'
                });
            }
        };

        initLabParticles();

        pCanvas.addEventListener('mousemove', (e) => {
            const rect = pCanvas.getBoundingClientRect();
            mouseP.x = e.clientX - rect.left;
            mouseP.y = e.clientY - rect.top;
        });

        pCanvas.addEventListener('mouseleave', () => {
            mouseP.x = -999;
            mouseP.y = -999;
        });

        const resetBtn = document.getElementById('btn-reset-particles');
        const gravityBtn = document.getElementById('btn-toggle-gravity');

        if (resetBtn) resetBtn.addEventListener('click', initLabParticles);
        if (gravityBtn) {
            gravityBtn.addEventListener('click', () => {
                gravityMode *= -1;
                gravityBtn.innerHTML = gravityMode === 1 
                    ? '<i class="fa-solid fa-magnet"></i> Invert Gravity' 
                    : '<i class="fa-solid fa-repel"></i> Normal Gravity';
            });
        }

        const animateLabParticles = () => {
            pCtx.clearRect(0, 0, pWidth, pHeight);

            // Update & Draw
            particles.forEach((p, idx) => {
                // Mouse interaction
                if (mouseP.x > 0) {
                    const dx = mouseP.x - p.x;
                    const dy = mouseP.y - p.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 120 && dist > 1) {
                        const force = (120 - dist) / 120 * 0.05 * gravityMode;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }

                p.x += p.vx;
                p.y += p.vy;

                // Bounce walls
                if (p.x < 0 || p.x > pWidth) p.vx *= -1;
                if (p.y < 0 || p.y > pHeight) p.vy *= -1;

                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                pCtx.fillStyle = p.color;
                pCtx.fill();

                // Connect nearby
                for (let j = idx + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 85) {
                        pCtx.beginPath();
                        pCtx.moveTo(p.x, p.y);
                        pCtx.lineTo(p2.x, p2.y);
                        pCtx.strokeStyle = 'rgba(0, 242, 254, ' + (1 - dist / 85) * 0.25 + ')';
                        pCtx.lineWidth = 0.8;
                        pCtx.stroke();
                    }
                }
            });

            requestAnimationFrame(animateLabParticles);
        };

        requestAnimationFrame(animateLabParticles);
    }

    /* ─── 09. CREATIVE LAB EXPERIMENT 2: 3D CARD TILT ─── */
    const holoCard = document.getElementById('holo-card');
    if (holoCard) {
        const shine = holoCard.querySelector('.holo-shine');
        const stage = holoCard.parentElement;

        stage.addEventListener('mousemove', (e) => {
            const rect = holoCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -16;
            const rotateY = ((x - centerX) / centerX) * 16;

            holoCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            if (shine) {
                const shineX = (x / rect.width) * 100;
                const shineY = (y / rect.height) * 100;
                shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(0,242,254,0.4) 0%, rgba(168,85,247,0.3) 40%, transparent 80%)`;
            }
        });

        stage.addEventListener('mouseleave', () => {
            holoCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    /* ─── 10. CREATIVE LAB EXPERIMENT 3: INTERACTIVE TERMINAL ─── */
    const termForm = document.getElementById('lab-term-form');
    const termInput = document.getElementById('lab-term-input');
    const termOutput = document.getElementById('lab-terminal-output');

    if (termForm && termInput && termOutput) {
        const commands = {
            help: 'Available commands: skills, projects, about, certs, contact, hire, clear, date',
            skills: 'Languages: Java, Python, C++, C, JS | Web: HTML5, CSS3, React | DB: MySQL',
            projects: 'Featured: Campus Care, Harshal World, Aditya Computer Academy, Open Source Contributions',
            about: 'Harshal Kurrey — B.Tech CSE (Full Stack) @ Rungta University, Chhattisgarh, India.',
            certs: 'Google AI, IBM Full Stack, University of Michigan C, HackerRank Java, LetsUpgrade',
            contact: 'Email: rahulkurrey321@gmail.com | Phone: +91 6268 310 161',
            hire: '🚀 Ready for Frontend & Full Stack Software Engineering Opportunities in 2026!',
            date: `Local Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)`
        };

        termForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cmd = termInput.value.trim().toLowerCase();
            termInput.value = '';

            if (!cmd) return;

            if (cmd === 'clear') {
                termOutput.innerHTML = '';
                return;
            }

            const userLine = document.createElement('div');
            userLine.className = 'lab-term-line';
            userLine.innerHTML = `<span class="lab-term-prompt">visitor@hk:~$</span> <span class="accent-text">${cmd}</span>`;
            termOutput.appendChild(userLine);

            const respLine = document.createElement('div');
            respLine.className = 'lab-term-line';
            if (commands[cmd]) {
                respLine.textContent = commands[cmd];
            } else {
                respLine.innerHTML = `command not found: <span style="color:#ef4444">${cmd}</span>. Type <span class="accent-text">'help'</span> for commands.`;
            }
            termOutput.appendChild(respLine);
            termOutput.scrollTop = termOutput.scrollHeight;
        });
    }

    /* ─── 11. CREATIVE LAB EXPERIMENT 4: MATRIX STREAM ─── */
    const mCanvas = document.getElementById('matrix-canvas');
    if (mCanvas) {
        const mCtx = mCanvas.getContext('2d');
        const mWidth = mCanvas.parentElement.clientWidth;
        const mHeight = mCanvas.parentElement.clientHeight;
        mCanvas.width = mWidth;
        mCanvas.height = mHeight;

        const chars = '01HARSHALKURREY1010101010101010101010101010';
        const fontSize = 12;
        const columns = Math.floor(mWidth / fontSize);
        const drops = Array(columns).fill(1);

        const drawMatrix = () => {
            mCtx.fillStyle = 'rgba(6, 9, 20, 0.12)';
            mCtx.fillRect(0, 0, mWidth, mHeight);

            mCtx.fillStyle = '#00f2fe';
            mCtx.font = `${fontSize}px JetBrains Mono, monospace`;

            drops.forEach((y, i) => {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                mCtx.fillText(text, x, y * fontSize);

                if (y * fontSize > mHeight && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });

            requestAnimationFrame(drawMatrix);
        };

        requestAnimationFrame(drawMatrix);
    }

    /* ─── 12. CONTACT FORM & ONE-CLICK EMAIL COPY ─── */
    const contactForm = document.getElementById('contact-form');
    const feedbackBox = document.getElementById('contact-feedback');
    const copyEmailBtn = document.getElementById('btn-copy-email');
    const copyEmailText = document.getElementById('copy-email-text');
    const myEmail = 'rahulkurrey321@gmail.com';

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !subject || !message) {
                if (feedbackBox) {
                    feedbackBox.className = 'contact-feedback error';
                    feedbackBox.textContent = 'Please fill out all fields before sending.';
                }
                return;
            }

            // Create Mailto Action
            const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Harshal,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoUrl;

            if (feedbackBox) {
                feedbackBox.className = 'contact-feedback success';
                feedbackBox.innerHTML = `<i class="fa-solid fa-check"></i> Preparing message for ${myEmail}. Your default email app was triggered!`;
            }
        });
    }

    if (copyEmailBtn && copyEmailText) {
        copyEmailBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(myEmail);
                copyEmailText.textContent = 'Copied to Clipboard!';
                copyEmailBtn.style.borderColor = 'var(--accent-green)';
                setTimeout(() => {
                    copyEmailText.textContent = 'Copy Email';
                    copyEmailBtn.style.borderColor = '';
                }, 2500);
            } catch (err) {
                // Fallback prompt
                window.prompt('Copy email:', myEmail);
            }
        });
    }

    /* ─── 13. LIVE IST CLOCK IN FOOTER ─── */
    const timeWidget = document.getElementById('current-ist-time');
    const updateTime = () => {
        if (!timeWidget) return;
        const now = new Date();
        const istString = now.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeWidget.textContent = `${istString} IST`;
    };
    setInterval(updateTime, 1000);
    updateTime();

    /* ─── 14. ANIMATED COSMIC PARTICLE SYSTEM ─── */
    const starsCanvas = document.getElementById('stars-canvas');
    if (starsCanvas) {
        const ctx = starsCanvas.getContext('2d');
        let canvasW, canvasH;
        let particles = [];
        let mouseX = -1000, mouseY = -1000;
        let animId = null;
        let isTabVisible = true;

        // Particle colors — cyan, blue, violet spectrum
        const COLORS = [
            { r: 0, g: 242, b: 254 },     // cyan
            { r: 59, g: 130, b: 246 },     // blue
            { r: 139, g: 92, b: 246 },     // violet
            { r: 56, g: 189, b: 248 },     // sky blue
            { r: 168, g: 85, b: 247 },     // purple
            { r: 236, g: 72, b: 153 },     // magenta
        ];

        const PARTICLE_COUNT = Math.min(window.innerWidth > 768 ? 110 : 25, 130);
        const CONNECTION_DIST = window.innerWidth > 768 ? 140 : 100;
        const MOUSE_RADIUS = 180;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * (canvasW || window.innerWidth);
                this.y = Math.random() * (canvasH || window.innerHeight);
                this.depth = 0.3 + Math.random() * 0.7; // 0.3 = far, 1.0 = near
                this.radius = (0.6 + Math.random() * 1.8) * this.depth;
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.alpha = (0.2 + Math.random() * 0.5) * this.depth;
                this.baseAlpha = this.alpha;
                // Slow drifting velocities
                this.vx = (Math.random() - 0.5) * 0.25 * this.depth;
                this.vy = (Math.random() - 0.5) * 0.15 * this.depth - 0.05; // slight upward drift
                // Pulse
                this.pulseSpeed = 0.005 + Math.random() * 0.015;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            update(t) {
                this.x += this.vx;
                this.y += this.vy;

                // Gentle pulse
                this.alpha = this.baseAlpha * (0.6 + 0.4 * Math.sin(t * this.pulseSpeed + this.pulsePhase));

                // Wrap around edges
                if (this.x < -10) this.x = canvasW + 10;
                if (this.x > canvasW + 10) this.x = -10;
                if (this.y < -10) this.y = canvasH + 10;
                if (this.y > canvasH + 10) this.y = -10;

                // Mouse interaction — gentle repulsion
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS && dist > 0) {
                    const force = (1 - dist / MOUSE_RADIUS) * 0.6 * this.depth;
                    this.x += (dx / dist) * force;
                    this.y += (dy / dist) * force;
                    // Brighten near mouse
                    this.alpha = Math.min(this.alpha * 1.5, 0.9);
                }
            }

            draw() {
                const { r, g, b } = this.color;
                // Glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha * 0.15})`;
                ctx.fill();
                // Core
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
                ctx.fill();
            }
        }

        function resizeCanvas() {
            const dpr = window.innerWidth <= 768 ? 1 : Math.min(window.devicePixelRatio || 1, 2);
            canvasW = window.innerWidth;
            canvasH = window.innerHeight;
            starsCanvas.width = canvasW * dpr;
            starsCanvas.height = canvasH * dpr;
            starsCanvas.style.width = canvasW + 'px';
            starsCanvas.style.height = canvasH + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DIST) {
                        const opacity = (1 - dist / CONNECTION_DIST) * 0.18 * Math.min(a.depth, b.depth);
                        const avgR = (a.color.r + b.color.r) >> 1;
                        const avgG = (a.color.g + b.color.g) >> 1;
                        const avgB = (a.color.b + b.color.b) >> 1;

                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        }

        let meteors = [];

        class Meteor {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * (canvasW * 0.7) + (canvasW * 0.2);
                this.y = Math.random() * (canvasH * 0.35);
                this.length = 70 + Math.random() * 80;
                this.speed = 9 + Math.random() * 6;
                this.angle = (38 + Math.random() * 12) * Math.PI / 180;
                this.vx = -Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
                this.opacity = 0.85 + Math.random() * 0.15;
                this.decay = 0.016 + Math.random() * 0.012;
                this.color = Math.random() > 0.3 ? 'rgba(0, 242, 254, ' : 'rgba(216, 120, 255, ';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.opacity -= this.decay;
            }

            draw() {
                if (this.opacity <= 0) return;
                const tailX = this.x - this.vx * (this.length / this.speed);
                const tailY = this.y - this.vy * (this.length / this.speed);
                const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.2, this.color + Math.max(0, this.opacity) + ')');
                grad.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.6;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Spark head
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, this.opacity)})`;
                ctx.fill();
            }
        }

        // ── 3D Interactive Parallax & Organic Cosmic Motion ──
        const bgImg = document.querySelector('.global-cosmic-bg-img');
        const ambientNebula = document.querySelector('.global-ambient-nebula');
        let targetTiltX = 0, targetTiltY = 0;
        let currentTiltX = 0, currentTiltY = 0;
        let targetPanX = 0, targetPanY = 0;
        let currentPanX = 0, currentPanY = 0;

        let frame = 0;
        function animate() {
            if (!isTabVisible) {
                animId = requestAnimationFrame(animate);
                return;
            }

            frame++;
            ctx.clearRect(0, 0, canvasW, canvasH);

            // Smooth 3D Interpolation (lerp)
            currentTiltX += (targetTiltX - currentTiltX) * 0.05;
            currentTiltY += (targetTiltY - currentTiltY) * 0.05;
            currentPanX += (targetPanX - currentPanX) * 0.05;
            currentPanY += (targetPanY - currentPanY) * 0.05;

            // Organic 3D camera drift & breathing
            const idleRotX = Math.sin(frame * 0.012) * 1.2;
            const idleRotY = Math.cos(frame * 0.009) * 1.5;
            const idleTransX = Math.sin(frame * 0.007) * 8;
            const idleTransY = Math.cos(frame * 0.01) * 6;

            if (bgImg) {
                const rotX = (currentTiltX + idleRotX).toFixed(2);
                const rotY = (currentTiltY + idleRotY).toFixed(2);
                const transX = (currentPanX + idleTransX).toFixed(1);
                const transY = (currentPanY + idleTransY).toFixed(1);
                bgImg.style.transform = `translate3d(${transX}px, ${transY}px, 0px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.06)`;
            }

            if (ambientNebula) {
                ambientNebula.style.transform = `translate3d(${-currentPanX * 0.8}px, ${-currentPanY * 0.8}px, 20px)`;
            }

            // Draw neural connections first (behind particles)
            drawConnections();

            // Update & draw particles
            for (const p of particles) {
                p.update(frame);
                p.draw();
            }

            // Periodically spawn shooting stars across the cosmic night sky
            if (frame % 160 === 0 && meteors.length < 2) {
                meteors.push(new Meteor());
            }

            // Update & draw meteors
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.update();
                m.draw();
                if (m.opacity <= 0 || m.x < -50 || m.y > canvasH + 50) {
                    meteors.splice(i, 1);
                }
            }

            animId = requestAnimationFrame(animate);
        }

        // Mouse tracking for 3D parallax and particle reactions
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            const nx = (e.clientX / (window.innerWidth || 1) - 0.5) * 2;
            const ny = (e.clientY / (window.innerHeight || 1) - 0.5) * 2;
            targetTiltX = -ny * 4.5;
            targetTiltY = nx * 5.5;
            targetPanX = -nx * 22;
            targetPanY = -ny * 16;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
            targetTiltX = 0;
            targetTiltY = 0;
            targetPanX = 0;
            targetPanY = 0;
        });

        // Tab visibility — pause when hidden
        document.addEventListener('visibilitychange', () => {
            isTabVisible = !document.hidden;
        });

        // Resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resizeCanvas();
            }, 150);
        }, { passive: true });

        // Initialize
        resizeCanvas();
        initParticles();
        animate();

        // Respect prefers-reduced-motion
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            cancelAnimationFrame(animId);
            ctx.clearRect(0, 0, canvasW, canvasH);
        }
        motionQuery.addEventListener('change', (e) => {
            if (e.matches) {
                cancelAnimationFrame(animId);
                ctx.clearRect(0, 0, canvasW, canvasH);
            } else {
                animate();
            }
        });
    }

    /* ─── 13. LIQUID GLASS CAROUSEL & INTERACTIVE CONTROLLERS ─── */
    function initLiquidGlassInteractions() {
        // --- A. Skills 3D Carousel ---
        const skillCards = document.querySelectorAll('.skill-glass-card');
        const skillsPrevBtn = document.getElementById('skills-prev-btn');
        const skillsNextBtn = document.getElementById('skills-next-btn');
        let currentSkillIdx = 1; // Default to Web Development

        function updateSkillStage() {
            skillCards.forEach((card, idx) => {
                card.classList.remove('active-card');
                const diff = idx - currentSkillIdx;

                if (idx === currentSkillIdx) {
                    card.classList.add('active-card');
                    card.style.display = 'flex';
                    card.style.transform = 'scale(1.05) translateZ(30px)';
                    card.style.opacity = '1';
                    card.style.zIndex = '3';
                } else if (Math.abs(diff) === 1 || (currentSkillIdx === 0 && idx === skillCards.length - 1) || (currentSkillIdx === skillCards.length - 1 && idx === 0)) {
                    card.style.display = 'flex';
                    card.style.transform = 'scale(0.92) translateZ(-40px)';
                    card.style.opacity = '0.75';
                    card.style.zIndex = '1';
                } else {
                    // Hide non-adjacent cards on mobile/compact screens
                    if (window.innerWidth < 1024) {
                        card.style.display = 'none';
                    } else {
                        card.style.display = 'flex';
                        card.style.transform = 'scale(0.85) translateZ(-80px)';
                        card.style.opacity = '0.4';
                        card.style.zIndex = '0';
                    }
                }
            });
        }

        if (skillsPrevBtn && skillsNextBtn && skillCards.length > 0) {
            skillsPrevBtn.addEventListener('click', () => {
                currentSkillIdx = (currentSkillIdx - 1 + skillCards.length) % skillCards.length;
                updateSkillStage();
            });

            skillsNextBtn.addEventListener('click', () => {
                currentSkillIdx = (currentSkillIdx + 1) % skillCards.length;
                updateSkillStage();
            });

            skillCards.forEach((card, idx) => {
                card.addEventListener('click', () => {
                    if (currentSkillIdx !== idx) {
                        currentSkillIdx = idx;
                        updateSkillStage();
                    }
                });
            });

            updateSkillStage();
        }

        // --- B. Skills Full Matrix Toggle Drawer ---
        const skillsToggleBtn = document.getElementById('btn-toggle-skills-drawer');
        const skillsMatrixDrawer = document.getElementById('skills-full-matrix-drawer');
        const skillsToggleLabel = document.getElementById('skills-toggle-label');

        if (skillsToggleBtn && skillsMatrixDrawer) {
            skillsToggleBtn.addEventListener('click', () => {
                const isHidden = skillsMatrixDrawer.style.display === 'none';
                skillsMatrixDrawer.style.display = isHidden ? 'block' : 'none';
                if (skillsToggleLabel) {
                    skillsToggleLabel.textContent = isHidden ? 'Hide Tech Stack Matrix' : 'View Complete Tech Stack';
                }
            });
        }

        // --- C. Projects "View All Projects" Drawer ---
        const projectsToggleBtn = document.getElementById('btn-toggle-all-projects');
        const moreProjectsDrawer = document.getElementById('more-projects-drawer');
        const allProjectsToggleText = document.getElementById('all-projects-toggle-text');

        if (projectsToggleBtn && moreProjectsDrawer) {
            projectsToggleBtn.addEventListener('click', () => {
                const isHidden = moreProjectsDrawer.style.display === 'none';
                moreProjectsDrawer.style.display = isHidden ? 'block' : 'none';
                if (allProjectsToggleText) {
                    allProjectsToggleText.textContent = isHidden ? 'Show Featured Only' : 'View All Projects';
                }
            });
        }

        // --- D. Certificates Carousel & Pagination Dots ---
        const certViewport = document.getElementById('cert-gallery-viewport');
        const certPrevBtn = document.getElementById('cert-prev-btn');
        const certNextBtn = document.getElementById('cert-next-btn');
        const certDots = document.querySelectorAll('.cert-gallery-dots-row .gallery-dot');

        if (certViewport && certPrevBtn && certNextBtn) {
            certPrevBtn.addEventListener('click', () => {
                certViewport.scrollBy({ left: -280, behavior: 'smooth' });
            });

            certNextBtn.addEventListener('click', () => {
                certViewport.scrollBy({ left: 280, behavior: 'smooth' });
            });

            certDots.forEach((dot, idx) => {
                dot.addEventListener('click', () => {
                    certDots.forEach(d => d.classList.remove('active'));
                    dot.classList.add('active');
                    certViewport.scrollTo({ left: idx * 280 * 2, behavior: 'smooth' });
                });
            });

            certViewport.addEventListener('scroll', () => {
                const maxScroll = certViewport.scrollWidth - certViewport.clientWidth;
                if (maxScroll > 0) {
                    const scrollFraction = certViewport.scrollLeft / maxScroll;
                    const activeIdx = Math.min(certDots.length - 1, Math.round(scrollFraction * (certDots.length - 1)));
                    certDots.forEach((d, i) => {
                        d.classList.toggle('active', i === activeIdx);
                    });
                }
            }, { passive: true });
        }

        // --- E. Subtle 3D Tilt on Liquid Glass Cards ---
        const tiltCards = document.querySelectorAll('.cinematic-project-card, .edu-dome-card, .timeline-glass-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Skill cards custom tilt with carousel preservation
        skillCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -7;
                const rotateY = ((x - centerX) / centerX) * 7;
                const baseScale = card.classList.contains('active-card') ? 1.05 : 0.92;
                const baseZ = card.classList.contains('active-card') ? '30px' : '-40px';

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${baseScale}) translateZ(${baseZ})`;
            });

            card.addEventListener('mouseleave', () => {
                updateSkillStage();
            });
        });

        // --- F. Touch swipe support for Certificate Gallery ---
        if (certViewport) {
            let isDown = false;
            let startX, scrollLeft;

            certViewport.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - certViewport.offsetLeft;
                scrollLeft = certViewport.scrollLeft;
            });

            certViewport.addEventListener('mouseleave', () => {
                isDown = false;
            });

            certViewport.addEventListener('mouseup', () => {
                isDown = false;
            });

            certViewport.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - certViewport.offsetLeft;
                const walk = (x - startX) * 1.5;
                certViewport.scrollLeft = scrollLeft - walk;
            });
        }
    }

    // Initialize liquid glass interactions
    initLiquidGlassInteractions();

    /* ─── 14. HERO TYPEWRITER EFFECT ─── */
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const roles = [
            'Full Stack Developer',
            'Web Developer',
            'AI/ML Enthusiast',
            'Open Source Contributor',
            'Problem Solver'
        ];
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        function runTypewriter() {
            const currentRole = roles[roleIdx];
            if (!isDeleting) {
                typewriterEl.textContent = currentRole.slice(0, charIdx + 1);
                charIdx++;
                if (charIdx === currentRole.length) {
                    isDeleting = true;
                    setTimeout(runTypewriter, 2000);
                    return;
                }
            } else {
                typewriterEl.textContent = currentRole.slice(0, charIdx - 1);
                charIdx--;
                if (charIdx <= 0) {
                    isDeleting = false;
                    roleIdx = (roleIdx + 1) % roles.length;
                    setTimeout(runTypewriter, 350);
                    return;
                }
            }
            setTimeout(runTypewriter, isDeleting ? 40 : 85);
        }
        runTypewriter();
    }

    /* ─── 15. HERO STATS COUNTER ANIMATION ─── */
    const heroStats = document.querySelectorAll('.hero-stat-num');
    if (heroStats.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target') || '0', 10);
                    if (target > 0) {
                        let current = 0;
                        const duration = 1200;
                        const stepTime = Math.max(20, Math.floor(duration / target));
                        const timer = setInterval(() => {
                            current++;
                            entry.target.textContent = current + '+';
                            if (current >= target) {
                                clearInterval(timer);
                            }
                        }, stepTime);
                    }
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        heroStats.forEach(stat => statsObserver.observe(stat));
    }

});

