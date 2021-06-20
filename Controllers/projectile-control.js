import { Player } from "../Entities/player.js";
import {ProjectileFriendly} from "../Entities/Projectiles/projectile-friendly.js";
import {getGameAreaWidth, getGameAreaHeight} from "../main.js";

// Attributes
var friendlyProjectiles = [];

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
}

/**
 * Removes all projectiles in the game
 * 
 */
export function reset(){
    friendlyProjectiles = [];
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
}

/**
 * Removes projectiles that are destroyed
 */
function removeDestroyedProjectiles(){
    
    // Remove friendly projectiles
    var i;
    var tempFriendlyProjectiles = [];

    for(i = 0; i < friendlyProjectiles.length; i++){
        if(!friendlyProjectiles[i].isDestroyed){
            tempFriendlyProjectiles.push(friendlyProjectiles[i]);
        }
    }
    friendlyProjectiles = tempFriendlyProjectiles;
}