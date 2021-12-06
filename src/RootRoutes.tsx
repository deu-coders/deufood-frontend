import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FoodDetailPage } from './pages/food/FoodDetailPage';
import { FoodListPage } from './pages/food/FoodListPage';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { FoodSearchPage } from './pages/food/FoodSearchPage';
import { ArticleListPage } from './pages/article/ArticleListPage';
import { NewFoodPage } from './pages/food/NewFoodPage';
import { NewArticlePage } from './pages/article/NewArticlePage';

export const RootRoutes: React.FC = props => {
	return (
		<Routes>
			<Route path="/" element={<IndexPage />} />

			<Route path="/food_categories/:foodCategory" element={<FoodListPage />} />
			<Route path="/foods/new" element={<NewFoodPage />} />
			<Route path="/foods/:foodId" element={<FoodDetailPage />} />

			<Route path="/articles" element={<ArticleListPage />} />
			<Route path="/articles/new" element={<NewArticlePage />} />

			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/search" element={<FoodSearchPage />} />
		</Routes>
	);
};
