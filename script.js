// Game configuration
const BOARD_WIDTH = 4;
const BOARD_HEIGHT = 5;
const CELL_SIZE_PERCENT = 25; // Each cell takes 25% of the board width

// Block types with Chinese character names
const BLOCK_TYPES = {
    CAOCAO: { name: 'Cao Cao 曹操', className: 'caocao' },
    GENERAL: { name: 'General 将军', className: 'general' },
    SOLDIER: { name: 'Soldier 士兵', className: 'soldier' },
    VERTICAL: { name: 'Zhang Fei 张飞', className: 'vertical' },
    HORIZONTAL: { name: 'Guan Yu 关羽', className: 'horizontal' }
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

// Game state
let blocks = [];
let moveCount = 0;
let selectedBlock = null;
let startX, startY;
let blockStartX, blockStartY;
let currentLevel = 0;

// DOM elements
const gameBoard = document.getElementById('game-board');
const moveCountElement = document.getElementById('moveCount');
const resetBtn = document.getElementById('resetBtn');
const levelSelect = document.getElementById('levelSelect');

// Initialize game
function initGame() {
    // Clear game board
    gameBoard.innerHTML = '';
    blocks = [];
    moveCount = 0;
    moveCountElement.textContent = '0';
    
    // Add exit marker
    const exit = document.createElement('div');
    exit.className = 'exit';
    gameBoard.appendChild(exit);
    
    // Load current level
    LEVELS[currentLevel].forEach(blockData => {
        createBlock(blockData);
    });
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

// Show win modal with Chinese elements
function showWinModal() {
    const modal = document.createElement('div');
    modal.className = 'win-modal';
    
    const content = document.createElement('div');
    content.className = 'win-content';
    
    const title = document.createElement('h2');
    title.textContent = 'Victory! 胜利！';
    
    const message = document.createElement('p');
    message.textContent = `You helped Cao Cao escape in ${moveCount} moves!`;
    
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
    initGame();
});

// Initialize game
initGame(); 