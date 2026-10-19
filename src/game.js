//
window.addEventListener("load", () => {
    //
    initialize();
    clearBoard();

    //
    const scale = window.innerHeight / (Score.scoreElement.offsetTop + Score.scoreElement.offsetHeight);
    document.getElementById("gameStage").style.transform = "scale(" + scale + ")";
    

    // 辛さ（レベル）選択ボタン
    const levelBtnsElement = document.getElementById("levelBtns");
    const amakuchiElement = document.getElementById("amakuchi");
    const chuukaraElement = document.getElementById("chuukara");
    const karakuchiElement = document.getElementById("karakuchi");

    const startBtnElement = document.getElementById("startBtn");

    amakuchiElement.addEventListener("click", () => {
        levelBtnsElement.style.display = "none";
        startBtnElement.style.display = "block";

        resetInitialize();
        Config.puyoColorMax = 3;
        Stage.initialize();
    });

    amakuchiElement.addEventListener("touchstart", () => {
        levelBtnsElement.style.display = "none";
        startBtnElement.style.display = "block";

        resetInitialize();
        Config.puyoColorMax = 3;
        Stage.initialize();
    });

    chuukaraElement.addEventListener("click", () => {
        levelBtnsElement.style.display = "none";
        startBtnElement.style.display = "block";

        resetInitialize();
        Config.puyoColorMax = 4;
        Stage.initialize();
    });

    chuukaraElement.addEventListener("touchstart", () => {
        levelBtnsElement.style.display = "none";
        startBtnElement.style.display = "block";

        resetInitialize();
        Config.puyoColorMax = 4;
        Stage.initialize();
    });

    karakuchiElement.addEventListener("click", () => {
        levelBtnsElement.style.display = "none";
        startBtnElement.style.display = "block";

        resetInitialize();
        Config.puyoColorMax = 5;
        Stage.initialize();
    });

    karakuchiElement.addEventListener("touchstart", () => {
        levelBtnsElement.style.display = "none";
        startBtnElement.style.display = "block";

        resetInitialize();
        Config.puyoColorMax = 5;
        Stage.initialize();
    });

    // 開始時・リセット時のスタートボタン定義    
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
        document.getElementById("levelBtns").style.display = "flex";
    });

    resetBtnElement.addEventListener("touchstart", () => {
        resetBtnElement.style.display = "none";
        document.getElementById("levelBtns").style.display = "flex";
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
                gameState = "batankyu2"
            };
            break;
        case "batankyu2":
            GameImage.updateBatankyu(frame);
            break;
    }
    frame++;
    setTimeout(gameLoop, 1000/60);
}

// リセット時の初期化
function resetInitialize() {
    clearBoard();
    Score.initialize();
    frame = 0;
    frameBatankyu = 0;
}

// 画面のクリア
function clearBoard() {
    // 盤面に残っているぷよの消去
    const children = Stage.stageElement.children;
    while (children.length > 1) {
        children[1].remove();
    }

    // nextぷよ領域の削除
    for (const element of Stage.nextPuyoElements) {
        element.remove();
    };
    for (const element of Stage.next2ndPuyoElements) {
        element.remove();
    };
    document.getElementById("next").replaceChildren;
}