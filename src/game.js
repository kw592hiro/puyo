let isGameStart = null;

// 
window.addEventListener("load", () => {
    //
    initialize();
    clearBoard();

    // 画面が横長ならゲームスタート
    checkOrientation(isGameStart);
});

// 画面が縦長の場合、横回転を待ち検出
window.addEventListener("resize", () => {
    // 横長かどうか確認し、ゲームスタート
    checkOrientation(isGameStart);
});

// 画面が横長の場合、ゲームスタート
function checkOrientation(falgGameStart) {
    if (window.innerWidth > window.innerHeight) {
        gameStageScaling();

        if (!falgGameStart) {
            startGame();
        }
    }
}

// ステージサイズを画面に合わせて最適化
function gameStageScaling() {
    const scale = window.innerHeight / 
                    (Score.scoreElement.offsetTop + Score.scoreElement.offsetHeight- Config.puyoImageHeight);
    document.getElementById("gameStage").style.transform = "scale(" + scale + ")";
}

// レベル（色数）に応じて設定
function levelSetting(numColors) {
    document.getElementById("levelBtns").style.display = "none";
    
    setTimeout(() => {
        document.getElementById("startBtn").style.display = "block";
    }, 300);

    resetInitialize();
    Config.puyoColorMax = numColors;
    Stage.initialize();
    Stage.stageElement.style.backgroundImage = 
        `linear-gradient(rgba(0,0,0,0.0),rgba(0,0,0,0.8)), 
        url("${GameImage.getPuyoImage(5).src}")`;
}

// 開始時・リセット時のスタートボタン定義
function defStartBtn() {
    document.getElementById("startBtn").style.display = "none";

    if (gameState === "start") {
        gameLoop();
    } else {
        gameState = "start";
    }
}

// ゲームオーバー時の「もういちど」ボタン定義
function defResetBtn() {
    document.getElementById("resetBtn").style.display = "none";

    setTimeout(() => {
        document.getElementById("levelBtns").style.display = "flex";    
    }, 300);
}


function startGame() {
    isGameStart = true;

    // 辛さ（レベル）選択ボタン
    document.getElementById("amakuchi").addEventListener("click", () => {
        levelSetting(3);
    });

    document.getElementById("amakuchi").addEventListener("touchstart", () => {
        levelSetting(3);
    });

    document.getElementById("chuukara").addEventListener("click", () => {
        levelSetting(4);
    });

    document.getElementById("chuukara").addEventListener("touchstart", () => {
        levelSetting(4);
    });

    document.getElementById("karakuchi").addEventListener("click", () => {
        levelSetting(5);
    });

    document.getElementById("karakuchi").addEventListener("touchstart", () => {
        levelSetting(5);
    });

    // 開始時・リセット時のスタートボタン定義
    document.getElementById("startBtn").addEventListener("click", () => {
        defStartBtn();
    });

    document.getElementById("startBtn").addEventListener("touchstart", () => {
        defStartBtn();
    });

    // ゲームオーバー時の「もういちど」ボタン定義
    document.getElementById("resetBtn").addEventListener("click", () => {
        defResetBtn();
    });

    document.getElementById("resetBtn").addEventListener("touchstart", () => {
        defResetBtn();
    });
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
        case "quickTurn":
            if (Player.quickTurnPuyo(frame)) {
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
    // setTimeout(gameLoop, 1000/10);
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