class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        //firing
        this.isFiring = false;
        this.moveSpeed = 2;
        this.player = player;

        //sound
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // Player 1 Mapping
        if (this.player == 1) {
            if (!this.isFiring) {
                if (keyA.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }

            if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();
            }

            if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                this.y -= this.moveSpeed
            }

            if (this.y <= borderUISize * 3 + borderPadding) {
                this.isFiring = false;
                this.y = game.config.height - borderUISize - borderPadding;
            }
        }

        // Player 2 Mapping
        if (this.player == 2) {
            if (!this.isFiring) {
                if (keyJ.isDown && this.x >= borderUISize + this.width) {
                    this.x -= this.moveSpeed;
                } else if (keyL.isDown && this.x <= game.config.width - borderUISize - this.width) {
                    this.x += this.moveSpeed;
                }
            }

            if (Phaser.Input.Keyboard.JustDown(keyI) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();
            }

            if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
                this.y -= this.moveSpeed
            }

            if (this.y <= borderUISize * 3 + borderPadding) {
                this.isFiring = false;
                this.y = game.config.height - borderUISize - borderPadding;
            }
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}