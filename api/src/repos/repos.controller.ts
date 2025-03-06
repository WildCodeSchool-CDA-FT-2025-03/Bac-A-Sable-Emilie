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

	if (req.query.fields) {
		const fields =
			typeof req.query.fields === "string"
				? req.query.fields.split(",")
				: ([] as string[]);
		console.log(fields);
		result = result.map((repo: Repos) => {
			// 🔥 Vérifier que fields est bien un tableau avant d'utiliser reduce
			if (!Array.isArray(fields)) return repo;
			const res = fields.reduce(
				(acc, f) =>
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					f in repo ? { ...acc, [f]: repo[f as keyof Repos] } : acc, // ✅ Vérifier si la clé existe dans l'objet repo car TS disait que f pourrait etre undefined + preciser le type de f dans Repos donc une cle de l'objet
				{} as Partial<Repos>, // ✅ Préciser le type de l'accumulateur
			);
			return res;
		}) as Repos[];
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
