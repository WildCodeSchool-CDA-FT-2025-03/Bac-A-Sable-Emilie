import type { Repo } from "../../types/repo";
import { useEffect, useState } from "react";
import client from "./client";

const useRepos = () => {
	const [data, setData] = useState<Repo[]>([]);

	const getAllRepos = () => {
		client
			.get("/repos")
			.then((repos) => {
				setData(repos.data as Repo[]);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getAllRepos();
	}, []);

	return { data };
};

export default useRepos;
