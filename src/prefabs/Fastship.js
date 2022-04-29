class Fastship extends Spaceship {
    constructor (scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame, pointValue);
        scene.add.existing(this);
        this.moveSpeed = game.settings.spaceshipSpeed + 50;
        this.center = this.y;
    }

    update() {
        this.x -= this.moveSpeed;
        this.y = this.center + 50 * Math.sin(((this.x/2) * Math.PI/90));

        if (this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}
