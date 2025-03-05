import express from "express";

const router = express.Router();

router.get("/repos", (req, res) => {
	res.status(200).send("Tout est ok !");
});

export default router;
