class Player {
    static centerPuyoColor = 0;
    static rotatingPuyoColor = 0;
    static playerPuyoStatus = null;
    static centerPuyoElement = null;
    static rotatingPuyoElement = null;
    static centerEdgeElement = null;
    static groundedFrame = 0;
    static keyStatus = null;
    static moveStartFrame = 0;
    static rotateStartFrame = 0;
    static quickStartFrame = 0;
    static moveSource = 0;
    static moveDestination = 0;
    static rotateBeforeLeft = 0;
    static rotateAfterLeft = 0;
    static rotateFromRotation = 0;
    static dummyQtTop = 0;
    static groundedFlag = false;

    static initialize() {
        //
        Player.keyStatus = {
            right: false,
            left: false,
            down: false,
            ccw: false,
            cw: false,
            quick: false
        };
        //
        document.addEventListener("keydown", (event) => {
            //
            switch (event.key) {
                case "ArrowLeft":
                    Player.keyStatus.left = true;
                    event.preventDefault();
                    return;
                case "ArrowUp":
                    Player.keyStatus.ccw = true;
                    event.preventDefault();
                    return;
                case "ArrowRight":
                    Player.keyStatus.right = true;
                    event.preventDefault();
                    return;
                case "ArrowDown":
                    Player.keyStatus.down = true;
                    event.preventDefault();
                    return;
            }
        });
        document.addEventListener("keyup", (event) => {
            //
            switch (event.key) {
                case "ArrowLeft":
                    Player.keyStatus.left = false;
                    event.preventDefault();
                    return;
                case "ArrowUp":
                    Player.keyStatus.ccw = false;
                    event.preventDefault();
                    return;
                case "ArrowRight":
                    Player.keyStatus.right = false;
                    event.preventDefault();
                    return;
                case "ArrowDown":
                    Player.keyStatus.down = false;
                    event.preventDefault();
                    return;
            }
        });


    // スマホのタッチ対応
    //     let pageX = 0, pageY = 0;
    //     //
    //     document.addEventListener("touchstart", (event) => {
    //         //
    //         const touch = event.touches[0];
    //         pageX = touch.pageX;
    //         pageY = touch.pageY;
    //     });
    //     //
    //     document.addEventListener("touchmove", (event) => {
    //         //
    //         let {left, right, up, down} = Player.keyStatus;
    //         //
    //         if (left || right || down|| ccw || cw ) {
    //             return;
    //         }
    //         //
    //         const touch = event.touches[0];
    //         const dx = touch.pageX - pageX;
    //         const dy = touch.pageY - pageY;
    //         if (dx**2 + dy**2 < 5**2) {
    //             //
    //             return;
    //         }
    //         //
    //         if (Math.abs(dx) > Math.abs(dy)) {
    //             if (dx > 0) {
    //                 right = true;
    //             } else {
    //                 left = true;
    //             }
    //         } else {
    //             if (dy > 0) {
    //                 down = true;
    //             } else {
    //                 ccw = true;
    //             }
    //         }
    //         Player.keyStatus = { left, right, down, ccw, cw };
    //     });
    //     //
    //     document.addEventListener("touchend", (event) => {
    //         Player.keyStatus = {
    //             left: false,
    //             right: false,
    //             down: false,
    //             ccw: false,
    //             cw: false
    //         };
    //     });

        // // ボタン操作対応
        // document.getElementById("btnLeft").addEventListener("mousedown", () => {
        //     Player.keyStatus.left = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnLeft").addEventListener("mouseup", () => {
        //     Player.keyStatus.left = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnRight").addEventListener("mousedown", () => {
        //     Player.keyStatus.right = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnRight").addEventListener("mouseup", () => {
        //     Player.keyStatus.right = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnDown").addEventListener("mousedown", () => {
        //     Player.keyStatus.down = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnDown").addEventListener("mouseup", () => {
        //     Player.keyStatus.down = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnCcw").addEventListener("mousedown", () => {
        //     Player.keyStatus.ccw = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnCcw").addEventListener("mouseup", () => {
        //     Player.keyStatus.ccw = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnCw").addEventListener("mousedown", () => {
        //     Player.keyStatus.cw = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnCw").addEventListener("mouseup", () => {
        //     Player.keyStatus.cw = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnQuick").addEventListener("mousedown", () => {
        //     Player.keyStatus.quick = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnQuick").addEventListener("mouseup", () => {
        //     Player.keyStatus.quick = false;
        //     document.preventDefault;
        // });

        // // タッチでボタン操作対応
        // document.getElementById("btnLeft").addEventListener("touchstart", () => {
        //     Player.keyStatus.left = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnLeft").addEventListener("touchend", () => {
        //     Player.keyStatus.left = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnRight").addEventListener("touchstart", () => {
        //     Player.keyStatus.right = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnRight").addEventListener("touchend", () => {
        //     Player.keyStatus.right = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnDown").addEventListener("touchstart", () => {
        //     Player.keyStatus.down = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnDown").addEventListener("touchend", () => {
        //     Player.keyStatus.down = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnCcw").addEventListener("touchstart", () => {
        //     Player.keyStatus.ccw = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnCcw").addEventListener("touchend", () => {
        //     Player.keyStatus.ccw = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnCw").addEventListener("touchstart", () => {
        //     Player.keyStatus.cw = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnCw").addEventListener("touchend", () => {
        //     Player.keyStatus.cw = false;
        //     document.preventDefault;
        // });

        // document.getElementById("btnQuick").addEventListener("touchstart", () => {
        //     Player.keyStatus.quick = true;
        //     document.preventDefault;
        // });

        // document.getElementById("btnQuick").addEventListener("touchend", () => {
        //     Player.keyStatus.quick = false;
        //     document.preventDefault;
        // });

    

    // Pointer Eventを用いて、PC・スマホ両対応
        document.getElementById("btnLeft").addEventListener("pointerdown", () => {
            Player.keyStatus.left = true;
            document.preventDefault;
        });

        document.getElementById("btnLeft").addEventListener("pointerup", () => {
            Player.keyStatus.left = false;
            document.preventDefault;
        });

        document.getElementById("btnLeft").addEventListener("pointercancel", () => {
            Player.keyStatus.left = false;
            document.preventDefault;
        });

        document.getElementById("btnRight").addEventListener("pointerdown", () => {
            Player.keyStatus.right = true;
            document.preventDefault;
        });

        document.getElementById("btnRight").addEventListener("pointerup", () => {
            Player.keyStatus.right = false;
            document.preventDefault;
        });

        document.getElementById("btnRight").addEventListener("pointercancel", () => {
            Player.keyStatus.right = false;
            document.preventDefault;
        });

        document.getElementById("btnDown").addEventListener("pointerdown", () => {
            Player.keyStatus.down = true;
            document.preventDefault;
        });

        document.getElementById("btnDown").addEventListener("pointerup", () => {
            Player.keyStatus.down = false;
            document.preventDefault;
        });

        document.getElementById("btnDown").addEventListener("pointercancel", () => {
            Player.keyStatus.down = false;
            document.preventDefault;
        });

        document.getElementById("btnCcw").addEventListener("pointerdown", () => {
            Player.keyStatus.ccw = true;
            document.preventDefault;
        });

        document.getElementById("btnCcw").addEventListener("pointerup", () => {
            Player.keyStatus.ccw = false;
            document.preventDefault;
        });

        document.getElementById("btnCcw").addEventListener("pointercancel", () => {
            Player.keyStatus.ccw = false;
            document.preventDefault;
        });

        document.getElementById("btnCw").addEventListener("pointerdown", () => {
            Player.keyStatus.cw = true;
            document.preventDefault;
        });

        document.getElementById("btnCw").addEventListener("pointerup", () => {
            Player.keyStatus.cw = false;
            document.preventDefault;
        });

        document.getElementById("btnCw").addEventListener("pointercancel", () => {
            Player.keyStatus.cw = false;
            document.preventDefault;
        });

        document.getElementById("btnQuick").addEventListener("pointerdown", () => {
            Player.keyStatus.quick = true;
            document.preventDefault;
        });

        document.getElementById("btnQuick").addEventListener("pointerup", () => {
            Player.keyStatus.quick = false;
            document.preventDefault;
        });

        document.getElementById("btnQuick").addEventListener("pointercancel", () => {
            Player.keyStatus.quick = false;
            document.preventDefault;
        });
    }

    //
    static createPlayerPuyo(frame) {
        //
        // if (Stage.getPuyoInfo(2, 0)) {
        if (Stage.getPuyoInfo(2, 1)) {
            //
            return false;
        }

        //
        const nextPuyoColors = Stage.getNextPuyoColors();
        Player.centerPuyoColor = nextPuyoColors[0];
        Player.rotatingPuyoColor = nextPuyoColors[1];

        //
        Player.centerPuyoElement = GameImage.getPuyoImage(Player.centerPuyoColor);
        Player.centerEdgeElement = GameImage.getEdgeImage(Player.centerPuyoColor);
        Player.rotatingPuyoElement = GameImage.getPuyoImage(Player.rotatingPuyoColor);
        Stage.stageElement.appendChild(Player.centerEdgeElement);
        Stage.stageElement.appendChild(Player.centerPuyoElement);
        Stage.stageElement.appendChild(Player.rotatingPuyoElement);

        //
        Player.playerPuyoStatus = {
            x: 2,
            // y: -1,
            y: 0,
            left: 2 * Config.puyoImageWidth,
            // top: -1 * Config.puyoImageHeight,
            top: 0 * Config.puyoImageHeight,
            dx: 0,
            dy: -1,
            rotation: 90
        };
        //
        Player.groundedFrame = 0;
        Player.groundedFlag = false;

        //
        Player.setPlayerPuyoPosition(frame);
        return true;
    }

    //
    static setPlayerPuyoPosition(frame) {
        //
        Player.centerPuyoElement.style.left = Player.playerPuyoStatus.left + "px";
        Player.centerPuyoElement.style.top = Player.playerPuyoStatus.top + "px";

        Player.centerEdgeElement.style.left = Player.playerPuyoStatus.left + "px";
        Player.centerEdgeElement.style.top = Player.playerPuyoStatus.top + "px";

        // 軸ぷよの輪郭線を点滅させる
        Player.centerEdgeElement.style.opacity = (1 + Math.sin(2 * Math.PI * frame / Config.edgePeriod)) / 2;

        //
        const x = Player.playerPuyoStatus.left + Math.cos(Player.playerPuyoStatus.rotation * Math.PI / 180) * Config.puyoImageWidth;
        const y = Player.playerPuyoStatus.top - Math.sin(Player.playerPuyoStatus.rotation * Math.PI / 180) * Config.puyoImageHeight;
        Player.rotatingPuyoElement.style.left = x + "px";
        Player.rotatingPuyoElement.style.top = y + "px";
    }

    //
    static dropPlayerPuyo(isPressingDown) {
        let {x, y, dx, dy} = Player.playerPuyoStatus;

        //
        if (!Stage.getPuyoInfo(x, y+1) && !Stage.getPuyoInfo(x+dx, y+dy+1)) {
            //
            Player.playerPuyoStatus.top += Config.playerFallingSpeed;
            
            if (isPressingDown) {
                Player.playerPuyoStatus.top += Config.playerDownSpeed;
            }
            //
            if (Math.floor(Player.playerPuyoStatus.top / Config.puyoImageHeight) != y) {
                 //
                y += 1;
                Player.playerPuyoStatus.y = y;
                //
                if (Player.keyStatus.down) {
                    Score.addScore(1);
                }
                //
                if (!Stage.getPuyoInfo(x, y+1) && !Stage.getPuyoInfo(x+dx, y+dy+1)) {
                    //
                    // Player.groundedFrame = 0;
                    Player.groundedFlag = false;
                    return false;
                } else {
                    //
                    Player.playerPuyoStatus.top = y * Config.puyoImageHeight;
                    // Player.groundedFrame = 1;
                    Player.groundedFlag = true;
                    return false;
                }
            } else {
                //

                // ここで回し時の接地時間がリセットされている
                // Player.groundedFrame = 0;
                Player.groundedFlag = false;
                return false;
            }
        } else {
            //
            // if (Player.groundedFrame === 0) {
            if (!Player.groundedFlag) {
                //
                // Player.groundedFrame = 1;
                Player.groundedFlag = true;
                return false;
            } else {
                // 接地時間計測
                // 下ボタンで高速接地
                if (isPressingDown) {
                    Player.groundedFrame +=5;
                }

                // 接地フラグがtrueかつ
                // 軸ぷよが下 or 子ぷよの角度が240～300degのときに接地時間を加算
                if (((Player.playerPuyoStatus.rotation >= 0) && (Player.playerPuyoStatus.rotation <= 180)) || ((Player.playerPuyoStatus.rotation >= 240) && (Player.playerPuyoStatus.rotation <= 300))) {
                    Player.groundedFrame++;
                }
                // Player.groundedFrame++;
                if (Player.groundedFrame > Config.playerLockDelayFrames) {
                    //
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    // クイックターン用の自由落下
    static dropPlayerPuyoQT(isPressingDown) {
        let {x, y, dy} = Player.playerPuyoStatus;

        //
        // if (!Stage.getPuyoInfo(x, y+1) && !Stage.getPuyoInfo(x, y+dy+1)) {
        if (!Stage.getPuyoInfo(x, y+1)) {
            //
            Player.dummyQtTop += Config.playerFallingSpeed;
            
            if (isPressingDown) {
                Player.dummyQtTop += Config.playerDownSpeed;
            }
            //
            if (Math.floor(Player.dummyQtTop / Config.puyoImageHeight) != (y-1)) {
                 //
                y += 1;
                Player.playerPuyoStatus.y = y;
                //
                if (Player.keyStatus.down) {
                    Score.addScore(1);
                }
                //
                // if (!Stage.getPuyoInfo(x, y+1) && !Stage.getPuyoInfo(x, y+dy+1)) {
                if (!Stage.getPuyoInfo(x, y+1)) {
                    //
                    // Player.groundedFrame = 0;
                    Player.groundedFlag = false;
                    return false;
                } else {
                    //
                    Player.dummyQtTop = y * Config.puyoImageHeight;
                    // Player.groundedFrame = 1;
                    Player.groundedFlag = true;
                    return false;
                }
            } else {
                //
                // Player.groundedFrame = 0;
                Player.groundedFlag = false;
                return false;
            }
        } else {
            //
            // if (Player.groundedFrame === 0) {
            if (!Player.groundedFlag) {
                //
                // Player.groundedFrame = 1;
                Player.groundedFlag = true;
                return false;
            } else {
                // 接地時間計測
                // 下ボタンで高速接地
                if (isPressingDown) {
                    Player.groundedFrame +=5;
                }

                // 接地フラグがtrueかつ
                // 軸ぷよが下 or 子ぷよの角度が240～300degのときに接地時間を加算
                if (((Player.playerPuyoStatus.rotation >= 0) && (Player.playerPuyoStatus.rotation <= 180)) || ((Player.playerPuyoStatus.rotation >= 240) && (Player.playerPuyoStatus.rotation <= 300))) {
                    Player.groundedFrame++;
                }
                // Player.groundedFrame++;
                if (Player.groundedFrame > Config.playerLockDelayFrames) {
                    //
                    return true;
                } else {
                    return false;
                }
            }
        }
    }


    //
    static update(frame) {
        //
        if (Player.dropPlayerPuyo(Player.keyStatus.down)) {
            //
            return "fix";
        }
        //
        Player.setPlayerPuyoPosition(frame);

        let canMove = false;
        let canRotate = false;
        
        
        // 回転ボタンが押された場合の処理：横移動より先に回転可能か判定
        if (Player.keyStatus.ccw || Player.keyStatus.cw) {
            //
            const x = Player.playerPuyoStatus.x;
            //
            // const y = Player.playerPuyoStatus.y + (Player.groundedFrame === 0 ? 1 : 0);
            const y = Player.playerPuyoStatus.y + (!Player.groundedFlag ? 1 : 0);
            const rotation = Player.playerPuyoStatus.rotation;
            // let canRotate = true;
            canRotate = true;

            let cx = 0;
            let cy = 0;

            if (Player.keyStatus.ccw) {
                if (rotation === 0) {
                    //
                } else if (rotation === 90) {
                    //
                    //
                    if (Stage.getPuyoInfo(x-1, y)) {
                        //
                        cx = 1;
                        //
                        if (Stage.getPuyoInfo(x+1, y)) {
                            canRotate  = false;
                        }
                    }
                } else if (rotation === 180) {
                    //
                    //
                    if (Stage.getPuyoInfo(x, y+1)) {
                        //
                        cy = -1;
                    }
                    // // 斜め下のぷよは無視する
                    // if (Stage.getPuyoInfo(x-1, y+1)) {
                    //     //
                    //     cy = -1;
                    // }
                } else if (rotation === 270) {
                    //
                    //
                    if (Stage.getPuyoInfo(x+1, y)) {
                        //
                        cx = -1;
                        //
                        if (Stage.getPuyoInfo(x-1, y)) {
                            //
                            canRotate = false;
                        }
                    }
                }
            } else {
                if (rotation === 180) {
                    //
                } else if (rotation === 90) {
                    //
                    //
                    if (Stage.getPuyoInfo(x+1, y)) {
                        //
                        cx = -1;
                        //
                        if (Stage.getPuyoInfo(x-1, y)) {
                            canRotate  = false;
                        }
                    }
                } else if (rotation === 0) {
                    //
                    //
                    if (Stage.getPuyoInfo(x, y+1)) {
                        //
                        cy = -1;
                    }
                    // // 斜め下のぷよは無視する
                    // if (Stage.getPuyoInfo(x+1, y+1)) {
                    //     //
                    //     cy = -1;
                    // }
                } else if (rotation === 270) {
                    //
                    //
                    if (Stage.getPuyoInfo(x-1, y)) {
                        //
                        cx = 1;
                        //
                        if (Stage.getPuyoInfo(x+1, y)) {
                            //
                            canRotate = false;
                        }
                    }
                }
            }

            if (canRotate) {
                //
                if (cy === -1) {
                    // if (Player.groundedFrame > 0) {
                    if (Player.groundedFlag) {
                        //
                        Player.playerPuyoStatus.y -= 1;
                        // Player.groundedFrame = 0;
                        Player.groundedFlag = false;
                    }
                    Player.playerPuyoStatus.top = Player.playerPuyoStatus.y * Config.puyoImageHeight;
                    
                    // 昇竜ぷよ対応のため１段強引き上げたいが失敗
                    // （接地判定されず無限回しになってしまう）
                    // Player.playerPuyoStatus.y -= 1;
                    // Player.playerPuyoStatus.top = (Player.playerPuyoStatus.y + 0.6) * Config.puyoImageHeight;
                    // Player.groundedFlag = true;
                }
                //
                Player.rotateStartFrame = frame;
                Player.rotateBeforeLeft = x*Config.puyoImageWidth;
                Player.rotateAfterLeft = (x + cx)*Config.puyoImageWidth;
                Player.rotateFromRotation = Player.playerPuyoStatus.rotation;
                //
                Player.playerPuyoStatus.x += cx;

                if (Player.keyStatus.ccw) {
                    Player.nextRotation = (Player.playerPuyoStatus.rotation + 90) % 360;
                } else {
                    Player.nextRotation = (Player.playerPuyoStatus.rotation + 270) % 360;
                }
                const dCombi = [[1, 0], [0, -1], [-1, 0], [0, 1]][Player.nextRotation / 90];
                Player.playerPuyoStatus.dx = dCombi[0];
                Player.playerPuyoStatus.dy = dCombi[1];

                // if (Player.keyStatus.ccw) {
                //     return "rotatingCcw";
                // } else {
                //     return "rotatingCw";
                // }
            }
        }

        // 横移動ボタンが押された場合の処理：回転判定の後に移動可能か判定
        if (Player.keyStatus.right || Player.keyStatus.left) {
            //
            const mx = (Player.keyStatus.right) ? 1 : -1;
            const cx = Player.playerPuyoStatus.x;
            const cy = Player.playerPuyoStatus.y;
            const rx = cx + Player.playerPuyoStatus.dx;
            const ry = cy + Player.playerPuyoStatus.dy;

            //
            // let canMove = true;
            canMove = true;

            //
            if (Stage.getPuyoInfo(cx + mx, cy)) {
                //
                canMove = false;
            }
            //
            if (Stage.getPuyoInfo(rx + mx, ry)) {
                //
                canMove = false;
            }
            //
            // if (Player.groundedFrame === 0) {
            if (!Player.groundedFlag) {
                //
                if (Stage.getPuyoInfo(cx + mx, cy + 1)) {
                    //
                    canMove = false;
                }
                //
                if (Stage.getPuyoInfo(rx + mx, ry+1)) {
                    //
                    canMove = false;
                }
            }

            if (canMove) {
                //
                Player.moveStartFrame = frame;
                Player.moveSource = cx * Config.puyoImageWidth;
                Player.moveDestination = (cx + mx) *  Config.puyoImageWidth;
                Player.playerPuyoStatus.x += mx;
                // return "moving";
            }

        }

        // クイックターンボタンが押された場合の処理：ターン可能か判定
        if (Player.keyStatus.quick) {
            const {x, y, dy} = Player.playerPuyoStatus;

            // クイックターン可能か確認
            if ((Stage.getPuyoInfo(x-1, y) && Stage.getPuyoInfo(x+1, y)) || (Stage.getPuyoInfo(x-1, y+dy) && Stage.getPuyoInfo(x+1, y+dy))) {
                const y = Player.playerPuyoStatus.y + (!Player.groundedFlag ? 1 : 0);
                // 子ぷよが上の場合、通常の回転と同様に下にぷよがあれば１段引き上げる
                if (dy === -1) {
                    if (Stage.getPuyoInfo(x, y+1)) {
                        if (Player.groundedFlag) {
                            Player.playerPuyoStatus.y -= 1;
                            Player.groundedFlag = false;
                        }
                        Player.playerPuyoStatus.top = Player.playerPuyoStatus.y * Config.puyoImageHeight;
                    }
                } else {
                    // 子ぷよが下の場合、軸ぷよとy位置を入れ替える
                    Player.playerPuyoStatus.y += 1;
                }
                Player.playerPuyoStatus.dy *= -1;

                Player.quickStartFrame = frame;
                Player.rotateBeforeLeft = x*Config.puyoImageWidth;
                Player.rotateAfterLeft = Player.rotateBeforeLeft;
                Player.dummyQtTop = Player.playerPuyoStatus.top;
                Player.rotateFromRotation = Player.playerPuyoStatus.rotation;
                
                return "quickTurn";
            }
        }

        // 横移動と回転の単独/同時操作に応じてgameStateを選択
        const gameStateArray = [[["playing", "playing"], ["rotatingCw", "rotatingCcw"]], [["moving", "moving"], ["movingAndCw", "movingAndCcw"]]];
        return gameStateArray[canMove ? 1 : 0][canRotate ? 1 : 0][Player.keyStatus.ccw ? 1 : 0];
        
        // return "playing";
    }


    // 横移動のアニメーション
    static movePlayerPuyo(frame) {
        //
        // Player.dropPlayerPuyo(false);
        // Player.dropPlayerPuyo(Player.keyStatus.down);

        //
        let ratio = (frame - Player.moveStartFrame) / Config.playerMoveFrames;
        if (ratio > 1) {
            //
            ratio = 1;
        }

        // 横移動のフレーム数の前半で移動完了し、後半は待機とする
        let ratio2 = ratio * 2.5;
        if (ratio2 > 1) {
            //
            ratio2 = 1;
        }
        // Player.playerPuyoStatus.left = (Player.moveDestination - Player.moveSource) * ratio + Player.moveSource;

        // 横移動＆壁際回転の場合、x座標(left)はrotateで計算する
        if (Player.rotateAfterLeft === Player.rotateBeforeLeft) {
            Player.playerPuyoStatus.left = (Player.moveDestination - Player.moveSource) * ratio2 + Player.moveSource;
        }
        
        //
        Player.setPlayerPuyoPosition(frame);

        if (ratio === 1) {
            //
            return true;
        }
        return false;
    }

    // 回転のアニメーション
    static rotatePlayerPuyo(frame, rotateDirection) {
        //
        // Player.dropPlayerPuyo(false);
        // Player.dropPlayerPuyo(Player.keyStatus.down);

        //
        let ratio = (frame - Player.rotateStartFrame) / Config.playerRotateFrames;
        if (ratio > 1) {
            //
            ratio = 1;
        }
        Player.playerPuyoStatus.rotation = (Player.rotateFromRotation + rotateDirection * ratio * 90 +360) % 360;
        
        // x座標(left)は、壁際での回転の場合はここで計算するが、回転&横移動の場合はmoveで計算済
        if (Player.rotateAfterLeft != Player.rotateBeforeLeft) {
            Player.playerPuyoStatus.left = (Player.rotateAfterLeft - Player.rotateBeforeLeft) * ratio + Player.rotateBeforeLeft;
        }

        //
        Player.setPlayerPuyoPosition(frame);

        if (ratio === 1) {
            //
            return true;
        }
        return false;
    }

    // クイックターンのアニメーション
    static quickTurnPuyo(frame) {
        // クイックターン中も自由落下させる
        // Player.dropPlayerPuyoQT(false);
        // Player.dropPlayerPuyoQT(Player.keyStatus.down);

        const rotateDirection = 1;
        let ratio = (frame - Player.quickStartFrame) / Config.quickTurnFrames;
        if (ratio > 1) {
            //
            ratio = 1;
        }

        
        if (Player.playerPuyoStatus.dy === 1) {
            // 子ぷよが上の場合：軸ぷよを中心に通常の回転
            // 通常の自由落下
            Player.dropPlayerPuyo(Player.keyStatus.down);
            Player.playerPuyoStatus.rotation = (Player.rotateFromRotation + rotateDirection * ratio * 180 +360) % 360;
        } else {
            // 子ぷよが下の場合：軸ぷよと入れ替え
            // クイックターン用の自由落下
            Player.dropPlayerPuyoQT(Player.keyStatus.down);
            // 軸ぷよの座標回転
            // const playerPuyoCenter = Player.dummyQtTop + Player.playerPuyoStatus.dy * Config.puyoImageHeight / 2;
            const playerPuyoCenter = Player.dummyQtTop + Config.puyoImageHeight / 2;
            Player.playerPuyoStatus.top = playerPuyoCenter - Config.puyoImageHeight /2 * Math.sin((Player.rotateFromRotation + 180 + ratio * 180) * Math.PI / 180);
            Player.playerPuyoStatus.left = Player.rotateBeforeLeft + Config.puyoImageHeight /2 * Math.cos((Player.rotateFromRotation + 180 + ratio * 180) * Math.PI / 180);

            // 子ぷよの座標回転
            Player.playerPuyoStatus.rotation = (Player.rotateFromRotation + ratio * 180) % 360;
        }

        Player.setPlayerPuyoPosition(frame);

        if (ratio === 1) {
            return true;
        }
        return false;
    }

    //
    static fixPlayerPuyo() {
        const {x, y, dx, dy} = Player.playerPuyoStatus;
        if (y >= 0) {
            //
            Stage.createPuyo(x, y, Player.centerPuyoColor);
        }
        if (y + dy >= 0) {
            //
            Stage.createPuyo(x+dx, y+dy, Player.rotatingPuyoColor);
        }
        //
        Player.centerPuyoElement.remove();
        Player.centerPuyoElement = null;
        Player.centerEdgeElement.remove();
        Player.centerEdgeElement = null;
        Player.rotatingPuyoElement.remove();
        Player.rotatingPuyoElement = null;
    }
}
