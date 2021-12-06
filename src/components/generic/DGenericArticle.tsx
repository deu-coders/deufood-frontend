import { Avatar, Card, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useUser } from '../../hooks/useUser';

export type DGenericArticleProps = {
	variant?: 'card' | 'text';
	avatar?: React.ReactNode;
	author?: string;
	title?: string;
	createdAt?: Date;
	onDelete?: () => void;
	contents?: React.ReactNode;
	comments?: React.ReactNode;
};

export const DGenericArticle: React.FC<DGenericArticleProps> = props => {
	const { variant = 'card', avatar, author, title, createdAt, onDelete, contents, comments } = props;

	const user = useUser();

	const innerContent = (
		<>
			{avatar || <Avatar />}

			<Box marginLeft={2} />

			<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
				<Typography variant="caption" color="textSecondary">
					{author}
				</Typography>

				<Box marginTop={0.5} />

				{title !== undefined && (
					<Typography variant="subtitle2" gutterBottom>
						{title}
					</Typography>
				)}

				<Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
					{contents}
				</Typography>

				<Box marginTop={2} />

				<Box sx={{ display: 'flex' }}>
					{createdAt !== undefined && (
						<Typography variant="caption" color="textSecondary">
							{createdAt.toLocaleString()}
						</Typography>
					)}

					<Box marginLeft={2} />

					{user.user?.username === author && (
						<Typography
							variant="caption"
							color="textSecondary"
							onClick={onDelete}
							sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
							삭제
						</Typography>
					)}
				</Box>

				{comments !== undefined && (
					<>
						<Box marginTop={2} />

						{comments}
					</>
				)}
			</Box>
		</>
	);

	return variant === 'card' ? (
		<Card sx={{ width: '100%', display: 'flex', padding: 2 }} elevation={2}>
			{innerContent}
		</Card>
	) : variant === 'text' ? (
		<Box sx={{ width: '100%', display: 'flex', padding: 2 }}>{innerContent}</Box>
	) : (
		innerContent
	);
};
