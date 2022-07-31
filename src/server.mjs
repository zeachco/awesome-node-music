import express from "express";
import { save } from "./utilities.mjs";
import cors from "cors";

export const server = express();

server.use(cors());

server.get("/*", async (req, res) => {
	await save(req.path);
	res.status(200);
	res.send("ok");
});