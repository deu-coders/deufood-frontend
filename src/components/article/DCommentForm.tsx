import { Avatar, Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { FormEvent, useState } from 'react';
import { useSubmit } from '../../hooks/useSubmit';
import { Article } from '../../types/article';

export type DCommentFormProps = {
	article: Article;
	onSubmit?: () => void;
};

export const DCommentForm: React.FC<DCommentFormProps> = props => {
	const { article, onSubmit } = props;

	const submit = useSubmit();

	const [contents, setContents] = useState('');

	const submitForm = async (event: FormEvent) => {
		event.preventDefault();

		await submit.post(`/articles/${article.id}/comments/`, { data: { contents } });

		setContents('');
		onSubmit?.();
	};

	return (
		<form onSubmit={submitForm}>
			<Box sx={{ display: 'flex' }}>
				<Avatar />

				<Box marginLeft={2} />

				<TextField
					fullWidth
					size="small"
					multiline
					minRows={2}
					placeholder="댓글을 작성해주세요"
					value={contents}
					onChange={event => setContents(event.target.value)}
				/>

				<Box marginLeft={2} />

				<Button variant="contained" type="submit">
					작성
				</Button>
			</Box>
		</form>
	);
};
