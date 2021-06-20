/**
 * Manages all the GUI components/views
*/
import {getCanvasWdith, getCanvasHeight} from "/main.js";
import * as StartMenu from "./start-menu.js";
import * as StatsView from "./stats-view.js";
import * as GameOverMenu from "./gameover-menu.js";

// Canvas
var CANVAS_WIDTH = 0;
var CANVAS_HEIGHT = 0;

// Attributes
var components = [];

/**
 * Creates the GUI
 */
export function createGUI(){
    CANVAS_WIDTH = getCanvasWdith();
    CANVAS_HEIGHT = getCanvasHeight();

    StartMenu.createStartMenu();
    StatsView.createStatsView();
    GameOverMenu.createGameOverMenu();

    addGUIComponent(StartMenu);
    addGUIComponent(StatsView);
    addGUIComponent(GameOverMenu);
}

function addGUIComponent(component){
    components.push(component);
}

export function draw(canvasContext){
    var i;
    for(i = 0; i < components.length; i++){
        components[i].draw(canvasContext);
    }
}

export function update(){
    var i;
    for(i = 0; i < components.length; i++){
        components[i].update();
    }
}

// ----------- Accessors of the menues ----------
export function setStartMenuVisibile(visible){
    StartMenu.setVisible(visible);
}

export function setGameOverMenuVisible(visible){
    GameOverMenu.setVisible(visible);
}
