import type { ReactNode } from "react";
import type { Repo } from "../../types/repo";
import { Link } from "react-router-dom";

type RepoCardsProps = {
	repo: Repo;
	children: ReactNode;
	cls: string;
};

function RepoCard({ repo, children, cls }: RepoCardsProps) {
	return (
		<>
			<h2 className={cls}>{repo.name}</h2>
			<Link to={`/repos/${repo.id}`}>{children}</Link>
		</>
	);
}
export default RepoCard;
