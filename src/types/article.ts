export type Article = {
	id: number;
	author: string;
	thumbnail: string | null;
	created_at: string;
	title: string;
	contents: string;
	comments: number | Comment[];
};

export type Comment = {
	id: number;
	author: string;
	created_at: string;
	contents: string;
	article: number;
};
