import * as ProjectileControl from "../Controllers/projectile-control.js";
import {getGameAreaWidth, getGameAreaHeight} from "../main.js";

// -----------------------------------------
// ----------- Player Object (Class) -------
// -----------------------------------------

// Player object constructor function
export function Player(posX, posY){
    this.width = 25;
    this.height = 35;

    // Define hitBox
    this.hitBoxLeftX = this.posX-this.width/2;
    this.hitBoxRightX = this.posX+this.width/2;
    this.hitBoxTopY = this.posY;
    this.hitBoxBottomY = this.posY+this.height;

    this.speed = 4;
    this.meeleDamage = 50;

    // Health
    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;
    
    // Player status
    this.isDestroyed = false;

    // Angle of rotation is in radians
    this.angle = 0;

    // Center of triangle is (posX, posY)
    this.posX = posX;
    this.posY = posY;

    /**
     * Attack speed in ms
     */
    this.meeleAttackSpeed = 1000;

    /**
     * Range attack speed in ms
     */
    this.rangeAttackSpeed = 100;
    this.allowedToFire = true;

    // If the player is moving
    this.isMoving = false;
}

Player.prototype.draw = draw;
Player.prototype.update = update;
Player.prototype.updateHitBox = updateHitBox;
Player.prototype.rotate = rotate;

Player.prototype.moveForward = moveForward;
Player.prototype.fire = fire;
Player.prototype.applyDamage = applyDamage;
Player.prototype.destroyPlayer = destroyPlayer;

Player.prototype.getHitBoxLeftX = getHitBoxLeftX;
Player.prototype.getHitBoxRightX = getHitBoxRightX;
Player.prototype.getHitBoxTopY = getHitBoxTopY;
Player.prototype.getHitBoxBottomY = getHitBoxBottomY;
Player.prototype.getTopX = getTopX;
Player.prototype.getTopY = getTopY;

Player.prototype.getMaxHealth = getMaxHealth;
Player.prototype.getCurrentHealth = getCurrentHealth;

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
    var maxWidth = getGameAreaWidth();
    var maxHeight = getGameAreaHeight(); 

    var cos = Math.cos(Math.PI/2-this.angle);
    var sin = Math.sin(Math.PI/2-this.angle);

    var tempX = this.posX + cos*this.speed;
    var tempY = this.posY - sin*this.speed; // (Subtracting since going up reduces the y value in this coordinate system)

    // If Player does not go out of the screen, then continue to move the player
    if(!(this.getTopX() < 0 || this.getTopX() > maxWidth || this.getTopY() < 0 || this.getTopY() > maxHeight)){
        this.posX = tempX;
        this.posY = tempY;
    }
}

/**
 * Player fires a projectile
 */
function fire(){
    if (!this.allowedToFire) return;
    
    var projSpeed = 1;

    ProjectileControl.addFriendlyProjectile(this.getTopX(), this.getTopY(), this.angle, projSpeed);
    this.allowedToFire = false;

    // Create the reset function with the parameter as the player object
    // Then after giving the setTimeout function the timeout in ms
    // pass in the parameter for the function which is 'this' (i.e. the player object)
    setTimeout(function resetRangeAttack(player){
        player.allowedToFire = true;
    }, this.rangeAttackSpeed, this)
}

/**
 * Applies damage the player
 * 
 * @param {number} damage Damage to be applied to the player
 */
function applyDamage(damage){
    this.currentHealth -= damage;

    if (this.currentHealth <= 0){
        this.destroyPlayer();
    }

}

/**
 * Destroys the player
 */
function destroyPlayer(){
    this.isDestroyed = true;
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

// ---------- Access Player Stats ----------

/**
 * @returns {number} Player's maximum health
 */
function getMaxHealth(){
    return this.maxHealth;
}

/**
 * @returns {number} Player's current health
 */
 function getCurrentHealth(){
    return this.currentHealth;
}