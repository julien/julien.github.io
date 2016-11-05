(function () {
  'use strict';
  var d, s, c;
  d = document.getElementById('menu');
  if (!d) {
    c = document.createTextNode(
      '.menu { text-align: left;padding: 4px;position: absolute; ' +
         'right: 0;bottom: 0;left: 0;opactity: 0.7;' +
         'background-color: #000;color: #fff;font: 1.0em sans-serif;' +
         'text-transform: uppercase;font-weight: bold}' +
      '.menu a {text-decoration: none;color: #fff;text-transform: uppercase}' +
      '.menu a:hover {text-decoration: none; color: #ff00cc}' +
      '.menu a:link, a:visited {text-decoration: none;color: #fff}'
    );
    s = document.createElement('style');
    s.appendChild(c);
    document.getElementsByTagName('head')[0].appendChild(s);
    d = document.createElement('div');
    d.id = 'menu';
    d.className = 'menu';
    d.innerHTML = '<a href="/">BACK</a>';
    document.body.appendChild(document.createDocumentFragment().appendChild(d));
  }
}());
