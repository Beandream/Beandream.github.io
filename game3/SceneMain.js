class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: 'SceneMain'});
    }

    preload() {
        this.load.image('player', 'assets/Capture.png');
    }

    create() {
        this.image = this.physics.add.staticImage(400, 300, 'player');
        this.image.setCollideWorldBounds(true);

        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        var crates = this.physics.add.group({
            bounceX: 1,
            bounceY: 1,
            collideWorldBounds: true,
        });

        this.input.on('pointerdown', e => {
            // var physicsImage = this.physics.add.image(e.x, e.y, 'player');
            // physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100, 100),  - 300);
            // this.physics.add.collider(physicsImage);
            var box = crates.create(e.x, e.y, 'player');
            box.setVelocity(Phaser.Math.RND.integerInRange(-300, 300),  - 300);
        });

        

    
        this.physics.add.collider(crates);
        this.physics.add.collider(this.image, crates);


        this.input.keyboard.on('keyup', e => {
            if(e.key == "2"){
                this.scene.start("Scene1");
            }
            if(e.key == "3"){
                this.scene.start("SceneMenu");
            }
        });
    }

    update(delta) {
        if(this.key_A.isDown) {
            this.image.x -= 5;
        }
        if(this.key_D.isDown) {
            this.image.x += 5;
        }
        if(this.key_W.isDown) {
            this.image.y -= 5;
        }
        if(this.key_S.isDown) {
            this.image.y += 5;
        }
        this.image.refreshBody();
    }
}