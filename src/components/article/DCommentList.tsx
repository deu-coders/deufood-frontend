import { Button, CircularProgress } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useSubmit } from '../../hooks/useSubmit';
import { useUser } from '../../hooks/useUser';
import { Article, Comment } from '../../types/article';
import { PaginatedListResponse } from '../../types/response';
import { DComment } from './DComment';
import { DCommentForm } from './DCommentForm';

export type DCommentListProps = {
	article: Article;
};

export const DCommentList: React.FC<DCommentListProps> = props => {
	const { article } = props;

	const user = useUser();

	const [reloader, setReloader] = useState('?'); // toggle '?' and '' to change fetch url

	const { response, pending, error } = useFetch<PaginatedListResponse<Comment>>(`/articles/${article.id}/comments/${reloader}`);

	const [showComments, setShowComments] = useState(false);
	const [showCommentForm, setShowCommentForm] = useState(false);

	const reloadComments = () => {
		// tricky way to reload comments ... it's a cheat
		setShowComments(true);
		setReloader(reloader === '?' ? '' : '?');
	};

	const visibleCommentsButton = article.comments !== 0 && showComments === false;
	const visibleCommentFormButton = showCommentForm === false;

	return (
		<Box
			sx={{
				'& > *+*': {
					marginTop: 2,
				},
			}}>
			{/* Comment list */}
			{showComments && (
				<Box
					sx={{
						'& > *:first-child': {
							borderTop: '1px solid',
							borderColor: grey[300],
						},
						'& > *': {
							borderBottom: '1px solid',
							borderColor: grey[300],
						},
					}}>
					{response?.results.map(comment => (
						<DComment key={comment.id} comment={comment} onDelete={reloadComments} />
					))}
				</Box>
			)}

			{/* Loading progress */}
			{/* {pending === true && <CircularProgress size={30} />} */}

			{/* Load comment button */}
			{(visibleCommentsButton || visibleCommentFormButton) && (
				<Box sx={{ display: 'flex', '& > *+*': { marginLeft: 2 } }}>
					{visibleCommentsButton && (
						<Button size="small" onClick={() => setShowComments(true)}>
							댓글 불러오기 ({article.comments})
						</Button>
					)}

					{visibleCommentFormButton && user.user !== undefined && (
						<Button size="small" onClick={() => setShowCommentForm(true)}>
							댓글 작성하기
						</Button>
					)}
				</Box>
			)}

			{showCommentForm && user.user !== undefined && <DCommentForm article={article} onSubmit={reloadComments} />}
		</Box>
	);
};
