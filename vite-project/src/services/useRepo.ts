import type { Repo } from "../../types/repo";
import { useState } from "react";
import client from "./client";

const useRepos = () => {
	const [data, setData] = useState<Repo[]>([]);
	const [oneRepo, setOneRepo] = useState<Repo>();
	const [error, setError] = useState(false);

	const getAllRepos = (limit: string, isPrivate: string) => {
		client
			.get(`/repos?limit=${limit}&isPrivate=${isPrivate}`)
			.then((repos) => {
				setData(repos.data as Repo[]);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const getOneRepo = (id: string) => {
		client
			.get(`/repos/${id}`)
			.then((repos) => {
				setOneRepo(repos.data as Repo);
			})
			.catch((error) => {
				setError(true);
				console.error(error);
			});
	};

	return { data, getAllRepos, oneRepo, getOneRepo, error };
};

export default useRepos;
