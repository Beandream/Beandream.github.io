var config = {
    type: Phaser.AUTO,
    width:800,
    height:600,
    backgroundColor: 0x000000,
    physics: {
        default:'arcade',
        arcade: {
            gravity: {y: 1200}
        }
    },
    scene: [SceneMenu, Scene1, SceneMain, Level1]
};

var game = new Phaser.Game(config);
