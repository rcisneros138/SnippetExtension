//function capturePage(tab){
//  chrome.tabs.captureVisibleTab(
//      tab.id, {format: 'png', quality: 100}, function(dataURL) {
//        if (dataURL) {
//          var image = new Image();
//          image.onload = function() {
//            sendLogMessage('img dims: ' + image.width + ', ' + image.height);
//            screenshot.ctx.drawImage(image, 0, 0);
//
//          };
//          image.src = dataURL;
//        }
//      });
//}
//chrome.browserAction.onClicked.addListener(function(tab) {
//  chrome.tabs.captureVisibleTab(null, function(img) {
//    var xhr = new XMLHttpRequest(), formData = new FormData();
//    formData.append("img", img);
//    xhr.open("POST", "http://myserver.com/submitImage", true);
//    xhr.send(formData);
//  });
//});

//$(document).ready( function () {
//  chrome.tabs.query({
//
//        active: true,
//        currentWindow: true
//
//      },
//      function (tabs) {
//        chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT,function (dataurl) {
//
//          //submitform(dataurl);
//          //$('.imageLink').append("<a href='" + dataurl + "'>" + tabs[0].url + "</a>");
//            //var image = dataurl.value();
//
//           blobImage = dataURItoBlob(dataurl);
//            var fd = new FormData();
//            fd.append("image", blobImage);
//            fd.append("url",tabs[0].url);
//            var xhr = new XMLHttpRequest();
//            //xhr.open("POST", "http://localhost:18527/snippets/extensionview/", false);
//            //xhr.send(fd);
//            console.log("sent");
//
//
//            page = document;
//            var form = page.createElement('form');
//
//            xhr.open("POST", "http://localhost:18527/snippets/extensionview/", false);
//            xhr.onload = function(){
//                form.action = 'http://localhost:18527/snippets/extensionview/';
//                form.method = 'post';
//            };
//            xhr.send(fd);
//            form.submit();
//            }
//        )
//      }
//  );
//
//});
function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}



  document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function () {

        chrome.tabs.query({

                active: true,
                currentWindow: true

            },
            function (tabs) {
                chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT,function (dataurl) {

                    //submitform(dataurl);
                    //$('.imageLink').append("<a href='" + dataurl + "'>" + tabs[0].url + "</a>");
                    //var image = dataurl.value();

                    blobImage = dataURItoBlob(dataurl);
                    var fd = new FormData();
                    fd.append("image", blobImage);
                    fd.append("url",tabs[0].url);
                    var xhr = new XMLHttpRequest();
                    //xhr.open("POST", "http://localhost:18527/snippets/extensionview/", false);
                    //xhr.send(fd);
                    console.log("sent");


                    page = document;
                    var form = page.createElement('form');

                    /*xhr.open("POST", "http://localhost:18527/snippets/extensionview/", false);
                    xhr.onreadystatechange = function(){

                    };
                    xhr.send(fd);*/
                    form.action = 'http://localhost:18527/snippets/extensionview/';
                    form.method = 'post';
                    var inputElement = document.createElement('input');
                    inputElement.setAttribute('type', 'text');
                    inputElement.setAttribute('name', "imageData");
                    inputElement.setAttribute('value', JSON.stringify(dataurl));


                    //inputElement.setAttribute('type', 'text');
                    //inputElement.setAttribute('name', "url");
                    //inputElement.setAttribute('value', tabs[0].url);

                    form.appendChild(inputElement);

                    form.submit();
                })
            }
        );
    }, false);
  }, false);


//function sendLogMessage(data) {
//  chrome.tabs.getSelected(null, function (tab) {
//    chrome.tabs.sendRequest(tab.id, {msg: 'logMessage', data: data}, function () {
//    });
//  });
//}