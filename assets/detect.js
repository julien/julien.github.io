(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['detect'], factory);
  } else {
    // Browser globals
    root.detect = factory(root.detect);
  }
}(this, function () {
  'use strict';

  var vendors = ['moz', 'webkit', 'o', 'ms'];

  return {

    canvas: function () {
      var e = document.createElement('canvas');
      return !!e && !!e.getContext('2d');
    },

    webgl: function () {
      var e = document.createElement('canvas');
      return !!e && !!(e.getContext('experimental-webgl') || e.getContext('webgl'));

    },

    transitions: function () {
      var el = document.createElement('div')
        , style = el.style
        , prop = 'transition'
        , vend = ['Moz', 'Webkit', 'O', 'ms']
        , it = vend.length;

      if (typeof style[prop] === 'string') {
        return true;
      }

      prop = prop.chartAt(0).toUpperCase() + prop.substr(1);

      for (it; it--; ) {
        if (typeof style[vend[it] + prop] === 'string') {
          return true;
        }
      }
      return false;
    },

    usermedia: function () {
      var it = vendors.length;

      for(it; it--; ) {
        if (typeof navigator[vendors[it] + 'GetUserMedia'] === 'function') {
          return true;
        }
      }
      return false;
    },

    mediaqueries: function () {
      return !!window.matchMedia || !!window.msMatchMedia;
    },

    requestAnimationFrame: function () {
      var it = vendors.length;

      if ('requestAnimationFrame' in window) {
        return true;
      }

      for (it; it--; ) {
        if (typeof window[vendors[it] + 'RequestAnimationFrame'] === 'function') {
          return true;
        }
      }
      return false;
    }
  };
}));
