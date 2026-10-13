class Player {
    static centerPuyoColor = 0;
    static rotatingPuyoColor = 0;
    static playerPuyoStatus = null;
    static centerPuyoElement = null;
    static rotatingPuyoElement = null;
    static groundedFrame = 0;
    static keyStatus = null;
    static actionStartFrame = 0;
    static moveSource = 0;
    static moveDestination = 0;
    static rotateBeforeLeft = 0;
    static rotateAfterLeft = 0;
    static rotateFromRotation = 0;

    static initialize() {
        //
        Player.keyStatus = {
            right: false,
            left: false,
            down: false,
            ccw: false,
            cw: false
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

        // ボタン操作対応
        document.getElementById("btnLeft").addEventListener("mousedown", () => {
            Player.keyStatus.left = true;
            document.preventDefault;
        });

        document.getElementById("btnLeft").addEventListener("mouseup", () => {
            Player.keyStatus.left = false;
            document.preventDefault;
        });

        document.getElementById("btnRight").addEventListener("mousedown", () => {
            Player.keyStatus.right = true;
            document.preventDefault;
        });

        document.getElementById("btnRight").addEventListener("mouseup", () => {
            Player.keyStatus.right = false;
            document.preventDefault;
        });

        document.getElementById("btnDown").addEventListener("mousedown", () => {
            Player.keyStatus.down = true;
            document.preventDefault;
        });

        document.getElementById("btnDown").addEventListener("mouseup", () => {
            Player.keyStatus.down = false;
            document.preventDefault;
        });

        document.getElementById("btnCcw").addEventListener("mousedown", () => {
            Player.keyStatus.ccw = true;
            document.preventDefault;
        });

        document.getElementById("btnCcw").addEventListener("mouseup", () => {
            Player.keyStatus.ccw = false;
            document.preventDefault;
        });

        document.getElementById("btnCw").addEventListener("mousedown", () => {
            Player.keyStatus.cw = true;
            document.preventDefault;
        });

        document.getElementById("btnCw").addEventListener("mouseup", () => {
            Player.keyStatus.cw = false;
            document.preventDefault;
        });


        // タッチでボタン操作対応
        document.getElementById("btnLeft").addEventListener("touchstart", () => {
            Player.keyStatus.left = true;
            document.preventDefault;
        });

        document.getElementById("btnLeft").addEventListener("touchend", () => {
            Player.keyStatus.left = false;
            document.preventDefault;
        });

        document.getElementById("btnRight").addEventListener("touchstart", () => {
            Player.keyStatus.right = true;
            document.preventDefault;
        });

        document.getElementById("btnRight").addEventListener("touchend", () => {
            Player.keyStatus.right = false;
            document.preventDefault;
        });

        document.getElementById("btnDown").addEventListener("touchstart", () => {
            Player.keyStatus.down = true;
            document.preventDefault;
        });

        document.getElementById("btnDown").addEventListener("touchend", () => {
            Player.keyStatus.down = false;
            document.preventDefault;
        });

        document.getElementById("btnCcw").addEventListener("touchstart", () => {
            Player.keyStatus.ccw = true;
            document.preventDefault;
        });

        document.getElementById("btnCcw").addEventListener("touchend", () => {
            Player.keyStatus.ccw = false;
            document.preventDefault;
        });

        document.getElementById("btnCw").addEventListener("touchstart", () => {
            Player.keyStatus.cw = true;
            document.preventDefault;
        });

        document.getElementById("btnCw").addEventListener("touchend", () => {
            Player.keyStatus.cw = false;
            document.preventDefault;
        });
    }


    //
    static createPlayerPuyo() {
        //
        if (Stage.getPuyoInfo(2, 0)) {
            //
            return false;
        }

        //
        const nextPuyoColors = Stage.getNextPuyoColors();
        Player.centerPuyoColor = nextPuyoColors[0];
        Player.rotatingPuyoColor = nextPuyoColors[1];

        //
        Player.centerPuyoElement = GameImage.getPuyoImage(Player.centerPuyoColor);
        Player.rotatingPuyoElement = GameImage.getPuyoImage(Player.rotatingPuyoColor);
        Stage.stageElement.appendChild(Player.centerPuyoElement);
        Stage.stageElement.appendChild(Player.rotatingPuyoElement);

        //
        Player.playerPuyoStatus = {
            x: 2,
            y: -1,
            left: 2 * Config.puyoImageWidth,
            top: -1 * Config.puyoImageHeight,
            dx: 0,
            dy: -1,
            rotation: 90
        };
        //
        Player.groundedFrame = 0;
        //
        Player.setPlayerPuyoPosition();
        return true;
    }

    //
    static setPlayerPuyoPosition() {
        //
        Player.centerPuyoElement.style.left = Player.playerPuyoStatus.left + "px";
        Player.centerPuyoElement.style.top = Player.playerPuyoStatus.top + "px";

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
                    Player.groundedFrame = 0;
                    return false;
                } else {
                    //
                    Player.playerPuyoStatus.top = y * Config.puyoImageHeight;
                    Player.groundedFrame = 1;
                    return false;
                }
            } else {
                //
                Player.groundedFrame = 0;
                return false;
            }
        } else {
            //
            if (Player.groundedFrame === 0) {
                //
                Player.groundedFrame = 1;
                return false;
            } else {
                //
                Player.groundedFrame++;
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
        Player.setPlayerPuyoPosition();

        //
        if (Player.keyStatus.right || Player.keyStatus.left) {
            //
            const mx = (Player.keyStatus.right) ? 1 : -1;
            const cx = Player.playerPuyoStatus.x;
            const cy = Player.playerPuyoStatus.y;
            const rx = cx + Player.playerPuyoStatus.dx;
            const ry = cy + Player.playerPuyoStatus.dy;

            //
            let canMove = true;

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
            if (Player.groundedFrame === 0) {
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
                Player.actionStartFrame = frame;
                Player.moveSource = cx * Config.puyoImageWidth;
                Player.moveDestination = (cx + mx) *  Config.puyoImageWidth;
                Player.playerPuyoStatus.x += mx;
                return "moving";
            }
        } else if (Player.keyStatus.ccw || Player.keyStatus.cw) {
            //
            //
            const x = Player.playerPuyoStatus.x;
            //
            const y = Player.playerPuyoStatus.y + (Player.groundedFrame === 0 ? 1 : 0);
            const rotation = Player.playerPuyoStatus.rotation;
            let canRotate = true;

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
                    //
                    if (Stage.getPuyoInfo(x-1, y+1)) {
                        //
                        cy = -1;
                    }
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
                    //
                    if (Stage.getPuyoInfo(x+1, y+1)) {
                        //
                        cy = -1;
                    }
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
                    if (Player.groundedFrame > 0) {
                        //
                        Player.playerPuyoStatus.y -= 1;
                        Player.groundedFrame = 0;
                    }
                    Player.playerPuyoStatus.top = Player.playerPuyoStatus.y * Config.puyoImageHeight;
                }
                //
                Player.actionStartFrame = frame;
                Player.rotateBeforeLeft = x*Config.puyoImageHeight;
                Player.rotateAfterLeft = (x + cx)*Config.puyoImageHeight;
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
                
                if (Player.keyStatus.ccw) {
                    return "rotatingCcw";
                } else {
                    return "rotatingCw";
                }
            }
        }

        return "playing";
    }

    //
    static movePlayerPuyo(frame) {
        //
        Player.dropPlayerPuyo(false);

        //
        let ratio = (frame - Player.actionStartFrame)/ Config.playerMoveFrames;
        if (ratio > 1) {
            //
            ratio = 1;
        }
        Player.playerPuyoStatus.left = (Player.moveDestination - Player.moveSource) * ratio + Player.moveSource;
        //
        Player.setPlayerPuyoPosition();

        if (ratio === 1) {
            //
            return true;
        }
        return false;
    }

    //
    static rotatePlayerPuyo(frame, rotateDirection) {
        //
        Player.dropPlayerPuyo(false);

        //
        let ratio = (frame - Player.actionStartFrame) / Config.playerRotateFrames;
        if (ratio > 1) {
            //
            ratio = 1;
        }
        Player.playerPuyoStatus.left = (Player.rotateAfterLeft - Player.rotateBeforeLeft) * ratio + Player.rotateBeforeLeft;
        
        if (rotateDirection === 1) {
            Player.playerPuyoStatus.rotation = (Player.rotateFromRotation + ratio * 90) % 360;
        } else {
            Player.playerPuyoStatus.rotation = (Player.rotateFromRotation - ratio * 90 +360 ) % 360;
        }
        // Player.playerPuyoStatus.rotation = (Player.rotateFromRotation + ratio * 90) % 360;
        
        //
        Player.setPlayerPuyoPosition();

        if (ratio === 1) {
            //
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
        Player.rotatingPuyoElement.remove();
        Player.rotatingPuyoElement = null;
    }
}
