// Note: Use curcly braces {} for named imports
// Note: For a defualt export do not need curcly braces
import { Player } from "../player.js";
import * as EnemyController from "/Controllers/enemy-control.js";
import {isExclusiveIntervals} from "/Utilities/math.js";

// -----------------------------------------
// --------Enemy Object (Abstract Class) ---
// -----------------------------------------

// Enemy object constructor function
export function Enemy(){
    // Left for children to define
    this.posX;
    this.posY;
    this.isDestroyed;

    // -------- Avaliable (common) attributes that are the same in all enemies --------
    this.hitColour = "yellow";
    /**
     * Protects the enemy from taking damage
     */
    this.hitProtection = false;
}

// Functions of object (Class)
Enemy.prototype.draw = draw;
Enemy.prototype.update = update;
Enemy.prototype.moveToPlayer = moveToPlayer;
Enemy.prototype.checkEnemyPosition = checkEnemyPosition;
Enemy.prototype.checkPlayerCollision = checkPlayerCollision;
Enemy.prototype.applyDamage = applyDamage;
Enemy.prototype.destroyEnemy = destroyEnemy;

// ----------- Functions of object (Class) -----------
function draw(canvasContext){
    canvasContext.beginPath();
    canvasContext.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI, false);
    canvasContext.fillStyle = this.colour;
    canvasContext.fill();
}

function update(player){
    this.updateHitBox(); // ABSTRACT method -- Implement in children
    this.checkPlayerCollision(player);
    this.moveToPlayer(player);
}

function moveToPlayer(player){
    if(this.isDestroyed) return;

    var playerPosX = player.posX;
    var playerPosY = player.posY;

    var dirX = 0;
    var dirY = 0;

    if (this.posX > playerPosX){
        dirX = -1;
    }else{
        dirX = 1;
    }

    if (this.posY > playerPosY){
        dirY = -1;
    }else{
        dirY = 1;
    }

    if(!this.checkEnemyPosition(this.posX + this.speed*dirX, this.posY)){
        this.posX += this.speed*dirX;
    }

    if(!this.checkEnemyPosition(this.posX, this.posY + this.speed*dirY)){
        this.posY += this.speed*dirY;
    }
}

// 
/**
 * Checks whether some enemy exists in position (`posX`, `posY`)
 * if `this` enemy object were to move to that position
 * @param {number} posX 
 * @param {number} posY 
 * @returns True if position is unoccupied. False otherwise.
 */
function checkEnemyPosition(posX, posY){
    var i;
    var enemies = EnemyController.getEnemies();
    var numOfEnemies = EnemyController.getNumberOfEnemies();

    for(i = 0; i < numOfEnemies; i++){
        var otherEnemy = enemies[i];
        otherEnemy.updateHitBox(); // Force an update on the hitbox as some enemies might have not yet updated their hitboxes

        if (otherEnemy !== this){
            // True iff both ranges of x and y of each of the enemy objects are not eclusive (intersect somewhere)
            // Note: Here, to pretend like the object move to (posX,posY), subtract its current position from the hitBox and add the temporary positions
            if (!isExclusiveIntervals(this.hitBoxLeftX-this.posX+posX, this.hitBoxRightX-this.posX+posX, otherEnemy.hitBoxLeftX, otherEnemy.hitBoxRightX) && 
                !isExclusiveIntervals(this.hitBoxTopY-this.posY+posY, this.hitBoxBottomY-this.posY+posY, otherEnemy.hitBoxTopY, otherEnemy.hitBoxBottomY)){
                return true;
            }
        }
    }

    return false;
}

/**
 * Checks whether `this` enemy object collides with the `player` object
 * @param {Player} player Player object
 */
function checkPlayerCollision(player){
    if(this.hitProtection) return;

    if (!isExclusiveIntervals(this.hitBoxLeftX, this.hitBoxRightX, player.getHitBoxLeftX(), player.getHitBoxRightX()) && 
        !isExclusiveIntervals(this.hitBoxTopY, this.hitBoxBottomY, player.getHitBoxTopY(), player.getHitBoxBottomY())){
        this.colour = this.hitColour;
        this.applyDamage(player.meeleDamage);
        this.hitProtection = true;
        setTimeout(resetHitProtection, player.meeleAttackSpeed, this);
    }
}

/**
 * Applies damage to the enemy
 * @param {number} damage Damage to be applies
 */
function applyDamage(damage){
    this.currentHealth -= damage;
    if(this.currentHealth <= 0){
        this.destroyEnemy();
    }
}

// Note: This function is being called by setTimeout (object Window)
// so the enemy instance isn't calling this function so in order
// to access the correct attributes we need to pass the enemy instance
// This is like a static function (class bound not instance/object bound)
function resetHitProtection(enemy){
    enemy.hitProtection = false;
    enemy.colour = enemy.defaultColour;
}

/**
 * Destroys the enemy
 */
function destroyEnemy(){
    this.isDestroyed = true;
}