// IoT Summer Camp Modal
// Injects a modal into the DOM promoting the summer camp

(function () {
    // Check if modal was already closed in this session to avoid annoyance (optional, but good UX)
    if (sessionStorage.getItem('hope_summer_camp_modal_closed')) {
        return;
    }

    // Create Styles
    const style = document.createElement('style');
    style.textContent = `
        #summer-camp-modal {
            position: fixed;
            inset: 0;
            z-index: 10001; /* Above custom cursor (10000) */
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s ease;
        }

        #summer-camp-modal.active {
            opacity: 1;
            pointer-events: auto;
        }

        .modal-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(5, 5, 5, 0.6);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
        }

        .modal-content {
            position: relative;
            width: 100%;
            max-width: 500px;
            background: rgba(18, 18, 18, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 2rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            overflow: hidden;
            transform: translateY(20px);
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        #summer-camp-modal.active .modal-content {
            transform: translateY(0);
        }

        /* Decorative Elements */
        .modal-glow {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(204, 255, 0, 0.05) 0%, transparent 50%);
            pointer-events: none;
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: transparent;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 0.5rem;
            transition: color 0.3s;
            z-index: 10;
        }

        .modal-close:hover {
            color: #fff;
        }

        .modal-badge {
            display: inline-block;
            background: rgba(204, 255, 0, 0.1);
            color: #CCFF00; /* Neon */
            border: 1px solid rgba(204, 255, 0, 0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.75rem;
            font-weight: bold;
            letter-spacing: 0.05em;
            margin-bottom: 1rem;
        }

        .modal-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            line-height: 1.1;
            color: #fff;
            margin-bottom: 0.75rem;
        }

        .modal-desc {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1rem;
            color: #999;
            line-height: 1.5;
            margin-bottom: 2rem;
        }

        .modal-btn {
            display: block;
            width: 100%;
            background: #CCFF00; /* Neon */
            color: #000;
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 1rem;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
            text-decoration: none;
        }

        .modal-btn:hover {
            background: #fff;
            transform: scale(1.02);
        }
        
        /* Mobile Optimization */
        @media (max-width: 640px) {
            .modal-content {
                padding: 1.5rem;
                margin: 1rem;
            }
            .modal-title {
                font-size: 1.75rem;
            }
        }
    `;
    document.head.appendChild(style);

    // Create Modal HTML
    const modal = document.createElement('div');
    modal.id = 'summer-camp-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-glow"></div>
            <button class="modal-close" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <span class="modal-badge">ADMISSIONS OPEN</span>
            <h2 class="modal-title">IoT & Robotics<br>Summer Camp '25</h2>
            <p class="modal-desc">
                An intensive 14-day engineering sprint for students in <strong>Grades 6-12</strong>. 
                Build real robots, code in C++, and master the future.
            </p>
            
            <a href="iot.htm#enroll" class="modal-btn">
                Join Now
            </a>
        </div>
    `;
    document.body.appendChild(modal);

    // Logic
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    const joinBtn = modal.querySelector('.modal-btn');

    function openModal() {
        modal.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        sessionStorage.setItem('hope_summer_camp_modal_closed', 'true');

        // Remove from DOM after transition to save resources (optional)
        setTimeout(() => {
            // modal.remove(); // Keep it in DOM in case we want to re-trigger, or remove it.
        }, 500);
    }

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    joinBtn.addEventListener('click', () => {
        // Allow navigation to happen
        closeModal();
    });

    // Trigger after a delay
    setTimeout(openModal, 2500); // 2.5 seconds delay

})();