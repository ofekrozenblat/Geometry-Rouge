import { Player } from "../Entities/player.js";
import {ProjectileEnemy} from "../Entities/Projectiles/projectile-enemy.js";
import {ProjectileFriendly} from "../Entities/Projectiles/projectile-friendly.js";
import {getGameAreaWidth, getGameAreaHeight} from "../main.js";

// Attributes
var friendlyProjectiles = [];
var enemyProjectiles = [];

/**
 * Adds a friendly projectile at position (`posX`, `posY`) with `angle`
 * @param {number} posX 
 * @param {number} posY 
 * @param {number} angle 
 */
export function addFriendlyProjectile(posX, posY, angle, speed){
    friendlyProjectiles.push(new ProjectileFriendly(posX, posY, angle, speed));
}

/**
 * Adds an enemy projectile at position (`posX`, `posY`) with `angle`
 * @param {number} posX 
 * @param {number} posY 
 * @param {number} angle 
 */
 export function addEnemyProjectile(posX, posY, angle, speed){
    enemyProjectiles.push(new ProjectileEnemy(posX, posY, angle, speed));
}

/**
 * Draws projectiles
 * @param {*} canvasContext 
 */
export function draw(canvasContext){

    // ------- FOR TESTING ----------
    // canvasContext.fillStyle = "black";
    // canvasContext.fillText("[Debug] Projectiles: " + projectiles.length, 450, 60);
    // ------------------------------

    var i;
    for(i = 0; i < friendlyProjectiles.length; i++){
        friendlyProjectiles[i].draw(canvasContext);
    }
    
    for(i = 0; i < enemyProjectiles.length; i++){
        enemyProjectiles[i].draw(canvasContext);
    }
}

/**
 * Updates projectiles
 */
export function update(){
    checkOutOfBoundProjectiles();
    removeDestroyedProjectiles();

    var i;
    for(i = 0; i < friendlyProjectiles.length; i++){
        friendlyProjectiles[i].update();
    }

    for(i = 0; i < enemyProjectiles.length; i++){
        enemyProjectiles[i].update();
    }
}

/**
 * Removes all projectiles in the game
 * 
 */
export function reset(){
    friendlyProjectiles = [];
    enemyProjectiles = [];
}

/**
 * Check if projectiles are out of the screen and removes them
 */
function checkOutOfBoundProjectiles(){
    var gameAreaWidth = getGameAreaWidth();
    var gameAreaHeight = getGameAreaHeight(); 

    var i;

    for(i = 0; i < friendlyProjectiles.length; i++){
        var x = friendlyProjectiles[i].posX;
        var y = friendlyProjectiles[i].posY;

        if(x < 0 || x > gameAreaWidth || y < 0 || y > gameAreaHeight){
            friendlyProjectiles[i].destroyProjectile();
        }
    }

    for(i = 0; i < enemyProjectiles.length; i++){
        var x = enemyProjectiles[i].posX;
        var y = enemyProjectiles[i].posY;

        if(x < 0 || x > gameAreaWidth || y < 0 || y > gameAreaHeight){
            enemyProjectiles[i].destroyProjectile();
        }
    }
}

/**
 * Removes projectiles that are destroyed
 */
function removeDestroyedProjectiles(){
    
    // Remove friendly projectiles
    var i;
    var tempFriendlyProjectiles = [];
    var tempEnemyProjectiles = [];

    for(i = 0; i < friendlyProjectiles.length; i++){
        if(!friendlyProjectiles[i].isDestroyed){
            tempFriendlyProjectiles.push(friendlyProjectiles[i]);
        }
    }
    friendlyProjectiles = tempFriendlyProjectiles;

    for(i = 0; i < enemyProjectiles.length; i++){
        if(!enemyProjectiles[i].isDestroyed){
            tempEnemyProjectiles.push(enemyProjectiles[i]);
        }
    }
    enemyProjectiles = tempEnemyProjectiles;
}