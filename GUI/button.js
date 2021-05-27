/**
 * Button class
 */
import * as MouseListener from "/Utilities/mouse-listener.js";

// Constants (Accessible and fixed for all buttons)
export const textAlign = {
    LEFT: 0,
    RIGHT: 1,
    CENTER: 2
}

/**
 * Button constructor.
 * The position (`posX`, `posY`) of the button will be relative to
 * wherever the button is being drawn. 
 * - If the button is being drawn by the canvas it is relative to the canvas.
 * - If the button is being drawn by a window-view then it is relative to that window-view.
 * @param {number} posX x-position of the button
 * @param {number} posY y-position of the button
 * @param {number} buttonWidth Width of the button
 * @param {number} buttonHeight Height of the button
 * @param {string} buttonText Text of the button
 * @param {function} onClickFunction Function that gets called when button is clicked
 */
export function Button(posX, posY, buttonWidth, buttonHeight, buttonText, onClickFunction){
    // Size properties
    this.width = buttonWidth;
    this.height = buttonHeight;

    // Position properties
    // Note: posX and posY will later be updated if button is added to a window-view
    // (i.e. the positions passed in are relative positions and later become true positions on the canvas)
    this.posX = posX;
    this.posY = posY;

    // Drawing properties
    this.colour = "black";
    this.defaultColour = this.colour;
    this.hoverColour = "blue";
    this.opacity = 1.0;

    // Border properties
    this.showBorder = true;
    this.borderColour = this.defaultColour;
    this.borderThickness = 5;
    this.borderOpacity = 1.0;

    // Text properties
    this.textString = buttonText;
    this.textColour = "yellow";
    this.textSize = 25;
    this.textAlignment = textAlign.LEFT;

    // Set the onclick function
    this.onClick = onClickFunction;

    // Subscribe to the mouseClicked event
    MouseListener.subscribeMouseClicked(this);
}

// Add Functions of object (Class)
Button.prototype.draw = draw;
Button.prototype.update = update;
Button.prototype.mouseClicked = mouseClicked;
Button.prototype.checkMouseHover = checkMouseHover;
Button.prototype.drawBorder = drawBorder;

// ----------- Functions of object (Class) -----------
function draw(canvasContext){
    // Draw the button
    canvasContext.globalAlpha = this.opacity;
    canvasContext.fillStyle = this.colour;
    canvasContext.fillRect(this.posX, this.posY, this.width, this.height);

    // Draw the button text
    var xOffset = this.showBorder ? this.borderThickness : 0;
    var yOffset = this.textSize*0.35;

    switch(this.textAlignment){
        case textAlign.LEFT:
            /* By default already left align*/
            break;
        case textAlign.RIGHT:
            xOffset += this.width - this.textString.length*this.textSize*0.5 - this.borderThickness;
            break;
        case textAlign.CENTER:
            xOffset += this.width*0.5 - this.textString.length*this.textSize*0.25;
            break;
    }
    canvasContext.font = this.textSize + 'px Arial';
    canvasContext.fillStyle = this.textColour;
    canvasContext.fillText(this.textString, this.posX+xOffset, this.posY+this.height/2+yOffset);

    // Draw the button border
    this.drawBorder(canvasContext);

    // Reset global opacity
    canvasContext.globalAlpha = 1.0;
}

function drawBorder(canvasContext){
    if(this.showBorder){
        canvasContext.globalAlpha = this.borderOpacity;
        canvasContext.lineWidth = this.borderThickness;
        canvasContext.strokeStyle = this.borderColour;
        canvasContext.strokeRect(this.posX, this.posY, this.width, this.height);
    }
}

function update(){
    this.checkMouseHover();
}

/**
 * Checks whether the mouse is hovering over the button
 * and does something if mouse is hovering over the button.
 * @returns True if mouse is hovering over the button, otherwise returns false.
 */
function checkMouseHover(){
    var mouseX = MouseListener.getMouseX();
    var mouseY = MouseListener.getMouseY();

    if (mouseX >= this.posX && mouseX <= this.posX+this.width &&
        mouseY >= this.posY && mouseY <= this.posY+this.height){
        this.colour = this.hoverColour;
        return true;
    }else{
        this.colour = this.defaultColour;
        return false;
    }
}

/**
 * Button triggers its onClick function 
 * when mouse is hovering over it and user clicks.
 */
function mouseClicked(e){
    if(this.checkMouseHover()){
        this.onClick();
    }
}