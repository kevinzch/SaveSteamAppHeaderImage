// ==UserScript==
// @name         Save Steam store app header image
// @description  ****
// @namespace    ****
// @version      0.11
// @author       Kevin
// @include      https://store.steampowered.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const saveHeaderPic = () => {
        try {
            // Create button and set button style
            let saveBtn = document.createElement('button');

            // Get url of header image
            let headerImgUrl = document.getElementsByClassName('game_header_image_full')[0].currentSrc;

            // Get app's name
            let appName = document.getElementById('appHubAppName');

            // Empty Variables which will be reused in click event
            let folderId = '';
            let fullUrl = '';
            let explorerPath = '';
            let jsonObj = null;
            let length = 0;

            // Set button style
            saveBtn.textContent = 'Save header pic';
            saveBtn.style.backgroundColor = '#4baf4f';
            saveBtn.style.color = 'white';
            saveBtn.style.borderRadius = '8px';
            saveBtn.style.padding = '0px 20px';

            // Add button to document
            appName.appendChild(saveBtn);

            // Add button click listner
            saveBtn.addEventListener('click',async function(){

                let headerImg = await fetch(headerImgUrl);
                let headerImgBlob = await headerImg.blob();
                let imageURL = URL.createObjectURL(headerImgBlob);

                let link = document.createElement('a');
                link.href = imageURL;

                // Remove ':' from app's name and save image with it as jpg
                link.download = appName.childNodes[0].textContent.replace(':','') + '.jpg';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
        }
        catch (e) {
            setTimeout(() => {
                saveHeaderPic();
            }, 500);
        }
    };

    setTimeout(() => {
        saveHeaderPic();
    }, 100);

})();
