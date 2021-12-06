import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { DFoodReviewForm } from '../../components/food/DFoodReviewForm';
import { DFoodReviewList } from '../../components/food/DFoodReviewList';
import { DLikesAndDislikesBar } from '../../components/food/DLikesAndDislikesBar';
import { DPageLoading } from '../../layout/DPageLoading';
import { useFetch } from '../../hooks/useFetch';
import { useUser } from '../../hooks/useUser';
import { DContainer } from '../../layout/DContainer';
import { DUserBar } from '../../layout/DUserBar';
import { Food, FoodReview, WithReviews } from '../../types/food';
import { RetreiveResponse } from '../../types/response';

const thumbnailSize = 240;

export const FoodDetailPage: React.FC = props => {
	const { foodId } = useParams();
	const user = useUser();

	const { response: food, pending, error } = useFetch<RetreiveResponse<WithReviews<Food>>>(`/foods/${foodId}/`);

	// memoization
	const [likes, normals, dislikes] = useMemo(() => {
		const rates: Record<FoodReview['rate'], number> = {
			호: 0,
			보통: 0,
			불호: 0,
		};

		food?.reviews?.forEach(review => {
			rates[review.rate] += 1;
		});

		return [rates['호'], rates['보통'], rates['불호']];
	}, [food]);

	return (
		<DContainer>
			{pending === true && <DPageLoading />}

			<DUserBar />

			{food === undefined ? (
				<></>
			) : (
				<Box sx={{ marginTop: 12 }}>
					<Box sx={{ display: 'flex' }}>
						{food.thumbnail !== null && (
							<img width={thumbnailSize} height={thumbnailSize} style={{ objectFit: 'cover' }} src={food.thumbnail} />
						)}

						<Box marginLeft={4} />

						<Box sx={{ flex: 1 }}>
							<Typography variant="h2" gutterBottom>
								{food.name}
							</Typography>

							<table style={{ width: 420 }}>
								<tbody>
									<tr>
										<td>
											<Typography variant="h6" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
												권장 소비자 가격
											</Typography>
										</td>
										<td style={{ width: 220, textAlign: 'right' }}>
											<Typography variant="h5" sx={{ fontWeight: 'normal' }}>
												{food.price}원
											</Typography>
										</td>
									</tr>
									<tr>
										<td>
											<Typography variant="h6" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>
												호불호 미터
											</Typography>
										</td>
										<td style={{ width: 220, textAlign: 'right' }}>
											<DLikesAndDislikesBar
												width="100%"
												height="100%"
												likes={likes}
												normals={normals}
												dislikes={dislikes}
											/>
										</td>
									</tr>
								</tbody>
							</table>

							<Box marginTop={2} />

							<Typography variant="subtitle1">{food.description}</Typography>
						</Box>
					</Box>

					<Box marginTop={8} />

					<Box sx={{ width: 620, margin: '0 auto' }}>
						{user.user !== undefined && (
							<>
								<DFoodReviewForm food={food} />

								<Box marginTop={8} />
							</>
						)}

						<DFoodReviewList foodReviews={food.reviews as FoodReview[]} />
					</Box>
				</Box>
			)}
		</DContainer>
	);
};
