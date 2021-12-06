import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { FoodReview } from '../../types/food';
import { DFoodReview } from './DFoodReview';

export type DFoodReviewListProps = {
	foodReviews: FoodReview[];
};

export const DFoodReviewList: React.FC<DFoodReviewListProps> = props => {
	const { foodReviews } = props;

	return (
		<Box sx={{ '& > *+*': { marginTop: 3 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{foodReviews.length === 0 ? (
				<Typography variant="subtitle1" color="textSecondary">
					리뷰가 없습니다.
				</Typography>
			) : (
				foodReviews.map(foodReview => <DFoodReview key={foodReview.id} foodReview={foodReview} />)
			)}
		</Box>
	);
};
