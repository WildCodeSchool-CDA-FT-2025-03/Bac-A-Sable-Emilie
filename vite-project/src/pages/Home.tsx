import { useEffect } from "react";
import RepoCard from "../components/RepoCard";
import useRepos from "../services/useRepo";
import { useSearchParams } from "react-router-dom";

export default function Home() {
	const { data, getAllRepos } = useRepos();
	const [searchParams, setSearchParams] = useSearchParams();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getAllRepos(searchParams.get("limit") || "10");
		console.log(searchParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	console.log({ data });
	return (
		<>
			<h1>All my repos</h1>
			<label>
				Nombre de repos affichés
				<select
					name="limit"
					value={searchParams.get("limit") || "10"}
					onChange={(e) => setSearchParams({ limit: e.target.value })}
				>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
			</label>
			<main>
				{data.map((repo, index) => (
					<RepoCard
						key={repo.id}
						repo={repo}
						cls={index % 2 === 0 ? "orange" : "light-orange"}
					>
						<span>{repo.url}</span>
					</RepoCard>
				))}
			</main>
		</>
	);
}
