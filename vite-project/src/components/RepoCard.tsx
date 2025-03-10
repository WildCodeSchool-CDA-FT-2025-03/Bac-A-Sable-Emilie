import type { ReactNode } from "react";
import type { Repo } from "../../types/repo";

type RepoCardsProps = {
	repo: Repo;
	children: ReactNode;
	cls: string;
};

function RepoCard({ repo, children, cls }: RepoCardsProps) {
	return (
		<>
			<h2 className={cls}>{repo.name}</h2>
			{children}
		</>
	);
}
export default RepoCard;
