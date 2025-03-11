import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import useRepos from "../services/useRepo";

export default function RepoPage() {
	const { id } = useParams();
	const { oneRepo, getOneRepo, error } = useRepos();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log("TOTO");
		getOneRepo(id as string);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (error) {
		return <Navigate to="/" replace />;
	}

	return (
		<>
			<h1>{`Voici le repo ${oneRepo?.name}`}</h1>
			<p>{`id: ${id}`}</p>
		</>
	);
}
