export type AllowedLanguage = "en" | "de" | "zh";

export type State = {
	language: AllowedLanguage;
};

export type User = {
	id: string;
	sessionId: string;
	gitlab: {
		id: number;
		name: string;
		username: string;
	};
};

export type GitLabUser = {
	id: number;
	name: string;
	username: string;
};
