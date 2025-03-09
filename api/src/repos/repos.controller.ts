import express from "express";
import data from "../../data.json";
import type { Request, Response } from "express";
import type { Repos } from "./repos.type";
import { validateRepo } from "./repos.validate";

const repos = express.Router();

let reposState = data;

repos.get("/", (req: Request, res: Response) => {
	console.log(req.query);

	let result = req.query.isPrivate
		? reposState.filter(
				(rep) => rep.isPrivate.toString() === req.query.isPrivate,
			)
		: reposState;

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
			// 🔥 Vérifier que fields est bien un tableau avant d'utiliser reduce car TS indique qu'il pourrait etre autre chose
			if (!Array.isArray(fields)) return repo; // ✅ Protèger contre l'erreur :
			//  Ici on dit que si fields n'est pas un tableau, on retourne simplement repo tel quel sans filtrer les champs
			const res = fields.reduce(
				(acc, f) =>
					// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
					f in repo ? { ...acc, [f]: repo[f as keyof Repos] } : acc, // ✅ Vérifier si la clé existe dans l'objet repo car TS disait que f pourrait etre undefined
				// + preciser le type de f dans Repos donc une cle de l'objet
				{} as Partial<Repos>, // ✅ Préciser le type de l'accumulateur
			);
			return res;
		}) as Repos[];
	}

	res.status(200).json(result);
});

repos.get("/:id", (req: Request, res: Response) => {
	const repo = reposState.find(
		(rep) => rep.id === Number(req.params.id),
	) as Repos;

	if (repo) {
		res.status(200).json(repo);
	} else {
		console.log({
			error: { msg: `Route delete, id not found, ${req.params.id}` },
		});
		res.sendStatus(404);
	}
});

repos.post("/", validateRepo, (req: Request, res: Response) => {
	const newRepo = { ...req.body, id: reposState[reposState.length - 1].id + 1 };
	reposState.push(newRepo);
	res.status(201).json(newRepo);
});

repos.delete("/:id", (req: Request, res: Response) => {
	if (reposState.some((repo) => repo.id === Number(req.params.id))) {
		reposState = reposState.filter((repo) => repo.id !== Number(req.params.id));
		console.log(reposState);
		res.sendStatus(204);
	} else {
		console.log({
			error: { msg: `Route delete, id not found, ${req.params.id}` },
		});
		res.sendStatus(404);
	}
});

repos.put("/:id", (req: Request, res: Response) => {
	const repoToFind = reposState.find(
		(repo) => repo.id === Number(req.params.id),
	);
	console.log(repoToFind);
	const { description, id, isPrivate, name, url } = req.body as Repos;

	console.log(repoToFind);
	if (repoToFind) {
		repoToFind.description = description ?? repoToFind.description;
		// 🔥 ?? opérateur de coalescence des nuls (nullish coalescing operator) en JavaScript et TypeScript.
		// Si description est fourni dans req.body, il sera utilisé. Si elle est undefined ou null, on garde repoToFind.description inchangé.
		// C'est utile pour éviter d'écraser des valeurs existantes lorsqu'une clé est absente du req.body
		repoToFind.id = id ?? repoToFind.id; // ⚠️Modifier l'ID peut être problématique
		repoToFind.isPrivate = isPrivate ?? repoToFind.isPrivate;
		repoToFind.name = name ?? repoToFind.name;
		repoToFind.url = url ?? repoToFind.url;
		res.status(200).json(repoToFind);
	} else {
		res.sendStatus(400);
	}
});

export default repos;
