/**
 * Text class
 */

/**
 * Text constructor.
 * The position (`posX`, `posY`) of the text will be relative to
 * wherever the text is being drawn. 
 * - If the text is being drawn by the canvas it is relative to the canvas.
 * - If the text is being drawn by a window-view then it is relative to that window-view.
 * @param {number} posX x-position of the text
 * @param {number} posY y-position of the text
 * @param {string} textString String of text to be displayed
 */

export function Text(posX, posY, textString){
    // Position properties
    // Note: posX and posY will later be updated if text is added to a window-view
    // (i.e. the positions passed in are relative positions and later become true positions on the canvas)
    this.posX = posX;
    this.posY = posY;

    // Drawing properties
    this.colour = "black";
    this.opacity = 1.0;
    this.fontSize = 15;
    this.fontStyle = "Arial"

    // Border properties
    this.showBorder = false;
    this.borderColour = this.defaultColour;
    this.borderThickness = 5;
    this.borderOpacity = 1.0;

    // Text properties
    this.textString = textString;
}

// Add Functions of object (Class)
Text.prototype.draw = draw;
Text.prototype.update = update;
Text.prototype.drawBorder = drawBorder;
Text.prototype.setText = setText;
Text.prototype.getText = getText;
Text.prototype.setFontStyle = setFontStyle;
Text.prototype.setFontSize = setFontSize;
Text.prototype.setFont = setFont;
Text.prototype.setColour = setColour;

// ----------- Functions of object (Class) -----------
function draw(canvasContext){
    // Draw the text
    var xOffset = this.showBorder ? this.borderThickness : 0;
    canvasContext.font = this.fontSize + "px " + this.fontStyle;
    canvasContext.fillStyle = this.colour;
    canvasContext.fillText(this.textString, this.posX+xOffset, this.posY);

    // Draw the border
    this.drawBorder(canvasContext);

    // Reset global opacity
    canvasContext.globalAlpha = 1.0;
}

function drawBorder(canvasContext){
    if(this.showBorder){
        canvasContext.globalAlpha = this.borderOpacity;
        canvasContext.lineWidth = this.borderThickness;
        canvasContext.strokeStyle = this.borderColour;
        canvasContext.strokeRect(this.posX, this.posY-this.fontSize, this.textString.length*this.fontSize-this.borderThickness, this.fontSize+4);
    }
}

function update(){

}

// ----------- Text Configurations -----------

/**
 * Sets the text of the string
 * @param {string} textString 
 */
function setText(textString){
    this.textString = textString;
}

/**
 * @returns {string} text of the string
 */
function getText(){
    return this.textString;
}

/**
 * Sets the font style of the text
 * @param {string} fontStyle 
 */
function setFontStyle(fontStyle){
    this.fontStyle = fontStyle;
}

/**
 * Sets the font size of the text
 * @param {number} fontSize 
 */
function setFontSize(fontSize){
    this.fontSize = fontSize;
}

/**
 * Sets the font of the text
 * @param {string} fontStyle the font style of the text
 * @param {number} fontSize the font size of the text
 */
function setFont(fontStyle, fontSize){
    this.fontStyle = fontStyle;
    this.fontSize = fontSize;
}

/**
 * Sets the colour of the text
 * @param {string} colour 
 */
function setColour(colour){
    this.colour = colour;
}