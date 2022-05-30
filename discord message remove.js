// ==UserScript==
// @name        Discord Hide Blocked Messages
// @namespace   http://tampermonkey.net/
// @match       https://discord.com/*
// @version     1.0
// @author      wuw2135
// @description  remove the annoying thing
// ==/UserScript==

function hideBlocked(){
    const blocked = document.querySelectorAll('[class^="groupStart"]');
    blocked.forEach(blokMsg => {
        blokMsg.style.display = "none";
    });

    const contentblock = document.querySelectorAll('[class^="messageListItem"]');
    const bcms = ["測試2"]; //在這裡增加想隱藏的關鍵字
    contentblock.forEach(blokMsg => {
        for(let i=0;i<blokMsg.textContent.length;i++){
          for(let j=0;j<bcms.length;j++){
            if(bcms[j][0] === blokMsg.textContent[i]){
                let flag = 0;
                for(let z=1;z<bcms[j].length;z++){
                    if(blokMsg.textContent[i+z] !== bcms[j][z]) {
                        flag = 1;
                        break;
                    }
                }
                if(!flag) blokMsg.closest("li").style.display = "none";
            }
          }
        }
    });


};
setInterval(hideBlocked, 500);
