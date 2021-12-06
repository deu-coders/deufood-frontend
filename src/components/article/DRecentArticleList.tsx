import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Article } from '../../types/article';
import { PaginatedListResponse } from '../../types/response';
import { DArticleList } from './DArticleList';

export type DRecentArticleListProps = {
	amount?: number;
};

export const DRecentArticleList: React.FC<DRecentArticleListProps> = props => {
	const { amount = 10 } = props;

	const { response, pending, error } = useFetch<PaginatedListResponse<Article>>('/articles/');

	return <DArticleList articles={response?.results.slice(0, 5) ?? []} />;
};
