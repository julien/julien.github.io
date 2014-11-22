(function () {
  'use strict';

  var currentId = 0
    , files = []
    , tileGroup;

  tileGroup = document.querySelector('.tile-group');

  function shuffleArray (target) {
    var currentIndex = target.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = target[currentIndex];
      target[currentIndex] = target[randomIndex];
      target[randomIndex] = temporaryValue;
    }

    return target;
  }

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

  function layoutTiles() {
    var i
      , l = files.length
      , frag
      , div
      , img
      , file;

    frag = document.createDocumentFragment();

    files.sort(function (a, b) {
      if (a.type < b.type) {
        return -1;
      } else if (a.type > b.type) {
        return 1;
      }
      return 0;
    });

    for (i = 0; i < l; i += 1) {
      file = files[i];

      div = document.createElement('div');
      div.classList.add('tile');
      div.classList.add('left');
      div.setAttribute('data-file-type', file.type);


      div.id = 'tile' + parseInt(i, 10);

      img = document.createElement('img');
      img.src = files[i].img;

      div.appendChild(img);
      div.onclick = onTileClick;

      frag.appendChild(div);
    }
    tileGroup.appendChild(frag);
  }

  function listFiles() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      var data;
      if (xhr.readyState === 4 && xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        files = data.data.files;

        if (files) {
          sortFiles(files);
          files = shuffleArray(files);
          layoutTiles();
        }
      }
    };
    xhr.open('GET', 'assets/files.json', true);
    xhr.send(null);
  }

  window.onload = function () {
    // check for "most" needed features
    if (!detect.canvas() || !detect.webgl()) {
      tileGroup.innerHTML = 'It seems that your browser doesn\'t support this website\'s requirements; maybe it\'s time to update it or try a newer one';
      return;
    }
    listFiles();
  };

}());
