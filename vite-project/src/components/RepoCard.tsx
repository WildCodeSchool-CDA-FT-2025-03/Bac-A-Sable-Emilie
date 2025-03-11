import type { ReactNode } from "react";
import type { Repo } from "../../types/repo";
import { Link, useParams } from "react-router-dom";

type RepoCardsProps = {
	repo: Repo;
	children: ReactNode;
	cls: string;
};

function RepoCard({ repo, children, cls }: RepoCardsProps) {
	const { id } = useParams();
	return (
		<>
			<h2 className={cls}>{repo.name}</h2>
			<Link to={`/repos/${id}`}>{children}</Link>
		</>
	);
}
export default RepoCard;
