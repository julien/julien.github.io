!(function() {
	"use strict";
	function e() {
		var e = new XMLHttpRequest();
		(e.onreadystatechange = function() {
			var r;
			4 === e.readyState &&
				200 === e.status &&
				((r = JSON.parse(e.responseText)),
				(n = r.files),
				n && a.appendChild(t(n)));
		}),
			e.open("GET", "assets/files.json", !0),
			e.send(null);
	}
	function t(e) {
		for (
			var t = document.createDocumentFragment(), n = 0, a = e.length;
			n < a;
			n++
		) {
			var r = document.createElement("li"),
				o = document.createElement("a");
			o.setAttribute("href", e[n]),
				(o.textContent = e[n].replace(/^\w+\//, "")),
				r.appendChild(o),
				t.appendChild(r);
		}
		return t;
	}
	var n = [],
		a = document.querySelector(".list");
	window.onload = function() {
		e();
	};
})();
