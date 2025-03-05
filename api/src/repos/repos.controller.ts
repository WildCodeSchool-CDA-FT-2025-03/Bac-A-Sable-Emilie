import express from "express";
import data from "../../data.json";
import type { Request, Response } from "express";
import type { Repos } from "./repos.type";

const repos = express.Router();
repos.get("/", (_, res: Response) => {
	res.status(200).json(data);
});

repos.get("/:id", (req: Request, res: Response) => {
	const repo = data.find((rep) => rep.id === Number(req.params.id)) as Repos;

	if (repo) {
		res.status(200).json(repo);
	} else {
		res.sendStatus(400);
	}
});

repos.post("/", (req: Request, res: Response) => {
	console.log(req.body);
	res.status(200).send("Tout est ok pour ajouter");
});

export default repos;
