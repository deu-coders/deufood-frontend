import { Box } from '@mui/system';
import React from 'react';
import { Food } from '../../types/food';
import { DFoodCard } from './DFoodCard';

export type DFoodCardListProps = {
	foods: Food[];
};

export const DFoodCardList: React.FC<DFoodCardListProps> = props => {
	const { foods } = props;

	return (
		<Box>
			{foods.map(food => (
				<Box key={food.id} sx={{ display: 'inline-block', marginRight: 4, marginBottom: 4 }}>
					<DFoodCard food={food} />
				</Box>
			))}
		</Box>
	);
};
