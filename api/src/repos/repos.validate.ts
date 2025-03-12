import type { Request, Response, NextFunction } from "express";
import Joi from "joi";
import logger from "../service/logger";

const schema = Joi.object({
	description: Joi.string().required(),
	name: Joi.string().required(),
	url: Joi.string().required(),
	isPrivate: Joi.boolean().required(),
	languages: Joi.array().items(
		Joi.object({
			size: Joi.number().required(),
			node: Joi.object({
				name: Joi.string(),
			}),
		}),
	),
});

const validateRepo = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	const { error } = schema.validate(req.body);
	if (error) {
		// UTILISATION DU LOGGER
		logger.error({
			error: { msg: `Validation Repo, ${error.details[0].message}` },
		});
		res.status(422).json(error);
	} else {
		next();
	}
};

export { validateRepo };
