import {Player} from "../player.js";
import {Enemy} from "./enemy.js";
import {getGameAreaHeight, getGameAreaWidth} from "../../main.js";
import * as ProjectileControl from "../../Controllers/projectile-control.js";

// -----------------------------------------
// ----------- Enemy Circle Class ----------
// -----------------------------------------

export function EnemyCircleBoss(){
    this.CANVAS_WIDTH = getGameAreaWidth();
    this.CANVAS_HEIGHT = getGameAreaHeight();

    this.posX = this.CANVAS_WIDTH/2;
    this.posY = -50;
    this.radius = 40; // Fixed radius
    this.defaultColour = "red"
    this.colour = this.defaultColour;

    /* Enemy stats */
    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;
    this.speed = 0.5;
    this.damage = 1; // Damage the enemy applies to the player
    this.isDestroyed = false;

    // Define hitBox
    this.hitBoxLeftX = this.posX-this.radius;
    this.hitBoxRightX = this.posX+this.radius;
    this.hitBoxTopY = this.posY-this.radius;
    this.hitBoxBottomY = this.posY+this.radius;

    /* Firing mechanic*/
    this.allowedToFire = true;
    this.firingRate = 1000; // Firing rate in ms
}

// Inherit from enemy.js
EnemyCircleBoss.prototype = new Enemy();

// Functions of object (Class)
EnemyCircleBoss.prototype.updateHitBox = updateHitBox;
EnemyCircleBoss.prototype.moveToPlayer = moveToPlayer;
EnemyCircleBoss.prototype.fireProjectileRow = fireProjectileRow;

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

/**
 * @override Override the parent (Enemy) method to change the movement behaviour of a circle boss
 * 
 * @param {Player} player 
 */
function moveToPlayer(player){

    if(this.posY < this.CANVAS_HEIGHT/5){
        this.posY += this.speed;
    }else{
        // Once it's in position shoot a row of projectiles
        this.fireProjectileRow();
    }
}

function fireProjectileRow(){
    if (!this.allowedToFire) return;

    ProjectileControl.addEnemyProjectile(this.posX, this.posY, 0, 1);

    this.allowedToFire = false;

    setTimeout(function resetFiring(enemyCircleBoss){
        enemyCircleBoss.allowedToFire = true;
    }, this.firingRate, this);

}