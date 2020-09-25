class Scene1 extends Phaser.Scene {
    constructor() {
        super({key: "Scene1"});
    }

    create() {
        this.text = this.add.text(0, 0, "Welcom to Scene1", {font: "40px Impact"})

        var tween = this.tweens.add({
            targets: this.text,
            x:200,
            y:250,
            duration:2000,
            ease: "Elastic",
            easeParams:[1.5, 0.5],
            delay: 1000,
            onComplete: function(src, tgt) {
                tgt[0].x = 0;
                tgt[0].y = 0;
                tgt[0].setColor("Red")
            }
        },this)


        this.input.keyboard.on('keyup', e => {
            if(e.key == "1"){
                this.scene.start("SceneMain");
            }
            if(e.key == "3"){
                this.scene.start("SceneMenu");
            }
        });
    }
}