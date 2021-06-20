import {getCanvasWdith, getCanvasHeight} from "/main.js";
import * as ButtonManager from "./button-manager.js";
import {WindowView} from "./window-view.js";
import { Button, textAlign } from "./button.js";
import { Text } from "./text.js";

// Canvas
var CANVAS_WIDTH = 0;
var CANVAS_HEIGHT = 0;

// Attributes
var gameOverMenuWindow;
var newGameButton;
var gameOverText;

export function createGameOverMenu(){
    CANVAS_WIDTH = getCanvasWdith();
    CANVAS_HEIGHT = getCanvasHeight();

    // Create the start menu
    gameOverMenuWindow = new WindowView(CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Start button
    newGameButton = new Button(210, 250, 140, 50, "New Game", ButtonManager.onClickButtonNewGame);
    newGameButton.textAlignment = textAlign.LEFT;

    // Start text (title)
    gameOverText = new Text(175, 100, "Game Over!");
    gameOverText.setFontSize(40);
    gameOverText.setColour("yellow");

    gameOverMenuWindow.addComponent(gameOverText);
    gameOverMenuWindow.addComponent(newGameButton);
    gameOverMenuWindow.setVisible(false);
}

export function draw(canvasContext){
    gameOverMenuWindow.draw(canvasContext);
}

export function update(){
    gameOverMenuWindow.update();
}

// ----------- Accessors of the menues ----------
export function setVisible(visible){
    gameOverMenuWindow.setVisible(visible);
}