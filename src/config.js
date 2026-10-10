class Config {
    static puyoImageWidth = 40;
    static puyoImageHeight = 40;

    static stageCols = 6;
    static stageRows = 12;
    static stageBackgroundColor = '#11213b';
    static nextBackgroundColor = '#e2a9c8';
    static scoreBackgroundColor = '#24c0bb';

    //
    static initialBoard = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];

    static puyoColorMax = 4;    // ぷよの色数
    static fallingSpeed  = 5;   // 自由落下のスピード
    static erasePuyoCount = 4;  // ぷよが消える連結数
    static eraseAnimationFrames = 30;   // ぷよ消去アニメーションのフレーム数
    static zenkeshiDuration = 150;      // 全消しアニメーション時間[msec]

    static playerFallingSpeed = 0.9;    // プレイ中の自由落下スピード
    static playerLockDelayFrames = 20;  // 何フレーム接地したらぷよを固定するか
    static playerDownSpeed = 10;        // 高速落下スピード
    static playerMoveFrames = 10;       // 左右移動のフレーム数
    static playerRotateFrames = 10;   // 回転のフレーム数

    static scoreHeight = 33;
    static comboBonusTable = [0, 0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 512, 544, 576, 608, 640, 672];
    static pieceBonusTable = [0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 10];
    static colorBonusTable = [0, 0, 3, 6, 12, 24];
    static zenkeshiBonus = 3600;

    static batankyuAnimationFrames = 1000;
}
