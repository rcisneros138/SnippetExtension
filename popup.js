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


$(document).ready( function () {
  chrome.tabs.query({
        // gets the window the user can currently see
        active: true,
        currentWindow: true
      },
      function (tabs) {
        chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT,function (dataurl) {
          var image = new Image();



              $('.imageLink').append("<a href='" + dataurl + "'>" + tabs[0].url + "</a>");
            }
        );
      }
  );

});
function getTabUrl(){
  chrome.tabs.getSelected(null, function (tab){
    return tab.url;
  })
};

function submitform(){
  var postdata = $('#login-form').serialize();
  var image = document.getElementById('imageLink').value;
  //var url = getTabUrl();
  var fd = new FormData();
  fd.append("image", image);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:18527/snippets/extensionview/?Id=", false);
  xhr.send(fd);

}

  document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function () {

      chrome.tabs.getSelected(null, function (tab) {
        page = document;


        var form = page.createElement('form');
        form.action = 'http://localhost:18527/snippets/extensionview/?Id=' + tab.url;
        form.method = 'post';
        //use callback
        //var input = page.createElement('input');
        //input.type = 'hidden';
        //input.name = 'url';
        //input.value = tab.url;
        //form.appendChild(input);
        //page.body.appendChild(form);
        form.submit();
      });
    }, false);
  }, false);


//function sendLogMessage(data) {
//  chrome.tabs.getSelected(null, function (tab) {
//    chrome.tabs.sendRequest(tab.id, {msg: 'logMessage', data: data}, function () {
//    });
//  });
//}