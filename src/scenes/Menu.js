class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        //loads audio
        this.load.audio('sfx_select', './assets/selectSound.wav');
        this.load.audio('sfx_explosion', './assets/explosionSound.wav');
        this.load.audio('sfx_rocket', './assets/rocketSound.wav');

        this.load.image('menubg', './assets/menubackground.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '22px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //displays menu text
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'menubg').setOrigin(0,0);

        //Press <- for Novice or -> for Expert
        menuConfig.color = '#000';
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height + borderPadding - 2 * (borderUISize + borderPadding), 'P1: Fire (W) Left (A) Right (D)   <- SLOW   ', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height + borderPadding - (borderUISize + borderPadding), 'P2: Fire (I) Left (J) Right (K)      FAST ->', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
      }
}