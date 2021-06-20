import {Projectile} from "./projectile.js";
import * as EnemyController from "/Controllers/enemy-control.js";
import {isExclusiveIntervals} from "/Utilities/math.js";

// -----------------------------------------
// ----------- Enemy Circle Class ----------
// -----------------------------------------

export function ProjectileFriendly(posX, posY, angle, speed){
    // Dimensions
    this.width = 2;
    this.height = 5;

    // Center point of the projectile
    this.posX = posX;
    this.posY = posY;

    // Speed of the projectile
    this.speed = speed;

    // Angle of projectile
    this.angle = angle;

    this.isDestroyed = false;
}

// Inherit from projectile.js
ProjectileFriendly.prototype = new Projectile();

// Functions of object (Class)
ProjectileFriendly.prototype.checkEnemyCollision = checkEnemyCollision;

// -----------------------------------------
// --------Implemented Abstract Methods ----
// -----------------------------------------
function checkEnemyCollision(){
    var i;
    var enemies = EnemyController.getEnemies();

    for(i = 0; i < enemies.length; i++){
        var enemy = enemies[i];
        // True iff both ranges of x and y of each of the enemy objects are not eclusive (intersect somewhere)
        // Note: Here, to pretend like the object move to (posX,posY), subtract its current position from the hitBox and add the temporary positions
        if (!isExclusiveIntervals(this.getHitBoxLeftX(), this.getHitBoxRightX(), enemy.hitBoxLeftX, enemy.hitBoxRightX) && 
            !isExclusiveIntervals(this.getHitBoxTopY(), this.getHitBoxBottomY(), enemy.hitBoxTopY, enemy.hitBoxBottomY)){
            // For now just destroy both projectile and enemy immediatley
            enemy.destroyEnemy();
            this.destroyProjectile();
        }
    }
}