import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import RepoPage from "./pages/RepoPage";
import RepoForm from "./pages/RepoForm";
// import client from "./services/client";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <Home />,
				// loader: async () => {
				// 	const result = await client.get("/repos");
				// 	console.log("Result", result);
				// 	return result;
				// },
			},
			{
				path: "/repos/:id",
				element: <RepoPage />,
			},
			{
				path: "/repos/create",
				element: <RepoForm />,
			},
		],
	},
]);
