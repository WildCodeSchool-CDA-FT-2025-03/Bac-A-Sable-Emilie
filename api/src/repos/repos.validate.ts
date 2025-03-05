import type { Request, Response, NextFunction } from "express";
import Joi from "joi";

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

export { validateRepo };
