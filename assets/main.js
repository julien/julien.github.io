(function() {
	"use strict";
	var files = [];
	var list = document.querySelector(".list");

	function listFiles() {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			var data;
			if (xhr.readyState === 4 && xhr.status === 200) {
				data = JSON.parse(xhr.responseText);
				files = data.files;

				if (files) {
					list.appendChild(fileList(files));
				}
			}
		};
		xhr.open("GET", "assets/files.json", true);
		xhr.send(null);
	}

	function fileList(files) {
		var frag = document.createDocumentFragment();
		for (var i = 0, l = files.length; i < l; i++) {
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.setAttribute("href", files[i]);
			a.textContent = files[i].replace(/^\w+\//, "");
			li.appendChild(a);
			frag.appendChild(li);
		}
		return frag;
	}

	window.onload = function() {
		listFiles();
	};
})();
