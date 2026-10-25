class Stage {
    static stageElement = null;
    static batsuElement = null;
    static puyoBoard = null;
    static puyoCount = 0;
    static fallingPuyoInfoList = [];
    static eraseStartFrame = 0;
    static erasingInfoList = [];
    static zenkeshiImage = null;
    static nextElement = null;
    static next2ndElement = null;
    static nextPuyoColors = [];
    static nextPuyoElements = [];
    static next2ndPuyoColors = [];
    static next2ndPuyoElements = [];

    static initialize() {
        //
        Stage.stageElement = document.getElementById("stage");
        Stage.stageElement.style.width = Config.puyoImageWidth * Config.stageCols + 'px';
        Stage.stageElement.style.height = Config.puyoImageHeight * Config.stageRows + 'px';
        // Stage.stageElement.style.height = Config.puyoImageHeight * (Config.stageRows-1) + 'px';
        Stage.stageElement.style.backgroundColor = Config.stageBackgroundColor;

        // // 3列目最上段のバツ印の指定
        Stage.batsuElement = document.getElementById("batsu");
        Stage.batsuElement.style.width = Config.puyoImageWidth + 'px';
        Stage.batsuElement.style.height = Config.puyoImageHeight + 'px';
        Stage.batsuElement.style.left = Config.puyoImageWidth * 2 + 'px';
        Stage.batsuElement.style.top = Config.puyoImageHeight + 'px';
 
        //
        const nextContainerElement = document.getElementById("next");
        nextContainerElement.style.width = Config.puyoImageWidth * 2.6 + "px";
        nextContainerElement.style.height = Config.puyoImageHeight * 2.2 + "px";
        nextContainerElement.style.backgroundColor = Config.nextBackgroundColor;

        //
        const borderWidth = 2;
        Stage.nextElement = document.createElement("div");
        Stage.nextElement.style.position = "absolute";
        Stage.nextElement.style.left = Config.puyoImageWidth * 0.4 -borderWidth + "px";
        Stage.nextElement.style.top = (Config.puyoImageHeight * 0.1) - borderWidth + "px";
        Stage.nextElement.style.width = Config.puyoImageWidth * 1 +"px";
        Stage.nextElement.style.height = Config.puyoImageWidth * 2 +"px";
        Stage.nextElement.style.border = borderWidth + "px solid #ff8";
        Stage.nextElement.style.borderRadius = Config.puyoImageWidth * 0.2 +"px";
        Stage.nextElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        nextContainerElement.appendChild(Stage.nextElement);

        // 2nd nextぷよ領域
        Stage.next2ndElement = document.createElement("div");
        Stage.next2ndElement.style.position = "absolute";
        Stage.next2ndElement.style.left = Config.puyoImageWidth * 1.4 + "px";
        Stage.next2ndElement.style.top = (Config.puyoImageHeight * 0.5) - borderWidth + "px";
        Stage.next2ndElement.style.width = Config.puyoImageWidth * 0.8 +"px";
        Stage.next2ndElement.style.height = Config.puyoImageWidth * 1.6 +"px";
        Stage.next2ndElement.style.border = borderWidth + "px solid #ff8";
        Stage.next2ndElement.style.borderRadius = Config.puyoImageWidth * 0.2 +"px";
        Stage.next2ndElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        nextContainerElement.appendChild(Stage.next2ndElement);

        //
        Stage.zenkeshiImage = document.getElementById("zenkeshi");
        Stage.zenkeshiImage.width = Config.puyoImageWidth * Config.stageCols;
        Stage.zenkeshiImage.style.position = "absolute";
        Stage.zenkeshiImage.style.opacity = "0";
        Stage.stageElement.appendChild(Stage.zenkeshiImage);

        //
        Stage.puyoCount = 0;
        Stage.puyoBoard = [];
        for (let y=0; y<Config.stageRows; y++) {
            Stage.puyoBoard[y] = [];
            for (let x=0; x<Config.stageCols; x++) {
                Stage.puyoBoard[y][x] = null;
            }
        }

        //
        for (let y=0; y<Config.stageRows; y++) {
            for (let x=0; x<Config.stageCols; x++) {
                let puyoColor = 0;
                if (Config.initialBoard && Config.initialBoard[y][x]) {
                    puyoColor = Config.initialBoard[y][x];
                }
                if (puyoColor >= 1 && puyoColor <= Config.puyoColorMax) {
                    Stage.createPuyo(x, y, puyoColor);
                }
            }
        }

        //
        Stage.nextPuyoColors = [];
        Stage.nextPuyoElements = [];
        Stage.next2ndPuyoColors = [];
        Stage.next2ndPuyoElements = [];
        Stage.getNext2ndPuyoColors();
        Stage.getNextPuyoColors();
    }

    //
    static getNextPuyoColors() {
        //
        const ret = Stage.nextPuyoColors;
        Stage.nextPuyoColors = Stage.getNext2ndPuyoColors();
 
        //
        if (ret.length) {
            //
            //
            for (const element of Stage.nextPuyoElements) {
                element.remove();
            }
            //
        } else {
            const nextCenterPuyoColor = Math.trunc(Math.random() * Config.puyoColorMax) + 1;
            const nextRotatingPuyoColor = Math.trunc(Math.random() * Config.puyoColorMax) + 1;
            Stage.nextPuyoColors = [nextCenterPuyoColor, nextRotatingPuyoColor];
        };

        const nextCenterPuyoElement = GameImage.getPuyoImage(Stage.nextPuyoColors[0]);
        const nextRotatingPuyoElement = GameImage.getPuyoImage(Stage.nextPuyoColors[1]);
        nextCenterPuyoElement.style.top = Config.puyoImageHeight + "px";
        Stage.nextElement.append(nextCenterPuyoElement, nextRotatingPuyoElement);
        Stage.nextPuyoElements = [nextCenterPuyoElement, nextRotatingPuyoElement];

        return ret;
    }

    static getNext2ndPuyoColors() {
        const ret2nd = Stage.next2ndPuyoColors;

        const next2ndCenterPuyoColor = Math.trunc(Math.random() * Config.puyoColorMax) + 1;
        const next2ndRotatingPuyoColor = Math.trunc(Math.random() * Config.puyoColorMax) + 1;
        Stage.next2ndPuyoColors = [next2ndCenterPuyoColor, next2ndRotatingPuyoColor];

        if (ret2nd) {
            for (const element of Stage.next2ndPuyoElements) {
                element.remove();
            }

            const next2ndCenterPuyoElement = GameImage.getPuyoImage(next2ndCenterPuyoColor);
            const next2ndRotatingPuyoElement = GameImage.getPuyoImage(next2ndRotatingPuyoColor);
            next2ndCenterPuyoElement.width = Config.puyoImageWidth * 0.8;
            next2ndCenterPuyoElement.height = Config.puyoImageHeight * 0.8;
            next2ndRotatingPuyoElement.width = Config.puyoImageWidth * 0.8;
            next2ndRotatingPuyoElement.height = Config.puyoImageHeight * 0.8;

            next2ndCenterPuyoElement.style.top = Config.puyoImageHeight * 0.8 + "px";
            Stage.next2ndElement.append(next2ndCenterPuyoElement, next2ndRotatingPuyoElement);
            Stage.next2ndPuyoElements = [next2ndCenterPuyoElement, next2ndRotatingPuyoElement];
        }
        return ret2nd;
    }

    //
    static createPuyo(x, y, puyoColor) {
        //
        const puyoImage = GameImage.getPuyoImage(puyoColor);
        puyoImage.style.left = x * Config.puyoImageWidth + "px";
        puyoImage.style.top = y * Config.puyoImageHeight + "px";
        // puyoImage.style.top = (y - 1) * Config.puyoImageHeight + "px";
        Stage.stageElement.appendChild(puyoImage);

        //
        Stage.puyoBoard[y][x] = {
            puyoColor: puyoColor,
            element: puyoImage
        }
        //
        Stage.puyoCount++;
    }

    //
    static setPuyoInfo(x, y, info) {
        Stage.puyoBoard[y][x] = info;
    }

    //
    static getPuyoInfo(x, y) {
        //
        if (x<0 || x>= Config.stageCols || y >= Config.stageRows) {
            return {
                puyoColor: -1
            };
        }
        //
        if (y<0) {
            return null;
        }
        //
        return Stage.puyoBoard[y][x];
    }

    //
    static removePuyoInfo(x, y) {
        Stage.puyoBoard[y][x] = null;
    }

    //
    static checkFallingPuyo() {
        Stage.fallingPuyoInfoList = [];

        //
        for (let y = Config.stageRows -2; y>=0; y--) {
            for (let x = 0; x < Config.stageCols; x++) {
                const currentPuyoInfo = Stage.getPuyoInfo(x, y);
                if (!currentPuyoInfo) {
                    //
                    continue;
                }
                const belowPuyoInfo = Stage.getPuyoInfo(x, y+1);
                if (!belowPuyoInfo) {
                    //

                    //
                    Stage.removePuyoInfo(x,y);

                    //
                    let destination = y;
                    while (!Stage.getPuyoInfo(x, destination+1)) {
                        destination++;
                    }
                    //
                    Stage.setPuyoInfo(x, destination, currentPuyoInfo);
                    //
                    Stage.fallingPuyoInfoList.push({
                        element: currentPuyoInfo.element,
                        position: y*Config.puyoImageHeight,
                        destination: destination*Config.puyoImageHeight,
                        // destination: (destination - 1)*Config.puyoImageHeight,
                        falling: true
                    });
                }
            }
        }
            return (Stage.fallingPuyoInfoList.length > 0);
    }

    //
    static fallPuyo() {
        let isFalling = false;
        for (const fallingPuyoInfo of Stage.fallingPuyoInfoList) {
            if (!fallingPuyoInfo.falling) {
                //
                continue;
            }
            //
            let position = fallingPuyoInfo.position;
            position += Config.fallingSpeed;

            if (position >= fallingPuyoInfo.destination) {
                //
                position = fallingPuyoInfo.destination;
                fallingPuyoInfo.falling = false;
            } else {
                //
                isFalling = true;
            }
            //
            fallingPuyoInfo.position = position;
            //
            fallingPuyoInfo.element.style.top = position + "px";
        }
        return isFalling;
    }

    //
    static checkPuyoErase(startFrame) {
        Stage.eraseStartFrame = startFrame;
        Stage.erasingInfoList = [];

        //
        const erasedPuyoColorBin = {};

        //
        const checkConnectedPuyo = (x, y, connectedInfoList = []) => {
            //
            const originalPuyoInfo = Stage.getPuyoInfo(x, y);
            if (!originalPuyoInfo) {
                //
                return connectedInfoList;
            }
            //
            connectedInfoList.push({
                x: x,
                y: y,
                puyoInfo: originalPuyoInfo
            });
            Stage.removePuyoInfo(x, y);

            //
            const directionList = [[0,1], [1,0], [0,-1], [-1,0]];
            for (const direction of directionList) {
                const dx = x + direction[0];
                const dy = y + direction[1];
                const puyoInfo = Stage.getPuyoInfo(dx, dy);
                if (!puyoInfo || puyoInfo.puyoColor !== originalPuyoInfo.puyoColor) {
                    //
                    continue;
                }
                //
                checkConnectedPuyo(dx, dy, connectedInfoList);
            }
            return connectedInfoList;
        };

        const remainingInfoList = [];
        //
        for (let y=0; y<Config.stageRows; y++) {
            for (let x=0; x<Config.stageCols; x++) {
                const puyoInfo = Stage.getPuyoInfo(x, y);
                const connectedInfoList = checkConnectedPuyo(x, y);
                if (connectedInfoList.length < Config.erasePuyoCount) {
                    //
                    if (connectedInfoList.length) {
                        //
                        remainingInfoList.push(...connectedInfoList);
                    }
                } else {
                    if (connectedInfoList.length) {
                        //
                        Stage.erasingInfoList.push(...connectedInfoList);
                        erasedPuyoColorBin[puyoInfo.puyoColor] = true;
                    }
                }
            }
        }

        //
        Stage.puyoCount -= Stage.erasingInfoList.length;

        //
        for (const info of remainingInfoList) {
            Stage.setPuyoInfo(info.x, info.y, info.puyoInfo);
        }

        if (Stage.erasingInfoList.length) {
            //
            return {
                piece: Stage.erasingInfoList.length,
                color: Object.keys(erasedPuyoColorBin).length
            };
        }
        return null;
    }

    //
    static erasePuyo(frame) {
        const elapsedFrame = frame - Stage.eraseStartFrame;
        const ratio = elapsedFrame / Config.eraseAnimationFrames;
        if (ratio >= 1) {
            //
            for (const info of Stage.erasingInfoList) {
                var element = info.puyoInfo.element;
                Stage.stageElement.removeChild(element);
            }
            return false;
        } else if (ratio >= 0.75) {
            for (const info of Stage.erasingInfoList) {
                var element = info.puyoInfo.element;
                element.style.display = "block";
            }
            return true;
        } else if (ratio >= 0.50) {
            for (const info of Stage.erasingInfoList) {
                var element = info.puyoInfo.element;
                element.style.display = "none";
            }
            return true;
        } else if (ratio >= 0.25) {
            for (const info of Stage.erasingInfoList) {
                var element = info.puyoInfo.element;
                element.style.display = "block";
            }
            return true;
        } else {
            for (const info of Stage.erasingInfoList) {
                var element = info.puyoInfo.element;
                element.style.display = "none";
            }
            return true;
        }
    }

    //
    static showZenkeshi() {
        Stage.zenkeshiImage.style.transition = "none";
        Stage.zenkeshiImage.style.opacity = "1";
        Stage.zenkeshiImage.style.top = Config.puyoImageHeight * Config.stageRows + "px";
        Stage.zenkeshiImage.offsetHeight;

        Stage.zenkeshiImage.style.transition = "top " + Config.zenkeshiDuration + "ms linear";
        Stage.zenkeshiImage.style.top = Config.puyoImageHeight * Config.stageRows /3 + "px";
    }

    //
    static hideZenkeshi() {
        Stage.zenkeshiImage.style.transition = "opacity " + Config.zenkeshiDuration + "ms linear";
        Stage.zenkeshiImage.style.opacity = "0";
    }
}
