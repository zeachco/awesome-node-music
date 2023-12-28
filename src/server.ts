import express from "npm:express";
import { Request, Response } from "npm:@types/express";
import { isLikelySoundcloudURL, save } from "./utilities.ts";
import { getBpmKeySpotify } from './bpm.ts'
import cors from "npm:cors";

export const server = express();

server.use(cors());
server.use("/", express.static("static"));


server.get("/bpm/:artist/:song", async (req: Request, res: Response) => {
	const { artist, song } = req.params

	try {
		const result = await getBpmKeySpotify(artist, song);
		res.status(200);
		res.send(result);
	} catch (error) {
		res.status(500);
		res.send("nope<br/>" + error);
	}
});

server.get("/*", async (req: Request, res: Response) => {
	console.log(req.path);
	if (isLikelySoundcloudURL(req.path)) {
		await save(req.path);
		res.status(200);
		res.send("ok");
	}
	res.status(500);
	res.send("nope");
});
