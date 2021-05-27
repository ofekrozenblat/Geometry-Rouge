import {startGame} from "/main.js";
import {setStartMenuVisibile} from "./gui-manager.js";

/**
 * Manages all the onClick functions of the buttons
 * (i.e. This file stores all the onClick functions that correspond to the GUI buttons)
 */

export function onClickButtonStart(){
    startGame();
    setStartMenuVisibile(false);
}