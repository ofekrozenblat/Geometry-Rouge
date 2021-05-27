var canvas = document.getElementById("myCanvas");

// Mouse position relative to the canvas
var mouseX;
var mouseY;
var prevMouseX;
var prevMouseY;
var relativeX = 0;
var relativeY = 0;

// Mouse listener
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("click", mouseClicked, false);

// Subscribed components
var subscribers = {};
var numOfSubs = 0;

function mouseMoveHandler(e){
    // Update mouse position
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    /* Take the relativeX position of the mouse pointer with respect
    to the canvas. e.clientX returns x position relative to the viewPort
    (i.e. browser window), and canvas.offsetLeft gives the x position
    of the left edge of the canvas on the viewPort
    */
    
    relativeX = e.clientX - canvas.offsetLeft;
    // canvas.offsetTop returns the coordinate of the top height of the
    // canvas on the viewPort
    relativeY = e.clientY - canvas.offsetTop;
}

function mouseClicked(e){
    // Trigger the mouseClicked function for all subscribers
    var i;
    for(i = 0; i < numOfSubs; i++){
        subscribers[i].mouseClicked(e);
    }   
}

/**
 * Used for objects to subscribe to the mouseClicked event
 * @param {*} component Must have a mouseClicked(e) function
 * @throws No mouseClicked() function
 */
export function subscribeMouseClicked(component){
    if(typeof component.mouseClicked !== "function"){
        throw "mouse-listener.js - No mouseClicked() function";
    }
    
    subscribers[numOfSubs] = component;
    numOfSubs++;
}

/**
 * @returns {number} mouse x-position relative to the canvas
 */
export function getMouseX(){
    return relativeX;
}

/**
 * @returns {number} mouse y-position relative to the canvas
 */
export function getMouseY(){
    return relativeY;
}
