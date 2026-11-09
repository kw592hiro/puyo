class Controls {
    static btnElement = null;
    static twoBtnsElement = null;
    static threeBtnsElement = null;
    static leftControlsElement = null;
    static rightControlsElement = null;

    static initialize() {
        // ボタンのサイズ指定
        Controls.btnElement = document.getElementsByClassName('btn');
        for (const btn of Controls.btnElement) {
            btn.style.width = Config.btnWidth + 'px';
            btn.style.height = Config.btnHeight + 'px';
            btn.style.fontSize = Config.btnHeight * 0.5 + 'px';
            btn.style.borderRadius = Config.btnHeight * 0.15 + 'px';
            btn.style.boxShadow = '0 ' + Config.btnHeight * 0.05 + 'px ' + Config.btnHeight * 0.1 + 'px rgba(0,0,0,0.2)'
        }
        
        // for (const btn of document.getElementsByClassName("tall")) {
        //     btn.style.height = Config.btnHeight * 1.8 + 'px';
        // }

        for (const btn of document.getElementsByClassName('wide')) {
            btn.style.width = Config.btnHeight * 1.6 + 'px';
        }

        Controls.twoBtnsElement = document.getElementsByClassName('twoBtns');
        for (const btns of Controls.twoBtnsElement) {
            btns.style.gap = Config.btnHeight * 0.8 + 'px';
        }

        Controls.leftControlsElement = document.getElementById("leftControls");
        Controls.leftControlsElement.style.gap = Config.btnHeight * 0.4 + 'px';
        Controls.leftControlsElement.style.top = Config.controlsTopMargin + 'vh';
        Controls.leftControlsElement.style.left = Config.controlsSideMargin + 'vw';

        Controls.rightControlsElement = document.getElementById("rightControls");
        Controls.rightControlsElement.style.gap = Config.btnHeight * 0.4 + 'px';
        Controls.rightControlsElement.style.top = Config.controlsTopMargin + 'vh';
        Controls.rightControlsElement.style.right = Config.controlsSideMargin + 'vw';

        for (const btn of document.getElementsByClassName("selectBtn")) {
            btn.style.width = Config.btnWidth * 5 + 'px';
            btn.style.height = Config.btnHeight * 1.6 + 'px';
            btn.style.fontsize = Config.btnheight * 0.8 + 'px';
        }
        document.getElementById("levelBtns").style.gap = Config.btnHeight * 0.4 + 'px';
    }
}