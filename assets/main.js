(function () {
  'use strict';

  var files = [];
  var list = document.querySelector('.list');



  function loadFile(index) {
    currentId = index;
    document.location.href = files[currentId].url;
  }

  function onTileClick(e) {
    var id = e.currentTarget.id.replace('tile', '');
    loadFile(parseInt(id, 10));
  }

  function sortFiles(files) {
    // custom filtering
    // - no "type" attribute means something we don't want to show
    var i;

    for (i = files.length - 1; i >= 0; i -= 1) {
      if (!files[i].type) {
        files.splice(i, 1);
      }
    }
  }


  function listFiles() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      var data;
      if (xhr.readyState === 4 && xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        files = data.data.files;

        if (files) {

          list.appendChild(fileList(files));

        }
      }
    };
    xhr.open('GET', 'assets/files.json', true);
    xhr.send(null);
  }

  function fileList(files) {
    var frag = document.createDocumentFragment();
    for (var i = 0, l = files.length; i < l; i++) {
      var li = document.createElement('li');
      var a = document.createElement('a')
      a.setAttribute('href', files[i].url);
      a.textContent = files[i].url.replace(/^\w+\//, '');
      li.appendChild(a);
      frag.appendChild(li);
    }
    return frag;
  }

  window.onload = function () {
    listFiles();
  };

}());
