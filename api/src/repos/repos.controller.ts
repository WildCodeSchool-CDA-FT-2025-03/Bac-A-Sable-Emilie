import express from "express";
import data from "../../data.json";
import type { NextFunction, Request, Response } from "express";
import type { Repos } from "./repos.type";
import Joi from "joi";

const repos = express.Router();
repos.get("/", (_, res: Response) => {
	res.status(200).json(data);
});

const schema = Joi.object({
	description: Joi.string().required(),
	name: Joi.string().required(),
	url: Joi.string().required(),
});

const validateRepo = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	const { error } = schema.validate(req.body);
	if (error) {
		res.status(422).json(error);
	} else {
		next();
	}
};

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
