
// IMPORTS
import {Player} from "./Entities/player.js";
import * as EnemeyController from "./Controllers/enemy-control.js";
import * as WaveControl from "./Controllers/wave-control.js";
import * as ProjectileControl from "./Controllers/projectile-control.js";

// GUI IMPORT
import * as GUIManager from "./GUI/gui-manager.js";

// Canvas
var canvas = document.getElementById("myCanvas");
var canvasContext = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// Gameloop time variables
var oldTimeStamp = 0;

// Player object
var player = new Player(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);

// Key map
var keyMap = {};

// -------- Gameloop variables --------
var running = false;
// -----------------------------------

// Initialize game
init();

function init(){
    // Initialize GUI
    GUIManager.createGUI();
    
    // Add keydown event listener
    window.addEventListener('keydown', keyDownHandler, false);
    window.addEventListener('keyup', keyUpHandler, false);

    // Initialize keyMap
    keyMap[87] = false; // W
    keyMap[83] = false; // S
    keyMap[65] = false; // A
    keyMap[68] = false; // D
    keyMap[70] = false; // F

    // Start the gameloop
    window.requestAnimationFrame(gameLoop);
}

// -----------------------------------------
// ----------- Key Event Handlers ----------
// -----------------------------------------
function keyDownHandler(e){
    keyMap[e.keyCode] = true;
    checkKeyMap();
}

function keyUpHandler(e){
    keyMap[e.keyCode] = false;
    checkKeyMap();
}

function checkKeyMap(){
    // W
    if(keyMap[87]){
        player.moveForward();
    }

    // S
    if(keyMap[83]){

    }

    // A
    if(keyMap[65]){
        player.rotate(-0.1);
    }

    // D
    if(keyMap[68]){
        player.rotate(0.1);
    }

    // F - to Fire
    if(keyMap[70]){
        if(running){
            ProjectileControl.addFriendlyProjectile(player.getTopX(), player.getTopY(), player.angle);
        }
    }
}
// -----------------------------------------
// -----------------------------------------


// -----------------------------------------
// ----------- Gameloop functions ----------
// -----------------------------------------
function draw() {
    // Clear canvas
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    // DRAW everything game-related
    if(running){
        player.draw(canvasContext);
        WaveControl.draw(canvasContext);
        EnemeyController.draw(canvasContext);
        ProjectileControl.draw(canvasContext);
    }

    // DRAW GUI
    GUIManager.draw(canvasContext);
}

function update(secondsPassed){
    /* Use secondsPassed to update the game correcrtly
    For example, given we want to move the player 10 pixles per second
    we get the speed of the player by doing 10*secondsPassed
    For 60fps (i.e. 60 frames per second) this is about 0.0167 seconds per frame (1/60), 
    so each frame the player moves 10*0.0167=0.167 pixles per frame
    Reference: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-smooth-canvas-animation
    player.speed = player.speed*secondsPassed;
    --> For now I will just assume 60fps constantly
    */

    // UPDATE everything that is game-related
    if(running){
        checkKeyMap();
        player.update();
        WaveControl.update();
        EnemeyController.update(player);
        ProjectileControl.update();
    }

    // UPDATE GUI
    GUIManager.update();
}

function gameLoop(timeStamp){
    // Calculate time passed in seconds
    var secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    secondsPassed = Math.min(secondsPassed, 0.1);
    oldTimeStamp = timeStamp;

    // Give the update method the timePassed in seconds
    update(secondsPassed);
    draw();

    // Calculate fps
    var fps = Math.round(1 / secondsPassed);
    canvasContext.font = '15px Arial';
    canvasContext.fillStyle = 'black';
    canvasContext.fillText("FPS: " + fps, 5, 12);

    window.requestAnimationFrame(gameLoop);
}
// -----------------------------------------
// -----------------------------------------


// -----------------------------------------
// ----------- Game-related functions ------
// -----------------------------------------

export function startGame(){
    running = true;
}

// -----------------------------------------
// -----------------------------------------


// -----------------------------------------
// ----------- Accessors -------------------
// -----------------------------------------

/**
 * @returns {number} Width of the canvas 
 */
export function getCanvasWdith(){
    return CANVAS_WIDTH;
}

/**
 * @returns {number} Height of the canvas 
 */
export function getCanvasHeight(){
    return CANVAS_HEIGHT;
}

// -----------------------------------------
// -----------------------------------------