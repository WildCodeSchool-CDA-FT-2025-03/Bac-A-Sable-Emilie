import express from "express";
import data from "../../data.json";
import type { Response } from "express";

const repos = express.Router();
repos.get("/", (_, res: Response) => {
	res.status(200).json(data);
});

export default repos;
