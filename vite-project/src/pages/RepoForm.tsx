import { useState } from "react";
import type { Repo } from "../../types/repo";
import InputForm from "../components/form/InputForm";
import SelectFormLanguages from "../components/form/SelectFormLanguages";
import useRepos from "../services/useRepo";

export default function RepoForm() {
	const initialRepo = {
		description: "",
		name: "",
		url: "",
		isPrivate: false,
		languages: [
			{
				size: 0,
				node: {
					name: "",
				},
			},
		],
	};

	const [newRepo, setNewRepo] = useState<Repo>(initialRepo);
	console.log({ newRepo });

	const { addNewRepo } = useRepos();

	const handleNewRepo = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>,
	) => {
		if (e.target.name === "languages") {
			setNewRepo((prev) => ({
				...prev,
				languages: [{ size: 0, node: { name: e.target.value } }],
			}));
		} else if (e.target.name === "isPrivate") {
			setNewRepo(() => ({ ...newRepo, [e.target.name]: !newRepo.isPrivate }));
		} else {
			setNewRepo(() => ({ ...newRepo, [e.target.name]: e.target.value }));
		}
		console.log("new Repos", newRepo);
		console.log(e.target.name, e.target.value);
	};

	const handleSubmitRepo = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			console.log(newRepo);
			await addNewRepo(newRepo);
			setNewRepo(initialRepo);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<form className="container" onSubmit={handleSubmitRepo}>
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
				<SelectFormLanguages
					handleNewRepo={handleNewRepo}
					value={newRepo.languages[0].node.name}
				/>
				<label htmlFor="">
					Is Private ?
					<input
						type="checkbox"
						name="isPrivate"
						className={newRepo.isPrivate ? "red" : "blue"}
						checked={newRepo.isPrivate}
						onChange={handleNewRepo}
						required
					/>
				</label>
				<button type="submit">Ajouter</button>
			</form>
		</>
	);
}
