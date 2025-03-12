import type { Languages } from "../languages/languages.type";

export type Repos = {
	description: string;
	id: number;
	name: string;
	url: string;
	isPrivate: boolean;
	languages: Languages[];
};
