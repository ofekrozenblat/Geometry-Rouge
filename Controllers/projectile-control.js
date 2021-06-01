import { Player } from "../Entities/player.js";
import {ProjectileFriendly} from "../Entities/Projectiles/projectile-friendly.js";
import {getCanvasWdith, getCanvasHeight} from "../main.js";

// Attributes
var friendlyProjectiles = [];
var numOfFriendlyProjectiles = 0; // True number of friendlyProjectiles

/**
 * Adds a friendly projectile at position (`posX`, `posY`) with `angle`
 * @param {number} posX 
 * @param {number} posY 
 * @param {number} angle 
 */
export function addFriendlyProjectile(posX, posY, angle, speed){
    numOfFriendlyProjectiles = friendlyProjectiles.push(new ProjectileFriendly(posX, posY, angle, speed));
}

/**
 * Draws projectiles
 * @param {*} canvasContext 
 */
export function draw(canvasContext){
    var projectiles = getFriendlyProjectiles();

    // ------- FOR TESTING ----------
    // canvasContext.fillStyle = "black";
    // canvasContext.fillText("[Debug] Projectiles: " + projectiles.length, 450, 60);
    // ------------------------------

    var i;
    for(i = 0; i < projectiles.length; i++){
        projectiles[i].draw(canvasContext);
    }
}

/**
 * Updates projectiles
 */
export function update(){
    checkOutOfBoundProjectiles();
    removeDestroyedProjectiles();

    var projectiles = getFriendlyProjectiles();

    var i;
    for(i = 0; i < projectiles.length; i++){
        projectiles[i].update();
    }
}

/**
 * Gets the reference to the friendly projectile data structure
 * (Only includes projectiles which are not destroyed or out of bounds)
 * @returns friendly projectiles vector
 */
export function getFriendlyProjectiles(){
    checkOutOfBoundProjectiles(); // Check out of bounds (additional update)

    var i;
    var tempFriendlyProjectiles = [];

    for(i = 0; i < numOfFriendlyProjectiles; i++){
        if(!friendlyProjectiles[i].isDestroyed){
            tempFriendlyProjectiles.push(friendlyProjectiles[i]);
        }
    }

    return tempFriendlyProjectiles;
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
    var tempFriendlyProjectiles = [];

    for(i = 0; i < numOfFriendlyProjectiles; i++){
        if(!friendlyProjectiles[i].isDestroyed){
            j = tempFriendlyProjectiles.push(friendlyProjectiles[i]);
        }
    }
    numOfFriendlyProjectiles = j;
    friendlyProjectiles = tempFriendlyProjectiles;
}