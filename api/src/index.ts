import express from "express";
import "dotenv/config";
import router from "./router";
import cors from "cors";

const app = express();

const port = process.env.EXPRESS_PORT || 3000;

app.use(
	cors({
		origin: "http://localhost:5173",
	}),
);

app.use(express.json());
app.use("/api", router);

// app.listen(3000);

app
	.listen(port, () => {
		console.info(`Server is listening on http://localhost:${port}`);
	})
	.on("error", (err: Error) => {
		console.error("Error:", err.message);
	});
