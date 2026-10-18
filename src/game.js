//
window.addEventListener("load", () => {
    //
    initialize();

    //
    const scale = window.innerHeight / (Score.scoreElement.offsetTop + Score.scoreElement.offsetHeight);
    // document.body.style.transform = "scale(" + scale + ")";
    document.getElementById("gameStage").style.transform = "scale(" + scale + ")";
    

    // 開始時・リセット時のスタートボタン定義
    const startBtnElement = document.getElementById("startBtn");
    startBtnElement.addEventListener("click", () => {
        startBtnElement.style.display = "none";
        if (gameState === "start") {
            gameLoop();
        } else {
            gameState = "start";
        }
    });

    startBtnElement.addEventListener("touchstart", () => {
        startBtnElement.style.display = "none";
        if (gameState === "start") {
            gameLoop();
        } else {
            gameState = "start";
        }
    });

    // ゲームオーバー時のリセットボタン定義
    const resetBtnElement = document.getElementById("resetBtn");
    resetBtnElement.addEventListener("click", () => {
        resetBtnElement.style.display = "none";
        resetInitialize();

        document.getElementById("startBtn").style.display = "block";
        gameState = "wait";
    });

    resetBtnElement.addEventListener("touchstart", () => {
        resetBtnElement.style.display = "none";
        resetInitialize();

        document.getElementById("startBtn").style.display = "block";
        gameState = "wait";
    });

    //
    // gameLoop();
});


// デバッグ用（画面サイズ表示）
// function updateScreenSize() {
//   const screenW = screen.width;
//   const screenH = screen.height;

//   const viewW = window.innerWidth;
//   const viewH = window.innerHeight;

//   console.log("画面全体:", screenW, screenH);
//   console.log("表示領域:", viewW, viewH);
// }


// document.getElementById("startBtn").addEventListener("click", () => {
//     gameLoop();
// });

let gameState;
let frame;
let comboCount = 0;
let frameBatankyu;

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
    frameBatankyu = 0;


    // デバッグ用（画面サイズ表示）
    // updateScreenSize();
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
        case "rotatingCcw":
            if (Player.rotatePlayerPuyo(frame, 1)) {
                //
                gameState = "playing";
            }
            break;
        case "rotatingCw":
            if (Player.rotatePlayerPuyo(frame, -1)) {
                //
                gameState = "playing";
            }
            break;
        case "gameOver":
            GameImage.prepareBatankyuAnimation(frame);
            gameState = "batankyu";
            break;
        case "batankyu":
            frameBatankyu++;
            GameImage.updateBatankyu(frame);
            
            if (frameBatankyu > 60) {
                document.getElementById("resetBtn").style.display = "block";
            };
            break;
        // case "wait":
        //     break;
    }
    frame++;
    setTimeout(gameLoop, 1000/60);
}

// リセット時の初期化
function resetInitialize() {
    // 盤面に残っているぷよの消去
    const children = Stage.stageElement.children;
    while (children.length > 1) {
        children[1].remove();
    }

    // nextぷよ領域の削除
    document.getElementById("next").replaceChildren;

    // GameImage.initialize();
    Stage.initialize();
    Player.initialize();
    Score.initialize();
    // controls.initialize();

    gameState = "start";
    //
    frame = 0;
    frameBatankyu = 0;
}