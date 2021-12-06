import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export type DPageTitleSectionProps = {
	title: string;
	subtitle?: string;
};

export const DPageTitleSection: React.FC<DPageTitleSectionProps> = props => {
	const { title, subtitle } = props;

	return (
		<Box sx={{ paddingTop: 12, marginBottom: 4 }}>
			<Typography variant="h3" sx={{ fontWeight: 'light' }} gutterBottom>
				{title}
			</Typography>
			{subtitle && (
				<Typography variant="h6" sx={{ fontWeight: 'light' }}>
					{subtitle}
				</Typography>
			)}
		</Box>
	);
};
