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
		let next = rndFile();
		let curr = window.location.pathname.split("/").pop();
		if (next !== curr) {
			location.href = next;	
		}
	}, 10000);
}
