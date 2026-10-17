class controls {
    static initialize() {
        // ボタンのサイズ指定
        Stage.btnElement = document.getElementsByClassName('btn');
        for (const btn of Stage.btnElement) {
            btn.style.width = Config.btnWidth + 'px';
            btn.style.height = Config.btnHeight + 'px';
            btn.style.fontSize = Config.btnHeight * 0.4 + 'px';
            btn.style.borderRadius = Config.btnHeight * 0.15 + 'px';
            btn.style.boxShadow = '0 ' + Config.btnHeight * 0.05 + 'px ' + Config.btnHeight * 0.1 + 'px rgba(0,0,0,0.2)'
        }
        
        for (const btn of document.getElementsByClassName("tall")) {
            btn.style.height = Config.btnHeight * 1.8 + 'px';
        }

        document.getElementsByClassName('wide')[0].style.width = Config.btnHeight * 1.5 + 'px'

        document.getElementById("lrBtn").style.gap = Config.btnHeight * 0.8 + 'px';

        const leftControlsMarginBottom = document.getElementById("mainStage").offsetHeight - window.innerHeight + Config.controlsMarginBottom;
        Stage.leftControlsElement = document.getElementById("leftControls");
        Stage.leftControlsElement.style.gap = Config.btnHeight * 0.4 + 'px';
        Stage.leftControlsElement.style.marginLeft = Config.controlsMarginSide + "px";
        Stage.leftControlsElement.style.marginBottom = leftControlsMarginBottom + 'px';

        Stage.rightControlsElement = document.getElementById("rightControls");
        Stage.rightControlsElement.style.gap = Config.btnHeight * 0.4 + 'px';
        Stage.rightControlsElement.style.marginRight = Config.controlsMarginSide + "px";
        Stage.rightControlsElement.style.marginBottom = leftControlsMarginBottom + (Stage.leftControlsElement.offsetHeight - Stage.rightControlsElement.offsetHeight) / 2 + 'px';

        // デバッグ用
        // const testStyle = getComputedStyle(Stage.rightControlsElement);
        // console.log(testStyle.width, testStyle.height);
    }
}