//
window.addEventListener("load", () => {
    //
    initialize();

    //
    const scale = window.innerHeight / (Score.scoreElement.offsetTop + Score.scoreElement.offsetHeight);
    // document.body.style.transform = "scale(" + scale + ")";
    document.getElementById("gameStage").style.transform = "scale(" + scale + ")";


    //
    gameLoop();
});

let gameState;
let frame;
let comboCount = 0;


// デバッグ用（画面サイズ表示）
// function updateScreenSize() {
//   const screenW = screen.width;
//   const screenH = screen.height;

//   const viewW = window.innerWidth;
//   const viewH = window.innerHeight;

//   console.log("画面全体:", screenW, screenH);
//   console.log("表示領域:", viewW, viewH);
// }




function initialize() {
    //
    GameImage.initialize();

    //
    Stage.initialize();

    //
    Player.initialize();

    //
    Score.initialize();

    // 操作ボタン初期化
    controls.initialize();

    //
    gameState = "start";
    //
    frame = 0;


    // デバッグ用（画面サイズ表示）
    // updateScreenSize();
    // console.log(document.getElementById("gameStage").offsetHeight)
    // console.log(window.innerHeight)
    // console.log(Config.controlsMarginBottom)
    // console.log(Stage.leftControlsElement.style.marginBottom)
}

function gameLoop() {
    switch (gameState) {
        case "start":
            //
            //
            gameState = "checkFallingPuyo";
            break;
        case "checkFallingPuyo":
            //
            if (Stage.checkFallingPuyo()) {
                gameState = "fallingPuyo";
            } else {
                gameState = "checkPuyoErase";
            }
            break;
        case "fallingPuyo":
            //
            if (!Stage.fallPuyo()) {
                gameState = "checkPuyoErase";
            }
            break;
        case "checkPuyoErase":
            //
            const eraseInfo = Stage.checkPuyoErase(frame);
            if (eraseInfo) {
                gameState = "erasingPuyo";
                comboCount++;
                //
                Score.addComboScore(comboCount, eraseInfo.piece, eraseInfo.color);
                Stage.hideZenkeshi();
            } else {
                if (Stage.puyoCount ===0 && comboCount > 0) {
                    //
                    Stage.showZenkeshi();
                    //
                    Score.addScore(Config.zenkeshiBonus);
                }
                comboCount = 0;
                gameState ="createPlayerPuyo";
            }
            break;
        case "erasingPuyo":
            //
            if (!Stage.erasePuyo(frame)) {
                //
                gameState = "checkFallingPuyo";
            }
            break;
        case "createPlayerPuyo":
            //
            if (!Player.createPlayerPuyo()) {
                //
                gameState = "gameOver";
            } else {
                //
                gameState = "playing";
            }
            break;
        case "playing":
            //
            const nextAction = Player.update(frame);
            gameState = nextAction;
            break;
        case "fix":
            //
            Player.fixPlayerPuyo();
            //
            gameState = "checkFallingPuyo";
            break;
        case "moving":
            //
            if (Player.movePlayerPuyo(frame)) {
                //
                gameState = "playing";
            }
            break;
        case "rotating":
            if (Player.rotatePlayerPuyo(frame)) {
                //
                gameState = "playing";
            }
            break;
        case "gameOver":
            GameImage.prepareBatankyuAnimation(frame);
            gameState = "batankyu";
            break;
        case "batankyu":
            GameImage.updateBatankyu(frame);
            break;
    }
    frame++;
    setTimeout(gameLoop, 1000/60);
}
