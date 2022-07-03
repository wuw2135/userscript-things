// ==UserScript==
// @name         yt thumbnail dl
// @namespace    https://github.com/wuw2135
// @version      0.1
// @description  dl maximum size
// @author       wuw2135
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==


const apikey = 'ytapikey';

async function ButtonClickAction (zEvent) {
    let dataurl = document.URL;
    let videoid = (dataurl.search('&') >= 0 ? dataurl.split('v=')[1].split('&')[0] : dataurl.split('v=')[1]);

    let response = await fetch('https://www.googleapis.com/youtube/v3/videos?id='+videoid+'&key='+apikey+'&part=snippet', {method: 'get'})
    let data = await response.json();
    let imgurl,i=4,flag = true;
    let imgsize = ['default','medium','high','standard','maxres'];
    while(i>=0){
        try {
            imgurl = data.items[0].snippet.thumbnails[imgsize[i]].url;
        }catch(e){
            flag = false;
            i--;
        }
        if(flag) break;
        else flag = true;
    }

     window.open(imgurl, '_blank').focus();
}

var count
window.addEventListener('load', function () {
  var count = setInterval(thumbbt,500);
})

function thumbbt() {
    if(document.getElementById ("myButton") == null){
        var zNode = document.createElement ('form');
        zNode.innerHTML = '<button id="myButton" type="button">Get<br>Thumbnail</button>';
        zNode.setAttribute ('class', 'my-form');
        try{
            document.querySelector("#top-level-buttons-computed").appendChild (zNode);

            document.getElementById ("myButton").addEventListener (
                "click", ButtonClickAction, false
            );
            clearInterval(count)
        }
        catch (e){}
    }else{clearInterval(count)}
}




