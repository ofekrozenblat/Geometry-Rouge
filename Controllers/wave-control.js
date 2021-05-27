import * as EnemyControl from "./enemy-control.js";
import {getCanvasWdith, getCanvasHeight} from "../main.js";

// Controls wave spawning
var waveNumber = 0;
var enemiesLeft = 0;

export function draw(canvasContext){
    var canvasWdith = getCanvasWdith();
    var canvasHeight = getCanvasHeight();

    // Draw Enemies Left String
    var enemiesLeftString = "Enemies Left: " + enemiesLeft;
    var fontSize = 15;
    canvasContext.font = fontSize+"px Arial";
    canvasContext.fillStyle = "black";
    canvasContext.fillText(enemiesLeftString, canvasWdith-125, 20);

    // Draw Wave Number String
    var waveNumberString = "Wave Number: " + waveNumber;
    canvasContext.font = 15+"px Arial";
    canvasContext.fillStyle = "black";
    canvasContext.fillText(waveNumberString, canvasWdith-125, 40);
}

export function update(){
    checkWaveStatus();
}

/**
 * Checks the status of the wave and if to spawn a new wave
 */
function checkWaveStatus(){
    enemiesLeft = EnemyControl.getNumberOfEnemies();

    if(enemiesLeft == 0){
        waveNumber++;
        EnemyControl.spawn();
    }
}