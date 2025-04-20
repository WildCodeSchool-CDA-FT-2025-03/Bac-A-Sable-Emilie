import { useEffect } from "react";
import RepoCard from "../components/RepoCard";
import useRepos from "../services/useRepo";
import { useSearchParams } from "react-router-dom";

export default function Home() {
	const { data, getAllRepos } = useRepos();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		getAllRepos(
			searchParams.get("limit") || "10",
			searchParams.get("isPrivate") || "false",
		);
		console.log(searchParams);
	}, [searchParams, getAllRepos]);

	console.log({ data });
	return (
		<>
			<h1>All my repos</h1>
			<label>
				Nombre de repos affichés
				<select
					name="limit"
					value={searchParams.get("limit") || "10"}
					onChange={(e) =>
						setSearchParams({
							limit: e.target.value,
							isPrivate: searchParams.get("isPrivate") || "false",
						})
					}
				>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
			</label>
			<label>
				Privé
				<select
					name="isPrivate"
					value={searchParams.get("isPrivate") || "false"}
					onChange={(e) =>
						setSearchParams({
							limit: searchParams.get("limit") || "10",
							isPrivate: e.target.value,
						})
					}
				>
					<option value="false">Non</option>
					<option value="true">Oui</option>
				</select>
			</label>
			<main>
				{data?.length > 0 ? data.map((repo, index) => (
					<RepoCard
						key={repo.id}
						repo={repo}
						cls={index % 2 === 0 ? "orange" : "light-orange"}
					>
						<span>{repo.url}</span>
					</RepoCard>
				)) : (
					<p>Loading...</p>
				)}
			</main>
		</>
	);
}
