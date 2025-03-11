import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRepos from "../services/useRepo";

export default function RepoPage() {
	const { id } = useParams();
	const { oneRepo, getOneRepo } = useRepos();

	useEffect(() => {
		getOneRepo(id as string);
	}, [id, getOneRepo]);

	return (
		<>
			<h1>{`Voici le repo ${oneRepo?.name}`}</h1>
			<p>{`id: ${id}`}</p>
		</>
	);
}
