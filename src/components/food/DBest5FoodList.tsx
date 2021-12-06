import { ThumbUp } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { Food, WithLikes } from '../../types/food';
import { DThumbnail } from '../core/DThumbnail';

export const DBest5FoodList: React.FC = props => {
	const { response, pending, error } = useFetch<WithLikes<Food>[]>('/best_foods/');

	return (
		<Box sx={{ display: 'grid', gridAutoColumns: '1fr', gridAutoFlow: 'column', justifyContent: 'space-between' }}>
			{response?.map(food => (
				<Box
					key={food.id}
					sx={{
						padding: 2,
						display: 'flex',
						flexDirection: 'column',
						minWidth: 0,
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
					}}>
					<Link to={`/foods/${food.id}`}>
						<DThumbnail src={food.thumbnail} width={120} height={120} border="1px solid #eeeeee" />
					</Link>

					<Box marginTop={2} />

					<Typography variant="h6" sx={{ fontWeight: 'light' }} gutterBottom>
						{food.name}
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
						<ThumbUp fontSize="small" />
						<Box marginLeft={0.75} />
						{food.likes}
					</Box>
				</Box>
			))}
		</Box>
	);
};
