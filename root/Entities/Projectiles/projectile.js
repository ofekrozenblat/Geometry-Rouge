// -----------------------------------------
// --- Projectile Object (Abstract Class) ---
// -----------------------------------------

// Projectile object constructor function
export function Projectile(){
    // Define hitBox
    this.hitBoxLeftX = this.posX-this.width/2;
    this.hitBoxRightX = this.posX+this.width/2;
    this.hitBoxTopY = this.posY-this.height/2;
    this.hitBoxBottomY = this.posY+this.height/2;
}

// Functions of object (Class)
Projectile.prototype.draw = draw;
Projectile.prototype.update = update;
Projectile.prototype.moveForward = moveForward;
Projectile.prototype.destroyProjectile = destroyProjectile;

Projectile.prototype.updateHitBox = updateHitBox;
Projectile.prototype.getHitBoxLeftX = getHitBoxLeftX;
Projectile.prototype.getHitBoxRightX = getHitBoxRightX;
Projectile.prototype.getHitBoxTopY = getHitBoxTopY;
Projectile.prototype.getHitBoxBottomY = getHitBoxBottomY;

// ----------- Functions of object (Class) -----------
export function draw(canvasContext){
    canvasContext.fillStyle = "green";
    canvasContext.save(); // Save the current coordinate systen
    canvasContext.translate(this.posX, this.posY); // Translate the coordinate system origin to be at (posX, posY)
    canvasContext.rotate(this.angle); // Rotate the coordinate system

    canvasContext.beginPath();
    canvasContext.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    canvasContext.closePath();

    canvasContext.restore(); // Restore the saved coordinate system

    // Draw hitbox vectors
    // canvasContext.beginPath();
    // canvasContext.lineWidth = 1;
    // canvasContext.moveTo(this.posX,this.posY);
    // canvasContext.lineTo(this.hitBoxLeftX, this.hitBoxTopY);
    // canvasContext.moveTo(this.posX,this.posY);
    // canvasContext.lineTo(this.hitBoxRightX, this.hitBoxBottomY);
    // canvasContext.stroke();
    // canvasContext.closePath();
}

export function update(){
    this.moveForward();
    this.updateHitBox();
    this.checkEnemyCollision(); // ABSTRACT METHOD
}

function moveForward(){
    var cos = Math.cos(Math.PI/2-this.angle);
    var sin = Math.sin(Math.PI/2-this.angle);
    this.posX += cos*this.speed;
    this.posY -= sin*this.speed; // (Subtracting since going up reduces the y value in this coordinate system)
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

// ----------- Access Projectile HitBox -----------
function getHitBoxLeftX(){
    // Due to the rotation, the positions might be flipped
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
    // Due to the rotation, the positions might be flipped
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

/**
 * Destroys the projectile
 */
function destroyProjectile(){
    this.isDestroyed = true;
}