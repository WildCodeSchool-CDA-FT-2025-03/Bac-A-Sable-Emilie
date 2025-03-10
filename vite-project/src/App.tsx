import "./App.css";
import RepoCard from "./components/RepoCard";
import useRepos from "./services/useRepo";

function App() {
	const { data } = useRepos();
	console.log({ data });
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

export default App;
