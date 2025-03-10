import "./App.css";
import useRepos from "./services/useRepo";

function App() {
	const { data } = useRepos();
	console.log({ data });
	return (
		<>
			<h1>All my repos</h1>
			{data.map((repo) => (
				<h2 key={repo.id}>{repo.name}</h2>
			))}
		</>
	);
}

export default App;
