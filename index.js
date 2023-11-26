const files = [
	"popcorn.html",
	"flies.html",
	"lavalamp.html",
	"bouncydots.html",
	"liquidots.html",
	"bit101.html",
	"soundcloud.html",
	"blobs.html",
	"trails.html",
	"shake.html",
	"random.html",
	"wut.html"
];

export function rndFile() {
	return files[Math.floor(Math.random() * files.length)];
}

export function wait() {
	setTimeout(() => {
		if (location.href.endsWith("?s")) {
			return;
		}
		let next = rndFile();
		let curr = location.pathname.split("/").pop();
		if (next !== curr) {
			location.href = next;	
		} else {
			location.href = '/';
		}
	}, 10000);
}
