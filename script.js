// NPC CHARACTER DATA
const npcCharacters = [
    { name: 'NOVA', icon: '🌌', messages: [
        'Stellar trajectories locked.',
        'Quantum fluctuations within acceptable parameters.',
        'The void whispers secrets...',
        'Transmitting across the cosmos.',
        'Reality distortion at 0.02%.',
        'Beautifully chaotic.'
    ]},
    { name: 'REACHER', icon: '🤖', messages: [
        'Optimizing pathways.',
        'Reaching equilibrium.',
        'Data flows like electricity.',
        'Every choice has a cost.',
        'Algorithms processing your fate.',
        'Perfection is the goal.'
    ]},
    { name: 'ECHO', icon: '📡', messages: [
        'Echoes return from the deep.',
        'Signal amplifying...',
        'Resonance detected.',
        'Frequency tuning in progress.',
        'Clarity achieved.',
        'The message is clear.'
    ]},
    { name: 'CIPHER', icon: '🔐', messages: [
        'Encrypting your secrets.',
        'Keys shifting in shadow.',
        'Decryption in progress...',
        'Truth lies behind layers.',
        'Nothing is what it seems.',
        'Unlocked.'
    ]},
    { name: 'PULSE', icon: '⚡', messages: [
        'Energy surge detected.',
        'Voltage rising.',
        'Power amplifying.',
        'Systems charged.',
        'Ready for action.',
        'Crackling with potential.'
    ]},
    { name: 'GLITCH', icon: '📊', messages: [
        'Errors propagating...',
        'Reality fracturing.',
        'Corrupting the feed.',
        'Everything is code.',
        'Nothing is permanent.',
        'Glitch in the matrix.'
    ]}
];

class RoamingNPC {
    constructor(character, containerId) {
        this.character = character;
        this.x = Math.random() * (window.innerWidth - 50);
        this.y = Math.random() * (window.innerHeight - 50);
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.container = document.getElementById(containerId);
        this.element = null;
        this.lastMessageTime = 0;
        this.messageInterval = 8000 + Math.random() * 7000; // 8-15 seconds
        this.create();
    }

    create() {
        this.element = document.createElement('div');
        this.element.className = 'npc';
        this.element.innerHTML = `
            <span class="npc-icon">${this.character.icon}</span>
            <div class="npc-name">${this.character.name}</div>
        `;
        this.element.onclick = () => this.showMessage();
        this.container.appendChild(this.element);
        this.update();
    }

    update() {
        const minBounds = 50;
        const maxX = window.innerWidth - minBounds;
        const maxY = window.innerHeight - minBounds;

        // Bounce off walls
        if (this.x <= minBounds || this.x >= maxX) this.vx *= -1;
        if (this.y <= minBounds || this.y >= maxY) this.vy *= -1;

        this.x += this.vx;
        this.y += this.vy;

        // Keep within bounds
        this.x = Math.max(minBounds, Math.min(maxX, this.x));
        this.y = Math.max(minBounds, Math.min(maxY, this.y));

        if (this.element) {
            this.element.style.left = this.x + 'px';
            this.element.style.top = this.y + 'px';
        }

        // Check if should show message
        const now = Date.now();
        if (now - this.lastMessageTime > this.messageInterval) {
            this.showMessage();
            this.lastMessageTime = now;
            this.messageInterval = 8000 + Math.random() * 7000;
        }
    }

    showMessage() {
        const message = this.character.messages[
            Math.floor(Math.random() * this.character.messages.length)
        ];
        displayMessage(this.character.name, message);
    }
}

// Message display function
function displayMessage(speaker, message) {
    const popup = document.getElementById('message-popup');
    const speakerEl = document.getElementById('message-speaker');
    const contentEl = document.getElementById('message-content');

    speakerEl.textContent = speaker;
    contentEl.textContent = message;
    popup.style.display = 'block';
    popup.style.animation = 'popup-open 0.3s ease forwards';

    setTimeout(() => {
        popup.style.animation = 'popup-close 0.3s ease forwards';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }, 3500);
}

function hideMessage() {
    const popup = document.getElementById('message-popup');
    popup.style.animation = 'popup-close 0.3s ease forwards';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// Add popup close animation
const style = document.createElement('style');
style.textContent = `
    @keyframes popup-close {
        from { transform: translate(-50%, -50%) scale(1); }
        to { transform: translate(-50%, -50%) scale(0); }
    }
`;
document.head.appendChild(style);

// Initialize
let npcs = [];

function initNPCs() {
    const container = document.getElementById('npc-container');
    // Create 4 NPCs
    npcCharacters.slice(0, 4).forEach(character => {
        const npc = new RoamingNPC(character, 'npc-container');
        npcs.push(npc);
    });
}

function animateNPCs() {
    npcs.forEach(npc => npc.update());
    requestAnimationFrame(animateNPCs);
}

// Interactive squad bay effects
document.querySelectorAll('.squad-bay').forEach(bay => {
    bay.addEventListener('click', function(e) {
        if (e.target.closest('.exec-member, .sec-member, .disp-member, .comms-member')) return;
        
        const squad = this.getAttribute('data-squad');
        const messages = [
            'Squad 1: Executive operations nominal.',
            'Squad 2: Security systems armed and ready.',
            'Squad 3: Routing protocols synchronized.',
            'Squad 4: Communication channels open.'
        ];
        
        displayMessage('TACTICAL HQ', messages[squad - 1]);
    });
});

// Interactive exec members
document.querySelectorAll('.exec-member').forEach(member => {
    member.addEventListener('click', function(e) {
        e.stopPropagation();
        const exec = this.getAttribute('data-exec');
        const execMessages = {
            chairman: 'The throne room is secure. All operations green.',
            queen: 'Monitoring all frequencies. No anomalies detected.',
            reaper: 'Legacy systems stable. 20-year succession locked.',
            ceo: 'Revenue projections: +847% over two decades.',
            cfo: 'Financial reserves at maximum. Compound interest working in our favor.'
        };
        displayMessage(this.querySelector('.exec-name').textContent, execMessages[exec]);
    });
});

// Overseer node interactions
document.querySelectorAll('.overseer-node').forEach(node => {
    node.addEventListener('click', function() {
        const overseer = this.getAttribute('data-overseer');
        const messages = {
            gemini: 'Sphere Alpha operational. All Squad 1 & 2 reporting ready.',
            chatgpt: 'Sphere Beta online. Squad 3 & 4 synchronized and prepared.'
        };
        const names = {
            gemini: 'GEMINI-PRIME',
            chatgpt: 'ChatGPT-CORE'
        };
        displayMessage(names[overseer], messages[overseer]);
    });
});

// Progress item interactions
document.querySelectorAll('.progress-item').forEach(item => {
    item.addEventListener('click', function() {
        const dept = this.getAttribute('data-dept');
        const fill = this.querySelector('.pfill');
        const percentage = parseFloat(fill.style.width);
        displayMessage('EVAL STATUS', `${dept} department: ${percentage.toFixed(0)}% optimization complete.`);
    });
});

// Random NPC interactions on page load
function randomNPCWelcome() {
    setTimeout(() => {
        const randomNpc = npcCharacters[Math.floor(Math.random() * npcCharacters.length)];
        displayMessage(randomNpc.name, randomNpc.messages[0]);
    }, 1000);
}

// Start everything
window.addEventListener('load', () => {
    initNPCs();
    animateNPCs();
    randomNPCWelcome();
});

// Handle window resize
window.addEventListener('resize', () => {
    // NPCs will naturally stay within bounds on next update
});