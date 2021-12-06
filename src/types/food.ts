export type FoodCategory = {
	name: string;
	description: string;
	thumbnail: string;
	foods: Food[];
};

export type Food = {
	id: number;
	thumbnail: string | null;
	name: string;
	description: string;
	price: number | null;
	category: string;
	reviews: number;
};

export type FoodReview = {
	id: number;
	created_at: string;
	rate: '호' | '보통' | '불호';
	contents: string;
	food: number;
	author: string;
};

export type WithLikes<Data> = Data & { likes: number };

export type WithReviews<Data> = Data & { reviews: FoodReview[] };
