/**
 * WindowView class 
 */

/**
 * Constructor
 * @param {number} windowWidth Width of window
 * @param {number} windowHeight Height of window
 * @param {number} canvasWidth Width of the canvas
 * @param {number} canvasHeight Height of the canvas
 * @throws WindowView constraints violation if window can not fit inside the given canvas constraints or constraints are non-positive
 */
export function WindowView(windowWidth, windowHeight, canvasWidth, canvasHeight){
    if(canvasWidth <= 0 || canvasHeight <= 0 || windowWidth <= 0 || windowHeight <= 0 ||
        windowWidth > canvasWidth || windowHeight > canvasHeight){
        throw "WindowView constraint violation"
    }

    // Canvas properties
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    // Size properties
    this.width = windowWidth;
    this.height = windowHeight;

    // Drawing properties
    this.backgroundColour = "black";
    this.opacity = 0.5;

    // Position properties
    this.posX = 0;
    this.posY = 0;

    // Border properties
    this.showBorder = true;
    this.borderColour = "blue";
    this.borderThickness = 5;
    this.borderOpacity = 1.0;

    // Components within the window
    this.components = {};
    this.numOfComponents = 0;

    // Window properties
    this.visible = false;
}

// Add Functions of object (Class)
WindowView.prototype.draw = draw;
WindowView.prototype.update = update;
WindowView.prototype.drawBorder = drawBorder;
WindowView.prototype.addComponent = addComponent;
WindowView.prototype.setVisible = setVisible;

// ----------- Functions of object (Class) -----------
function draw(canvasContext){
    // If window is not visible do not draw it on the screen
    if(!this.visible) return;

    canvasContext.globalAlpha = this.opacity;
    canvasContext.fillStyle = this.backgroundColour;
    canvasContext.fillRect(this.posX, this.posY, this.width, this.height);

    this.drawBorder(canvasContext);

    // Draw the components (order matters --> draw components after drawing window-view)
    var i;
    for(i = 0; i < this.numOfComponents; i++){
        this.components[i].draw(canvasContext);
    }

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
    // If window is not visible do not update it (or its components)
    if(!this.visible) return;
    
    // Update all the components
    var i;
    for(i = 0; i < this.numOfComponents; i++){
        this.components[i].update();
    }
}

/**
 * Add a component to the window-view
 * @param {*} component 
 */
function addComponent(component){
    // Readjust the components posX and posY properties to make them relative to the window-view
    component.posX += this.posX;
    component.posY += this.posY;

    // Add the component
    this.components[this.numOfComponents] = component;
    this.numOfComponents++;
}

/**
 * Sets the visibility of the window
 * - True shows the window
 * - False hides the windows
 * @param {boolean} visible Visibility of the window
 */
function setVisible(visible){
    this.visible = visible;
}