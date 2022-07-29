const scdl = require("soundcloud-downloader").default;
const fs = require("fs");
const path = require("path");
const saveIn = ".cache";

const downloads = [
	"nulu-431516024/yamil-bumblebee-guy-laliberte",
	"8day-montreal/premiere-laroz-feat-faytinga-naomi-original-mix-sol-selectas",
	"astronomicgoa/goa-psytrance-mix-2020-astrix-vini-vici",
];

import("./utilities.mjs").then(async ({ ensurePath }) => {
	ensurePath(saveIn);
	const promises = downloads.map(save);
	await Promise.all(promises);
});

async function save(song, refresh = false) {
	const url = ["https://soundcloud.com", song].join("/");
	const file = song.replace(/[^a-z0-9]/gi, "_");
	const fullFile = path.resolve(`./${saveIn}/${file}.mp3`);

	if (fs.existsSync(fullFile)) {
		console.log(`* Found ${file}`);
	} else {
		const stream = await scdl.download(url);
		stream.pipe(fs.createWriteStream(fullFile));
		console.log(`* Downloaded ${file}`);
	}
}
