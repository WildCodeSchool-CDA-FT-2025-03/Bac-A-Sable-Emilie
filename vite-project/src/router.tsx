import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import RepoPage from "./pages/RepoPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "/repos/:id",
				element: <RepoPage />,
			},
		],
	},
]);
