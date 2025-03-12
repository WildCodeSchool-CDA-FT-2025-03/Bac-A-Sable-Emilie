import { useState } from "react";
import type { Repo } from "../../types/repo";

export default function RepoForm() {
	const initialRepo = {
		description: "",
		name: "",
		url: "",
		isPrivate: false,
	};
	const [newRepo, setNewRepo] = useState<Repo>(initialRepo);
	console.log({ newRepo });

	return (
		<>
			<form className="container">
				<h1>Adding one repo</h1>
				<label htmlFor="">
					Repo title
					<input
						type="text"
						value={newRepo.name}
						onChange={(e) =>
							setNewRepo(() => ({ ...newRepo, name: e.target.value }))
						}
					/>
				</label>
				<label htmlFor="">
					Description
					<input
						type="text"
						value={newRepo.description}
						onChange={(e) =>
							setNewRepo(() => ({ ...newRepo, description: e.target.value }))
						}
					/>
				</label>
			</form>
		</>
	);
}
