import express from "express";
import type { Response } from "express";

const router = express.Router();

router.get("/", (_, res: Response) => {
	res.status(200).send("Tout est ok !");
});

export default router;
