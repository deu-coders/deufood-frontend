import { grey, pink, teal } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { useSubmit } from '../../hooks/useSubmit';
import { FoodReview } from '../../types/food';
import { DGenericArticle } from '../generic/DGenericArticle';

export type DFoodReviewProps = {
	foodReview: FoodReview;
};

export const DFoodReview: React.FC<DFoodReviewProps> = props => {
	const { foodReview } = props;

	const submit = useSubmit();

	const deleteReview = async () => {
		if (confirm('정말로 리뷰를 삭제하시겠습니까?') === false) return;

		await submit.del(`/foods/${foodReview.food}/reviews/${foodReview.id}/`);

		window.location.reload();
	};

	return (
		<DGenericArticle
			author={foodReview.author}
			createdAt={new Date(foodReview.created_at)}
			onDelete={deleteReview}
			contents={
				<>
					<Box
						sx={{
							color: 'white',
							fontWeight: 'bolder',
							fontSize: '0.8rem',
							height: '1.2rem',
							width: '2.2rem',
							borderRadius: '0.5rem',
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							alignSelf: 'flex-start',
							backgroundColor: foodReview.rate === '호' ? teal[700] : foodReview.rate === '보통' ? grey[700] : pink[700],
							marginRight: 1,
						}}>
						{foodReview.rate}
						{foodReview.rate === '호' ? '!' : foodReview.rate === '불호' ? '!' : ''}
					</Box>
					{foodReview.contents}
				</>
			}
		/>
	);
};
