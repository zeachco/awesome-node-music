import { ensurePath, saveIn } from "./utilities.mjs";

import { server } from "./server.mjs";

export async function app() {
	ensurePath(saveIn);
	server.listen(3000, "", () => console.log("listening on port 3000"));
}

app();
