let isGameStart = null;

// 
window.addEventListener("load", () => {
        //
        initialize();
        clearBoard();

        // 画面が横長ならゲームスタート
        if (window.innerWidth > window.innerHeight) {
            gameStageScaling();
            startGame();
        }
    });

// 画面が縦長の場合、横回転を待ち検出
window.addEventListener("resize", () => {
    // 横長になったことを確認
    if (window.innerWidth > window.innerHeight) {
        gameStageScaling();

        if (!isGameStart) {
            startGame();
        }
    }
});

// ステージサイズを画面に合わせて最適化
function gameStageScaling() {
    const scale = window.innerHeight / 
                    (Score.scoreElement.offsetTop + Score.scoreElement.offsetHeight- Config.puyoImageHeight);
    document.getElementById("gameStage").style.transform = "scale(" + scale + ")";
}

function levelSetting(numColors) {
    resetInitialize();
    Config.puyoColorMax = numColors;
    Stage.initialize();
    Stage.stageElement.style.backgroundImage = `url("${GameImage.getPuyoImage(5).src}")`;
}


function startGame() {
    isGameStart = true;
    
    //
    // const scale = window.innerHeight / 
    //                 (Score.scoreElement.offsetTop + Score.scoreElement.offsetHeight- Config.puyoImageHeight);
    //                 // (Score.scoreElement.offsetTop + Score.scoreElement.offsetHeight);
    // document.getElementById("gameStage").style.transform = "scale(" + scale + ")";
    

    // 辛さ（レベル）選択ボタン
    const levelBtnsElement = document.getElementById("levelBtns");
    const amakuchiElement = document.getElementById("amakuchi");
    const chuukaraElement = document.getElementById("chuukara");
    const karakuchiElement = document.getElementById("karakuchi");

    const startBtnElement = document.getElementById("startBtn");

    amakuchiElement.addEventListener("click", () => {
        levelBtnsElement.style.display = "none";
        startBtnElement.style.display = "block";

        levelSetting(3);
    });

    amakuchiElement.addEventListener("touchstart", () => {
        levelBtnsElement.style.display = "none";

        setTimeout(() => {
            startBtnElement.style.display = "block";
        }, 300);

        levelSetting(3);
    });

    chuukaraElement.addEventListener("click", () => {
        levelBtnsElement.style.display = "none";
        startBtnElement.style.display = "block";

        levelSetting(4);
    });

    chuukaraElement.addEventListener("touchstart", () => {
        levelBtnsElement.style.display = "none";

        setTimeout(() => {
            startBtnElement.style.display = "block";
        }, 300);

        levelSetting(4);
    });

    karakuchiElement.addEventListener("click", () => {
        levelBtnsElement.style.display = "none";
        startBtnElement.style.display = "block";

        levelSetting(5);
    });

    karakuchiElement.addEventListener("touchstart", () => {
        levelBtnsElement.style.display = "none";

        setTimeout(() => {
            startBtnElement.style.display = "block";
        }, 300);

        levelSetting(5);
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

    // ゲームオーバー時の「もういちど」ボタン定義
    const resetBtnElement = document.getElementById("resetBtn");

    resetBtnElement.addEventListener("click", () => {
        resetBtnElement.style.display = "none";
        document.getElementById("levelBtns").style.display = "flex";
    });

    resetBtnElement.addEventListener("touchstart", () => {
        resetBtnElement.style.display = "none";

        setTimeout(() => {
            document.getElementById("levelBtns").style.display = "flex";    
        }, 300);
    });

    //
    // gameLoop();
};


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
    Controls.initialize();

    //
    isGameStart = false;
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

    // ぷよ色のランダム化
    GameImage.randomPuyoColor();
}

// 画面のクリア
function clearBoard() {
    // 盤面に残っているぷよの消去
    const children = Stage.stageElement.children;
    while (children.length > 2) {
        children[2].remove();
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