import {getGameAreaWidth, getGameAreaHeight, getCanvasWdith, getCanvasHeight, getPlayer, isGameRunning} from "../main.js";

/**
 * Shows statistics of the game
 */

// Coordinates of where the view area starts and ends
var viewLeftX;
var viewTopY;
var viewRightX;
var viewBottomY;
var player;

export function createStatsView(){
    viewLeftX = 0;
    viewTopY = getGameAreaHeight();
    viewRightX = getGameAreaWidth();
    viewBottomY = getCanvasHeight();
}

export function draw(canvasContext){
    if(!isGameRunning()) return;

    canvasContext.lineWidth = 20;
    canvasContext.strokeStyle = "grey";
    canvasContext.beginPath();
    canvasContext.moveTo(viewLeftX,viewTopY);
    canvasContext.lineTo(viewRightX, viewTopY);
    canvasContext.stroke();
    canvasContext.closePath();

    drawHealthBar(canvasContext);
}

export function update(){
    if(!isGameRunning()) return;

    /* Since the entire GUI gets loaded before the game
    started, player is null during creation and needs
    to be retrieved at an update level*/
    player = getPlayer();

}

function drawHealthBar(canvasContext){
    // Position
    var yOffset = 40;
    var x = viewLeftX;
    var y = viewTopY + yOffset;
    
    // Stats
    var maxHealth = player.getMaxHealth();
    var currentHealth = player.getCurrentHealth();
    var percentageHealth = currentHealth/maxHealth; // Percentage

    // Dimension
    var healthBarHeight = 20;
    var healthBarWidth = viewRightX*0.4;

    // Draw text
    canvasContext.font = "15px Arial";
    canvasContext.fillStyle = "black";
    canvasContext.fillText("Health", x, y-10);

    // Draw health bar border
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 4;
    canvasContext.beginPath();
    canvasContext.strokeRect(x, y, healthBarWidth, healthBarHeight);
    canvasContext.closePath();

    // Draw health bar underneath
    canvasContext.fillStyle = "grey";
    canvasContext.beginPath();
    canvasContext.fillRect(x, y, healthBarWidth, healthBarHeight);
    canvasContext.closePath();

    // Draw health bar
    canvasContext.fillStyle = "red";
    canvasContext.beginPath();
    canvasContext.fillRect(x, y, healthBarWidth*percentageHealth, healthBarHeight);
    canvasContext.closePath();
}