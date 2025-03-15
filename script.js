// Game configuration
const BOARD_WIDTH = 4;
const BOARD_HEIGHT = 5;
const CELL_SIZE_PERCENT = 25; // Each cell takes 25% of the board width

// Block types without Chinese characters
const BLOCK_TYPES = {
    CAOCAO: { name: 'Cao Cao', className: 'caocao' },
    GENERAL: { name: 'General', className: 'general' },
    SOLDIER: { name: 'Soldier', className: 'soldier' },
    VERTICAL: { name: 'Zhang Fei', className: 'vertical' },
    HORIZONTAL: { name: 'Guan Yu', className: 'horizontal' }
};

// Preset levels with Chinese names
const LEVELS = [
    // Horizontal-Vertical
    [
        { type: BLOCK_TYPES.CAOCAO, x: 1, y: 0, width: 2, height: 2 },
        { type: BLOCK_TYPES.HORIZONTAL, x: 0, y: 2, width: 2, height: 1 },
        { type: BLOCK_TYPES.HORIZONTAL, x: 2, y: 2, width: 2, height: 1 },
        { type: BLOCK_TYPES.VERTICAL, x: 0, y: 0, width: 1, height: 2 },
        { type: BLOCK_TYPES.VERTICAL, x: 3, y: 0, width: 1, height: 2 },
        { type: BLOCK_TYPES.SOLDIER, x: 0, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 1, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 2, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 3, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 1, y: 4, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 2, y: 4, width: 1, height: 1 }
    ],
    // Command and Conquer
    [
        { type: BLOCK_TYPES.CAOCAO, x: 1, y: 0, width: 2, height: 2 },
        { type: BLOCK_TYPES.GENERAL, x: 0, y: 0, width: 1, height: 2 },
        { type: BLOCK_TYPES.GENERAL, x: 3, y: 0, width: 1, height: 2 },
        { type: BLOCK_TYPES.HORIZONTAL, x: 0, y: 2, width: 2, height: 1 },
        { type: BLOCK_TYPES.HORIZONTAL, x: 2, y: 2, width: 2, height: 1 },
        { type: BLOCK_TYPES.VERTICAL, x: 0, y: 3, width: 1, height: 2 },
        { type: BLOCK_TYPES.VERTICAL, x: 3, y: 3, width: 1, height: 2 },
        { type: BLOCK_TYPES.SOLDIER, x: 1, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 2, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 1, y: 4, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 2, y: 4, width: 1, height: 1 }
    ],
    // Surrounded Cao
    [
        { type: BLOCK_TYPES.CAOCAO, x: 1, y: 0, width: 2, height: 2 },
        { type: BLOCK_TYPES.GENERAL, x: 0, y: 0, width: 1, height: 2 },
        { type: BLOCK_TYPES.GENERAL, x: 3, y: 0, width: 1, height: 2 },
        { type: BLOCK_TYPES.GENERAL, x: 0, y: 2, width: 1, height: 2 },
        { type: BLOCK_TYPES.GENERAL, x: 3, y: 2, width: 1, height: 2 },
        { type: BLOCK_TYPES.HORIZONTAL, x: 1, y: 2, width: 2, height: 1 },
        { type: BLOCK_TYPES.HORIZONTAL, x: 1, y: 3, width: 2, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 1, y: 4, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 2, y: 4, width: 1, height: 1 }
    ],
    // Advancing Together
    [
        { type: BLOCK_TYPES.CAOCAO, x: 1, y: 0, width: 2, height: 2 },
        { type: BLOCK_TYPES.VERTICAL, x: 0, y: 0, width: 1, height: 2 },
        { type: BLOCK_TYPES.VERTICAL, x: 3, y: 0, width: 1, height: 2 },
        { type: BLOCK_TYPES.HORIZONTAL, x: 0, y: 2, width: 2, height: 1 },
        { type: BLOCK_TYPES.HORIZONTAL, x: 2, y: 2, width: 2, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 0, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 1, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 2, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 3, y: 3, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 0, y: 4, width: 1, height: 1 },
        { type: BLOCK_TYPES.SOLDIER, x: 3, y: 4, width: 1, height: 1 }
    ]
];

// 添加关卡描述
const LEVEL_DESCRIPTIONS = [
    "Heng Dao Li Ma: This formation represents the moment when Cao Cao's forces were blocked by cavalry and infantry.",
    "Zhi Hui Ruo Ding: Named after Cao Cao's strategic brilliance, this challenging formation tests your command skills.",
    "Jiang Yong Cao Ying: Depicts Cao Cao surrounded by enemy generals, a desperate situation requiring clever escape.",
    "Qi Tou Bing Jin: Represents the coordinated advance of enemy forces, closing in from all directions."
];

// Game state
let blocks = [];
let moveCount = 0;
let selectedBlock = null;
let startX, startY;
let blockStartX, blockStartY;
let currentLevel = 0;
let bestMoves = JSON.parse(localStorage.getItem('klotskiBestMoves')) || [0, 0, 0, 0];
const bestMovesElement = document.createElement('div');
bestMovesElement.className = 'best-moves';
bestMovesElement.textContent = 'Best: -';
document.querySelector('.game-info').appendChild(bestMovesElement);

// DOM elements
const gameBoard = document.getElementById('game-board');
const moveCountElement = document.getElementById('moveCount');
const resetBtn = document.getElementById('resetBtn');
const levelSelect = document.getElementById('levelSelect');

// 替换现有的音效代码
let audioContext;

// 初始化音频上下文
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) {
        console.log('Web Audio API not supported in this browser');
    }
}

// 播放移动音效
function playMoveSound() {
    if (!audioContext || !soundEnabled) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4音
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

// 播放胜利音效
function playVictorySound() {
    if (!audioContext || !soundEnabled) return;
    
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + i * 0.1 + 0.3);
        
        oscillator.start(audioContext.currentTime + i * 0.1);
        oscillator.stop(audioContext.currentTime + i * 0.1 + 0.3);
    });
}

// 初始化音频
document.addEventListener('click', function() {
    if (!audioContext) initAudio();
}, { once: true });

// 添加音效控制
const soundToggle = document.createElement('button');
soundToggle.innerHTML = '🔊';
soundToggle.className = 'sound-toggle';
soundToggle.title = 'Toggle Sound';
let soundEnabled = localStorage.getItem('klotskiSoundEnabled') !== 'false';
updateSoundButton();

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('klotskiSoundEnabled', soundEnabled);
    updateSoundButton();
});

function updateSoundButton() {
    soundToggle.innerHTML = soundEnabled ? '🔊' : '🔇';
}

document.querySelector('.game-info').appendChild(soundToggle);

// 添加关卡描述元素
const levelDescription = document.createElement('div');
levelDescription.className = 'level-description';
document.querySelector('.container').insertBefore(levelDescription, document.querySelector('.game-board'));

// Initialize game
function initGame() {
    // Clear game board
    gameBoard.innerHTML = '';
    blocks = [];
    moveCount = 0;
    moveCountElement.textContent = '0';
    
    // 显示当前关卡的最佳成绩
    if (bestMoves[currentLevel] > 0) {
        bestMovesElement.textContent = `Best: ${bestMoves[currentLevel]}`;
    } else {
        bestMovesElement.textContent = 'Best: -';
    }
    
    // Add exit marker
    const exit = document.createElement('div');
    exit.className = 'exit';
    gameBoard.appendChild(exit);
    
    // Load current level
    LEVELS[currentLevel].forEach(blockData => {
        createBlock(blockData);
    });
    
    updateLevelDescription();
}

// Create block
function createBlock(blockData) {
    const { type, x, y, width, height } = blockData;
    
    const block = document.createElement('div');
    block.className = `block ${type.className}`;
    block.style.width = `${width * CELL_SIZE_PERCENT}%`;
    block.style.height = `${height * 20}%`; // Since height is 5 cells, each cell is 20%
    block.style.left = `${x * CELL_SIZE_PERCENT}%`;
    block.style.top = `${y * 20}%`;
    block.textContent = type.name;
    
    // Add event listeners
    block.addEventListener('mousedown', onBlockMouseDown);
    block.addEventListener('touchstart', onBlockTouchStart, { passive: false });
    
    // Store block data
    const blockObj = {
        element: block,
        x, y, width, height,
        type
    };
    blocks.push(blockObj);
    gameBoard.appendChild(block);
}

// Mouse down event
function onBlockMouseDown(e) {
    e.preventDefault();
    const block = blocks.find(b => b.element === e.target);
    if (!block) return;
    
    selectedBlock = block;
    startX = e.clientX;
    startY = e.clientY;
    blockStartX = block.x;
    blockStartY = block.y;
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Touch start event
function onBlockTouchStart(e) {
    e.preventDefault();
    const block = blocks.find(b => b.element === e.target);
    if (!block) return;
    
    selectedBlock = block;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    blockStartX = block.x;
    blockStartY = block.y;
    
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
}

// Mouse move event
function onMouseMove(e) {
    if (!selectedBlock) return;
    moveBlock(e.clientX, e.clientY);
}

// Touch move event
function onTouchMove(e) {
    e.preventDefault();
    if (!selectedBlock) return;
    moveBlock(e.touches[0].clientX, e.touches[0].clientY);
}

// Move block
function moveBlock(clientX, clientY) {
    const boardRect = gameBoard.getBoundingClientRect();
    
    // Calculate movement distance (in cell units)
    const deltaXPercent = (clientX - startX) / boardRect.width * 100;
    const deltaYPercent = (clientY - startY) / boardRect.height * 100;
    
    const deltaX = Math.round(deltaXPercent / CELL_SIZE_PERCENT);
    const deltaY = Math.round(deltaYPercent / 20); // Since height is 5 cells, each cell is 20%
    
    // If no movement, return
    if (deltaX === 0 && deltaY === 0) return;
    
    // Determine movement direction (only allow horizontal or vertical, not diagonal)
    let newX = blockStartX;
    let newY = blockStartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal movement
        newX = blockStartX + deltaX;
    } else {
        // Vertical movement
        newY = blockStartY + deltaY;
    }
    
    // Boundary check
    newX = Math.max(0, Math.min(BOARD_WIDTH - selectedBlock.width, newX));
    newY = Math.max(0, Math.min(BOARD_HEIGHT - selectedBlock.height, newY));
    
    // Collision detection
    for (const block of blocks) {
        if (block === selectedBlock) continue;
        
        if (isColliding(
            newX, newY, selectedBlock.width, selectedBlock.height,
            block.x, block.y, block.width, block.height
        )) {
            // If collision occurs, revert to last valid position
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal movement collision, adjust X coordinate
                if (deltaX > 0) {
                    newX = Math.min(newX, block.x - selectedBlock.width);
                } else {
                    newX = Math.max(newX, block.x + block.width);
                }
            } else {
                // Vertical movement collision, adjust Y coordinate
                if (deltaY > 0) {
                    newY = Math.min(newY, block.y - selectedBlock.height);
                } else {
                    newY = Math.max(newY, block.y + block.height);
                }
            }
        }
    }
    
    // If position changed, update block position
    if (newX !== selectedBlock.x || newY !== selectedBlock.y) {
        updateBlockPosition(selectedBlock, newX, newY);
        
        // Increase move count
        moveCount++;
        moveCountElement.textContent = moveCount;
        
        // Check for win
        checkWin();
    }
}

// Update block position
function updateBlockPosition(block, newX, newY) {
    if (block.x !== newX || block.y !== newY) {
        if (soundEnabled) {
            if (audioContext) {
                playMoveSound();
            } else {
                initAudio();
                playMoveSound();
            }
        }
    }
    
    block.x = newX;
    block.y = newY;
    block.element.style.left = `${newX * CELL_SIZE_PERCENT}%`;
    block.element.style.top = `${newY * 20}%`;
}

// Collision detection
function isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

// Mouse up event
function onMouseUp() {
    selectedBlock = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

// Touch end event
function onTouchEnd() {
    selectedBlock = null;
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
}

// Check for win
function checkWin() {
    const caocao = blocks.find(block => block.type === BLOCK_TYPES.CAOCAO);
    if (caocao && caocao.x === 1 && caocao.y === 3) {
        showWinModal();
    }
}

// Show win modal without Chinese characters
function showWinModal() {
    if (soundEnabled) {
        if (audioContext) {
            playVictorySound();
        } else {
            initAudio();
            playVictorySound();
        }
    }
    
    // 更新最佳成绩
    if (bestMoves[currentLevel] === 0 || moveCount < bestMoves[currentLevel]) {
        bestMoves[currentLevel] = moveCount;
        localStorage.setItem('klotskiBestMoves', JSON.stringify(bestMoves));
    }
    
    const modal = document.createElement('div');
    modal.className = 'win-modal';
    
    const content = document.createElement('div');
    content.className = 'win-content';
    
    const title = document.createElement('h2');
    title.textContent = 'Victory!';
    
    const message = document.createElement('p');
    message.textContent = `You helped Cao Cao escape in ${moveCount} moves!`;
    
    // 添加最佳成绩信息
    const bestScoreMessage = document.createElement('p');
    if (moveCount === bestMoves[currentLevel]) {
        bestScoreMessage.textContent = `This is your best score!`;
        bestScoreMessage.className = 'best-score';
    } else {
        bestScoreMessage.textContent = `Your best score: ${bestMoves[currentLevel]} moves`;
    }
    
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next Level';
    nextBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        currentLevel = (currentLevel + 1) % LEVELS.length;
        levelSelect.value = currentLevel;
        initGame();
    });
    
    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(bestScoreMessage);
    content.appendChild(nextBtn);
    modal.appendChild(content);
    
    document.body.appendChild(modal);
}

// Event listeners
resetBtn.addEventListener('click', () => {
    initGame();
});

levelSelect.addEventListener('change', () => {
    currentLevel = parseInt(levelSelect.value);
    updateLevelDescription();
    initGame();
});

// 添加教程函数
function showTutorial() {
    const modal = document.createElement('div');
    modal.className = 'tutorial-modal';
    
    const content = document.createElement('div');
    content.className = 'tutorial-content';
    
    const title = document.createElement('h2');
    title.textContent = 'How to Play';
    
    const steps = document.createElement('div');
    steps.className = 'tutorial-steps';
    
    steps.innerHTML = `
        <div class="step">
            <div class="step-number">1</div>
            <div class="step-text">Click and drag blocks to move them through empty spaces</div>
        </div>
        <div class="step">
            <div class="step-number">2</div>
            <div class="step-text">Help Cao Cao (the large red block) reach the exit at the bottom</div>
        </div>
        <div class="step">
            <div class="step-number">3</div>
            <div class="step-text">Complete the puzzle in as few moves as possible</div>
        </div>
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Start Playing';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        localStorage.setItem('klotskiTutorialSeen', 'true');
    });
    
    content.appendChild(title);
    content.appendChild(steps);
    content.appendChild(closeBtn);
    modal.appendChild(content);
    
    document.body.appendChild(modal);
}

// 在初始化游戏后检查是否需要显示教程
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    
    // 检查用户是否已经看过教程
    const tutorialSeen = localStorage.getItem('klotskiTutorialSeen');
    if (!tutorialSeen) {
        // 延迟显示教程，让游戏先加载完成
        setTimeout(showTutorial, 500);
    }
});

// 添加"如何游戏"按钮
const howToPlayBtn = document.createElement('button');
howToPlayBtn.textContent = 'How to Play';
howToPlayBtn.id = 'howToPlayBtn';
howToPlayBtn.addEventListener('click', showTutorial);

// 将按钮添加到游戏信息区域
document.querySelector('.game-info').appendChild(howToPlayBtn);

// 添加更新关卡描述的函数
function updateLevelDescription() {
    levelDescription.textContent = LEVEL_DESCRIPTIONS[currentLevel];
}

// 初始更新
updateLevelDescription(); 