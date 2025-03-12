import { useState } from "react";
import type { Repo } from "../../types/repo";
import InputForm from "../components/form/InputForm";

export default function RepoForm() {
	const initialRepo = {
		description: "",
		name: "",
		url: "",
		isPrivate: false,
	};
	const [newRepo, setNewRepo] = useState<Repo>(initialRepo);
	console.log({ newRepo });

	const handleNewRepo = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewRepo(() => ({ ...newRepo, [e.target.name]: e.target.value })); // [e.target.name] cpmme object key plutot aue name directement pour rendre cette cle
		//  dynamique car on ne change pas toujours la meme selon le champs. Par rx on a name, on a aussi descri[yion de possible
	};

	return (
		<>
			<form className="container">
				<h1>Adding one repo</h1>
				<InputForm
					title="Repo title"
					value={newRepo.name}
					handleNewRepo={handleNewRepo}
					name="name"
				/>
				<InputForm
					title="Description"
					value={newRepo.description}
					name="description"
					handleNewRepo={handleNewRepo}
				/>
				<InputForm
					title="URL"
					value={newRepo.url}
					name="url"
					handleNewRepo={handleNewRepo}
				/>
			</form>
		</>
	);
}
