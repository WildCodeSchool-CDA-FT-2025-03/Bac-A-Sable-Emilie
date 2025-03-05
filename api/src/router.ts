import express from "express";
import type { Response } from "express";
import repos from "./repos/repos.controller";

const router = express.Router();

router.get("/", (_, res: Response) => {
	res.status(200).send("Tout est ok !");
});

router.use("/repos", repos);

export default router;
