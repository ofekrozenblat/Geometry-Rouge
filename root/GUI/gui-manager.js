/**
 * Manages all the GUI components/views
*/
import {getCanvasWdith, getCanvasHeight} from "/main.js";
import * as StartMenu from "./start-menu.js";

// Canvas
var CANVAS_WIDTH = 0;
var CANVAS_HEIGHT = 0;

// Attributes
var components = {};
var numOfComponents = 0;

/**
 * Creates the GUI
 */
export function createGUI(){
    CANVAS_WIDTH = getCanvasWdith();
    CANVAS_HEIGHT = getCanvasHeight();

    StartMenu.createStartMenu();

    addGUIComponent(StartMenu);
}

function addGUIComponent(component){
    components[numOfComponents] = component;
    numOfComponents++;
}

export function draw(canvasContext){
    var i;
    for(i = 0; i < numOfComponents; i++){
        components[i].draw(canvasContext);
    }
}

export function update(){
    var i;
    for(i = 0; i < numOfComponents; i++){
        components[i].update();
    }
}

// ----------- Accessors of the menues ----------
export function setStartMenuVisibile(visible){
    StartMenu.setVisible(visible);
}
