import fs from "fs";
import path from "path";

import { create } from "soundcloud-downloader";

const scdl = create();

export function ensurePath(folder) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
		console.log(`Folder ${folder} added successfully.`);
	}
}

export const saveIn = ".cache";

export async function save(song, refresh = false) {
	const songPath = song.replace(/^\//, "");
	const url = ["https://soundcloud.com", songPath].join("/");
	const file = songPath.replace(/[^a-z0-9]/gi, "_");
	const fullFile = path.resolve(`./${saveIn}/${file}.mp3`);

	if (fs.existsSync(fullFile) || refresh) {
		console.log(`* Found ${file}`);
	} else {
		const stream = await scdl.download(url);
		stream.pipe(fs.createWriteStream(fullFile));
		console.log(`* Downloaded ${file}`);
	}
	return `file://${fullFile}`;
}
