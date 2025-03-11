import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRepos from "../services/useRepo";

export default function RepoPage() {
	const { id } = useParams();
	const { oneRepo, getOneRepo } = useRepos();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log("TOTO");
		getOneRepo(id as string);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<>
			<h1>{`Voici le repo ${oneRepo?.name}`}</h1>
			<p>{`id: ${id}`}</p>
		</>
	);
}
