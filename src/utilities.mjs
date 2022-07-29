import fs from "fs";

export function ensurePath(folder) {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
		console.log(`Folder ${folder} added successfully.`);
	}
}
