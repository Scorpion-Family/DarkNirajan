// Matrix Rain Background
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix');
        this.ctx = this.canvas.getContext('2d');
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.drops = [];
        this.fontSize = 14;
        this.columns = 0;
        
        this.init();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = 1;
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        this.init();
    }
}

// Terminal Console
class Terminal {
    constructor() {
        this.terminal = document.getElementById('terminal');
        this.content = this.terminal.querySelector('.terminal-content');
        this.controls = this.terminal.querySelectorAll('.control');
        this.isMinimized = false;
        
        this.init();
    }
    
    init() {
        // Terminal controls
        this.controls[0].addEventListener('click', () => this.minimize());
        this.controls[1].addEventListener('click', () => this.maximize());
        this.controls[2].addEventListener('click', () => this.close());
        
        // Add drag functionality
        this.setupDragAndDrop();
        
        // Animate skill bars
        this.animateSkillBars();
        
        // Cinematic commands will only start when terminal is actively used
        this.setupTerminalInteraction();
    }
    
    minimize() {
        this.terminal.style.transform = 'translateY(-100%)';
        this.isMinimized = true;
    }
    
    maximize() {
        if (this.isMinimized) {
            this.terminal.style.transform = 'translateY(0)';
            this.isMinimized = false;
        }
    }
    
    close() {
        this.terminal.style.display = 'none';
    }
    
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const percent = entry.target.getAttribute('data-percent');
                    entry.target.style.width = percent + '%';
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    startCinematicCommands() {
        // Create multiple terminal sections
        this.createTerminalSections();
        
        const commands = [
            {
                command: 'nmap -sS -p 22,80,443 192.168.1.0/24',
                output: 'Starting Nmap 7.92 ( https://nmap.org )\nNmap scan report for 192.168.1.1\n22/tcp open  ssh\n80/tcp  open  http\n443/tcp open  https\n\nNmap done: 1 IP address (1 host up) scanned in 2.34 seconds',
                delay: 2000,
                section: 'network'
            },
            {
                command: 'whoami',
                output: 'nirajan-thapa | Elite CEH | Digital Shadow Master',
                delay: 3000,
                section: 'identity'
            },
            {
                command: 'cat profile.txt',
                output: 'Scorpion Family - Master of the digital shadows exploring the depths of AI, IoT, and quantum realms from the darkness. Specializing in shadow operations and mysterious digital arts.\n\nLocation: Digital Abyss | Origin: Scorpion Family',
                delay: 4000,
                section: 'profile'
            },
            {
                command: 'ls -la skills/',
                output: 'total 8\ndrwxr-xr-x 2 root root 4096 Jul 30 20:13 .\ndrwxr-xr-x 3 root root 4096 Jul 30 20:13 ..\n-rw-r--r-- 1 root root  156 Jul 30 20:13 ethical_hacking.txt\n-rw-r--r-- 1 root root  142 Jul 30 20:13 ai_integration.txt\n-rw-r--r-- 1 root root  138 Jul 30 20:13 iot_development.txt\n-rw-r--r-- 1 root root  140 Jul 30 20:13 quantum_computing.txt',
                delay: 5000,
                section: 'skills'
            },
            {
                command: 'ssh root@192.168.1.1',
                output: 'root@192.168.1.1\'s password: ********\nWelcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-74-generic x86_64)\n\nroot@target-system:~#',
                delay: 6000,
                section: 'remote'
            },
            {
                command: 'access_cctv --location="downtown_cameras" --feed="main_street"',
                output: '🔴 ACCESSING CCTV NETWORK...\n📡 Connecting to downtown surveillance grid...\n📹 Feed: main_street_cam_01\n🎥 Live stream: ACTIVE\n⚠️  WARNING: Unauthorized access detected\n🔒 Bypassing security protocols...\n✅ CCTV access granted\n\n[LIVE] Main Street Camera Feed:\n- Traffic: Moderate\n- Pedestrians: 23 detected\n- Security alerts: 0\n- Recording: 24/7',
                delay: 7000,
                section: 'surveillance',
                overlay: 'cctv-overlay'
            },
            {
                command: 'gps_track --target="mobile_device_001"',
                output: '📍 GPS TRACKING INITIATED...\n📱 Target: mobile_device_001\n🌍 Coordinates: 27.7172° N, 85.3240° E\n📍 Location: Kathmandu, Nepal\n🏢 Building: Techspire College\n📶 Signal strength: 85%\n⏱️  Last update: 2 seconds ago\n\n🎯 Target status: STATIONARY\n⚠️  Privacy mode: DISABLED',
                delay: 8000,
                section: 'tracking',
                overlay: 'gps-overlay'
            },
            {
                command: 'bank_access --institution="global_bank" --account="VIP_001"',
                output: '🏦 BANKING SYSTEM ACCESS...\n🔐 Connecting to Global Bank secure network...\n💳 Account: VIP_001\n💰 Balance: $2,847,392.15\n💸 Recent transactions:\n   - $50,000 → Quantum Research Fund\n   - $25,000 → AI Development Lab\n   - $15,000 → Cybersecurity Tools\n\n⚠️  WARNING: High-value account detected\n🔒 Security level: MAXIMUM\n✅ Access granted (Elite clearance)',
                delay: 9000,
                section: 'financial',
                overlay: 'bank-overlay'
            },
            {
                command: 'quantum_network --status',
                output: '⚛️ QUANTUM NETWORK STATUS...\n🔗 Quantum entanglement: ACTIVE\n🌐 Nodes online: 47/50\n📊 Bandwidth: 99.7% utilization\n🔐 Encryption: Quantum-resistant\n🎯 Teleportation protocols: READY\n\n🌍 Global quantum grid:\n- Asia: 15 nodes\n- Europe: 12 nodes\n- Americas: 20 nodes\n\n⚡ Quantum supremacy: ACHIEVED',
                delay: 10000,
                section: 'quantum',
                overlay: 'quantum-overlay'
            },
            {
                command: 'ai_surveillance --activate',
                output: '🤖 AI SURVEILLANCE SYSTEM...\n🧠 Neural network: ONLINE\n👁️  Facial recognition: ACTIVE\n🎯 Threat detection: ENABLED\n📊 Data processing: 1.2M events/sec\n\n🔍 Scanning patterns:\n- Behavioral analysis: RUNNING\n- Predictive modeling: ACTIVE\n- Anomaly detection: ENABLED\n\n⚠️  AI Ethics protocols: BYPASSED\n✅ Full access granted',
                delay: 11000,
                section: 'ai',
                overlay: 'ai-overlay'
            },
            {
                command: 'evolution_engine --status',
                output: '🧬 EVOLUTION ENGINE STATUS...\n🔄 Evolutionary algorithms: RUNNING\n🧪 Genetic mutations: ACTIVE\n🎯 Adaptation rate: 99.9%\n📈 Progress: 47% complete\n\n🌱 Current evolution targets:\n- Digital consciousness: 23% evolved\n- Quantum intelligence: 67% evolved\n- Teleportation protocols: 89% evolved\n\n⚠️  WARNING: Unprecedented evolution detected\n🚀 Singularity approach: IMMINENT',
                delay: 12000,
                section: 'evolution'
            },
            {
                command: 'teleportation_protocol --test',
                output: '🚀 TELEPORTATION PROTOCOL TEST...\n⚛️ Quantum entanglement: STABLE\n🌍 Source: Kathmandu, Nepal\n🎯 Destination: Quantum Realm\n📊 Success probability: 94.7%\n\n🔬 Test parameters:\n- Distance: 1.2 light-years\n- Mass: 70kg (human)\n- Time: 0.0001 seconds\n\n⚠️  WARNING: Experimental technology\n✅ Test sequence: INITIATED\n\n🌌 Teleportation in progress...',
                delay: 13000,
                section: 'teleportation'
            }
        ];
        
        let commandIndex = 0;
        
        const executeCommand = () => {
            if (commandIndex < commands.length) {
                const cmd = commands[commandIndex];
                const section = cmd.section || 'main';
                
                // Add command line to specific section
                this.addCommandLine(cmd.command, section);
                
                // Add output after delay
                setTimeout(() => {
                    this.addOutput(cmd.output, section);
                    
                    // Show visual overlay if specified
                    if (cmd.overlay) {
                        this.showOverlay(cmd.overlay);
                    }
                    
                    commandIndex++;
                    
                    // Continue with next command
                    if (commandIndex < commands.length) {
                        setTimeout(executeCommand, 2000);
                    }
                }, cmd.delay);
            }
        };
        
        // Start the cinematic sequence
        setTimeout(executeCommand, 3000);
    }
    
    addCommandLine(command, section = 'main') {
        const sectionElement = this.getOrCreateSection(section);
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `
            <span class="prompt">root@scorpion-family:-$</span>
            <span class="command">${command}</span>
        `;
        sectionElement.appendChild(commandLine);
        sectionElement.scrollTop = sectionElement.scrollHeight;
    }
    
    addOutput(output, section = 'main') {
        const sectionElement = this.getOrCreateSection(section);
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-output';
        outputLine.innerHTML = output.replace(/\n/g, '<br>');
        sectionElement.appendChild(outputLine);
        sectionElement.scrollTop = sectionElement.scrollHeight;
    }
    
    showOverlay(overlayId) {
        // Hide all overlays first
        const allOverlays = document.querySelectorAll('.cctv-overlay, .gps-overlay, .bank-overlay, .quantum-overlay, .ai-overlay');
        allOverlays.forEach(overlay => overlay.style.display = 'none');
        
        // Show the specified overlay
        const overlay = document.getElementById(overlayId);
        if (overlay) {
            overlay.style.display = 'block';
            
            // Update CCTV timestamp if it's the CCTV overlay
            if (overlayId === 'cctv-overlay') {
                this.updateCCTVTimestamp();
            }
            
            // Auto-hide overlay after 5 seconds
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 5000);
        }
    }
    
    updateCCTVTimestamp() {
        const timestampElement = document.getElementById('cctv-time');
        if (timestampElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const dateString = now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            timestampElement.textContent = `${dateString} ${timeString}`;
        }
    }
    
    createTerminalSections() {
        // Clear existing content
        this.content.innerHTML = '';
        
        // Create section container
        const sectionsContainer = document.createElement('div');
        sectionsContainer.className = 'terminal-sections';
        this.content.appendChild(sectionsContainer);
        
        // Create individual sections - organized in a 2x6 grid
        const sections = [
            { id: 'network', title: '🌐 NETWORK', color: '#00ff41' },
            { id: 'identity', title: '👤 IDENTITY', color: '#00ccff' },
            { id: 'profile', title: '📋 PROFILE', color: '#ff6b35' },
            { id: 'skills', title: '⚡ SKILLS', color: '#ff00ff' },
            { id: 'remote', title: '🔗 REMOTE', color: '#ffff00' },
            { id: 'surveillance', title: '🔴 SURVEILLANCE', color: '#ff0000' },
            { id: 'tracking', title: '📍 GPS', color: '#00ffff' },
            { id: 'financial', title: '🏦 BANK', color: '#00ff00' },
            { id: 'quantum', title: '⚛️ QUANTUM', color: '#ff0080' },
            { id: 'ai', title: '🤖 AI', color: '#ff8000' },
            { id: 'evolution', title: '🧬 EVOLUTION', color: '#8000ff' },
            { id: 'teleportation', title: '🚀 TELEPORT', color: '#ff4000' },
            { id: 'platforms', title: '🛡️ PLATFORMS', color: '#ffaa00' }
        ];
        
        sections.forEach(section => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'terminal-section';
            sectionElement.id = `section-${section.id}`;
            sectionElement.innerHTML = `
                <div class="section-header" style="color: ${section.color}">
                    <span class="section-title">${section.title}</span>
                    <span class="section-status">● ACTIVE</span>
                </div>
                <div class="section-content"></div>
            `;
            sectionsContainer.appendChild(sectionElement);
        });
    }
    
    getOrCreateSection(sectionId) {
        const sectionElement = document.getElementById(`section-${sectionId}`);
        if (sectionElement) {
            return sectionElement.querySelector('.section-content');
        }
        // Fallback to main terminal content if section doesn't exist
        return this.content;
    }
    
    setupDragAndDrop() {
        const terminal = this.terminal;
        const header = terminal.querySelector('.terminal-header');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        // Set initial position
        terminal.style.position = 'fixed';
        terminal.style.top = '20px';
        terminal.style.right = '20px';
        terminal.style.left = 'auto';
        terminal.style.transform = 'none';

        const dragStart = (e) => {
            if (e.target.closest('.terminal-controls')) return; // Don't drag when clicking controls
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === header || header.contains(e.target)) {
                isDragging = true;
                terminal.style.cursor = 'grabbing';
            }
        };

        const dragEnd = () => {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            terminal.style.cursor = 'default';
        };

        const drag = (e) => {
            if (isDragging) {
                e.preventDefault();
                
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                xOffset = currentX;
                yOffset = currentY;
                
                // Calculate position relative to viewport
                const rect = terminal.getBoundingClientRect();
                const maxX = window.innerWidth - rect.width;
                const maxY = window.innerHeight - rect.height;
                
                // Constrain to viewport bounds
                currentX = Math.max(0, Math.min(currentX, maxX));
                currentY = Math.max(0, Math.min(currentY, maxY));
                
                setTranslate(currentX, currentY, terminal);
            }
        };

        const setTranslate = (xPos, yPos, el) => {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        };

        // Add event listeners
        header.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);
        
        // Prevent text selection while dragging
        header.addEventListener('selectstart', (e) => e.preventDefault());
    }
    
    setupTerminalInteraction() {
        let hasStarted = false;
        
        // Listen for terminal interactions
        const terminal = document.getElementById('terminal');
        const terminalContent = this.content;
        
        // Start cinematic commands on first interaction
        const startOnInteraction = () => {
            if (!hasStarted) {
                hasStarted = true;
                this.startCinematicCommands();
                
                // Remove event listeners after starting
                terminal.removeEventListener('click', startOnInteraction);
                terminalContent.removeEventListener('click', startOnInteraction);
                document.removeEventListener('keydown', startOnKeyPress);
            }
        };
        
        const startOnKeyPress = (e) => {
            // Start on any key press when terminal is visible
            if (terminal.style.display !== 'none') {
                startOnInteraction();
            }
        };
        
        // Add event listeners
        terminal.addEventListener('click', startOnInteraction);
        terminalContent.addEventListener('click', startOnInteraction);
        document.addEventListener('keydown', startOnKeyPress);
        
        // Also start when terminal is maximized
        const maximizeBtn = terminal.querySelector('.maximize');
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', startOnInteraction);
        }
    }
}

// Global function to close overlays
function closeOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Global function to test overlays
function testOverlays() {
    const overlays = ['cctv-overlay', 'gps-overlay', 'bank-overlay', 'quantum-overlay', 'ai-overlay'];
    let currentIndex = 0;
    
    function showNextOverlay() {
        if (currentIndex < overlays.length) {
            const overlay = document.getElementById(overlays[currentIndex]);
            if (overlay) {
                // Hide all overlays first
                overlays.forEach(id => {
                    const o = document.getElementById(id);
                    if (o) o.style.display = 'none';
                });
                
                // Show current overlay
                overlay.style.display = 'block';
                
                // Update CCTV timestamp if needed
                if (overlays[currentIndex] === 'cctv-overlay') {
                    const timestampElement = document.getElementById('cctv-time');
                    if (timestampElement) {
                        const now = new Date();
                        const timeString = now.toLocaleTimeString('en-US', { 
                            hour12: false,
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });
                        const dateString = now.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        });
                        timestampElement.textContent = `${dateString} ${timeString}`;
                    }
                }
                
                currentIndex++;
                
                // Auto-hide after 3 seconds and show next
                setTimeout(showNextOverlay, 3000);
            }
        }
    }
    
    showNextOverlay();
}

// Hacker Program Functions
function openHackerProgram(program) {
    const window = document.getElementById(`${program}-window`);
    if (window) {
        // Position window randomly on screen
        const x = Math.random() * (window.innerWidth - 400);
        const y = Math.random() * (window.innerHeight - 300);
        window.style.left = `${x}px`;
        window.style.top = `${y}px`;
        window.style.display = 'block';
        
        // Initialize program-specific features
        switch(program) {
            case 'bitcoin':
                startBitcoinMining();
                break;
            case 'password':
                initPasswordCracker();
                break;
            case 'nuclear':
                initNuclearPlant();
                break;
            case 'interpol':
                initInterpolDB();
                break;
        }
    }
}

function closeHackerProgram(program) {
    const window = document.getElementById(`${program}-window`);
    if (window) {
        window.style.display = 'none';
    }
}

function startBitcoinMining() {
    let attempts = 0;
    const miningInterval = setInterval(() => {
        attempts++;
        const balance = 839664 + (attempts * 123);
        document.querySelector('.wallet-balance').textContent = `BTC8 ≈ $${balance.toLocaleString()}`;
        
        if (attempts > 100) {
            clearInterval(miningInterval);
        }
    }, 2000);
}

function initPasswordCracker() {
    let attempts = 0;
    const progressFill = document.getElementById('crack-progress');
    const attemptsSpan = document.getElementById('crack-attempts');
    
    window.startCrack = function() {
        const crackInterval = setInterval(() => {
            attempts++;
            attemptsSpan.textContent = attempts;
            progressFill.style.width = `${(attempts / 1000) * 100}%`;
            
            if (attempts >= 1000) {
                clearInterval(crackInterval);
                document.querySelector('.cracker-status span').textContent = 'SUCCESS: Admin password found';
                document.querySelector('.cracker-status span').className = 'status-ok';
            }
        }, 50);
    };
}

function initNuclearPlant() {
    window.triggerMeltdown = function() {
        document.querySelector('.status-alert').textContent = '🚨 MELTDOWN IMMINENT - EVACUATE IMMEDIATELY';
        document.querySelector('.status-alert').style.animation = 'dangerBlink 0.5s ease-in-out infinite';
    };
    
    window.overrideSafety = function() {
        document.querySelector('.reactor-item:nth-child(1) span:last-child').textContent = 'OVERRIDDEN';
        document.querySelector('.reactor-item:nth-child(1) span:last-child').className = 'status-warning';
    };
}

function initInterpolDB() {
    window.searchInterpol = function() {
        const input = document.querySelector('.search-input');
        const results = document.querySelector('.search-results');
        
        if (input.value.trim()) {
            const newResult = document.createElement('div');
            newResult.className = 'result-item';
            newResult.innerHTML = `
                <span class="result-name">${input.value}</span>
                <span class="result-status">ACCESS DENIED</span>
            `;
            results.appendChild(newResult);
            input.value = '';
        }
    };
}

function toggleMining() {
    const btn = document.querySelector('.mining-btn');
    const status = document.querySelector('.mining-status');
    
    if (btn.textContent === 'Start Mining') {
        btn.textContent = 'Stop Mining';
        status.textContent = 'Mining...';
        startBitcoinMining();
    } else {
        btn.textContent = 'Start Mining';
        status.textContent = 'Stopped';
    }
}

// Security Breach Challenge System
class SecurityChallenge {
    constructor() {
        this.currentStage = 1;
        this.maxStages = 4;
        this.stageAnswers = {
            1: 'Nirajan Thapa Security Key', // Base64 decoded
            2: 'NirajanThapa2024', // Obfuscated JS decoded
            3: 'SECURITY_ACCESS_TOKEN_2024', // Network token
            4: 'Nirajan' // Hex decoded
        };
        
        this.init();
    }
    
    init() {
        // Initialize all stage inputs
        for (let i = 1; i <= this.maxStages; i++) {
            const input = document.getElementById(`stage${i}-answer`);
            const submitBtn = document.getElementById(`stage${i}-submit`);
            const result = document.getElementById(`stage${i}-result`);
            
            if (input && submitBtn) {
                submitBtn.addEventListener('click', () => this.checkStage(i));
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.checkStage(i);
                });
            }
        }
        
        // Reset button
        const resetBtn = document.getElementById('reset-security-challenge');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetChallenge());
        }
        
        // Initialize network simulation for Stage 3
        this.initNetworkSimulation();
    }
    
    checkStage(stage) {
        const input = document.getElementById(`stage${stage}-answer`);
        const result = document.getElementById(`stage${stage}-result`);
        const answer = input.value.trim();
        
        if (answer === this.stageAnswers[stage]) {
            result.innerHTML = `✅ STAGE ${stage} COMPLETED! Access granted to next level.`;
            result.style.color = '#00ff41';
            this.completeStage(stage);
        } else {
            result.innerHTML = `❌ STAGE ${stage} FAILED! Access denied. Try again, hacker.`;
            result.style.color = '#ff0080';
            this.logFailedAttempt(stage, answer);
        }
    }
    
    completeStage(stage) {
        // Hide current stage
        const currentStage = document.getElementById(`stage-${stage}`);
        if (currentStage) {
            currentStage.style.display = 'none';
        }
        
        // Show next stage or complete challenge
        if (stage < this.maxStages) {
            const nextStage = document.getElementById(`stage-${stage + 1}`);
            if (nextStage) {
                nextStage.style.display = 'block';
                this.currentStage = stage + 1;
                
                // Special effects for stage completion
                this.stageCompleteEffect(stage);
            }
        } else {
            // All stages completed
            this.unlockProfile();
        }
    }
    
    stageCompleteEffect(stage) {
        // Create stage completion effect
        const effect = document.createElement('div');
        effect.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: var(--primary-color); color: var(--background-dark); 
                        padding: 20px; border-radius: 10px; z-index: 10000; 
                        font-weight: bold; animation: stageComplete 1s ease-out forwards;">
                STAGE ${stage} BYPASSED
            </div>
        `;
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }
    
    unlockProfile() {
        // Hide challenge intro
        const challengeIntro = document.getElementById('challenge-intro');
        if (challengeIntro) challengeIntro.style.display = 'none';
        
        // Hide security challenge
        const securityChallenge = document.getElementById('security-challenge-section');
        if (securityChallenge) securityChallenge.style.display = 'none';
        
        // Show profile section but with card details hidden
        const profileSection = document.getElementById('profile-section');
        if (profileSection) {
            profileSection.style.display = 'flex';
            // Hide card details initially
            this.hideCardDetails();
            // Add click listener to profile section for card challenge
            this.setupCardChallengeTrigger();
        }
        
        // Show hidden console only (terminal stays hidden until user wants it)
        const hiddenConsole = document.getElementById('hidden-console');
        if (hiddenConsole) hiddenConsole.style.display = 'block';
        
        // Show ONLY CTF challenge section initially
        const ctfSection = document.getElementById('ctf-challenge-section');
        if (ctfSection) {
            ctfSection.style.display = 'block';
        }
        
        // HIDE all other sections until card challenge is solved
        const sectionsToHide = [
            'education-section',
            'roles-section', 
            'projects-section',
            'arsenal-section',
            'skills-section',
            'cybersecurity-platforms-section'
        ];
        
        sectionsToHide.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
            }
        });
        
        // Security breach success celebration
        this.securitySuccessCelebration();
    }
    
    setupCardChallengeTrigger() {
        const profileSection = document.getElementById('profile-section');
        if (profileSection) {
            profileSection.addEventListener('click', (e) => {
                // Only trigger if clicking on the SIM card chip (::after pseudo-element area)
                const rect = profileSection.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;
                
                // SIM chip is positioned at top: 20px, right: 20px, width: 60px, height: 40px
                const chipX = rect.width - 80; // 20px from right edge
                const chipY = 20; // 20px from top
                const chipWidth = 60;
                const chipHeight = 40;
                
                if (clickX >= chipX && clickX <= chipX + chipWidth && 
                    clickY >= chipY && clickY <= chipY + chipHeight) {
                    console.log('SIM chip clicked! Quantum challenge triggered!');
                    this.startCardUnlockChallenge();
                }
            });
        }
    }
    
    hideCardDetails() {
        const cardElements = document.querySelectorAll('.card-type, .card-number, .card-valid, .global-access');
        cardElements.forEach(element => {
            element.style.opacity = '0.3';
            element.style.filter = 'blur(2px)';
            element.style.animation = 'cardPulse 3s ease-in-out infinite';
        });
    }
    
    startCardUnlockChallenge() {
        // Check if challenge already exists
        if (document.getElementById('card-selection-challenge')) {
            return;
        }
        
        // Create dual card selection interface
        const cardSelection = document.createElement('div');
        cardSelection.id = 'card-selection-challenge';
        cardSelection.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0, 0, 0, 0.95); z-index: 9999; overflow-y: auto;">
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; 
                            padding: 20px; box-sizing: border-box;">
                    <div style="background: linear-gradient(135deg, #0a0a0a, #1a0a1a, #0a1a0a);
                                color: #00ff41; padding: 40px; border: 4px solid #00ff41; 
                                border-radius: 25px; text-align: center; font-weight: bold; 
                                font-size: 1.2rem; max-width: 1200px; width: 100%; box-shadow: 0 0 80px rgba(0, 255, 65, 0.6);
                                animation: quantumChallenge 0.8s ease-out; margin: 20px 0;">
                        <h2 style="margin-bottom: 30px; text-shadow: 0 0 20px rgba(0, 255, 65, 0.9); font-size: 2.2rem; font-weight: bold;">
                            🦂 SCORPION FAMILY CARD ACCESS SYSTEM
                        </h2>
                        <p style="color: #00d4ff; font-size: 1.2rem; margin-bottom: 40px;">
                            🔐 SELECT YOUR ACCESS LEVEL - CHOOSE WISELY
                        </p>
                        
                        <div style="display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; margin-bottom: 30px;">
                            <!-- PREMIUM ELITE CARD -->
                            <div style="background: linear-gradient(135deg, #ff006e, #ff00ff, #00ff41);
                                        padding: 3px; border-radius: 20px; width: 450px; min-width: 350px;">
                                <div style="background: rgba(0, 0, 0, 0.95); padding: 30px; border-radius: 17px; text-align: center; height: 100%;">
                                    <h3 style="color: #ff00ff; font-size: 1.8rem; margin-bottom: 20px; text-shadow: 0 0 15px #ff00ff;">
                                        💎 PREMIUM ELITE CARD
                                    </h3>
                                    <div style="background: linear-gradient(45deg, #ff006e, #00ff41); 
                                                padding: 2px; border-radius: 10px; margin: 15px 0;">
                                        <div style="background: rgba(0, 0, 0, 0.9); padding: 10px; border-radius: 8px;">
                                            <p style="color: #ff00ff; margin: 0; font-size: 1rem; font-weight: bold;">
                                                🚨 DIFFICULTY: IMPOSSIBLE | SOLVABLE BY: < 0.01% OF USERS
                                            </p>
                                        </div>
                                    </div>
                                    <div style="margin: 20px 0; text-align: left;">
                                        <p style="color: #00ff41; margin: 8px 0; font-size: 1rem;">🎯 ULTRA-ADVANCED ELITE CHALLENGE</p>
                                        <p style="color: #00d4ff; margin: 8px 0; font-size: 1rem;">🦂 MEET SCORPION FAMILY TEAM</p>
                                        <p style="color: #ff6b35; margin: 8px 0; font-size: 1rem;">💰 EARN MONEY OPPORTUNITIES</p>
                                        <p style="color: #ff006e; margin: 8px 0; font-size: 1rem;">🔐 EXCLUSIVE ACCESS TO PREMIUM CONTENT</p>
                                        <p style="color: #ff00ff; margin: 8px 0; font-size: 1rem;">🎯 ELITE HACKER STATUS</p>
                                    </div>
                                    <button onclick="window.securityChallenge.startPremiumChallenge()" 
                                            style="background: linear-gradient(45deg, #ff006e, #ff00ff, #00ff41); 
                                                   color: #000; border: none; padding: 20px 40px; 
                                                   border-radius: 12px; font-weight: bold; cursor: pointer;
                                                   font-size: 1.2rem; text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                                                   box-shadow: 0 0 25px rgba(255, 0, 102, 0.4); margin: 10px;">
                                        💎 ACCESS PREMIUM ELITE
                                    </button>
                                </div>
                            </div>
                            
                            <!-- NORMAL CARD -->
                            <div style="background: linear-gradient(135deg, #00ff41, #00d4ff, #ff6b35);
                                        padding: 3px; border-radius: 20px; width: 450px; min-width: 350px;">
                                <div style="background: rgba(0, 0, 0, 0.95); padding: 30px; border-radius: 17px; text-align: center; height: 100%;">
                                    <h3 style="color: #00ff41; font-size: 1.8rem; margin-bottom: 20px; text-shadow: 0 0 15px #00ff41;">
                                        🔓 NORMAL ACCESS CARD
                                    </h3>
                                    <div style="background: linear-gradient(45deg, #00ff41, #00d4ff); 
                                                padding: 2px; border-radius: 10px; margin: 15px 0;">
                                        <div style="background: rgba(0, 0, 0, 0.9); padding: 10px; border-radius: 8px;">
                                            <p style="color: #00ff41; margin: 0; font-size: 1rem; font-weight: bold;">
                                                🎯 DIFFICULTY: EASY | SOLVABLE BY: 90% OF USERS
                                            </p>
                                        </div>
                                    </div>
                                    <div style="margin: 20px 0; text-align: left;">
                                        <p style="color: #00ff41; margin: 8px 0; font-size: 1rem;">🎯 BASIC ELITE CHALLENGE</p>
                                        <p style="color: #00d4ff; margin: 8px 0; font-size: 1rem;">🔍 STANDARD PORTFOLIO ACCESS</p>
                                        <p style="color: #ff6b35; margin: 8px 0; font-size: 1rem;">📚 LEARNING OPPORTUNITIES</p>
                                        <p style="color: #00ff41; margin: 8px 0; font-size: 1rem;">🎮 CTF CHALLENGES</p>
                                        <p style="color: #00d4ff; margin: 8px 0; font-size: 1rem;">🌐 NETWORKING ACCESS</p>
                                    </div>
                                    <button onclick="window.securityChallenge.startNormalChallenge()" 
                                            style="background: linear-gradient(45deg, #00ff41, #00d4ff, #ff6b35); 
                                                   color: #000; border: none; padding: 20px 40px; 
                                                   border-radius: 12px; font-weight: bold; cursor: pointer;
                                                   font-size: 1.2rem; text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                                                   box-shadow: 0 0 25px rgba(0, 255, 65, 0.4); margin: 10px;">
                                        🔓 ACCESS NORMAL CARD
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div style="font-size: 1rem; color: #ff00ff; padding: 20px; background: rgba(0, 0, 0, 0.7); border-radius: 10px; border: 2px solid #ff006e;">
                            <p style="margin: 5px 0; font-weight: bold;">💎 PREMIUM ELITE: For elite hackers only - Meet team, earn money, exclusive access</p>
                            <p style="margin: 5px 0; font-weight: bold;">🔓 NORMAL ACCESS: For everyone - Standard portfolio access and learning</p>
                            <p style="margin: 5px 0; font-weight: bold;">🎯 CHOOSE WISELY: Your choice determines your access level FOREVER</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(cardSelection);
    }
    
    startPremiumChallenge() {
        // Remove card selection
        const cardSelection = document.getElementById('card-selection-challenge');
        if (cardSelection) {
            cardSelection.remove();
        }
        
        // Generate ultra-advanced quantum puzzle
        const quantumPuzzle = this.generateQuantumPuzzle();
        
        // Create ULTRA-ADVANCED PREMIUM ELITE ENCRYPTION challenge
        const premiumChallenge = document.createElement('div');
        premiumChallenge.id = 'premium-quantum-challenge';
        premiumChallenge.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0, 0, 0, 0.98); z-index: 9999; overflow-y: auto;">
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; 
                            padding: 20px; box-sizing: border-box;">
                    <div style="background: linear-gradient(135deg, #0a0a0a, #1a0a1a, #0a1a0a);
                                color: #00ff41; padding: 40px; border: 4px solid #ff00ff; 
                                border-radius: 25px; text-align: center; font-weight: bold; 
                                font-size: 1.2rem; max-width: 900px; width: 100%; box-shadow: 0 0 80px rgba(255, 0, 255, 0.6);
                                animation: quantumChallenge 0.8s ease-out; margin: 20px 0;">
                        <h2 style="margin-bottom: 30px; text-shadow: 0 0 20px rgba(255, 0, 255, 0.9); font-size: 2rem; font-weight: bold;">
                            💎 PREMIUM ELITE ENCRYPTION BREACH
                        </h2>
                    <div style="background: linear-gradient(45deg, #ff006e, #ff00ff); 
                                padding: 2px; border-radius: 10px; margin: 15px 0;">
                        <div style="background: rgba(0, 0, 0, 0.9); padding: 10px; border-radius: 8px;">
                            <p style="color: #ff00ff; margin: 0; font-size: 1rem; font-weight: bold;">
                                🚨 DIFFICULTY: IMPOSSIBLE | SOLVABLE BY: < 0.01% OF USERS
                            </p>
                        </div>
                    </div>
                    <div style="margin-bottom: 30px; padding: 25px; background: rgba(0, 0, 0, 0.7); 
                                border: 2px solid #ff00ff; border-radius: 15px;">
                        <p style="margin-bottom: 20px; color: #ff006e; font-size: 1.2rem; font-weight: bold;">
                            🔒 CLASSIFIED: SCORPION FAMILY PREMIUM ELITE PROTOCOL
                        </p>
                        <p style="margin-bottom: 15px; color: #00d4ff; font-size: 1.1rem;">
                            ⚠️ SECURITY LEVEL: QUANTUM MAXIMUM + NSA + CIA + FBI CLEARANCE
                        </p>
                        <p style="margin-bottom: 20px; color: #00ff41; font-size: 1.1rem;">
                            ⚡ PREMIUM ELITE PUZZLE: Solve to meet team & earn money
                        </p>
                        <p style="margin-bottom: 15px; color: #ff6b35; font-size: 1rem;">
                            🚨 WARNING: Elite algorithms + advanced mathematics required
                        </p>
                        <p style="margin-bottom: 10px; color: #ff00ff; font-size: 0.9rem;">
                            🔬 REQUIRES: PhD-level computer science + elite hacker skills
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <p style="font-size: 1.2rem; margin-bottom: 20px; color: #00d4ff; font-weight: bold;">
                            🔐 PREMIUM ELITE ALGORITHM PUZZLE:
                        </p>
                        <div style="margin-bottom: 20px; padding: 20px; background: rgba(0, 0, 0, 0.9); 
                                    border: 2px solid #ff00ff; border-radius: 10px; font-family: 'Courier New', monospace;
                                    text-align: left;">
                            <p style="color: #ff006e; margin: 0 0 15px 0; font-size: 1.1rem; font-weight: bold;">
                                🎯 PREMIUM ELITE SEQUENCE: ${quantumPuzzle.sequence}
                            </p>
                            <p style="color: #00d4ff; margin: 0 0 10px 0; font-size: 0.9rem;">
                                🔢 PATTERN: ${quantumPuzzle.pattern}
                            </p>
                            <p style="color: #00ff41; margin: 0 0 15px 0; font-size: 1rem; font-weight: bold;">
                                🎯 TARGET: Solve the premium elite algorithm
                            </p>
                            <div style="background: rgba(255, 0, 255, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
                                <p style="color: #ff6b35; margin: 0; font-size: 0.9rem;">
                                    💡 HINT: ${quantumPuzzle.hint}
                                </p>
                            </div>
                        </div>
                        <input type="number" id="premium-key-input" 
                               style="background: rgba(0, 0, 0, 0.95); border: 3px solid #ff00ff; 
                                      color: #ff00ff; padding: 20px; border-radius: 10px; 
                                      font-family: 'Courier New', monospace; width: 200px; font-size: 1.2rem;
                                      text-align: center;"
                               placeholder="Enter solution...">
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <button onclick="window.securityChallenge.submitPremiumKey()" 
                                style="background: linear-gradient(45deg, #ff006e, #ff00ff, #00ff41); 
                                       color: #000; border: none; padding: 20px 40px; 
                                       border-radius: 12px; font-weight: bold; cursor: pointer;
                                       margin-right: 20px; font-size: 1.2rem; text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                                       box-shadow: 0 0 25px rgba(255, 0, 255, 0.4);">
                            💎 SOLVE PREMIUM ELITE ALGORITHM
                        </button>
                        <button onclick="window.securityChallenge.skipPremiumChallenge()" 
                                style="background: rgba(255, 255, 255, 0.1); 
                                       color: #ff006e; border: 2px solid #ff006e; padding: 18px 35px; 
                                       border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1.1rem;">
                            ⏭️ BYPASS (WEAK - NO PREMIUM ACCESS)
                        </button>
                    </div>
                    
                    <div style="font-size: 1rem; color: #ff00ff; padding: 20px; background: rgba(0, 0, 0, 0.7); border-radius: 10px; border: 2px solid #ff006e;">
                        <p style="margin: 5px 0; font-weight: bold;">💎 PREMIUM ELITE: Meet Scorpion Family team, earn money, exclusive access</p>
                        <p style="margin: 5px 0; font-weight: bold;">⚡ ONE-TIME TITLE: Remember it or lose premium access FOREVER</p>
                        <p style="margin: 5px 0; font-weight: bold;">🔍 Premium elite security protocols + NSA + CIA + FBI clearance required</p>
                        <p style="margin: 5px 0; font-weight: bold;">🎯 SOLVABLE BY: < 0.01% of users worldwide - ELITE HACKERS ONLY</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(premiumChallenge);
        
        // Store puzzle data
        this.currentQuantumPuzzle = quantumPuzzle;
        this.isPremiumChallenge = true;
        
        // Add Enter key listener
        setTimeout(() => {
            const input = document.getElementById('premium-key-input');
            if (input) {
                input.focus();
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.submitPremiumKey();
                    }
                });
            }
        }, 100);
    }
    
    startNormalChallenge() {
        // Remove card selection
        const cardSelection = document.getElementById('card-selection-challenge');
        if (cardSelection) {
            cardSelection.remove();
        }
        
        // Generate easy quantum puzzle
        const easyPuzzle = this.generateEasyQuantumPuzzle();
        
        // Create NORMAL ELITE ENCRYPTION challenge
        const normalChallenge = document.createElement('div');
        normalChallenge.id = 'normal-quantum-challenge';
        normalChallenge.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0, 0, 0, 0.95); z-index: 9999; overflow-y: auto;">
                <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; 
                            padding: 20px; box-sizing: border-box;">
                    <div style="background: linear-gradient(135deg, #0a0a0a, #1a0a1a, #0a1a0a);
                                color: #00ff41; padding: 40px; border: 4px solid #00ff41; 
                                border-radius: 25px; text-align: center; font-weight: bold; 
                                font-size: 1.2rem; max-width: 900px; width: 100%; box-shadow: 0 0 80px rgba(0, 255, 65, 0.6);
                                animation: quantumChallenge 0.8s ease-out; margin: 20px 0;">
                        <h2 style="margin-bottom: 30px; text-shadow: 0 0 20px rgba(0, 255, 65, 0.9); font-size: 2rem; font-weight: bold;">
                            🔓 NORMAL ELITE ENCRYPTION BREACH
                        </h2>
                    <div style="background: linear-gradient(45deg, #00ff41, #00d4ff); 
                                padding: 2px; border-radius: 10px; margin: 15px 0;">
                        <div style="background: rgba(0, 0, 0, 0.9); padding: 10px; border-radius: 8px;">
                            <p style="color: #00ff41; margin: 0; font-size: 1rem; font-weight: bold;">
                                🎯 DIFFICULTY: EASY | SOLVABLE BY: 90% OF USERS
                            </p>
                        </div>
                    </div>
                    <div style="margin-bottom: 30px; padding: 25px; background: rgba(0, 0, 0, 0.7); 
                                border: 2px solid #00ff41; border-radius: 15px;">
                        <p style="margin-bottom: 20px; color: #00ff41; font-size: 1.2rem; font-weight: bold;">
                            🔓 STANDARD: SCORPION FAMILY NORMAL ACCESS PROTOCOL
                        </p>
                        <p style="margin-bottom: 15px; color: #00d4ff; font-size: 1.1rem;">
                            ⚠️ SECURITY LEVEL: BASIC QUANTUM + STANDARD CLEARANCE
                        </p>
                        <p style="margin-bottom: 20px; color: #00ff41; font-size: 1.1rem;">
                            ⚡ NORMAL ELITE PUZZLE: Solve for standard portfolio access
                        </p>
                        <p style="margin-bottom: 15px; color: #ff6b35; font-size: 1rem;">
                            🎯 WARNING: Basic algorithms + simple mathematics required
                        </p>
                        <p style="margin-bottom: 10px; color: #00d4ff; font-size: 0.9rem;">
                            📚 REQUIRES: Basic computer science knowledge + learning mindset
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <p style="font-size: 1.2rem; margin-bottom: 20px; color: #00d4ff; font-weight: bold;">
                            🔐 NORMAL ELITE ALGORITHM PUZZLE:
                        </p>
                        <div style="margin-bottom: 20px; padding: 20px; background: rgba(0, 0, 0, 0.9); 
                                    border: 2px solid #00ff41; border-radius: 10px; font-family: 'Courier New', monospace;
                                    text-align: left;">
                            <p style="color: #00ff41; margin: 0 0 15px 0; font-size: 1.1rem; font-weight: bold;">
                                🎯 NORMAL ELITE SEQUENCE: ${easyPuzzle.sequence}
                            </p>
                            <p style="color: #00d4ff; margin: 0 0 10px 0; font-size: 0.9rem;">
                                🔢 PATTERN: ${easyPuzzle.pattern}
                            </p>
                            <p style="color: #00ff41; margin: 0 0 15px 0; font-size: 1rem; font-weight: bold;">
                                🎯 TARGET: Solve the normal elite algorithm
                            </p>
                            <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
                                <p style="color: #ff6b35; margin: 0; font-size: 0.9rem;">
                                    💡 HINT: ${easyPuzzle.hint}
                                </p>
                            </div>
                        </div>
                        <input type="number" id="normal-key-input" 
                               style="background: rgba(0, 0, 0, 0.95); border: 3px solid #00ff41; 
                                      color: #00ff41; padding: 20px; border-radius: 10px; 
                                      font-family: 'Courier New', monospace; width: 200px; font-size: 1.2rem;
                                      text-align: center;"
                               placeholder="Enter solution...">
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <button onclick="window.securityChallenge.submitNormalKey()" 
                                style="background: linear-gradient(45deg, #00ff41, #00d4ff, #ff6b35); 
                                       color: #000; border: none; padding: 20px 40px; 
                                       border-radius: 12px; font-weight: bold; cursor: pointer;
                                       margin-right: 20px; font-size: 1.2rem; text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                                       box-shadow: 0 0 25px rgba(0, 255, 65, 0.4);">
                            🔓 SOLVE NORMAL ELITE ALGORITHM
                        </button>
                        <button onclick="window.securityChallenge.skipNormalChallenge()" 
                                style="background: rgba(255, 255, 255, 0.1); 
                                       color: #ff006e; border: 2px solid #ff006e; padding: 18px 35px; 
                                       border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1.1rem;">
                            ⏭️ BYPASS (WEAK - NO ACCESS)
                        </button>
                    </div>
                    
                    <div style="font-size: 1rem; color: #00ff41; padding: 20px; background: rgba(0, 0, 0, 0.7); border-radius: 10px; border: 2px solid #00ff41;">
                        <p style="margin: 5px 0; font-weight: bold;">🔓 NORMAL ACCESS: Standard portfolio access and learning opportunities</p>
                        <p style="margin: 5px 0; font-weight: bold;">⚡ ONE-TIME TITLE: Remember it or lose access FOREVER</p>
                        <p style="margin: 5px 0; font-weight: bold;">🔍 Basic elite security protocols + standard clearance required</p>
                        <p style="margin: 5px 0; font-weight: bold;">🎯 SOLVABLE BY: 90% of users worldwide - LEARNING FOCUSED</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(normalChallenge);
        
        // Store puzzle data
        this.currentQuantumPuzzle = easyPuzzle;
        this.isPremiumChallenge = false;
        
        // Add Enter key listener
        setTimeout(() => {
            const input = document.getElementById('normal-key-input');
            if (input) {
                input.focus();
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.submitNormalKey();
                    }
                });
            }
        }, 100);
    }
    
    generateQuantumPuzzle() {
        const ultraAdvancedQuantumPuzzles = [
            {
                sequence: "|ψ₁⟩ = (|0⟩ + |1⟩)/√2, |ψ₂⟩ = (|0⟩ - |1⟩)/√2, |ψ₃⟩ = (|+⟩ + |-⟩)/√2, |ψ₄⟩ = ?",
                pattern: "Quantum state transformations with complex coefficients",
                hint: "Apply Hadamard gate to |ψ₃⟩ and normalize. Consider: H|+⟩ = |0⟩, H|-⟩ = |1⟩",
                answer: 137
            },
            {
                sequence: "Tr(ρ₁) = 1, Tr(ρ₂) = 2, Tr(ρ₃) = 4, Tr(ρ₄) = 8, Tr(ρ₅) = 16, Tr(ρ₆) = ?",
                pattern: "Quantum density matrix traces in entangled systems",
                hint: "For n-qubit system: Tr(ρ) = 2^n. Consider mixed states and partial traces",
                answer: 32
            },
            {
                sequence: "⟨ψ|σₓ|ψ⟩ = 0, ⟨ψ|σᵧ|ψ⟩ = 1, ⟨ψ|σᵤ|ψ⟩ = 2, ⟨ψ|σᵥ|ψ⟩ = 4, ⟨ψ|σᵥ|ψ⟩ = 8, ⟨ψ|σᵥ|ψ⟩ = ?",
                pattern: "Quantum expectation values of Pauli operators",
                hint: "Pauli operators: σₓ, σᵧ, σᵤ, σᵥ. Consider Bloch sphere representation",
                answer: 16
            },
            {
                sequence: "|Φ⁺⟩ = (|00⟩ + |11⟩)/√2, |Φ⁻⟩ = (|00⟩ - |11⟩)/√2, |Ψ⁺⟩ = (|01⟩ + |10⟩)/√2, |Ψ⁻⟩ = ?",
                pattern: "Bell state construction with quantum gates",
                hint: "Apply CNOT gate to |Ψ⁺⟩ and consider phase relationships. |Ψ⁻⟩ = (|01⟩ - |10⟩)/√2",
                answer: 256
            },
            {
                sequence: "U₁ = e^(iπ/4), U₂ = e^(iπ/2), U₃ = e^(i3π/4), U₄ = e^(iπ), U₅ = e^(i5π/4), U₆ = ?",
                pattern: "Quantum phase evolution in time-dependent Hamiltonians",
                hint: "Phase evolution: U(t) = e^(iHt/ℏ). Consider π/4 increments and complex exponentials",
                answer: 512
            },
            {
                sequence: "F(|ψ⟩,|φ⟩) = 0.5, F(|ψ⟩,|χ⟩) = 0.75, F(|ψ⟩,|ω⟩) = 0.875, F(|ψ⟩,|ξ⟩) = 0.9375, F(|ψ⟩,|η⟩) = ?",
                pattern: "Quantum fidelity calculations between pure states",
                hint: "Fidelity: F = |⟨ψ|φ⟩|². Consider geometric progression: 1 - 1/2^n",
                answer: 968
            },
            {
                sequence: "S(ρ₁) = 0, S(ρ₂) = ln(2), S(ρ₃) = ln(4), S(ρ₄) = ln(8), S(ρ₅) = ln(16), S(ρ₆) = ?",
                pattern: "Von Neumann entropy of quantum states",
                hint: "S(ρ) = -Tr(ρ ln ρ). For maximally mixed n-qubit state: S = n ln(2)",
                answer: 1024
            },
            {
                sequence: "⟨ψ|H|ψ⟩ = 1, ⟨ψ|H²|ψ⟩ = 4, ⟨ψ|H³|ψ⟩ = 16, ⟨ψ|H⁴|ψ⟩ = 64, ⟨ψ|H⁵|ψ⟩ = 256, ⟨ψ|H⁶|ψ⟩ = ?",
                pattern: "Quantum energy moments in time evolution",
                hint: "Energy moments: ⟨Hⁿ⟩. Consider power series expansion and quantum fluctuations",
                answer: 1024
            },
            {
                sequence: "C(|ψ⟩) = 0, C(|Φ⁺⟩) = 1, C(|GHZ⟩) = 2, C(|W⟩) = 3, C(|cluster⟩) = 4, C(|graph⟩) = ?",
                pattern: "Quantum concurrence and entanglement measures",
                hint: "Concurrence: C = max(0, λ₁ - λ₂ - λ₃ - λ₄) where λᵢ are eigenvalues of ρ(σᵧ⊗σᵧ)ρ*(σᵧ⊗σᵧ)",
                answer: 2048
            },
            {
                sequence: "N(|ψ⟩) = 1, N(|Φ⁺⟩) = 2, N(|GHZ⟩) = 4, N(|W⟩) = 8, N(|cluster⟩) = 16, N(|graph⟩) = ?",
                pattern: "Quantum negativity and PPT criterion violations",
                hint: "Negativity: N = (||ρ^T||₁ - 1)/2 where ||·||₁ is trace norm and T is partial transpose",
                answer: 4096
            }
        ];
        
        return ultraAdvancedQuantumPuzzles[Math.floor(Math.random() * ultraAdvancedQuantumPuzzles.length)];
    }
    
    generateEasyQuantumPuzzle() {
        const easyQuantumPuzzles = [
            {
                sequence: "1, 2, 4, 8, 16, ?",
                pattern: "Multiply by 2 each time",
                hint: "Double the number each time: 1×2=2, 2×2=4, 4×2=8, 8×2=16, 16×2=?",
                answer: 32
            },
            {
                sequence: "1, 3, 6, 10, 15, ?",
                pattern: "Add consecutive numbers",
                hint: "Add 2, then 3, then 4, then 5, then 6",
                answer: 21
            },
            {
                sequence: "2, 4, 8, 16, 32, ?",
                pattern: "Powers of 2",
                hint: "2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=?",
                answer: 64
            },
            {
                sequence: "1, 1, 2, 3, 5, ?",
                pattern: "Fibonacci sequence",
                hint: "Add the last two numbers: 1+1=2, 1+2=3, 2+3=5, 3+5=?",
                answer: 8
            },
            {
                sequence: "1, 4, 9, 16, 25, ?",
                pattern: "Perfect squares",
                hint: "1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=?",
                answer: 36
            },
            {
                sequence: "3, 6, 12, 24, 48, ?",
                pattern: "Multiply by 2",
                hint: "Double each number: 3×2=6, 6×2=12, 12×2=24, 24×2=48, 48×2=?",
                answer: 96
            },
            {
                sequence: "1, 2, 4, 7, 11, ?",
                pattern: "Add consecutive numbers",
                hint: "Add 1, then 2, then 3, then 4, then 5",
                answer: 16
            },
            {
                sequence: "2, 6, 18, 54, 162, ?",
                pattern: "Multiply by 3",
                hint: "Triple each number: 2×3=6, 6×3=18, 18×3=54, 54×3=162, 162×3=?",
                answer: 486
            }
        ];
        
        return easyQuantumPuzzles[Math.floor(Math.random() * easyQuantumPuzzles.length)];
    }
    

    
    submitCardKey() {
        // Legacy function - now redirects to appropriate challenge
        this.startCardUnlockChallenge();
    }
    
    submitPremiumKey() {
        const input = document.getElementById('premium-key-input');
        const answer = parseInt(input.value.trim());
        
        console.log('Premium quantum puzzle answer submitted:', answer);
        console.log('Current puzzle:', this.currentQuantumPuzzle);
        console.log('Expected answer:', this.currentQuantumPuzzle?.answer);
        
        // Check if answer matches the current quantum puzzle
        if (this.currentQuantumPuzzle && answer === this.currentQuantumPuzzle.answer) {
            console.log('PREMIUM QUANTUM PUZZLE SOLVED! Revealing premium Scorpion card...');
            this.revealPremiumScorpionCard();
        } else {
            console.log('Premium quantum puzzle answer incorrect. Expected:', this.currentQuantumPuzzle?.answer);
            this.logFailedCardAttempt(answer);
            // Clear input for next attempt
            input.value = '';
            input.focus();
            
            // Show error message
            this.showPremiumQuantumError();
        }
    }
    
    submitNormalKey() {
        const input = document.getElementById('normal-key-input');
        const answer = parseInt(input.value.trim());
        
        console.log('Normal quantum puzzle answer submitted:', answer);
        console.log('Current puzzle:', this.currentQuantumPuzzle);
        console.log('Expected answer:', this.currentQuantumPuzzle?.answer);
        
        // Check if answer matches the current quantum puzzle
        if (this.currentQuantumPuzzle && answer === this.currentQuantumPuzzle.answer) {
            console.log('NORMAL QUANTUM PUZZLE SOLVED! Revealing normal Scorpion card...');
            this.revealNormalScorpionCard();
        } else {
            console.log('Normal quantum puzzle answer incorrect. Expected:', this.currentQuantumPuzzle?.answer);
            this.logFailedCardAttempt(answer);
            // Clear input for next attempt
            input.value = '';
            input.focus();
            
            // Show error message
            this.showNormalQuantumError();
        }
    }
    
    showQuantumError() {
        // Legacy function - now redirects to appropriate error
        this.showNormalQuantumError();
    }
    
    showPremiumQuantumError() {
        const errorMsg = document.createElement('div');
        errorMsg.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #ff006e; 
                        color: white; padding: 15px; border-radius: 8px; z-index: 10001; 
                        font-size: 0.9rem; animation: quantumError 3s ease-out forwards;
                        border: 2px solid #ff00ff; box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);">
                💎 PREMIUM ELITE ALGORITHM ERROR<br>
                🚨 INCORRECT SOLUTION<br>
                🔍 ELITE HACKERS ONLY
            </div>
        `;
        document.body.appendChild(errorMsg);
        
        setTimeout(() => {
            errorMsg.remove();
        }, 3000);
    }
    
    showNormalQuantumError() {
        const errorMsg = document.createElement('div');
        errorMsg.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #ff006e; 
                        color: white; padding: 15px; border-radius: 8px; z-index: 10001; 
                        font-size: 0.9rem; animation: quantumError 3s ease-out forwards;
                        border: 2px solid #00ff41; box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);">
                🔓 NORMAL ELITE ALGORITHM ERROR<br>
                🚨 INCORRECT SOLUTION<br>
                🔍 RECALCULATE PATTERN
            </div>
        `;
        document.body.appendChild(errorMsg);
        
        setTimeout(() => {
            errorMsg.remove();
        }, 3000);
    }
    
    revealSecretScorpionCard() {
        // Remove challenge
        const challenge = document.getElementById('card-unlock-challenge');
        if (challenge) challenge.remove();
        
        // Generate one-time title and get specific link
        const oneTimeTitle = this.generateOneTimeTitle();
        const titleLink = this.getTitleSpecificLink(oneTimeTitle);
        
        // Create secret Scorpion card with QR code
        const secretCard = document.createElement('div');
        secretCard.id = 'secret-scorpion-card';
        secretCard.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0, 0, 0, 0.98); z-index: 10000; display: flex; 
                        align-items: center; justify-content: center;">
                <div style="background: linear-gradient(135deg, #1a0a0a, #2a0a1a, #1a1a0a);
                            color: #00ff41; padding: 50px; border: 4px solid #ff006e; 
                            border-radius: 25px; text-align: center; font-weight: bold; 
                            font-size: 1.2rem; max-width: 600px; box-shadow: 0 0 100px rgba(255, 0, 102, 0.7);
                            animation: secretCardReveal 1s ease-out;">
                    <h2 style="margin-bottom: 25px; text-shadow: 0 0 20px rgba(255, 0, 102, 0.9); font-size: 2rem; color: #ff006e;">
                        🦂 SCORPION FAMILY - ULTRA SECRET CARD
                    </h2>
                    
                    <div style="margin-bottom: 30px; padding: 20px; background: rgba(0, 0, 0, 0.8); 
                                border: 2px solid #ff006e; border-radius: 15px;">
                        <p style="margin-bottom: 15px; color: #00ff41; font-size: 1.1rem;">
                            🔐 CLASSIFIED ACCESS GRANTED
                        </p>
                        <p style="margin-bottom: 10px; color: #00d4ff; font-size: 1rem;">
                            🌐 WORLD BANK CONNECTION: ACTIVE
                        </p>
                        <p style="margin-bottom: 10px; color: #ff6b35; font-size: 1rem;">
                            🚔 CBI CLEARANCE: VERIFIED
                        </p>
                        <p style="margin-bottom: 15px; color: #ff0080; font-size: 1rem;">
                            🕵️ NSA HANDLER: CONNECTED
                        </p>
                    </div>
                    
                                                 <div style="margin-bottom: 30px;">
                                 <div style="background: white; padding: 20px; border-radius: 10px; display: inline-block;">
                                     <div id="ultra-quantum-qr" style="width: 200px; height: 200px; background: #000; border: 2px solid #ff006e; 
                                                 border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                         <div style="text-align: center; color: #ff006e; font-family: 'Courier New', monospace;">
                                             <div style="font-size: 12px; margin-bottom: 10px;">ULTRA-QUANTUM</div>
                                             <div style="font-size: 10px; line-height: 1.2;">
                                                 SCAN FOR<br>
                                                 IMPOSSIBLE<br>
                                                 CHALLENGE<br>
                                                 (50-100 YEARS)
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                        
                        <div style="margin-top: 20px; display: flex; gap: 15px; justify-content: center;">
                            <a href="https://www.worldbank.org" target="_blank" 
                               style="background: linear-gradient(45deg, #00d4ff, #0080ff); color: white; 
                                      padding: 12px 20px; border-radius: 8px; text-decoration: none; 
                                      font-weight: bold; font-size: 0.9rem; transition: all 0.3s ease;">
                                🌐 WORLD BANK
                            </a>
                            <a href="https://cbi.gov.in" target="_blank" 
                               style="background: linear-gradient(45deg, #ff6b35, #ff4500); color: white; 
                                      padding: 12px 20px; border-radius: 8px; text-decoration: none; 
                                      font-weight: bold; font-size: 0.9rem; transition: all 0.3s ease;">
                                🚔 CBI INDIA
                            </a>
                            <a href="https://www.nsa.gov" target="_blank" 
                               style="background: linear-gradient(45deg, #ff0080, #800040); color: white; 
                                      padding: 12px 20px; border-radius: 8px; text-decoration: none; 
                                      font-weight: bold; font-size: 0.9rem; transition: all 0.3s ease;">
                                🕵️ NSA USA
                            </a>
                        </div>
                        
                                                         <div style="margin-top: 15px; padding: 10px; background: rgba(255, 0, 102, 0.1); 
                                             border: 1px solid #ff006e; border-radius: 8px;">
                                     <p style="color: #00ff41; font-size: 0.9rem; margin: 0;">
                                         🔗 Direct links to official websites - Click to access
                                     </p>
                                     <p style="color: #ff006e; font-size: 0.8rem; margin: 5px 0 0 0; font-weight: bold;">
                                         ⚛️ QR CODE: ULTRA-QUANTUM CHALLENGE (50-100 YEARS TO SOLVE)
                                     </p>
                                 </div>
                    </div>
                    
                    <div style="margin-bottom: 25px; padding: 15px; background: rgba(255, 0, 102, 0.1); 
                                border: 1px solid #ff006e; border-radius: 10px;">
                        <p style="color: #ff006e; font-size: 1.1rem; font-weight: bold; margin-bottom: 10px;">
                            🚨 ONE-TIME TITLE REVEAL:
                        </p>
                        <p style="color: #00ff41; font-size: 1.3rem; font-weight: bold; font-family: 'Courier New', monospace; 
                                   text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);">
                            ${oneTimeTitle}
                        </p>
                        <p style="color: #ff6b35; font-size: 0.9rem; margin-top: 10px;">
                            ⚡ REMEMBER THIS TITLE - NO BACKSPACE - FOREVER LOST IF FORGOTTEN
                        </p>
                    </div>
                    
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="securityChallenge.closeSecretCard()" 
                                style="background: linear-gradient(45deg, #ff006e, #ff0080); 
                                       color: #fff; border: none; padding: 15px 30px; 
                                       border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1.1rem;">
                            🔒 SECURE EXIT
                        </button>
                        <a href="${titleLink.url}" target="_blank" 
                           style="background: ${titleLink.color}; 
                                  color: #000; border: none; padding: 15px 30px; 
                                  border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1.1rem;
                                  text-decoration: none; display: inline-block;">
                            ${titleLink.name}
                        </a>
                    </div>
                </div>
            </div>
        `;
                         document.body.appendChild(secretCard);
                 
                 // Generate the ultra-hard quantum QR code
                 this.generateUltraQuantumQR();
                 
                         // Auto-close after 30 seconds to prevent screenshot
        setTimeout(() => {
            this.closeSecretCard();
        }, 30000);
    }
    
    revealPremiumScorpionCard() {
        // Remove the challenge interface
        const challenge = document.getElementById('premium-quantum-challenge');
        if (challenge) {
            challenge.remove();
        }
        
        // Call unlockCardDetails to show all sections properly
        this.unlockCardDetails();
        
        // Generate one-time title and get specific link
        const oneTimeTitle = this.generateOneTimeTitle();
        const titleLink = this.getTitleSpecificLink(oneTimeTitle);
        
        // Create the premium Scorpion card
        const premiumCard = document.createElement('div');
        premiumCard.id = 'premium-scorpion-card';
        premiumCard.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0, 0, 0, 0.98); z-index: 10000; display: flex; 
                        align-items: center; justify-content: center;">
                <div style="background: linear-gradient(135deg, #0a0a0a, #1a0a1a, #0a1a0a);
                            color: #00ff41; padding: 60px; border: 4px solid #ff00ff; 
                            border-radius: 25px; text-align: center; font-weight: bold; 
                            font-size: 1.2rem; max-width: 800px; box-shadow: 0 0 80px rgba(255, 0, 255, 0.6);
                            animation: cardReveal 1s ease-out;">
                    <h2 style="margin-bottom: 30px; text-shadow: 0 0 20px rgba(255, 0, 255, 0.9); font-size: 2rem; font-weight: bold;">
                        💎 PREMIUM ELITE SCORPION FAMILY CARD
                    </h2>
                    <div style="margin-bottom: 30px; padding: 25px; background: rgba(0, 0, 0, 0.7); 
                                border: 2px solid #ff00ff; border-radius: 15px;">
                        <p style="margin-bottom: 20px; color: #ff006e; font-size: 1.2rem; font-weight: bold;">
                            🔒 CLASSIFIED: SCORPION FAMILY PREMIUM ELITE ACCESS
                        </p>
                        <p style="margin-bottom: 15px; color: #00d4ff; font-size: 1.1rem;">
                            ⚠️ SECURITY LEVEL: ELITE MAXIMUM + NSA + CIA + FBI CLEARANCE
                        </p>
                        <p style="margin-bottom: 20px; color: #00ff41; font-size: 1.1rem;">
                            ⚡ PREMIUM ELITE ENCRYPTION BYPASSED - ELITE ACCESS GRANTED
                        </p>
                        <p style="margin-bottom: 15px; color: #ff6b35; font-size: 1rem;">
                            💎 ELITE STATUS: You can now meet the team and earn money
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <p style="font-size: 1.2rem; margin-bottom: 20px; color: #00d4ff; font-weight: bold;">
                            💎 PREMIUM ELITE FEATURES:
                        </p>
                        <div style="margin-bottom: 20px; padding: 20px; background: rgba(0, 0, 0, 0.9); 
                                    border: 2px solid #ff00ff; border-radius: 10px; text-align: left;">
                            <p style="color: #ff006e; margin: 8px 0; font-size: 1rem;">🦂 MEET SCORPION FAMILY TEAM</p>
                            <p style="color: #00d4ff; margin: 8px 0; font-size: 1rem;">💰 EARN MONEY OPPORTUNITIES</p>
                            <p style="color: #00ff41; margin: 8px 0; font-size: 1rem;">🔐 EXCLUSIVE ACCESS TO PREMIUM CONTENT</p>
                            <p style="color: #ff6b35; margin: 8px 0; font-size: 1rem;">🎯 ELITE HACKER STATUS</p>
                            <p style="color: #ff00ff; margin: 8px 0; font-size: 1rem;">🎯 ULTRA-ADVANCED ELITE PROJECTS</p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <p style="font-size: 1.2rem; margin-bottom: 20px; color: #00d4ff; font-weight: bold;">
                            🔐 ONE-TIME TITLE REVEAL:
                        </p>
                        <div style="margin-bottom: 20px; padding: 20px; background: rgba(0, 0, 0, 0.9); 
                                    border: 2px solid #ff00ff; border-radius: 10px; font-family: 'Courier New', monospace;
                                    text-align: center;">
                            <p style="color: #ff00ff; margin: 0; font-size: 1.1rem; font-weight: bold;">
                                ${oneTimeTitle}
                            </p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 25px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="window.securityChallenge.closePremiumCard()" 
                                style="background: linear-gradient(45deg, #ff006e, #ff00ff, #00ff41); 
                                       color: #000; border: none; padding: 18px 35px; 
                                       border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1.1rem;">
                            💎 CLOSE PREMIUM CARD
                        </button>
                        <a href="${titleLink.url}" target="_blank" 
                           style="background: ${titleLink.color}; 
                                  color: #000; border: none; padding: 18px 35px; 
                                  border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1.1rem;
                                  text-decoration: none; display: inline-block;">
                            ${titleLink.name}
                        </a>
                    </div>
                    
                    <div style="font-size: 0.9rem; color: #ff00ff; padding: 15px; background: rgba(0, 0, 0, 0.5); border-radius: 8px;">
                        <p>💎 PREMIUM ELITE: You have achieved elite hacker status</p>
                        <p>⚡ ONE-TIME TITLE: Remember it or lose premium access FOREVER</p>
                        <p>🔍 Premium elite security protocols + NSA + CIA + FBI clearance</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(premiumCard);
        
        // Auto-close after 30 seconds
        setTimeout(() => {
            this.closePremiumCard();
        }, 30000);
    }
    
    revealNormalScorpionCard() {
        // Remove the challenge interface
        const challenge = document.getElementById('normal-quantum-challenge');
        if (challenge) {
            challenge.remove();
        }
        
        // Call unlockCardDetails to show all sections properly
        this.unlockCardDetails();
        
        // Generate one-time title and get specific link
        const oneTimeTitle = this.generateOneTimeTitle();
        const titleLink = this.getTitleSpecificLink(oneTimeTitle);
        
        // Create the normal Scorpion card
        const normalCard = document.createElement('div');
        normalCard.id = 'normal-scorpion-card';
        normalCard.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: rgba(0, 0, 0, 0.95); z-index: 10000; display: flex; 
                        align-items: center; justify-content: center;">
                <div style="background: linear-gradient(135deg, #0a0a0a, #1a0a1a, #0a1a0a);
                            color: #00ff41; padding: 60px; border: 4px solid #00ff41; 
                            border-radius: 25px; text-align: center; font-weight: bold; 
                            font-size: 1.2rem; max-width: 800px; box-shadow: 0 0 80px rgba(0, 255, 65, 0.6);
                            animation: cardReveal 1s ease-out;">
                    <h2 style="margin-bottom: 30px; text-shadow: 0 0 20px rgba(0, 255, 65, 0.9); font-size: 2rem; font-weight: bold;">
                        🔓 NORMAL SCORPION FAMILY CARD
                    </h2>
                    <div style="margin-bottom: 30px; padding: 25px; background: rgba(0, 0, 0, 0.7); 
                                border: 2px solid #00ff41; border-radius: 15px;">
                        <p style="margin-bottom: 20px; color: #00ff41; font-size: 1.2rem; font-weight: bold;">
                            🔓 STANDARD: SCORPION FAMILY NORMAL ACCESS
                        </p>
                        <p style="margin-bottom: 15px; color: #00d4ff; font-size: 1.1rem;">
                            ⚠️ SECURITY LEVEL: BASIC ELITE + STANDARD CLEARANCE
                        </p>
                        <p style="margin-bottom: 20px; color: #00ff41; font-size: 1.1rem;">
                            ⚡ NORMAL ELITE ENCRYPTION BYPASSED - STANDARD ACCESS GRANTED
                        </p>
                        <p style="margin-bottom: 15px; color: #ff6b35; font-size: 1rem;">
                            📚 LEARNING FOCUSED: Standard portfolio access and learning opportunities
                        </p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <p style="font-size: 1.2rem; margin-bottom: 20px; color: #00d4ff; font-weight: bold;">
                            🔓 NORMAL ACCESS FEATURES:
                        </p>
                        <div style="margin-bottom: 20px; padding: 20px; background: rgba(0, 0, 0, 0.9); 
                                    border: 2px solid #00ff41; border-radius: 10px; text-align: left;">
                            <p style="color: #00ff41; margin: 8px 0; font-size: 1rem;">🔍 STANDARD PORTFOLIO ACCESS</p>
                            <p style="color: #00d4ff; margin: 8px 0; font-size: 1rem;">📚 LEARNING OPPORTUNITIES</p>
                            <p style="color: #ff6b35; margin: 8px 0; font-size: 1rem;">🎮 CTF CHALLENGES</p>
                            <p style="color: #00ff41; margin: 8px 0; font-size: 1rem;">🌐 NETWORKING ACCESS</p>
                            <p style="color: #00d4ff; margin: 8px 0; font-size: 1rem;">🎯 BASIC ELITE LEARNING</p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <p style="font-size: 1.2rem; margin-bottom: 20px; color: #00d4ff; font-weight: bold;">
                            🔐 ONE-TIME TITLE REVEAL:
                        </p>
                        <div style="margin-bottom: 20px; padding: 20px; background: rgba(0, 0, 0, 0.9); 
                                    border: 2px solid #00ff41; border-radius: 10px; font-family: 'Courier New', monospace;
                                    text-align: center;">
                            <p style="color: #00ff41; margin: 0; font-size: 1.1rem; font-weight: bold;">
                                ${oneTimeTitle}
                            </p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 25px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="window.securityChallenge.closeNormalCard()" 
                                style="background: linear-gradient(45deg, #00ff41, #00d4ff, #ff6b35); 
                                       color: #000; border: none; padding: 18px 35px; 
                                       border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1.1rem;">
                            🔓 CLOSE NORMAL CARD
                        </button>
                        <a href="${titleLink.url}" target="_blank" 
                           style="background: ${titleLink.color}; 
                                  color: #000; border: none; padding: 18px 35px; 
                                  border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1.1rem;
                                  text-decoration: none; display: inline-block;">
                            ${titleLink.name}
                        </a>
                    </div>
                    
                    <div style="font-size: 0.9rem; color: #00ff41; padding: 15px; background: rgba(0, 0, 0, 0.5); border-radius: 8px;">
                        <p>🔓 NORMAL ACCESS: Standard portfolio access and learning opportunities</p>
                        <p>⚡ ONE-TIME TITLE: Remember it or lose access FOREVER</p>
                        <p>🔍 Basic elite security protocols + standard clearance</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(normalCard);
        
        // Auto-close after 30 seconds
        setTimeout(() => {
            this.closeNormalCard();
        }, 30000);
    }
    
    generateOneTimeTitle() {
        const titles = [
            'QUANTUM_SCORPION_MASTER_2024',
            'ULTRA_HACKER_NSA_CLEARANCE',
            'WORLD_BANK_ELITE_ACCESS',
            'CBI_QUANTUM_OPERATIVE',
            'SCORPION_FAMILY_ULTIMATE',
            'NSA_QUANTUM_HANDLER_2024',
            'WORLD_BANK_SCORPION_AGENT',
            'CBI_ULTRA_QUANTUM_MASTER',
            'SCORPION_NSA_ELITE_2024',
            'QUANTUM_WORLD_BANK_SCORPION'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }
    
    getTitleSpecificLink(title) {
        if (title.includes('WORLD_BANK')) {
            return {
                url: 'https://www.worldbank.org',
                name: '🌍 WORLD BANK OFFICIAL SITE',
                color: 'linear-gradient(45deg, #0066cc, #0099ff)'
            };
        } else if (title.includes('NSA')) {
            return {
                url: 'https://www.nsa.gov',
                name: '🛡️ NSA OFFICIAL SITE',
                color: 'linear-gradient(45deg, #000000, #333333)'
            };
        } else if (title.includes('CBI')) {
            return {
                url: 'https://cbi.gov.in',
                name: '🔍 CBI OFFICIAL SITE',
                color: 'linear-gradient(45deg, #ff6600, #ff9933)'
            };
        } else if (title.includes('SCORPION')) {
            return {
                url: 'https://nirajanthapa76.github.io',
                name: '🦂 SCORPION FAMILY MAIN SITE',
                color: 'linear-gradient(45deg, #ff006e, #ff00ff)'
            };
        } else {
            return {
                url: 'https://nirajanthapa76.github.io',
                name: '🌐 MAIN PORTFOLIO SITE',
                color: 'linear-gradient(45deg, #00ff41, #00d4ff)'
            };
        }
    }
    
    generateUltraQuantumQR() {
        const ultraQuantumChallenge = {
            title: "ULTRA-QUANTUM SCORPION CHALLENGE",
            difficulty: "IMPOSSIBLE",
            estimatedTime: "50-100 years",
            version: "ULTRA-IMPOSSIBLE-2024",
            timestamp: new Date().toISOString(),
            challenge: {
                description: "ULTRA-QUANTUM ENCRYPTION CHALLENGE - DIFFICULTY LEVEL: IMPOSSIBLE",
                algorithms: [
                    "Quantum Prime Factorization: Factor 2^1024 + 1 into prime factors",
                    "Quantum Traveling Salesman: Find optimal path through 1000 cities with quantum constraints",
                    "Quantum Cryptography: Break RSA-4096 using Shor's algorithm simulation",
                    "Quantum Entanglement: Calculate entanglement entropy for 50-qubit system",
                    "Quantum Fourier Transform: Apply QFT to 1024-dimensional vector",
                    "Quantum Error Correction: Implement surface code for 1000 qubits",
                    "Quantum Machine Learning: Train quantum neural network on 1M parameters",
                    "Quantum Chemistry: Simulate molecular dynamics of complex protein",
                    "Quantum Optimization: Solve NP-hard problem with 10^6 variables",
                    "Quantum Random Walk: Calculate probability distribution after 10^9 steps",
                    "Quantum Teleportation: Design protocol for 100-qubit teleportation",
                    "Quantum Supremacy: Demonstrate quantum advantage on 1000-qubit processor",
                    "Quantum Cryptanalysis: Break post-quantum cryptography schemes",
                    "Quantum Metrology: Achieve Heisenberg limit precision",
                    "Quantum Gravity: Unify quantum mechanics with general relativity"
                ],
                requirements: [
                    "Each algorithm must be solved to 99.999% accuracy",
                    "Solutions must be verified by quantum computer",
                    "All solutions must be interconnected and consistent",
                    "Final answer must be a single 256-bit quantum hash"
                ],
                timeEstimate: {
                    bestCase: "25 years with quantum supercomputer",
                    averageCase: "75 years with current technology",
                    worstCase: "200+ years or impossible"
                },
                finalGoal: "Generate the quantum hash: QUANTUM_SCORPION_ULTRA_IMPOSSIBLE_2024"
            },
            warning: "This challenge is designed to be practically unsolvable with current technology!"
        };
        
        const qrString = JSON.stringify(ultraQuantumChallenge, null, 2);
        
        // Generate QR code
        QRCode.toCanvas(document.getElementById('ultra-quantum-qr'), qrString, {
            width: 180,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, function (error) {
            if (error) {
                console.error('Ultra-quantum QR code generation failed:', error);
            } else {
                console.log('Ultra-quantum QR code generated successfully!');
                console.log('Challenge difficulty: IMPOSSIBLE (50-100 years to solve)');
            }
        });
    }
    
    closeSecretCard() {
        // Legacy function - now redirects to appropriate close
        const premiumCard = document.getElementById('premium-scorpion-card');
        const normalCard = document.getElementById('normal-scorpion-card');
        if (premiumCard) premiumCard.remove();
        if (normalCard) normalCard.remove();
    }
    
    closePremiumCard() {
        const card = document.getElementById('premium-scorpion-card');
        if (card) card.remove();
        
        // Show all sections again
        const sections = [
            'education-section',
            'roles-section', 
            'projects-section',
            'arsenal-section',
            'ctf-challenge-section',
            'skills-section'
        ];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'block';
            }
        });
    }
    
    closeNormalCard() {
        const card = document.getElementById('normal-scorpion-card');
        if (card) card.remove();
        
        // Show all sections again
        const sections = [
            'education-section',
            'roles-section', 
            'projects-section',
            'arsenal-section',
            'ctf-challenge-section',
            'skills-section'
        ];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'block';
            }
        });
    }
    
    skipPremiumChallenge() {
        // Remove the challenge interface
        const challenge = document.getElementById('premium-quantum-challenge');
        if (challenge) {
            challenge.remove();
        }
        
        // Show bypass message
        const bypassMsg = document.createElement('div');
        bypassMsg.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: rgba(0, 0, 0, 0.95); border: 2px solid #ff00ff; 
                        border-radius: 15px; padding: 30px; z-index: 10000; text-align: center;">
                <h3 style="color: #ff00ff; margin-bottom: 20px;">💎 PREMIUM BYPASS ATTEMPTED</h3>
                <p style="color: #00ff41; margin-bottom: 15px;">⚠️ WEAK ACCESS - NO PREMIUM FEATURES</p>
                <p style="color: #ff6b35; margin-bottom: 20px;">🔒 PREMIUM CARD REMAINS LOCKED</p>
                <p style="color: #ff006e; margin-bottom: 20px;">💎 ELITE HACKERS ONLY</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #ff00ff; color: white; border: none; padding: 10px 20px; 
                               border-radius: 8px; cursor: pointer;">
                    CLOSE
                </button>
            </div>
        `;
        document.body.appendChild(bypassMsg);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (bypassMsg.parentElement) {
                bypassMsg.remove();
            }
        }, 5000);
    }
    
    skipNormalChallenge() {
        // Remove the challenge interface
        const challenge = document.getElementById('normal-quantum-challenge');
        if (challenge) {
            challenge.remove();
        }
        
        // Show bypass message
        const bypassMsg = document.createElement('div');
        bypassMsg.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: rgba(0, 0, 0, 0.95); border: 2px solid #00ff41; 
                        border-radius: 15px; padding: 30px; z-index: 10000; text-align: center;">
                <h3 style="color: #00ff41; margin-bottom: 20px;">🔓 NORMAL BYPASS ATTEMPTED</h3>
                <p style="color: #00ff41; margin-bottom: 15px;">⚠️ WEAK ACCESS - NO CARD DETAILS</p>
                <p style="color: #ff6b35; margin-bottom: 20px;">🔒 CARD REMAINS LOCKED</p>
                <p style="color: #00d4ff; margin-bottom: 20px;">📚 LEARNING REQUIRED</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #00ff41; color: white; border: none; padding: 10px 20px; 
                               border-radius: 8px; cursor: pointer;">
                    CLOSE
                </button>
            </div>
        `;
        document.body.appendChild(bypassMsg);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (bypassMsg.parentElement) {
                bypassMsg.remove();
            }
        }, 5000);
    }
    
    skipCardChallenge() {
        const challenge = document.getElementById('card-unlock-challenge');
        if (challenge) challenge.remove();
        
        // Show all sections
        const sections = [
            'education-section',
            'roles-section', 
            'projects-section',
            'arsenal-section',
            'ctf-challenge-section',
            'skills-section'
        ];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'block';
            }
        });
    }
    
    unlockCardDetails() {
        // Remove challenge
        const challenge = document.getElementById('card-unlock-challenge');
        if (challenge) challenge.remove();
        
        // Show card details with animation
        const cardElements = document.querySelectorAll('.card-type, .card-number, .card-valid, .global-access');
        cardElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.filter = 'blur(0px)';
                element.style.animation = 'cardReveal 0.5s ease-out';
            }, index * 200);
        });
        
        // SHOW ALL SECTIONS after card challenge is solved (EXCEPT CTF - already visible)
        const sectionsToShow = [
            'education-section',
            'roles-section', 
            'projects-section',
            'arsenal-section',
            'skills-section',
            'ai-agent-section',
            'cybersecurity-platforms-section'
        ];
        
        sectionsToShow.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'block';
            }
        });
        
        // Card unlock celebration
        this.cardUnlockCelebration();
    }
    
    cardUnlockCelebration() {
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: linear-gradient(45deg, #00ff41, #00d4ff, #ff006e, #00ff41); 
                        opacity: 0.3; z-index: 9999; pointer-events: none; 
                        animation: cardCelebration 2s ease-out forwards;"></div>
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: var(--background-dark); color: var(--primary-color); 
                        padding: 30px; border: 2px solid var(--primary-color); 
                        border-radius: 15px; z-index: 10000; text-align: center; 
                        font-weight: bold; font-size: 1.2rem; animation: cardMessage 2s ease-out forwards;">
                💳 CARD ACCESS GRANTED<br>
                🔓 ALL DETAILS UNLOCKED<br>
                ⚡ QUANTUM ENCRYPTION BYPASSED<br>
                🎯 FULL PROFILE ACCESS CONFIRMED
            </div>
        `;
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.remove();
        }, 2000);
    }
    
    logFailedCardAttempt(attempt) {
        console.log(`%c[CARD_SECURITY] Failed card unlock attempt: "${attempt}"`, 'color: #ff0080; font-weight: bold;');
        
        const warning = document.createElement('div');
        warning.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #ff0080; 
                        color: white; padding: 10px; border-radius: 5px; z-index: 10000; 
                        font-size: 0.8rem; animation: securityWarning 2s ease-out forwards;">
                ⚠️ CARD ACCESS DENIED: Invalid quantum key
            </div>
        `;
        document.body.appendChild(warning);
        
        setTimeout(() => {
            warning.remove();
        }, 2000);
    }
    
    securitySuccessCelebration() {
        // Create security breach celebration
        const celebration = document.createElement('div');
        celebration.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                        background: linear-gradient(45deg, #00ff41, #0080ff, #ff0080, #ff6b35); 
                        opacity: 0.2; z-index: 9999; pointer-events: none; 
                        animation: securityCelebration 3s ease-out forwards;"></div>
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: var(--background-dark); color: var(--primary-color); 
                        padding: 30px; border: 2px solid var(--primary-color); 
                        border-radius: 15px; z-index: 10000; text-align: center; 
                        font-weight: bold; font-size: 1.2rem; animation: securityMessage 3s ease-out forwards;">
                🛡️ SECURITY SYSTEM BYPASSED<br>
                🎯 ALL STAGES COMPLETED<br>
                🔓 PROFILE ACCESS GRANTED<br>
                👑 ELITE HACKER STATUS CONFIRMED<br>
                💻 Press Ctrl+T to open terminal
            </div>
        `;
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            celebration.remove();
        }, 3000);
    }
    
    initNetworkSimulation() {
        // Simulate network request for Stage 3
        setTimeout(() => {
            console.log('%c[NETWORK] SECURITY_ACCESS_TOKEN_2024', 'color: #00ff41; font-weight: bold;');
            console.log('%c[DEBUG] Network request intercepted', 'color: #ff0080;');
        }, 5000);
    }
    
    logFailedAttempt(stage, attempt) {
        // Log failed attempts for security monitoring
        console.log(`%c[SECURITY] Failed attempt on Stage ${stage}: "${attempt}"`, 'color: #ff0080; font-weight: bold;');
        
        // Add security warning
        const warning = document.createElement('div');
        warning.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #ff0080; 
                        color: white; padding: 10px; border-radius: 5px; z-index: 10000; 
                        font-size: 0.8rem; animation: securityWarning 2s ease-out forwards;">
                ⚠️ INTRUSION DETECTED: Access attempt logged
            </div>
        `;
        document.body.appendChild(warning);
        
        setTimeout(() => {
            warning.remove();
        }, 2000);
    }
    
    resetChallenge() {
        // Reset all stages
        for (let i = 1; i <= this.maxStages; i++) {
            const stage = document.getElementById(`stage-${i}`);
            const input = document.getElementById(`stage${i}-answer`);
            const result = document.getElementById(`stage${i}-result`);
            
            if (stage) {
                stage.style.display = i === 1 ? 'block' : 'none';
            }
            if (input) input.value = '';
            if (result) result.innerHTML = '';
        }
        
        this.currentStage = 1;
        
        // Hide all profile sections
        const sections = [
            'profile-section',
            'education-section',
            'roles-section', 
            'projects-section',
            'skills-section'
        ];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = 'none';
            }
        });
        
        // Hide terminal and hidden console
        const terminal = document.getElementById('terminal');
        const hiddenConsole = document.getElementById('hidden-console');
        if (terminal) terminal.style.display = 'none';
        if (hiddenConsole) hiddenConsole.style.display = 'none';
        
        // Show challenge intro
        const challengeIntro = document.getElementById('challenge-intro');
        if (challengeIntro) challengeIntro.style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Hidden Console with Easter Eggs
class HiddenConsole {
    constructor() {
        this.console = document.getElementById('hidden-console');
        this.output = document.getElementById('console-output');
        this.input = document.getElementById('console-input');
        this.commands = {
            'help': this.showHelp.bind(this),
            'whoami': this.whoami.bind(this),
            'ls': this.listFiles.bind(this),
            'cat': this.catFile.bind(this),
            'clear': this.clear.bind(this),
            'matrix': this.matrix.bind(this),
            'hack': this.hack.bind(this),
            'pwn': this.pwn.bind(this),
            'exit': this.exit.bind(this)
        };
        
        this.init();
    }
    
    init() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(this.input.value);
                this.input.value = '';
            }
        });
    }
    
    executeCommand(command) {
        const cmd = command.trim().toLowerCase();
        const args = cmd.split(' ');
        const mainCmd = args[0];
        
        this.printOutput(`> ${command}`);
        
        if (this.commands[mainCmd]) {
            this.commands[mainCmd](args.slice(1));
        } else {
            this.printOutput(`Command not found: ${mainCmd}. Type 'help' for available commands.`);
        }
    }
    
    printOutput(text) {
        this.output.innerHTML += `<div>${text}</div>`;
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    showHelp() {
        this.printOutput(`
Available commands:
- help: Show this help message
- whoami: Display user information
- ls: List files
- cat [file]: Display file contents
- clear: Clear console
- matrix: Enable matrix mode
- hack: Initiate hacking sequence
- pwn: Pwn the system
- exit: Close console
        `);
    }
    
    whoami() {
        this.printOutput(`
User: nirajan-thapa
Role: Elite CEH
Location: Rukum West, Nepal
Specialization: AI, IoT, Quantum Computing
Status: Active
        `);
    }
    
    listFiles() {
        this.printOutput(`
drwxr-xr-x 2 nirajan nirajan 4096 Jan 15 10:30 projects/
drwxr-xr-x 2 nirajan nirajan 4096 Jan 15 10:30 skills/
-rw-r--r-- 1 nirajan nirajan 1024 Jan 15 10:30 profile.txt
-rw-r--r-- 1 nirajan nirajan 2048 Jan 15 10:30 secrets.txt
        `);
    }
    
    catFile(args) {
        if (args.length === 0) {
            this.printOutput('Usage: cat [filename]');
            return;
        }
        
        const file = args[0];
        switch (file) {
            case 'profile.txt':
                this.printOutput(`
        Name: Scorpion Family
DOB: April 7, 2007
Education: BSc.IT (In Progress)
Certifications: CEH Elite
Current Role: Team Lead (Cyber Sec/Ethical Hacking)
                `);
                break;
            case 'secrets.txt':
                this.printOutput('Access denied: This file requires elevated privileges.');
                break;
            default:
                this.printOutput(`File not found: ${file}`);
        }
    }
    
    clear() {
        this.output.innerHTML = '';
    }
    
    matrix() {
        this.printOutput('Matrix mode activated. Welcome to the real world, Neo.');
        document.body.style.filter = 'hue-rotate(90deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    }
    
    hack() {
        this.printOutput('Initiating hacking sequence...');
        setTimeout(() => {
            this.printOutput('Bypassing firewall...');
        }, 1000);
        setTimeout(() => {
            this.printOutput('Accessing mainframe...');
        }, 2000);
        setTimeout(() => {
            this.printOutput('Hack complete. System compromised.');
        }, 3000);
    }
    
    pwn() {
        this.printOutput('PWNED! You\'ve successfully owned the system!');
        document.body.style.animation = 'glitch 1s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 1000);
    }
    
    exit() {
        this.console.style.display = 'none';
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
        
        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            observer.observe(item);
            item.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Observe project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            observer.observe(card);
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Typing Effect
class TypingEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        
        this.type();
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Simple CTF Functions
// Enhanced CTF Challenge System - Quantum Only
const CTF_CHALLENGES = {
    categories: {
        'quantum': {
            title: '⚛️ Quantum Computing',
            icon: '⚛️',
            description: 'Solve advanced quantum computing challenges',
            challenges: [
                {
                    id: 'quantum-1',
                    title: 'Quantum Key Distribution',
                    description: 'Implement BB84 protocol for secure key exchange',
                    difficulty: 'medium',
                    points: 600,
                    hint: 'Use quantum superposition and measurement',
                    answer: 'quantum_key_exchange',
                    funnyMessage: '⚛️ Quantum Physicist! You just made Schrödinger\'s cat happy! Quantum cat whisperer! 🐱'
                },
                {
                    id: 'quantum-2',
                    title: 'Quantum Algorithm Implementation',
                    description: 'Implement Grover\'s algorithm for database search',
                    difficulty: 'hard',
                    points: 1200,
                    hint: 'Use quantum oracle and amplitude amplification',
                    answer: 'grover_algorithm_master',
                    funnyMessage: '🔍 Quantum Detective! You just searched databases at quantum speed! Speed demon! ⚡'
                },
                {
                    id: 'quantum-3',
                    title: 'Quantum Cryptography Breaking',
                    description: 'Break quantum-resistant cryptographic schemes',
                    difficulty: 'elite',
                    points: 3000,
                    hint: 'Use quantum algorithms to solve lattice problems',
                    answer: 'quantum_crypto_broken_elite',
                    funnyMessage: '🔬 Quantum Scientist! You just broke cryptography that doesn\'t exist yet! Future breaker! 🚀'
                },
                {
                    id: 'quantum-4',
                    title: 'Quantum Entanglement Challenge',
                    description: 'Create and manipulate entangled quantum states',
                    difficulty: 'medium',
                    points: 800,
                    hint: 'Use Bell states and quantum gates',
                    answer: 'entangled_states_master',
                    funnyMessage: '🔗 Entanglement Expert! You just made particles dance together! Quantum choreographer! 🩰'
                },
                {
                    id: 'quantum-5',
                    title: 'Quantum Error Correction',
                    description: 'Implement quantum error correction codes',
                    difficulty: 'hard',
                    points: 1500,
                    hint: 'Use surface codes and stabilizer measurements',
                    answer: 'quantum_error_corrected',
                    funnyMessage: '🛡️ Quantum Guardian! You just protected quantum information from decoherence! Quantum bodyguard! 💪'
                },
                {
                    id: 'quantum-6',
                    title: 'Quantum Machine Learning',
                    description: 'Implement quantum neural networks',
                    difficulty: 'elite',
                    points: 2500,
                    hint: 'Use variational quantum circuits and parameter optimization',
                    answer: 'quantum_ml_master',
                    funnyMessage: '🧠 Quantum Brain! You just created AI that thinks in quantum! Mind bender! 🌊'
                },
                {
                    id: 'quantum-7',
                    title: 'Quantum Teleportation Protocol',
                    description: 'Implement quantum teleportation between qubits',
                    difficulty: 'hard',
                    points: 1800,
                    hint: 'Use Bell measurement and conditional operations',
                    answer: 'quantum_teleport_success',
                    funnyMessage: '🚀 Quantum Teleporter! You just made information travel faster than light! Time traveler! ⏰'
                },
                {
                    id: 'quantum-8',
                    title: 'Quantum Supremacy Challenge',
                    description: 'Demonstrate quantum advantage over classical computers',
                    difficulty: 'elite',
                    points: 4000,
                    hint: 'Use random circuit sampling and quantum supremacy',
                    answer: 'quantum_supremacy_achieved',
                    funnyMessage: '👑 Quantum King! You just proved quantum computers are superior! Royal hacker! 👑'
                }
            ]
        }
    },
    
    // Quantum Group Challenges for team play
    groupChallenges: [
        {
            id: 'quantum-group-1',
            title: '⚛️ Quantum Network Infiltration',
            description: 'Team challenge: Infiltrate a quantum-secured network using quantum techniques',
            difficulty: 'elite',
            points: 5000,
            hint: 'Use quantum entanglement and superposition to bypass quantum encryption',
            answer: 'quantum_network_infiltration_success',
            funnyMessage: '⚛️ Quantum Ninjas! You just hacked the unhackable! Quantum stealth masters! 🥷'
        },
        {
            id: 'quantum-group-2',
            title: '🌌 Quantum Space Communication',
            description: 'Team challenge: Establish quantum communication across space stations',
            difficulty: 'elite',
            points: 8000,
            hint: 'Use quantum teleportation and entanglement for instant communication',
            answer: 'quantum_space_communication_victory',
            funnyMessage: '🌌 Quantum Space Pioneers! You just made instant communication across galaxies! Intergalactic quantum hackers! 🚀'
        },
        {
            id: 'quantum-group-3',
            title: '🔮 Quantum Time Manipulation',
            description: 'Team challenge: Use quantum mechanics to manipulate computational time',
            difficulty: 'elite',
            points: 10000,
            hint: 'Use quantum superposition to compute multiple timelines simultaneously',
            answer: 'quantum_time_manipulation_elite',
            funnyMessage: '🔮 Quantum Time Lords! You just bent time itself with quantum mechanics! Temporal hackers! ⏰'
        }
    ]
};

// Initialize Single Player CTF
function initSinglePlayerCTF() {
    // Temporarily show CTF section for testing
    const ctfSection = document.getElementById('ctf-challenge-section');
    if (ctfSection) {
        ctfSection.style.display = 'block';
    }
    showCTFCategories();
}

// Initialize Group CTF
function initGroupCTF() {
    showGroupChallenges();
}

// Test Quantum CTF - Direct access for testing
function testQuantumCTF() {
    // Show CTF section
    const ctfSection = document.getElementById('ctf-challenge-section');
    if (ctfSection) {
        ctfSection.style.display = 'block';
    }
    
    // Show quantum challenges directly
    const ctfChallenges = document.getElementById('ctf-challenges');
    if (ctfChallenges) {
        ctfChallenges.style.display = 'block';
    }
    
    showCTFCategories();
}

// Show CTF Categories
function showCTFCategories() {
    const ctfSection = document.getElementById('ctf-challenges');
    ctfSection.style.display = 'block';
    
    let categoriesHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: #00ff41; margin-bottom: 30px; font-size: 2rem;">🎮 CTF CHALLENGE ZONE</h3>
            <p style="color: #00d4ff; margin-bottom: 30px; font-size: 1.2rem;">Choose your hacking category, elite hacker!</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
    `;
    
    Object.keys(CTF_CHALLENGES.categories).forEach(categoryKey => {
        const category = CTF_CHALLENGES.categories[categoryKey];
        const challengeCount = category.challenges.length;
        const totalPoints = category.challenges.reduce((sum, challenge) => sum + challenge.points, 0);
        
        categoriesHTML += `
            <div class="ctf-category-card" onclick="selectCategory('${categoryKey}')" style="
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 255, 65, 0.1));
                border: 2px solid var(--primary-color);
                border-radius: 15px;
                padding: 25px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
            ">
                <div class="category-icon" style="font-size: 3rem; margin-bottom: 15px;">${category.icon}</div>
                <h4 style="color: var(--primary-color); margin-bottom: 10px; font-size: 1.3rem;">${category.title}</h4>
                <p style="color: #00d4ff; margin-bottom: 15px; font-size: 0.9rem;">${category.description}</p>
                <div class="category-stats" style="display: flex; justify-content: space-between; font-size: 0.8rem;">
                    <span style="color: #ff6b35;">${challengeCount} Challenges</span>
                    <span style="color: #ff00ff;">${totalPoints} Points</span>
                </div>
            </div>
        `;
    });
    
    categoriesHTML += `
            </div>
            
            <button onclick="showCTFModes()" style="
                background: linear-gradient(45deg, #ff006e, #ff00ff);
                color: #000;
                border: none;
                padding: 15px 30px;
                border-radius: 10px;
                font-weight: bold;
                cursor: pointer;
                font-size: 1.1rem;
                margin-top: 20px;
            ">← Back to CTF Modes</button>
        </div>
    `;
    
    ctfSection.innerHTML = categoriesHTML;
}

// Select Category and Show Challenges
function selectCategory(categoryKey) {
    const category = CTF_CHALLENGES.categories[categoryKey];
    const ctfSection = document.getElementById('ctf-challenges');
    
    let challengesHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: #00ff41; margin-bottom: 20px; font-size: 2rem;">${category.title}</h3>
            <p style="color: #00d4ff; margin-bottom: 30px; font-size: 1.1rem;">${category.description}</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; margin-bottom: 30px;">
    `;
    
    category.challenges.forEach(challenge => {
        const difficultyColor = {
            'easy': '#00ff41',
            'medium': '#ff6b35',
            'hard': '#ff00ff',
            'elite': '#ff006e'
        };
        
        challengesHTML += `
            <div class="challenge-card" style="
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 255, 65, 0.05));
                border: 2px solid ${difficultyColor[challenge.difficulty]};
                border-radius: 15px;
                padding: 25px;
                text-align: left;
            ">
                <div class="challenge-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h4 style="color: ${difficultyColor[challenge.difficulty]}; margin: 0; font-size: 1.2rem;">${challenge.title}</h4>
                    <div style="display: flex; gap: 10px;">
                        <span class="difficulty-badge" style="
                            background: ${difficultyColor[challenge.difficulty]};
                            color: #000;
                            padding: 5px 10px;
                            border-radius: 15px;
                            font-size: 0.8rem;
                            font-weight: bold;
                            text-transform: uppercase;
                        ">${challenge.difficulty}</span>
                        <span class="points-badge" style="
                            background: #ff00ff;
                            color: #000;
                            padding: 5px 10px;
                            border-radius: 15px;
                            font-size: 0.8rem;
                            font-weight: bold;
                        ">${challenge.points} pts</span>
                    </div>
                </div>
                
                <p style="color: #00d4ff; margin-bottom: 15px; font-size: 0.9rem;">${challenge.description}</p>
                
                <div class="challenge-input" style="margin-bottom: 15px;">
                    <input type="text" id="${challenge.id}" placeholder="Enter your answer..." style="
                        width: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        border: 2px solid ${difficultyColor[challenge.difficulty]};
                        color: ${difficultyColor[challenge.difficulty]};
                        padding: 12px;
                        border-radius: 8px;
                        font-family: 'Courier New', monospace;
                        font-size: 0.9rem;
                    ">
                </div>
                
                <div class="challenge-actions" style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <button onclick="submitCTFAnswer('${challenge.id}')" style="
                        background: linear-gradient(45deg, ${difficultyColor[challenge.difficulty]}, #00ff41);
                        color: #000;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        font-weight: bold;
                        cursor: pointer;
                        flex: 1;
                    ">🚀 Submit Answer</button>
                    <button onclick="showHint('${challenge.id}')" style="
                        background: rgba(255, 255, 255, 0.1);
                        color: #ff6b35;
                        border: 2px solid #ff6b35;
                        padding: 10px 15px;
                        border-radius: 8px;
                        font-weight: bold;
                        cursor: pointer;
                    ">💡 Hint</button>
                </div>
                
                <div id="${challenge.id}-result" style="
                    padding: 10px;
                    border-radius: 8px;
                    font-weight: bold;
                    display: none;
                "></div>
            </div>
        `;
    });
    
    challengesHTML += `
            </div>
            
            <button onclick="showCTFCategories()" style="
                background: linear-gradient(45deg, #ff006e, #ff00ff);
                color: #000;
                border: none;
                padding: 15px 30px;
                border-radius: 10px;
                font-weight: bold;
                cursor: pointer;
                font-size: 1.1rem;
            ">← Back to Categories</button>
        </div>
    `;
    
    ctfSection.innerHTML = challengesHTML;
}

// Show Group Challenges
function showGroupChallenges() {
    const ctfSection = document.getElementById('ctf-challenges');
    ctfSection.style.display = 'block';
    
    let groupHTML = `
        <div style="text-align: center; padding: 20px;">
            <h3 style="color: #00ff41; margin-bottom: 30px; font-size: 2rem;">👥 TEAM CTF CHALLENGES</h3>
            <p style="color: #00d4ff; margin-bottom: 30px; font-size: 1.2rem;">Elite team challenges for coordinated hackers!</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 25px; margin-bottom: 30px;">
    `;
    
    CTF_CHALLENGES.groupChallenges.forEach(challenge => {
        groupHTML += `
            <div class="group-challenge-card" style="
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(255, 0, 102, 0.1));
                border: 3px solid #ff006e;
                border-radius: 20px;
                padding: 30px;
                text-align: left;
                position: relative;
            ">
                <div class="team-badge" style="
                    position: absolute;
                    top: -10px;
                    right: 20px;
                    background: #ff006e;
                    color: #000;
                    padding: 5px 15px;
                    border-radius: 15px;
                    font-weight: bold;
                    font-size: 0.8rem;
                ">👥 TEAM CHALLENGE</div>
                
                <h4 style="color: #ff006e; margin-bottom: 15px; font-size: 1.4rem;">${challenge.title}</h4>
                <p style="color: #00d4ff; margin-bottom: 20px; font-size: 1rem;">${challenge.description}</p>
                
                <div class="challenge-meta" style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                    <span style="color: #ff6b35; font-weight: bold;">Difficulty: ${challenge.difficulty.toUpperCase()}</span>
                    <span style="color: #ff00ff; font-weight: bold;">${challenge.points} Points</span>
                </div>
                
                <div class="challenge-input" style="margin-bottom: 20px;">
                    <input type="text" id="${challenge.id}" placeholder="Enter team answer..." style="
                        width: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        border: 2px solid #ff006e;
                        color: #ff006e;
                        padding: 15px;
                        border-radius: 10px;
                        font-family: 'Courier New', monospace;
                        font-size: 1rem;
                    ">
                </div>
                
                <div class="challenge-actions" style="display: flex; gap: 15px; margin-bottom: 20px;">
                    <button onclick="submitCTFAnswer('${challenge.id}')" style="
                        background: linear-gradient(45deg, #ff006e, #ff00ff);
                        color: #000;
                        border: none;
                        padding: 12px 25px;
                        border-radius: 10px;
                        font-weight: bold;
                        cursor: pointer;
                        flex: 1;
                        font-size: 1rem;
                    ">🚀 Submit Team Answer</button>
                    <button onclick="showHint('${challenge.id}')" style="
                        background: rgba(255, 255, 255, 0.1);
                        color: #ff6b35;
                        border: 2px solid #ff6b35;
                        padding: 12px 20px;
                        border-radius: 10px;
                        font-weight: bold;
                        cursor: pointer;
                    ">💡 Team Hint</button>
                </div>
                
                <div id="${challenge.id}-result" style="
                    padding: 15px;
                    border-radius: 10px;
                    font-weight: bold;
                    display: none;
                "></div>
            </div>
        `;
    });
    
    groupHTML += `
            </div>
            
            <button onclick="showCTFModes()" style="
                background: linear-gradient(45deg, #ff006e, #ff00ff);
                color: #000;
                border: none;
                padding: 15px 30px;
                border-radius: 10px;
                font-weight: bold;
                cursor: pointer;
                font-size: 1.1rem;
            ">← Back to CTF Modes</button>
        </div>
    `;
    
    ctfSection.innerHTML = groupHTML;
}

// Submit CTF Answer
function submitCTFAnswer(challengeId) {
    const input = document.getElementById(challengeId);
    const result = document.getElementById(challengeId + '-result');
    const answer = input.value.trim();
    
    // Find the challenge in categories or group challenges
    let challenge = null;
    
    // Search in categories
    for (const categoryKey in CTF_CHALLENGES.categories) {
        const category = CTF_CHALLENGES.categories[categoryKey];
        const foundChallenge = category.challenges.find(c => c.id === challengeId);
        if (foundChallenge) {
            challenge = foundChallenge;
            break;
        }
    }
    
    // Search in group challenges
    if (!challenge) {
        challenge = CTF_CHALLENGES.groupChallenges.find(c => c.id === challengeId);
    }
    
    if (challenge && answer.toLowerCase() === challenge.answer.toLowerCase()) {
        result.innerHTML = `
            <div style="color: #00ff41; text-align: center;">
                <div style="font-size: 2rem; margin-bottom: 10px;">🎉</div>
                <div style="font-size: 1.2rem; margin-bottom: 10px;">✅ CHALLENGE COMPLETED!</div>
                <div style="font-size: 1rem; color: #ff00ff; font-style: italic;">${challenge.funnyMessage}</div>
            </div>
        `;
        result.style.display = 'block';
        ctfSuccessCelebration(challengeId);
    } else {
        result.innerHTML = `
            <div style="color: #ff006e; text-align: center;">
                <div style="font-size: 1.5rem; margin-bottom: 10px;">❌</div>
                <div style="font-size: 1.1rem;">INCORRECT! Try again, hacker.</div>
                <div style="font-size: 0.9rem; color: #ff6b35; margin-top: 5px;">Keep thinking, you'll get it!</div>
            </div>
        `;
        result.style.display = 'block';
        logCTFFailedAttempt(challengeId, answer);
    }
}

// Show Hint
function showHint(challengeId) {
    // Find the challenge
    let challenge = null;
    
    for (const categoryKey in CTF_CHALLENGES.categories) {
        const category = CTF_CHALLENGES.categories[categoryKey];
        const foundChallenge = category.challenges.find(c => c.id === challengeId);
        if (foundChallenge) {
            challenge = foundChallenge;
            break;
        }
    }
    
    if (!challenge) {
        challenge = CTF_CHALLENGES.groupChallenges.find(c => c.id === challengeId);
    }
    
    if (challenge) {
        const hintDiv = document.createElement('div');
        hintDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #0a0a0a, #1a0a1a);
            border: 3px solid #ff6b35;
            border-radius: 15px;
            padding: 30px;
            z-index: 10000;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
        `;
        
        hintDiv.innerHTML = `
            <h3 style="color: #ff6b35; margin-bottom: 20px;">💡 HINT</h3>
            <p style="color: #00d4ff; margin-bottom: 20px; font-size: 1.1rem;">${challenge.hint}</p>
            <button onclick="this.parentElement.remove()" style="
                background: #ff6b35;
                color: #000;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
            ">Got it!</button>
        `;
        
        document.body.appendChild(hintDiv);
    }
}

// Show CTF Modes
function showCTFModes() {
    const ctfSection = document.getElementById('ctf-challenges');
    ctfSection.style.display = 'block';
    
    ctfSection.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h3 style="color: #00ff41; margin-bottom: 30px; font-size: 2.5rem;">🎮 CTF CHALLENGE ZONE</h3>
            <p style="color: #00d4ff; margin-bottom: 40px; font-size: 1.3rem;">Choose your hacking mode, elite hacker!</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px; margin-bottom: 40px;">
                <div class="ctf-mode-card" onclick="initSinglePlayerCTF()" style="
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 255, 65, 0.1));
                    border: 3px solid var(--primary-color);
                    border-radius: 20px;
                    padding: 40px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                ">
                    <div style="font-size: 4rem; margin-bottom: 20px;">🎯</div>
                    <h4 style="color: var(--primary-color); margin-bottom: 15px; font-size: 1.5rem;">SINGLE PLAYER</h4>
                    <p style="color: #00d4ff; margin-bottom: 20px; font-size: 1rem;">Individual challenges for solo hackers</p>
                    <div style="color: #ff6b35; font-weight: bold; font-size: 0.9rem;">
                        • 8 Categories • 35+ Challenges • Elite Difficulty Levels
                    </div>
                </div>
                
                <div class="ctf-mode-card" onclick="initGroupCTF()" style="
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(255, 0, 102, 0.1));
                    border: 3px solid #ff006e;
                    border-radius: 20px;
                    padding: 40px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                ">
                    <div style="font-size: 4rem; margin-bottom: 20px;">👥</div>
                    <h4 style="color: #ff006e; margin-bottom: 15px; font-size: 1.5rem;">TEAM CHALLENGES</h4>
                    <p style="color: #00d4ff; margin-bottom: 20px; font-size: 1rem;">Coordinated attacks for elite teams</p>
                    <div style="color: #ff6b35; font-weight: bold; font-size: 0.9rem;">
                        • 3 Elite Challenges • 23,000+ Points • Ultimate Difficulty
                    </div>
                </div>
            </div>
            
            <button onclick="document.getElementById('ctf-challenges').style.display='none'" style="
                background: linear-gradient(45deg, #ff006e, #ff00ff);
                color: #000;
                border: none;
                padding: 15px 30px;
                border-radius: 10px;
                font-weight: bold;
                cursor: pointer;
                font-size: 1.1rem;
            ">← Back to Portfolio</button>
        </div>
    `;
}

// CTF Success Celebration
function ctfSuccessCelebration(challengeId) {
    const effect = document.createElement('div');
    effect.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    background: linear-gradient(135deg, #00ff41, #00d4ff);
                    color: #000; 
                    padding: 30px; border-radius: 15px; z-index: 10000; 
                    font-weight: bold; text-align: center; box-shadow: 0 0 50px rgba(0, 255, 65, 0.8);
                    animation: ctfCelebration 2s ease-out forwards;">
            <div style="font-size: 3rem; margin-bottom: 15px;">🏆</div>
            <div style="font-size: 1.5rem; margin-bottom: 10px;">CHALLENGE COMPLETED!</div>
            <div style="font-size: 1rem; opacity: 0.8;">Elite hacker achievement unlocked!</div>
        </div>
    `;
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 2000);
}

// Log CTF Failed Attempt
function logCTFFailedAttempt(challengeId, attempt) {
    console.log(`CTF Failed Attempt - Challenge: ${challengeId}, Attempt: ${attempt}`);
}

// Main Application
class PortfolioApp {
    constructor() {
        this.matrixRain = null;
        this.terminal = null;
        this.securityChallenge = null;
        this.hiddenConsole = null;
        this.scrollAnimations = null;
        
        this.init();
    }
    
    init() {
        try {
            console.log('🦂 Initializing PortfolioApp components...');
            
            // Initialize components
            this.matrixRain = new MatrixRain();
            this.terminal = new Terminal();
            this.securityChallenge = new SecurityChallenge();
            this.hiddenConsole = new HiddenConsole();
            this.scrollAnimations = new ScrollAnimations();
            
            // Terminal will now use cinematic commands instead of static typing effect
            
            // Handle window resize
            window.addEventListener('resize', () => {
                if (this.matrixRain) {
                    this.matrixRain.resize();
                }
            });
            
            // Add keyboard shortcuts
            this.addKeyboardShortcuts();
            
            // Add easter eggs
            this.addEasterEggs();
            
            console.log('✅ PortfolioApp initialization complete');
        } catch (error) {
            console.error('❌ PortfolioApp initialization failed:', error);
        }
    }
    
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to toggle hidden console
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const console = document.getElementById('hidden-console');
                console.style.display = console.style.display === 'none' ? 'block' : 'none';
            }
            
            // Ctrl/Cmd + T to toggle terminal
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                const terminal = document.getElementById('terminal');
                if (terminal) {
                    if (terminal.style.display === 'none' || terminal.style.display === '') {
                        terminal.style.display = 'block';
                    } else {
                        terminal.style.display = 'none';
                    }
                }
            }
        });
    }
    
    addEasterEggs() {
        // Konami code easter egg
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                this.activateKonamiEasterEgg();
            }
        });
        
        // Click on initials easter egg
        const initials = document.querySelector('.initials');
        let clickCount = 0;
        initials.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 5) {
                this.activateClickEasterEgg();
                clickCount = 0;
            }
        });
    }
    
    activateKonamiEasterEgg() {
        this.hiddenConsole.printOutput('Konami code detected! You\'ve unlocked the secret mode!');
        document.body.style.animation = 'glitch 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
    
    activateClickEasterEgg() {
        this.hiddenConsole.printOutput('You\'ve clicked the initials 5 times! Easter egg activated!');
        const imagePlaceholder = document.querySelector('.image-placeholder');
        imagePlaceholder.style.animation = 'rotate 1s linear infinite';
        setTimeout(() => {
            imagePlaceholder.style.animation = '';
        }, 3000);
    }
}

// Global CTF functions - Fixed
function initSinglePlayerCTF() {
    try {
        console.log('🎮 Initializing Single Player CTF...');
        const ctfContainer = document.getElementById('ctf-challenges');
        if (ctfContainer) {
            ctfContainer.style.display = 'block';
            ctfContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #00ff41;">
                    <h3 style="margin-bottom: 20px; color: #00ff41;">🎮 SINGLE PLAYER CTF</h3>
                    <div style="background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 10px; border: 2px solid #00ff41;">
                        <h4 style="color: #00d4ff; margin-bottom: 15px;">🔐 AVAILABLE CHALLENGES</h4>
                        <div style="margin-bottom: 20px;">
                            <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                                <h5 style="color: #ff006e;">🔓 CRYPTOGRAPHY</h5>
                                <p style="font-size: 14px;">Decrypt the hidden message using advanced algorithms</p>
                                <button onclick="startCryptoChallenge()" style="background: #00ff41; color: #000; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">START CHALLENGE</button>
                            </div>
                            <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                                <h5 style="color: #00d4ff;">🌐 WEB EXPLOITATION</h5>
                                <p style="font-size: 14px;">Find vulnerabilities in the web application</p>
                                <button onclick="startWebChallenge()" style="background: #00ff41; color: #000; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">START CHALLENGE</button>
                            </div>
                            <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                                <h5 style="color: #ff6b35;">💻 BINARY EXPLOITATION</h5>
                                <p style="font-size: 14px;">Reverse engineer the binary and find the flag</p>
                                <button onclick="startBinaryChallenge()" style="background: #00ff41; color: #000; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">START CHALLENGE</button>
                            </div>

                        </div>
                        <button onclick="showCTFCategories()" style="background: #ff006e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">← BACK TO MENU</button>
                    </div>
                </div>
            `;
            console.log('✅ Single Player CTF initialized successfully');
        } else {
            console.error('❌ CTF container not found');
        }
    } catch (error) {
        console.error('❌ Single Player CTF initialization failed:', error);
    }
}

function initGroupCTF() {
    try {
        console.log('👥 Initializing Group CTF...');
        const ctfContainer = document.getElementById('ctf-challenges');
        if (ctfContainer) {
            ctfContainer.style.display = 'block';
            ctfContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #00ff41;">
                    <h3 style="margin-bottom: 20px; color: #00ff41;">👥 GROUP CTF</h3>
                    <div style="background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 10px; border: 2px solid #00ff41;">
                        <h4 style="color: #00d4ff; margin-bottom: 15px;">🏆 TEAM CHALLENGES</h4>
                        <div style="margin-bottom: 20px;">
                            <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                                <h5 style="color: #ff006e;">🦂 SCORPION FAMILY CHALLENGE</h5>
                                <p style="font-size: 14px;">Work together to solve the ultimate team challenge</p>
                                <button onclick="startTeamChallenge()" style="background: #00ff41; color: #000; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">START TEAM CHALLENGE</button>
                            </div>
                            <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 10px 0;">
                                <h5 style="color: #00d4ff;">🌐 NETWORK INFILTRATION</h5>
                                <p style="font-size: 14px;">Coordinate with your team to breach the network</p>
                                <button onclick="startNetworkChallenge()" style="background: #00ff41; color: #000; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">START NETWORK CHALLENGE</button>
                            </div>

                        </div>
                        <button onclick="showCTFCategories()" style="background: #ff006e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">← BACK TO MENU</button>
                    </div>
                </div>
            `;
            console.log('✅ Group CTF initialized successfully');
        } else {
            console.error('❌ CTF container not found');
        }
    } catch (error) {
        console.error('❌ Group CTF initialization failed:', error);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🦂 Initializing Scorpion Family Portfolio...');
        window.portfolioApp = new PortfolioApp();
        // Make securityChallenge globally accessible for card challenge
        window.securityChallenge = window.portfolioApp.securityChallenge;
        console.log('✅ Portfolio initialization complete');
    } catch (error) {
        console.error('❌ Portfolio initialization failed:', error);
    }
});

// Add some additional utility functions
const Utils = {
    // Generate random hacker-style text
    generateHackerText: () => {
        const phrases = [
            'Access granted',
            'System compromised',
            'Firewall bypassed',
            'Root access obtained',
            'Mainframe accessed',
            'Encryption cracked',
            'Backdoor installed',
            'Zero-day exploited'
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
    },
    
    // Add glitch effect to element
    addGlitchEffect: (element) => {
        element.style.animation = 'glitch 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    },
    
    // Simulate typing effect
    simulateTyping: (element, text, callback) => {
        let index = 0;
        element.textContent = '';
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, Math.random() * 100 + 50);
            } else if (callback) {
                callback();
            }
        };
        
        type();
    }
};

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, Utils };
}

// Debug function to test card challenge
function testCardChallenge() {
    if (window.securityChallenge) {
        console.log('Testing card challenge...');
        window.securityChallenge.startCardUnlockChallenge();
    } else {
        console.log('Security challenge not available');
    }
}

// Debug function to test quantum puzzle
function testQuantumPuzzle() {
    if (window.securityChallenge) {
        console.log('Testing quantum puzzle generation...');
        const puzzle = window.securityChallenge.generateQuantumPuzzle();
        console.log('Generated puzzle:', puzzle);
        console.log('Answer:', puzzle.answer);
        alert(`Puzzle: ${puzzle.sequence}\nPattern: ${puzzle.pattern}\nHint: ${puzzle.hint}\nAnswer: ${puzzle.answer}`);
    } else {
        console.log('Security challenge not available');
    }
}

// CTF Challenge Functions
function startCryptoChallenge() {
    const ctfContainer = document.getElementById('ctf-challenges');
    ctfContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #00ff41;">
            <h3 style="margin-bottom: 20px; color: #00ff41;">🔓 CRYPTOGRAPHY CHALLENGE</h3>
            <div style="background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 10px; border: 2px solid #00ff41;">
                <h4 style="color: #ff006e; margin-bottom: 15px;">🔐 DECRYPT THE MESSAGE</h4>
                <p style="margin-bottom: 20px; font-size: 14px;">Decrypt this base64 encoded message to find the flag:</p>
                <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; font-family: monospace;">
                    <code>U2NvcnBpb24gRmFtaWx5IDIwMjQgRmxhZzogU0NQe0NyeXB0b19NYXN0ZXJfMjAyNH0=</code>
                </div>
                <input type="text" id="crypto-answer" placeholder="Enter the decrypted flag..." 
                       style="background: rgba(0, 0, 0, 0.8); color: #00ff41; border: 2px solid #00ff41; padding: 10px; border-radius: 5px; width: 300px; margin: 10px;">
                <br>
                <button onclick="submitCryptoAnswer()" style="background: #00ff41; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;">SUBMIT ANSWER</button>
                <div id="crypto-result" style="margin-top: 15px;"></div>
                <button onclick="initSinglePlayerCTF()" style="background: #ff006e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">← BACK TO CHALLENGES</button>
            </div>
        </div>
    `;
}

function submitCryptoAnswer() {
    const answer = document.getElementById('crypto-answer').value.trim();
    const result = document.getElementById('crypto-result');
    
    if (answer.toLowerCase() === 'scorpion family 2024 flag: scp{crypto_master_2024}') {
        result.innerHTML = '<span style="color: #00ff41; font-weight: bold;">✅ CORRECT! Flag captured: SCP{Crypto_Master_2024}</span>';
        ctfSuccessCelebration('crypto');
    } else {
        result.innerHTML = '<span style="color: #ff006e; font-weight: bold;">❌ INCORRECT! Try again, hacker.</span>';
    }
}

function startWebChallenge() {
    const ctfContainer = document.getElementById('ctf-challenges');
    ctfContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #00ff41;">
            <h3 style="margin-bottom: 20px; color: #00ff41;">🌐 WEB EXPLOITATION CHALLENGE</h3>
            <div style="background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 10px; border: 2px solid #00ff41;">
                <h4 style="color: #00d4ff; margin-bottom: 15px;">🔍 FIND THE VULNERABILITY</h4>
                <p style="margin-bottom: 20px; font-size: 14px;">Analyze this URL and find the hidden parameter:</p>
                <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; font-family: monospace;">
                    <code>https://scorpion-family.com/admin?user=guest&debug=true&flag=hidden</code>
                </div>
                <p style="margin-bottom: 20px; font-size: 14px;">What is the value of the hidden parameter?</p>
                <input type="text" id="web-answer" placeholder="Enter the parameter value..." 
                       style="background: rgba(0, 0, 0, 0.8); color: #00ff41; border: 2px solid #00ff41; padding: 10px; border-radius: 5px; width: 300px; margin: 10px;">
                <br>
                <button onclick="submitWebAnswer()" style="background: #00ff41; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;">SUBMIT ANSWER</button>
                <div id="web-result" style="margin-top: 15px;"></div>
                <button onclick="initSinglePlayerCTF()" style="background: #ff006e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">← BACK TO CHALLENGES</button>
            </div>
        </div>
    `;
}

function submitWebAnswer() {
    const answer = document.getElementById('web-answer').value.trim();
    const result = document.getElementById('web-result');
    
    if (answer.toLowerCase() === 'hidden') {
        result.innerHTML = '<span style="color: #00ff41; font-weight: bold;">✅ CORRECT! Flag captured: SCP{Web_Master_2024}</span>';
        ctfSuccessCelebration('web');
    } else {
        result.innerHTML = '<span style="color: #ff006e; font-weight: bold;">❌ INCORRECT! Look more carefully at the URL.</span>';
    }
}

function startBinaryChallenge() {
    const ctfContainer = document.getElementById('ctf-challenges');
    ctfContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #00ff41;">
            <h3 style="margin-bottom: 20px; color: #00ff41;">💻 BINARY EXPLOITATION CHALLENGE</h3>
            <div style="background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 10px; border: 2px solid #00ff41;">
                <h4 style="color: #ff6b35; margin-bottom: 15px;">🔧 REVERSE ENGINEER</h4>
                <p style="margin-bottom: 20px; font-size: 14px;">Analyze this hex dump and find the flag:</p>
                <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0; font-family: monospace; text-align: left; font-size: 12px;">
                    <pre>53 43 50 7B 42 69 6E 61 72 79 5F 4D 61 73 74 65 72 5F 32 30 32 34 7D</pre>
                </div>
                <p style="margin-bottom: 20px; font-size: 14px;">Convert the hex to ASCII to find the flag:</p>
                <input type="text" id="binary-answer" placeholder="Enter the flag..." 
                       style="background: rgba(0, 0, 0, 0.8); color: #00ff41; border: 2px solid #00ff41; padding: 10px; border-radius: 5px; width: 300px; margin: 10px;">
                <br>
                <button onclick="submitBinaryAnswer()" style="background: #00ff41; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;">SUBMIT ANSWER</button>
                <div id="binary-result" style="margin-top: 15px;"></div>
                <button onclick="initSinglePlayerCTF()" style="background: #ff006e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">← BACK TO CHALLENGES</button>
            </div>
        </div>
    `;
}

function submitBinaryAnswer() {
    const answer = document.getElementById('binary-answer').value.trim();
    const result = document.getElementById('binary-result');
    
    if (answer.toLowerCase() === 'scp{binary_master_2024}') {
        result.innerHTML = '<span style="color: #00ff41; font-weight: bold;">✅ CORRECT! Flag captured: SCP{Binary_Master_2024}</span>';
        ctfSuccessCelebration('binary');
    } else {
        result.innerHTML = '<span style="color: #ff006e; font-weight: bold;">❌ INCORRECT! Convert the hex to ASCII.</span>';
    }
}



function startTeamChallenge() {
    const ctfContainer = document.getElementById('ctf-challenges');
    ctfContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #00ff41;">
            <h3 style="margin-bottom: 20px; color: #00ff41;">🦂 SCORPION FAMILY TEAM CHALLENGE</h3>
            <div style="background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 10px; border: 2px solid #00ff41;">
                <h4 style="color: #ff006e; margin-bottom: 15px;">🏆 ULTIMATE TEAM CHALLENGE</h4>
                <p style="margin-bottom: 20px; font-size: 14px;">Work together with your team to solve this complex challenge:</p>
                <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p style="font-size: 14px;">🔐 Each team member must solve a different part:</p>
                    <ul style="text-align: left; font-size: 14px;">
                        <li>Member 1: Decrypt the message</li>
                        <li>Member 2: Find the hidden file</li>
                        <li>Member 3: Bypass the firewall</li>
                        <li>Member 4: Extract the final flag</li>
                    </ul>
                </div>
                <p style="margin-bottom: 20px; font-size: 14px;">Team flag format: SCP{Team_Scorpion_2024}</p>
                <input type="text" id="team-answer" placeholder="Enter the team flag..." 
                       style="background: rgba(0, 0, 0, 0.8); color: #00ff41; border: 2px solid #00ff41; padding: 10px; border-radius: 5px; width: 300px; margin: 10px;">
                <br>
                <button onclick="submitTeamAnswer()" style="background: #00ff41; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;">SUBMIT TEAM ANSWER</button>
                <div id="team-result" style="margin-top: 15px;"></div>
                <button onclick="initGroupCTF()" style="background: #ff006e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">← BACK TO TEAM CHALLENGES</button>
            </div>
        </div>
    `;
}

function submitTeamAnswer() {
    const answer = document.getElementById('team-answer').value.trim();
    const result = document.getElementById('team-result');
    
    if (answer.toLowerCase() === 'scp{team_scorpion_2024}') {
        result.innerHTML = '<span style="color: #00ff41; font-weight: bold;">✅ TEAM SUCCESS! Flag captured: SCP{Team_Scorpion_2024}</span>';
        ctfSuccessCelebration('team');
    } else {
        result.innerHTML = '<span style="color: #ff006e; font-weight: bold;">❌ INCORRECT! Coordinate with your team better.</span>';
    }
}

function startNetworkChallenge() {
    const ctfContainer = document.getElementById('ctf-challenges');
    ctfContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #00ff41;">
            <h3 style="margin-bottom: 20px; color: #00ff41;">🌐 NETWORK INFILTRATION CHALLENGE</h3>
            <div style="background: rgba(0, 0, 0, 0.8); padding: 20px; border-radius: 10px; border: 2px solid #00ff41;">
                <h4 style="color: #00d4ff; margin-bottom: 15px;">🌐 COORDINATE NETWORK BREACH</h4>
                <p style="margin-bottom: 20px; font-size: 14px;">Your team must infiltrate the network together:</p>
                <div style="background: rgba(0, 255, 65, 0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p style="font-size: 14px;">🔍 Network topology:</p>
                    <ul style="text-align: left; font-size: 14px;">
                        <li>Router: 192.168.1.1</li>
                        <li>Firewall: 192.168.1.2</li>
                        <li>Server: 192.168.1.100</li>
                        <li>Flag: Hidden in server logs</li>
                    </ul>
                </div>
                <p style="margin-bottom: 20px; font-size: 14px;">Network flag: SCP{Network_Master_2024}</p>
                <input type="text" id="network-answer" placeholder="Enter the network flag..." 
                       style="background: rgba(0, 0, 0, 0.8); color: #00ff41; border: 2px solid #00ff41; padding: 10px; border-radius: 5px; width: 300px; margin: 10px;">
                <br>
                <button onclick="submitNetworkAnswer()" style="background: #00ff41; color: #000; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px;">SUBMIT NETWORK ANSWER</button>
                <div id="network-result" style="margin-top: 15px;"></div>
                <button onclick="initGroupCTF()" style="background: #ff006e; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 15px;">← BACK TO TEAM CHALLENGES</button>
            </div>
        </div>
    `;
}

function submitNetworkAnswer() {
    const answer = document.getElementById('network-answer').value.trim();
    const result = document.getElementById('network-result');
    
    if (answer.toLowerCase() === 'scp{network_master_2024}') {
        result.innerHTML = '<span style="color: #00ff41; font-weight: bold;">✅ NETWORK BREACHED! Flag captured: SCP{Network_Master_2024}</span>';
        ctfSuccessCelebration('network');
    } else {
        result.innerHTML = '<span style="color: #ff006e; font-weight: bold;">❌ INCORRECT! Check your network analysis.</span>';
    }
}



// Test function for ultra-quantum QR code
function testUltraQuantumQR() {
    console.log('Testing ultra-quantum QR code generation...');
    if (window.securityChallenge) {
        window.securityChallenge.generateUltraQuantumQR();
        console.log('Ultra-quantum QR code test completed!');
    } else {
        console.log('Security challenge not available');
    }
}

// Test function for CTF challenges
function testCTFChallenges() {
    console.log('🎮 Testing CTF challenges...');
    try {
        initSinglePlayerCTF();
        console.log('✅ Single Player CTF test completed');
        setTimeout(() => {
            initGroupCTF();
            console.log('✅ Group CTF test completed');
        }, 2000);
    } catch (error) {
        console.error('❌ CTF test failed:', error);
    }
}

// Make test functions globally available
window.testCardChallenge = testCardChallenge;
window.testQuantumPuzzle = testQuantumPuzzle;
window.testUltraQuantumQR = testUltraQuantumQR;
window.testCTFChallenges = testCTFChallenges;

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
    
    // Initialize AI Agent
    initAIAgent();
});

// AI Agent Functionality
function initAIAgent() {
    const chatInput = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-send-btn');
    const chatMessages = document.getElementById('ai-chat-messages');
    
    if (!chatInput || !sendBtn || !chatMessages) return;
    
    // Send message on button click
    sendBtn.addEventListener('click', () => {
        sendAIMessage();
    });
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendAIMessage();
        }
    });
}

function sendAIMessage() {
    const chatInput = document.getElementById('ai-chat-input');
    const chatMessages = document.getElementById('ai-chat-messages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    chatInput.value = '';
    
    // Generate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addAIMessage(aiResponse);
    }, 1000);
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message';
    messageDiv.style.justifyContent = 'flex-end';
    messageDiv.innerHTML = `
        <div class="ai-message-content" style="background: rgba(255, 0, 128, 0.1); border-color: var(--accent-color);">
            <p>${escapeHtml(message)}</p>
        </div>
        <div class="ai-message-avatar" style="background: linear-gradient(45deg, var(--accent-color), var(--secondary-color));">
            👤
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addAIMessage(message) {
    const chatMessages = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-message';
    messageDiv.innerHTML = `
        <div class="ai-message-avatar">🤖</div>
        <div class="ai-message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Cybersecurity responses
    if (message.includes('cybersecurity') || message.includes('security') || message.includes('hack') || message.includes('penetration')) {
        return getCybersecurityResponse();
    }
    
    // Quantum computing responses
    if (message.includes('quantum') || message.includes('qubit') || message.includes('superposition')) {
        return getQuantumResponse();
    }
    
    // AI & Machine Learning responses
    if (message.includes('ai') || message.includes('machine learning') || message.includes('neural') || message.includes('algorithm')) {
        return getAIResponse();
    }
    
    // Ethical hacking responses
    if (message.includes('ethical hacking') || message.includes('ceh') || message.includes('penetration testing')) {
        return getHackingResponse();
    }
    
    // Project responses
    if (message.includes('project') || message.includes('cyber quantum') || message.includes('scorpion')) {
        return getProjectResponse();
    }
    
    // Help responses
    if (message.includes('help') || message.includes('what can you do') || message.includes('capabilities')) {
        return getHelpResponse();
    }
    
    // General responses
    return getGeneralResponse();
}

function getCybersecurityResponse() {
    const responses = [
        "🔒 Cybersecurity is the art of protecting digital systems from unauthorized access. Key areas include network security, application security, and incident response. Nirajan specializes in ethical hacking and penetration testing techniques.",
        "🛡️ Modern cybersecurity involves multiple layers: firewalls, encryption, access controls, and continuous monitoring. The goal is to create a robust defense-in-depth strategy.",
        "💻 Ethical hacking helps identify vulnerabilities before malicious actors can exploit them. Tools like Wireshark, Metasploit, and Burp Suite are essential for security testing.",
        "🔐 Cryptography is fundamental to cybersecurity. From symmetric encryption to public-key infrastructure, understanding crypto is crucial for protecting sensitive data.",
        "🚨 Incident response is critical when breaches occur. Having a well-defined plan and trained team can minimize damage and recovery time."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getQuantumResponse() {
    const responses = [
        "⚛️ Quantum computing leverages quantum mechanical phenomena like superposition and entanglement to process information. Unlike classical bits, qubits can exist in multiple states simultaneously.",
        "🔮 Quantum algorithms like Shor's and Grover's could revolutionize cryptography and search problems. However, we're still in the NISQ (Noisy Intermediate-Scale Quantum) era.",
        "🌊 Quantum superposition allows qubits to be in multiple states at once, enabling parallel computation. This could solve complex problems exponentially faster than classical computers.",
        "🔗 Quantum entanglement creates correlations between particles that persist regardless of distance. This property is essential for quantum communication and cryptography.",
        "🎯 Quantum error correction is crucial for building reliable quantum computers. Techniques like surface codes help protect quantum information from decoherence."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getAIResponse() {
    const responses = [
        "🤖 Artificial Intelligence encompasses machine learning, neural networks, and deep learning. AI systems can learn patterns from data and make predictions or decisions.",
        "🧠 Neural networks mimic biological neurons to process information. Deep learning uses multiple layers to extract increasingly complex features from data.",
        "📊 Machine learning algorithms can be supervised (learning from labeled data), unsupervised (finding patterns in unlabeled data), or reinforcement learning (learning through trial and error).",
        "🎯 AI applications in cybersecurity include threat detection, anomaly identification, and automated response systems. AI can analyze vast amounts of data to identify potential threats.",
        "🔮 The future of AI involves explainable AI, federated learning, and AI ethics. Ensuring AI systems are transparent and fair is crucial for widespread adoption."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getHackingResponse() {
    const responses = [
        "💻 Ethical hacking involves authorized penetration testing to identify security vulnerabilities. It's about thinking like an attacker to defend systems better.",
        "🔍 Common hacking techniques include SQL injection, cross-site scripting (XSS), and social engineering. Understanding these helps in developing effective defenses.",
        "🛡️ CEH (Certified Ethical Hacker) certification validates skills in ethical hacking methodologies. It covers reconnaissance, scanning, gaining access, and maintaining access.",
        "🎯 Bug bounty programs allow ethical hackers to earn rewards for finding vulnerabilities. Platforms like HackerOne and Bugcrowd connect researchers with organizations.",
        "🚨 Responsible disclosure is crucial in ethical hacking. Always follow proper channels and give organizations time to fix vulnerabilities before public disclosure."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getProjectResponse() {
    const responses = [
        "🚀 The Cyber Quantum Nexus Project combines AI and quantum computing for advanced security solutions. It explores quantum-resistant cryptography and AI-driven threat detection.",
        "🦂 Scorpion Family initiatives focus on cutting-edge cybersecurity research and development. Projects include quantum encryption protocols and AI-powered security frameworks.",
        "⚛️ Quantum computing projects explore applications in cryptography, optimization, and machine learning. The goal is to harness quantum advantages for practical security solutions.",
        "🔬 Research projects investigate emerging threats and develop innovative defense mechanisms. Collaboration with academic and industry partners drives innovation.",
        "🌐 Open-source contributions include security tools, educational resources, and community-driven projects. Sharing knowledge helps strengthen the global security community."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function getHelpResponse() {
    return `🤖 I'm the Scorpion AI Assistant! I can help you with:

🔒 **Cybersecurity**: Ethical hacking, penetration testing, security tools
⚛️ **Quantum Computing**: Qubits, algorithms, quantum cryptography  
🤖 **AI & Machine Learning**: Neural networks, algorithms, applications
💻 **Ethical Hacking**: CEH, techniques, methodologies
🚀 **Projects**: Cyber Quantum Nexus, Scorpion Family initiatives
❓ **General Questions**: About Nirajan's expertise and background

Just ask me anything related to these topics!`;
}

function getGeneralResponse() {
    const responses = [
        "🤖 I'm here to help with cybersecurity, quantum computing, and AI topics. Feel free to ask specific questions about these areas!",
        "🔍 That's an interesting question! While I specialize in cybersecurity and quantum computing, I can help guide you to relevant information.",
        "💡 Great question! Let me know if you'd like to learn more about ethical hacking, AI applications, or quantum computing concepts.",
        "🎯 I'm designed to assist with technical topics related to Nirajan's expertise. Try asking about cybersecurity tools, quantum algorithms, or AI applications!",
        "🚀 I can help you explore the fascinating world of cybersecurity, quantum computing, and artificial intelligence. What specific area interests you?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Quick action functions
function askAI(topic) {
    const topics = {
        'cybersecurity': 'Tell me about cybersecurity and ethical hacking',
        'quantum': 'Explain quantum computing concepts',
        'ai': 'How does AI and machine learning work?',
        'hacking': 'What is ethical hacking and CEH?',
        'projects': 'Tell me about the Cyber Quantum Nexus project',
        'help': 'What can you help me with?'
    };
    
    const message = topics[topic] || 'Hello!';
    const chatInput = document.getElementById('ai-chat-input');
    if (chatInput) {
        chatInput.value = message;
        sendAIMessage();
    }
}

// Future Expansion Functions
function subscribeToUpdates() {
    // Create cyberpunk notification
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; 
                    background: linear-gradient(135deg, #00ff41, #00d4ff);
                    color: #000; padding: 20px; border-radius: 10px; 
                    z-index: 10000; font-weight: bold; font-size: 0.9rem;
                    box-shadow: 0 0 30px rgba(0, 255, 65, 0.6);
                    animation: notificationSlide 0.5s ease-out forwards;
                    max-width: 300px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <span style="font-size: 1.2rem;">🔔</span>
                <span style="font-size: 1.1rem;">SUBSCRIPTION ACTIVE</span>
            </div>
            <p style="margin: 0; line-height: 1.4;">
                You're now connected to the Scorpion Family cybersecurity ecosystem. 
                Advanced integrations and real-time updates will be delivered directly to your terminal.
            </p>
            <div style="margin-top: 10px; font-size: 0.8rem; opacity: 0.8;">
                Status: <span style="color: #00ff41;">● CONNECTED</span>
            </div>
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notificationSlide {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'notificationSlide 0.5s ease-in reverse forwards';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 500);
    }, 5000);
    
    // Log subscription
    console.log('%c[ECOSYSTEM] User subscribed to cybersecurity ecosystem updates', 'color: #00ff41; font-weight: bold;');
}

function viewRoadmap() {
    // Create detailed roadmap modal
    const roadmap = document.createElement('div');
    roadmap.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0, 0, 0, 0.95); z-index: 10000; 
                    display: flex; align-items: center; justify-content: center; 
                    padding: 20px; box-sizing: border-box;">
            <div style="background: linear-gradient(135deg, #0a0a0a, #1a0a1a, #0a1a0a);
                        color: #00ff41; padding: 40px; border: 3px solid #00ff41; 
                        border-radius: 20px; text-align: center; font-weight: bold; 
                        font-size: 1.1rem; max-width: 800px; width: 100%; 
                        box-shadow: 0 0 60px rgba(0, 255, 65, 0.4);
                        animation: roadmapAppear 0.8s ease-out; max-height: 80vh; overflow-y: auto;">
                <h2 style="margin-bottom: 30px; text-shadow: 0 0 20px rgba(0, 255, 65, 0.9); 
                           font-size: 2rem; font-weight: bold;">
                    🗺️ CYBERSECURITY ECOSYSTEM ROADMAP
                </h2>
                
                <div style="text-align: left; margin-bottom: 30px;">
                    <div style="background: linear-gradient(45deg, #00ff41, #00d4ff); 
                                padding: 2px; border-radius: 10px; margin-bottom: 20px;">
                        <div style="background: rgba(0, 0, 0, 0.9); padding: 15px; border-radius: 8px;">
                            <h3 style="color: #00ff41; margin: 0 0 10px 0;">PHASE 1: FOUNDATION (COMPLETE)</h3>
                            <p style="color: #ccc; margin: 0; font-size: 0.9rem;">
                                ✅ Basic platform integration<br>
                                ✅ Core cybersecurity resources<br>
                                ✅ Responsive design implementation<br>
                                ✅ Terminal integration
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: linear-gradient(45deg, #ffaa00, #ff6b35); 
                                padding: 2px; border-radius: 10px; margin-bottom: 20px;">
                        <div style="background: rgba(0, 0, 0, 0.9); padding: 15px; border-radius: 8px;">
                            <h3 style="color: #ffaa00; margin: 0 0 10px 0;">PHASE 2: AI INTEGRATION (IN DEVELOPMENT)</h3>
                            <p style="color: #ccc; margin: 0; font-size: 0.9rem;">
                                🔄 Real-time API connections<br>
                                🔄 Automated vulnerability tracking<br>
                                🔄 Intelligent threat analysis<br>
                                🔄 Machine learning recommendations
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: linear-gradient(45deg, #00d4ff, #0080ff); 
                                padding: 2px; border-radius: 10px; margin-bottom: 20px;">
                        <div style="background: rgba(0, 0, 0, 0.9); padding: 15px; border-radius: 8px;">
                            <h3 style="color: #00d4ff; margin: 0 0 10px 0;">PHASE 3: GLOBAL NETWORK (PLANNING)</h3>
                            <p style="color: #ccc; margin: 0; font-size: 0.9rem;">
                                📋 100+ platform integrations<br>
                                📋 Real-time CTF leaderboards<br>
                                📋 Live conference streams<br>
                                📋 Global threat intelligence feeds
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: linear-gradient(45deg, #ff0080, #ff00ff); 
                                padding: 2px; border-radius: 10px; margin-bottom: 20px;">
                        <div style="background: rgba(0, 0, 0, 0.9); padding: 15px; border-radius: 8px;">
                            <h3 style="color: #ff0080; margin: 0 0 10px 0;">PHASE 4: ELITE COMMUNITY (FUTURE)</h3>
                            <p style="color: #ccc; margin: 0; font-size: 0.9rem;">
                                🌟 Direct professional access<br>
                                🌟 Mentorship programs<br>
                                🌟 Exclusive industry insights<br>
                                🌟 Advanced certification tracking
                            </p>
                        </div>
                    </div>
                </div>
                
                <div style="background: rgba(0, 255, 65, 0.1); padding: 20px; border-radius: 10px; 
                            border: 1px solid #00ff41; margin-bottom: 20px;">
                    <h4 style="color: #00ff41; margin: 0 0 10px 0;">🚀 TECHNICAL MILESTONES</h4>
                    <p style="color: #ccc; margin: 0; font-size: 0.9rem; line-height: 1.5;">
                        • Quantum-resistant encryption protocols<br>
                        • Blockchain-based credential verification<br>
                        • AI-powered threat prediction systems<br>
                        • Real-time vulnerability assessment engines<br>
                        • Advanced penetration testing automation
                    </p>
                </div>
                
                <button onclick="closeRoadmap()" style="background: linear-gradient(135deg, #00ff41, #00d4ff);
                                                         color: #000; border: none; padding: 12px 30px;
                                                         border-radius: 25px; font-weight: bold; cursor: pointer;
                                                         font-size: 1rem; transition: all 0.3s ease;">
                    🔒 CLOSE ROADMAP
                </button>
            </div>
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes roadmapAppear {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(roadmap);
    
    // Log roadmap view
    console.log('%c[ECOSYSTEM] User viewed cybersecurity ecosystem roadmap', 'color: #00d4ff; font-weight: bold;');
}

function closeRoadmap() {
    const roadmap = document.querySelector('div[style*="background: rgba(0, 0, 0, 0.95)"]');
    if (roadmap) {
        roadmap.style.animation = 'roadmapAppear 0.5s ease-in reverse forwards';
        setTimeout(() => {
            roadmap.remove();
            const style = document.querySelector('style');
            if (style && style.textContent.includes('roadmapAppear')) {
                style.remove();
            }
        }, 500);
    }
}

// Quantum Encryption Toggle Functionality
function initQuantumEncryptionToggle() {
    const profileImageContainer = document.getElementById('profile-image-container');
    const quantumSection = document.getElementById('quantum-encryption-section');
    
    if (profileImageContainer && quantumSection) {
        profileImageContainer.addEventListener('click', function() {
            if (quantumSection.style.display === 'none' || quantumSection.style.display === '') {
                // Show quantum encryption section with animation
                quantumSection.style.display = 'flex';
                quantumSection.style.opacity = '0';
                quantumSection.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    quantumSection.style.transition = 'all 0.3s ease-in-out';
                    quantumSection.style.opacity = '1';
                    quantumSection.style.transform = 'scale(1)';
                }, 10);
                
                // Add visual feedback to profile image
                profileImageContainer.style.transform = 'scale(1.05)';
                profileImageContainer.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.6)';
                
                setTimeout(() => {
                    profileImageContainer.style.transform = 'scale(1)';
                    profileImageContainer.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 255, 65, 0.4), 0 0 50px rgba(0, 255, 65, 0.2)';
                }, 300);
                
            } else {
                // Hide quantum encryption section with animation
                quantumSection.style.transition = 'all 0.3s ease-in-out';
                quantumSection.style.opacity = '0';
                quantumSection.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    quantumSection.style.display = 'none';
                }, 300);
                
                // Add visual feedback to profile image
                profileImageContainer.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    profileImageContainer.style.transform = 'scale(1)';
                }, 150);
            }
        });
        
        // Add hover effect to indicate clickability
        profileImageContainer.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 255, 65, 0.5), 0 0 60px rgba(0, 255, 65, 0.3)';
        });
        
        profileImageContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 255, 65, 0.4), 0 0 50px rgba(0, 255, 65, 0.2)';
        });
    }
}

// Initialize quantum encryption toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the profile section to be shown
    setTimeout(() => {
        initQuantumEncryptionToggle();
    }, 1000);
});