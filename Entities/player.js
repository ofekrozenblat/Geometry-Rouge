// -----------------------------------------
// ----------- Player Object (Class) -------
// -----------------------------------------

// Player object constructor function
export function Player(posX, posY){
    this.width = 25;
    this.height = 35;

    this.speed = 4;
    this.meeleDamage = 50;

    // Define hitBox
    this.hitBoxLeftX = this.posX-this.width/2;
    this.hitBoxRightX = this.posX+this.width/2;
    this.hitBoxTopY = this.posY;
    this.hitBoxBottomY = this.posY+this.height;

    // Angle of rotation is in radians
    this.angle = 0;

    // Center of triangle is (posX, posY)
    this.posX = posX;
    this.posY = posY;

    /**
     * Attack speed in ms
     */
    this.meeleAttackSpeed = 1000;
}

Player.prototype.draw = draw;
Player.prototype.update = update;
Player.prototype.updateHitBox = updateHitBox;
Player.prototype.rotate = rotate;
Player.prototype.moveForward = moveForward;
Player.prototype.getHitBoxLeftX = getHitBoxLeftX;
Player.prototype.getHitBoxRightX = getHitBoxRightX;
Player.prototype.getHitBoxTopY = getHitBoxTopY;
Player.prototype.getHitBoxBottomY = getHitBoxBottomY;
Player.prototype.getTopX = getTopX;
Player.prototype.getTopY = getTopY;

function draw(canvasContext){
    canvasContext.fillStyle = "#0095DD";
    canvasContext.save(); // Save the current coordinate systen
    canvasContext.translate(this.posX, this.posY); // Translate the coordinate system origin to be at (posX, posY)
    canvasContext.rotate(this.angle); // Rotate the coordinate system

    canvasContext.beginPath();
    canvasContext.moveTo(0,-this.height/2);
    canvasContext.lineTo(this.width/2, this.height/2);
    canvasContext.lineTo(-this.width/2,  this.height/2);
    canvasContext.fill();
    canvasContext.closePath();

    canvasContext.restore(); // Restore the saved coordinate system

    // Draw hitbox vectors
    // canvasContext.beginPath();
    // canvasContext.lineWidth = 3;
    // canvasContext.moveTo(this.posX,this.posY);
    // canvasContext.lineTo(this.hitBoxLeftX, this.hitBoxTopY);
    // canvasContext.moveTo(this.posX,this.posY);
    // canvasContext.lineTo(this.hitBoxRightX, this.hitBoxBottomY);
    // canvasContext.stroke();
    // canvasContext.closePath();
}

function update(){
    this.updateHitBox();
}

function updateHitBox(){
    var cos = Math.cos(this.angle);
    var sin = Math.sin(this.angle);

    // Top Left corner of hitbox
    this.hitBoxLeftX = (-this.width/2*cos - (-this.height/2)*sin)+this.posX;
    this.hitBoxTopY = (-this.width/2*sin + (-this.height/2)*cos)+this.posY;

    // Bottom right corner of hitbox
    this.hitBoxRightX = (this.width/2*cos - (this.height/2)*sin)+this.posX;
    this.hitBoxBottomY = (this.width/2*sin + (this.height/2)*cos)+this.posY;
}

function rotate(angle){
    this.angle += angle;
}

function moveForward(){
    var cos = Math.cos(Math.PI/2-this.angle);
    var sin = Math.sin(Math.PI/2-this.angle);
    this.posX += cos*this.speed;
    this.posY -= sin*this.speed; // (Subtracting since going up reduces the y value in this coordinate system)
}


// ----------- Access Player HitBox -----------
function getHitBoxLeftX(){
    // Due to the rotation of the triangle, the positions might be flipped
    if(this.hitBoxRightX < this.hitBoxLeftX){
        return this.hitBoxRightX;
    }else{
        return this.hitBoxLeftX;
    }
}

function getHitBoxRightX(){
    if(this.hitBoxRightX >= this.hitBoxLeftX){
        return this.hitBoxRightX;
    }else{
        return this.hitBoxLeftX;
    }
}

function getHitBoxTopY(){
    // Due to the rotation of the triangle, the positions might be flipped
    if(this.hitBoxBottomY < this.hitBoxTopY){
        return this.hitBoxBottomY;
    }else{
        return this.hitBoxTopY;
    }
}

function getHitBoxBottomY(){
    if(this.hitBoxBottomY >= this.hitBoxTopY){
        return this.hitBoxBottomY;
    }else{
        return this.hitBoxTopY;
    }
}
// -----------------------------------------

// ---------- Access Player Top Point Position ----------

/**
 * Gets the top x-point of the player
 * @return {number} x-position of the top point of the player
 */
function getTopX(){
    var cos = Math.cos(this.angle);
    var sin = Math.sin(this.angle);

    // Top Left corner of hitbox
    var xPos = (0*cos - (-this.height/2)*sin)+this.posX;

    return xPos;
}

/**
 * Gets the top y-point of the player
 * @return {number} y-position of the top point of the player
 */
 function getTopY(){
    var cos = Math.cos(this.angle);
    var sin = Math.sin(this.angle);

    // Top Left corner of hitbox
    var yPos = (0*sin + (-this.height/2)*cos)+this.posY;

    return yPos;
}
