import { Box } from '@mui/system';
import React from 'react';
import { Article } from '../../types/article';
import { DArticle } from './DArticle';

export type DArticleListProps = {
	articles: Article[];
};

export const DArticleList: React.FC<DArticleListProps> = props => {
	const { articles } = props;

	return (
		<Box sx={{ '& > *+*': { marginTop: 3 } }}>
			{articles.map(article => (
				<DArticle key={article.id} article={article} />
			))}
		</Box>
	);
};
