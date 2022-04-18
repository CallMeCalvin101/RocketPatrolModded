/* Name: Vincent Kurniadjaja
 * Project Name: Rocket Patrol for 2
 * Date: 4/18/2022
 * Time to complete: 10 hours
 * 
 * Modifications
 *      30 - Simultaneous 2 player
 *      20 - New Art For In-Game Assets
 *      20(+?) - Smaller/Faster Spaceship w/ y movement
 *      10 - New Title Screen
 *      10 - Animated Ships
 *      10 - UI Border w/ Art
 *      10 - Display Time Remaining
 */

console.log("Hello from main.js");

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

//reserve keyboard vars
let keyW, keyA, keyD, keyI, keyJ, keyL, keyR, keyLEFT, keyRIGHT;

//set UI sizes
let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;

let game = new Phaser.Game(config);