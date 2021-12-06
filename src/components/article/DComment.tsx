import React from 'react';
import { useSubmit } from '../../hooks/useSubmit';
import { Comment } from '../../types/article';
import { DGenericArticle } from '../generic/DGenericArticle';

export type DCommentProps = {
	comment: Comment;
	onDelete?: () => void;
};

export const DComment: React.FC<DCommentProps> = props => {
	const { comment, onDelete } = props;

	const submit = useSubmit();

	const deleteComment = async () => {
		if (confirm('정말로 댓글을 삭제하시겠습니까?') === false) return;

		await submit.del(`/articles/${comment.article}/comments/${comment.id}`);

		onDelete?.();
	};

	return (
		<DGenericArticle
			variant="text"
			author={comment.author}
			createdAt={new Date(comment.created_at)}
			contents={comment.contents}
			onDelete={deleteComment}
		/>
	);
};
