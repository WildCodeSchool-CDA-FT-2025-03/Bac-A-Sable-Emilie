import express from "express";
import data from "../../data.json";
import type { Request, Response } from "express";
import type { Repos } from "./repos.type";
import { validateRepo } from "./repos.validate";

const repos = express.Router();
repos.get("/", (req: Request, res: Response) => {
	console.log(req.query);

	let result = req.query.isPrivate
		? data.filter((rep) => rep.isPrivate.toString() === req.query.isPrivate)
		: data;

	if (req.query.limit && result.length > +req.query.limit) {
		result = result.splice(0, +req.query.limit);
	}

	res.status(200).json(result);
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
