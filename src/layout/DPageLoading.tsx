import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const DPageLoading: React.FC = props => {
	return (
		<Box sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
			<LinearProgress variant="indeterminate" color="primary" />
		</Box>
	);
};
