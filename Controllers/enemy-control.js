import {EnemyCircle} from "/Entities/Enemies/enemy-circle.js";
import {isExclusiveIntervals} from "/Utilities/math.js";
import { Player } from "../Entities/player.js";

// Attributes
var enemies = {};
var numOfEnemies = 0;

/**
 * Adds an EnemyCircle at position (`posX`, `posY`) with `radius`
 * @param {number} posX 
 * @param {number} posY 
 * @param {number} radius 
 */
export function addEnemyCircle(posX, posY, radius){
    enemies[numOfEnemies] = new EnemyCircle(posX, posY, radius);
    numOfEnemies++;
}

/**
 * Draws enemies
 * @param {*} canvasContext 
 */
export function draw(canvasContext){
    var i;

    for(i = 0; i < numOfEnemies; i++){
        enemies[i].draw(canvasContext);
    }
}

/**
 * Updates enemies
 * @param {Player} player 
 */
export function update(player){
    removeDestroyedEnemies();

    var i;

    for(i = 0; i < numOfEnemies; i++){
        enemies[i].update(player);
    }
}

/**
 * Gets the reference to the enemies data structure
 * @returns enemies vector
 */
export function getEnemies(){
    return enemies;
}

/**
 * Gets the number of enemies
 * @returns number of enemies
 */
export function getNumberOfEnemies(){
    return numOfEnemies;
}

export function spawn(){
    spawnCircleOfEnemies(300, 300, 250, 1, 10);
}

/**
 * Removes enemies that are destroyed
 */
function removeDestroyedEnemies(){
    var i;
    var j = 0;
    var tempEnemies = {};

    for(i = 0; i < numOfEnemies; i++){
        if(!enemies[i].isDestroyed){
            tempEnemies[j] = enemies[i];
            j++;
        }
    }
    numOfEnemies = j;
    enemies = tempEnemies;
}

/**
 * Spawns EnemyCircle enemies in a circle with center (`centerX`, `centerY`) and `radius`
 * @param {number} centerX X-position of center of circle
 * @param {number} centerY Y-position of center of circle
 * @param {number} radius Radius of circle
 * @param {number} angleIncrement At each angle increment, an enemy will be spawned unless another enemy occupies the area
 * @param {number} enemyCircleRadius Radius of the enemy circles
 */
function spawnCircleOfEnemies(centerX, centerY, radius, angleIncrement, enemyCircleRadius){
    var currentAngle = 0;
    var tempRadius = 10; // Test radius (temporary, just for fun)

    while(currentAngle <= 360){
        var x = Math.cos(currentAngle)*radius;
        var y = Math.sin(currentAngle)*radius;

        // Only add the enemy if it does not spawn on top of another enemy
        if(!(checkEnemyOccupiedArea(x+centerX, y+centerY, tempRadius))){
            addEnemyCircle(x+centerX, y+centerY, tempRadius);
        }

        //tempRadius++;

        currentAngle += angleIncrement;
    }
}


/**
 * Checks whether an enemy occupies an area defined by the circle with
 * `radius` centered at (`x`, `y`)
 * @param {number} x X-position of center of circle
 * @param {number} y Y-position of center of circle
 * @param {number} radius Radius of circle
 * @returns True if an enemy is inside the area
 */
function checkEnemyOccupiedArea(x, y, radius){
    var i;
    for(i = 0; i < numOfEnemies; i++){
        var enemy = enemies[i];
        // True iff both ranges of x and y of each of the enemy objects are not eclusive (intersect somewhere)
        if (!isExclusiveIntervals(x-radius, x+radius, enemy.hitBoxLeftX, enemy.hitBoxRightX) && 
            !isExclusiveIntervals(y-radius, y+radius, enemy.hitBoxTopY, enemy.hitBoxBottomY)){
            return true;
        }
    }

    return false;
}