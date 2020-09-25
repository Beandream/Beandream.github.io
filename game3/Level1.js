class Level1 extends Phaser.Scene{
    constructor(){
        super({key:'Level1'});
    }

    preload() {
        this.load.image('player', 'assets/Capture.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('star', 'assets/star.png');
        this.load.audio('pop', ['assets/pop.wav'])
    }

    create() {

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setBounce(0.2);
        // this.player.setCollideWorldBounds(true);

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.soundFX = this.sound.add("test");
        this.soundFX.rate = 1.5;

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
        });

        this.input.keyboard.on('keyup', e => {
            if(e.key == "1"){
                this.scene.start("SceneMain");
            }
            if(e.key == "2"){
                this.scene.start("Scene1");
            }
        });

        var score = 0;

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' }).setScrollFactor(0);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, (player, star) => {
            this.soundFX.play();
            star.setPosition((Phaser.Math.RND.integerInRange(0, 800)), 0);
            score += 10;
            this.scoreText.setText('Score: ' + score);
        }, null, this);

        this.cameras.main.setSize(800, 600);

        this.cameras.main.startFollow(this.player, false, 0.1, 0.1);

    }

    update(delta) {
        if(this.key_A.isDown) {
            this.player.setVelocityX(-380);
        } 
        else if(this.key_D.isDown) {
           this.player.setVelocityX(380);
        } else {
            this.player.setVelocityX(0);
        }
        if(this.key_W.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-750);
        }
    }    
}