import { grey, pink, teal } from '@mui/material/colors';
import { Box, BoxProps, useTheme } from '@mui/system';
import React from 'react';

export type DLikesAndDislikesBarProps = {
	likes: number;
	normals: number;
	dislikes: number;
} & BoxProps;

export const DLikesAndDislikesBar: React.FC<DLikesAndDislikesBarProps> = props => {
	const { likes, normals, dislikes, ...BoxProps } = props;
	const total = likes + normals + dislikes;

	const theme = useTheme();

	return total === 0 ? (
		<Box sx={{ backgroundColor: grey[700], color: theme.palette.getContrastText(grey[700]), textAlign: 'center' }} {...BoxProps}>
			데이터 없음
		</Box>
	) : (
		<Box sx={{ textAlign: 'center', display: 'flex' }} {...BoxProps}>
			{[
				{ value: likes, color: teal[400] },
				{ value: normals, color: grey[400] },
				{ value: dislikes, color: pink[400] },
			].map(({ value, color }, i) => (
				<Box
					key={i}
					sx={{ flex: value / total, backgroundColor: color, color: theme.palette.getContrastText(color), padding: 0.2 }}>
					{value}
				</Box>
			))}
		</Box>
	);
};
