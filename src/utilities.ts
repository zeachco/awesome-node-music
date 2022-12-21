import fs from "https://deno.land/std@0.170.0/node/fs.ts";
import path from "https://deno.land/std@0.170.0/node/path.ts";
import notifier from "npm:node-notifier";
import { create } from "npm:soundcloud-downloader";

const scdl = create({});

export function ensurePath(folder: string) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
		console.log(`Folder ${folder} added successfully.`);
	}
}

export const SAVE_FOLDER = ".cache";

export function isLikelySoundcloudURL(url: string) {
	return /^(https:\/\/soundcloud.com)?\/[a-z0-9\-]+\/[a-z0-9\-]+$/.test(url);
}

export async function save(song: string, refresh = false) {
	const songPath = song.replace("https://soundcloud.com", "").replace(/^\//, "");
	const url = ["https://soundcloud.com", songPath].join("/");
	const file = songPath.replace(/[^a-z0-9]/gi, "_");
	const fullFile = path.resolve(`./${SAVE_FOLDER}/${file}.mp3`);

	notifier.notify({
		title: "Looking up",
		message: file,
	});

	if (fs.existsSync(fullFile) && !refresh) {
		console.log(`* Found ${file}`);
		notifier.notify({
			title: file,
			message: `Already found: ${fullFile}`,
		});
	} else {
		console.log(`Checking <${url}>`);
		const stream = await scdl.download(url);
		stream.pipe(fs.createWriteStream(fullFile));
		console.log(`* Downloaded ${file}`);
		notifier.notify({
			title: file,
			message: `Downloaded: ${fullFile}`,
		});
	}
	return `file://${fullFile}`;
}
