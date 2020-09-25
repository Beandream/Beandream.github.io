class SceneMenu extends Phaser.Scene{
    constructor(){
        super({key:'SceneMenu'});
    }

    preload() {
        this.load.audio('test', ['assets/pop.wav'])
    }

    create() {
        // this.text = this.text.add(100, 100, "Start Game", {fill: '#0f0'});
        this.text = this.add.text(300, 200, "Start Game", {font: "40px Impact", boundsAlignH: "center", boundsAlignV: "middle"})

        this.text.setInteractive();
        this.soundFX = this.sound.add("test");
        this.soundFX.rate = 0.5;

        this.text.on('pointerover', e=> {
            this.text.setColor("Red");
        });
        this.text.on('pointerout', e=> {
            this.text.setColor("White");
        })
        this.text.on('pointerup', e=> {
            this.soundFX.play();
            this.scene.start('Level1');
        })

        this.input.keyboard.on('keyup', e => {
            if(e.key == "1"){
                this.scene.start("SceneMain");
            }
            if(e.key == "2"){
                this.scene.start("Scene1");
            }
        });
    }
}