import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box, BoxProps } from '@mui/system';
import React from 'react';

export type DThumbnailProps = {
	src: string | undefined | null;
} & BoxProps;

export const DThumbnail: React.FC<DThumbnailProps> = props => {
	const { src, ...BoxProps } = props;

	return (
		<Box {...BoxProps}>
			{!src ? (
				<Box
					sx={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: grey[200],
					}}>
					<Typography variant="subtitle1" color="textSecondary">
						이미지가 없습니다
					</Typography>
				</Box>
			) : (
				<img src={src} width="100%" height="100%" />
			)}
		</Box>
	);
};
