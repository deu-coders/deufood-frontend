import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSubmit } from '../../hooks/useSubmit';
import { Article } from '../../types/article';
import { DGenericArticle } from '../generic/DGenericArticle';
import { DCommentList } from './DCommentList';

export type DArticleProps = {
	article: Article;
};

export const DArticle: React.FC<DArticleProps> = props => {
	const { article } = props;

	const submit = useSubmit();

	const deleteArticle = async () => {
		if (confirm('정말로 게시글을 삭제하시겠습니까?') === false) return;

		await submit.del(`/articles/${article.id}/`);

		window.location.reload();
	};

	return (
		<DGenericArticle
			author={article.author}
			createdAt={new Date(article.created_at)}
			title={article.title}
			onDelete={deleteArticle}
			contents={
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					{article.thumbnail && (
						<>
							<img width={120} height={120} src={article.thumbnail} style={{ objectFit: 'cover' }} />

							<Box marginBottom={2} />
						</>
					)}

					<Typography variant="body2" color="textSecondary">
						{article.contents}
					</Typography>
				</Box>
			}
			comments={<DCommentList article={article} />}
		/>
	);
};
