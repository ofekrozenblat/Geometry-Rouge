import {Enemy} from "./enemy.js";

// -----------------------------------------
// ----------- Enemy Circle Class ----------
// -----------------------------------------

export function EnemyCircle(posX, posY, radius){
    // Since enemies are circles in this case,
    // posX and posY reference the center of the circle
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.speed = 0.5;
    this.defaultColour = "red"
    this.colour = this.defaultColour;
    this.isDestroyed = false;
    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;
    
    // Damage the enemy applies to the player
    this.damage = 1;

    // Define hitBox
    this.hitBoxLeftX = this.posX-this.radius;
    this.hitBoxRightX = this.posX+this.radius;
    this.hitBoxTopY = this.posY-this.radius;
    this.hitBoxBottomY = this.posY+this.radius;
}

// Inherit from enemy.js
EnemyCircle.prototype = new Enemy();

// Functions of object (Class)
EnemyCircle.prototype.updateHitBox = updateHitBox;

// -----------------------------------------
// --------Implemented Abstract Methods ----
// -----------------------------------------
function updateHitBox(){
    this.hitBoxLeftX = this.posX-this.radius;
    this.hitBoxRightX = this.posX+this.radius;
    this.hitBoxTopY = this.posY-this.radius;
    this.hitBoxBottomY = this.posY+this.radius;
}
// -----------------------------------------
// -----------------------------------------