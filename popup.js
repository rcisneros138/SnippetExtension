document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      page = document;

      var form = page.createElement('form');
      form.action = 'http://localhost:18527/Snippets/create';
      form.method = 'post';
      var input = page.createElement('input');
      input.type = 'hidden';
      input.name = 'url';
      input.value = tab.url;
      form.appendChild(input);
      page.body.appendChild(form);
      form.submit();
    });
  }, false);
}, false);