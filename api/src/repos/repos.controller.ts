import express from "express";
import data from "../../data.json";
import type { Request, Response } from "express";
import type { Repos } from "./repos.type";
import { validateRepo } from "./repos.validate";

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

repos.post("/", validateRepo, (req: Request, res: Response) => {
	const newRepo = { ...req.body, id: data.length + 1 };
	data.push(newRepo);
	res.status(201).json(newRepo);
});

export default repos;
