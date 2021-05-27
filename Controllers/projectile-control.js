import { Player } from "../Entities/player.js";
import {ProjectileFriendly} from "../Entities/Projectiles/projectile-friendly.js";
import {getCanvasWdith, getCanvasHeight} from "../main.js";

// Attributes
var friendlyProjectiles = {};
var numOfFriendlyProjectiles = 0;

/**
 * Adds a friendly projectile at position (`posX`, `posY`) with `angle`
 * @param {number} posX 
 * @param {number} posY 
 * @param {number} angle 
 */
export function addFriendlyProjectile(posX, posY, angle){
    friendlyProjectiles[numOfFriendlyProjectiles] = new ProjectileFriendly(posX, posY, angle);
    numOfFriendlyProjectiles++;
}

/**
 * Draws projectiles
 * @param {*} canvasContext 
 */
export function draw(canvasContext){
    var i;

    for(i = 0; i < numOfFriendlyProjectiles; i++){
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

    for(i = 0; i < numOfFriendlyProjectiles; i++){
        friendlyProjectiles[i].update();
    }
}

/**
 * Gets the reference to the friendly projectile data structure
 * @returns friendly projectiles vector
 */
export function getFriendlyProjectiles(){
    return friendlyProjectiles;
}

/**
 * Gets the number of friendly projectiles
 * @returns number of friendly projectiles
 */
export function getNumberOfFriendlyProjectiles(){
    return numOfFriendlyProjectiles;
}

/**
 * Check if projectiles are out of the screen and removes them
 */
function checkOutOfBoundProjectiles(){
    var CANVAS_WIDTH = getCanvasWdith();
    var CANVAS_HEIGHT = getCanvasHeight(); 
    var i;

    for(i = 0; i < numOfFriendlyProjectiles; i++){
        var x = friendlyProjectiles[i].posX;
        var y = friendlyProjectiles[i].posY;

        if(x < 0 || x > CANVAS_WIDTH || y < 0 || y > CANVAS_HEIGHT){
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
    var j = 0;
    var tempFriendlyProjectiles = {};

    for(i = 0; i < numOfFriendlyProjectiles; i++){
        if(!friendlyProjectiles[i].isDestroyed){
            tempFriendlyProjectiles[j] = friendlyProjectiles[i];
            j++;
        }
    }
    numOfFriendlyProjectiles = j;
    friendlyProjectiles = tempFriendlyProjectiles;
}