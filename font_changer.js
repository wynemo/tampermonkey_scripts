// ==UserScript==
// @name         font changer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://weread.qq.com/*
// @match        https://web.koodoreader.com/*
// @match        https://reader.ttsu.app/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  GM_addStyle(`

pre span {
    font-family: Menlo !important;

}

body, button, input, select, textarea, span:not(.immersive-translate-target-inner *) , div {
    /*
    font-family: Zed Mono,LXGW WenKai,LXGW Neo XiHei,Verdana,Lucida Grande !important;
    */
    font-family: Zed Mono,LXGW WenKai,LXGW Neo XiHei,Verdana,Lucida Grande;
    outline: none;
    -webkit-text-size-adjust: none;
}


p {
    font-family: Zed Mono,LXGW WenKai,LXGW Neo Xihei !important;
}



a {
font-family: Verdana,LXGW Neo XiHei;
}


.readerChapterContent [class*=" ccn-"]  {
    font: 18px / 36px LXGW Neo XiHei,LXGW WenKai,汉仪旗黑50S, HYQiHei-50s, 'PingFang SC', -apple-system, 'SF UI Text', 'Lucida Grande', STheiti, 'Microsoft YaHei', sans-serif !important;
    height: 25px;
    line-height: 25px;
}
.readerChapterContent .content {
    font: 18px / 36px LXGW Neo XiHei,LXGW WenKai,汉仪旗黑50S, HYQiHei-50s, 'PingFang SC', -apple-system, 'SF UI Text', 'Lucida Grande', STheiti, 'Microsoft YaHei', sans-serif !important;

}


`);
})();
