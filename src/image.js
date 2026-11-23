class GameImage {
    static puyoImageList = null;
    static edgeImageList = null;
    static positionImageList = null;
    static yokokuImageList = null;
    static randomNumbersList = null;
    static digitImageList = null;
    static batankyuImage = null;
    static gameOverFrame = 0;

    static initialize() {
        // ぷよの色をランダム化するためのリスト
        GameImage.randomNumbersList = [0, 1, 2, 3, 4];

        //
        GameImage.puyoImageList = [];
        for (let i = 0; i < Config.puyoColorMax; i++) {
            const image = document.getElementById("puyo_" + (i+1));
            image.removeAttribute('id');
            image.width = Config.puyoImageWidth;
            image.height = Config.puyoImageHeight;
            image.style.position = 'absolute';
            GameImage.puyoImageList[i] = image;
        }

        // 軸ぷよの輪郭を光らせる画像
        GameImage.edgeImageList = [];
        for (let i = 0;  i < Config.puyoColorMax; i++) {
            const image = document.getElementById("edge_" + (i+1));
            image.removeAttribute('id');
            image.width = Config.puyoImageWidth;
            image.height = Config.puyoImageHeight;
            image.style.position = 'absolute';
            GameImage.edgeImageList[i] = image;
        }

        // 自ぷよの落下位置を示す画像
        GameImage.positionImageList = [];
        for (let i = 0;  i < Config.puyoColorMax; i++) {
            const image = document.getElementById("position_" + (i+1));
            image.removeAttribute('id');
            image.width = Config.puyoImageWidth;
            image.height = Config.puyoImageHeight;
            image.style.position = 'absolute';
            GameImage.positionImageList[i] = image;
        }

         // スコアの数字の画像
        GameImage.digitImageList = [];
        for (let i=0; i<10; i++) {
            const image = document.getElementById("font_" + i);
            image.removeAttribute("id");

            //
            const width = image.width / image.height * Config.scoreHeight;
            image.width = width;
            image.height = Config.scoreHeight;

            GameImage.digitImageList[i] = image;
        }

        // おじゃまぷよ予告の画像
        GameImage.yokokuImageList = [];
        for (let i = 0; i < Config.yokokuTable.length; i++) {
            const image = document.getElementById("yokoku_" + (i+1));
            image.removeAttribute('id');

            image.height = Config.puyoImageHeight;
            if (i != Config.yokokuTable.length - 1) {
                image.width = Config.puyoImageWidth;
                // image.height = Config.puyoImageHeight;
            } else {
                // 小ぷよの幅だけは小さめ
                image.width = Config.puyoImageWidth * 0.6;
                // image.height = Config.puyoImageHeight;
            }
            image.style.position = 'absolute';
            GameImage.yokokuImageList[i] = image;
        }

        //
        GameImage.batankyuImage = document.getElementById("batankyu");
        GameImage.batankyuImage.width = Config.puyoImageWidth * Config.stageCols;
        GameImage.batankyuImage.style.position = "absolute";
    }

    // ゲームに登場するぷよの色をランダムに選択する
    static randomPuyoColor() {
        GameImage.randomNumbersList = [0, 1, 2, 3, 4];
        for (let i = GameImage.puyoImageList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // [GameImage.puyoImageList[i], GameImage.puyoImageList[j]] = 
            //     [GameImage.puyoImageList[j], GameImage.puyoImageList[i]];
            [GameImage.randomNumbersList[i], GameImage.randomNumbersList[j]] = 
                [GameImage.randomNumbersList[j], GameImage.randomNumbersList[i]];
        }
    }

    //
    static getPuyoImage(color) {
        // const image = GameImage.puyoImageList[color - 1].cloneNode(true);
        const image = GameImage.puyoImageList[GameImage.randomNumbersList[color - 1]].cloneNode(true);
        return image;
    }

    static getEdgeImage(color) {
        // const image = GameImage.edgeImageList[color - 1].cloneNode(true);
        const image = GameImage.edgeImageList[GameImage.randomNumbersList[color - 1]].cloneNode(true);
        return image;
    }
    
    static getPositionImage(color) {
        // const image = GameImage.edgeImageList[color - 1].cloneNode(true);
        const image = GameImage.positionImageList[GameImage.randomNumbersList[color - 1]].cloneNode(true);
        return image;
    }
    
    static getYokokuImage(yokoku) {
        const image = GameImage.yokokuImageList[yokoku].cloneNode(true);
        return image;
    }
    //
    static getDigitImage(digit) {
        const image = GameImage.digitImageList[digit].cloneNode(true);
        return image;
    }
    
    //
    static getDigitImageWidth() {
        return GameImage.digitImageList[0].width;
    }

    //
    static prepareBatankyuAnimation(frame) {
        //
        GameImage.gameOverFrame = frame;
        //
        Stage.stageElement.appendChild(GameImage.batankyuImage);
        //
        GameImage.updateBatankyu(frame);
    }

    //
    static updateBatankyu(frame) {
        //
        const ratio = (frame - GameImage.gameOverFrame) / Config.batankyuAnimationFrames;
        //
        const height = Config.puyoImageHeight * Config.stageRows;
        const x = Math.sin(ratio * Math.PI *2*5) * Config.puyoImageWidth;
        const y = -Math.cos(ratio * Math.PI *2) * height /4 + height/2;
        //
        GameImage.batankyuImage.style.left = x + "px";
        GameImage.batankyuImage.style.top = y + "px";
    }
}

