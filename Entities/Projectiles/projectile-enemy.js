import {Projectile} from "./projectile.js";
import * as EnemyController from "/Controllers/enemy-control.js";
import {isExclusiveIntervals} from "/Utilities/math.js";
import {getPlayer} from "../../main.js";

// -----------------------------------------
// ----------- Enemy Circle Class ----------
// -----------------------------------------

export function ProjectileEnemy(posX, posY, angle, speed){
    // Dimensions
    this.width = 2;
    this.height = 5;

    // Colour of projectile
    this.colour = "#7a0f07";

    // Center point of the projectile
    this.posX = posX;
    this.posY = posY;

    // Speed and direction of the projectile
    this.dir = -1; // 1 - up, -1 - down
    this.speed = speed;

    // Angle of projectile
    this.angle = angle;

    // Projectile status
    this.isDestroyed = false;
    
    // Projectile dmg
    this.damage = 1;
}

// Inherit from projectile.js
ProjectileEnemy.prototype = new Projectile();

// Functions of object (Class)
ProjectileEnemy.prototype.checkEnemyCollision = checkEnemyCollision;

// -----------------------------------------
// --------Implemented Abstract Methods ----
// -----------------------------------------
function checkEnemyCollision(){
    var player = getPlayer();
    if (!isExclusiveIntervals(this.hitBoxLeftX, this.hitBoxRightX, player.getHitBoxLeftX(), player.getHitBoxRightX()) && 
        !isExclusiveIntervals(this.hitBoxTopY, this.hitBoxBottomY, player.getHitBoxTopY(), player.getHitBoxBottomY())){
            player.applyDamage(this.damage);
            this.destroyProjectile();
    }
}