import { server } from "./server.ts";

import {
	ensurePath,
	isLikelySoundcloudURL,
	save,
	SAVE_FOLDER,
} from "./utilities.ts";

const args = Deno.args;

let found = false;

args.forEach(async (arg: string) => {
	if (isLikelySoundcloudURL(arg)) {
		const res = await save(arg);
		found = true;
		console.log(res);
		return;
	}
	if (arg === "-h" || arg === "--help") {
		found = true;
		console.log(`
-f <path to soundcloud song>
--server or -s for server
`);
		return;
	}
});

if (!found) {
	ensurePath(SAVE_FOLDER);
	server.listen(3000, "", () => console.log("listening on port 3000"));
}
