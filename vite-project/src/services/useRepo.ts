import type { Repo } from "../../types/repo";
import { useCallback, useState } from "react";
import client from "./client";

const useRepos = () => {
	const [data, setData] = useState<Repo[]>([]);
	const [oneRepo, setOneRepo] = useState<Repo>();
	const [error, setError] = useState(false);

	const getAllRepos = useCallback((limit: string, isPrivate: string) => {
		// CB => Evite la boucle de rafraichissement intempestif lie au fait de mettre cette fonction en dependance du useEffect
		client
			.get(`/repos?limit=${limit}&isPrivate=${isPrivate}`)
			.then((repos) => {
				setData(repos.data as Repo[]);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

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

	const addNewRepo = async (repo: Repo) => {
		try {
			await client.post("/repos", repo);
		} catch (error) {
			console.error(error);
		}
	};

	return { data, getAllRepos, oneRepo, getOneRepo, error, addNewRepo };
};

export default useRepos;
