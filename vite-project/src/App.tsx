import "./App.css";
import RepoCard from "./components/RepoCard";
import useRepos from "./services/useRepo";

function App() {
	const { data } = useRepos();
	console.log({ data });
	return (
		<>
			<h1>All my repos</h1>
			{data.map((repo) => (
				<RepoCard key={repo.id} repo={repo} cls="red">
					<span>{repo.url}</span>
				</RepoCard>
			))}
		</>
	);
}

export default App;
