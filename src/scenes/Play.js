class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // Define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);

        // Background
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        // Players
        this.p1Rocket = new Rocket(this, game.config.width/3, 431, 'rocket', 0, 1);
        this.p2Rocket = new Rocket(this, game.config.width/3 * 2, 431, 'rocket', 0, 2);

        // Add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // Green Rectangle
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // White Border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // Explosion
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        // Initialize scores
        this.p1Score = 0;
        this.p2Score = 0;

        //displays score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth, borderUISize + borderPadding * 2, this.p2Score, scoreConfig);

        //Game Over flag
        this.gameOver = false;

        //Play timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.bg.tilePositionX -= 4;
        this.bg.tilePositionY -= 2;

        if (!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //Checks collisions
        if (this.checkCollisions(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.p1Score += this.shipExplode(this.ship03);
            this.scoreLeft.text = this.p1Score;
        }
        if (this.checkCollisions(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.p1Score += this.shipExplode(this.ship02);
            this.scoreLeft.text = this.p1Score;
        }
        if (this.checkCollisions(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.p1Score += this.shipExplode(this.ship01);
            this.scoreLeft.text = this.p1Score;
        }
        if (this.checkCollisions(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.p2Score += this.shipExplode(this.ship03);
            this.scoreRight.text = this.p2Score;
        }
        if (this.checkCollisions(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.p2Score += this.shipExplode(this.ship02);
            this.scoreRight.text = this.p2Score;
        }
        if (this.checkCollisions(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.p2Score += this.shipExplode(this.ship01);
            this.scoreRight.text = this.p2Score;
        }
    }

    checkCollisions (rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode (ship) {
        //hides ship
        ship.alpha = 0;
        //creates explosion sprite
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        ship.reset();
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.alpha = 1;
            boom.destroy();
        });

        //sound
        this.sound.play('sfx_explosion');
        return ship.points;
    }
}