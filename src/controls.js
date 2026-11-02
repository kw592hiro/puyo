class Controls {
    static btnElement = null;
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
        
        for (const btn of document.getElementsByClassName("tall")) {
            btn.style.height = Config.btnHeight * 1.8 + 'px';
        }

        document.getElementsByClassName('wide')[0].style.width = Config.btnHeight * 1.5 + 'px'

        document.getElementById("lrBtn").style.gap = Config.btnHeight * 0.8 + 'px';
        
        Controls.leftControlsElement = document.getElementById("leftControls");
        Controls.leftControlsElement.style.gap = Config.btnHeight * 0.4 + 'px';
        Controls.leftControlsElement.style.left = Config.controlsSideMargin + 'vw';
        Controls.leftControlsElement.style.top = Config.controlsTopMargin + 'vh';

        Controls.rightControlsElement = document.getElementById("rightControls");
        Controls.rightControlsElement.style.gap = Config.btnHeight * 0.4 + 'px';
        Controls.rightControlsElement.style.right = Config.controlsSideMargin + 'vw';
        Controls.rightControlsElement.style.top = Config.controlsTopMargin + 'vh';

        for (const btn of document.getElementsByClassName("selectBtn")) {
            btn.style.width = Config.btnWidth * 5 + 'px';
            btn.style.height = Config.btnHeight * 1.6 + 'px';
            btn.style.fontsize = Config.btnheight * 0.8 + 'px';
        }
        document.getElementById("levelBtns").style.gap = Config.btnHeight * 0.4 + 'px';
    }
}