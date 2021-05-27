import {getCanvasWdith, getCanvasHeight} from "/main.js";
import * as ButtonManager from "./button-manager.js";
import {WindowView} from "./window-view.js";
import { Button, textAlign } from "./button.js";
import { Text } from "./text.js";

// Canvas
var CANVAS_WIDTH = 0;
var CANVAS_HEIGHT = 0;

// Attributes
var startMenuWindow;
var startButton;
var startText;

export function createStartMenu(){
    CANVAS_WIDTH = getCanvasWdith();
    CANVAS_HEIGHT = getCanvasHeight();

    // Create the start menu
    startMenuWindow = new WindowView(CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Start button
    startButton = new Button(200, 250, 150, 50, "Start", ButtonManager.onClickButtonStart);
    startButton.textAlignment = textAlign.CENTER;

    // Start text (title)
    startText = new Text(125, 100, "Geometry Rouge");
    startText.setFontSize(40);
    startText.setColour("yellow");

    startMenuWindow.addComponent(startText);
    startMenuWindow.addComponent(startButton);
    startMenuWindow.setVisible(true);
}

export function draw(canvasContext){
    startMenuWindow.draw(canvasContext);
}

export function update(){
    startMenuWindow.update();
}

// ----------- Accessors of the menues ----------
export function setVisible(visible){
    startMenuWindow.setVisible(visible);
}