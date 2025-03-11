import { useEffect } from "react";
import RepoCard from "../components/RepoCard";
import useRepos from "../services/useRepo";

export default function Home() {
	const { data, getAllRepos } = useRepos();
	console.log({ data });

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getAllRepos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h1>All my repos</h1>
			{data.map((repo, index) => (
				<RepoCard
					key={repo.id}
					repo={repo}
					cls={index % 2 === 0 ? "orange" : "light-orange"}
				>
					<span>{repo.url}</span>
				</RepoCard>
			))}
		</>
	);
}
