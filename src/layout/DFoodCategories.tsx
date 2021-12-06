import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { FoodCategory } from '../types/food';
import { PaginatedListResponse } from '../types/response';

const imageWidth = 180;
const imageHeight = 180;

export const DFoodCategories: React.FC = props => {
	const { response, pending, error } = useFetch<PaginatedListResponse<FoodCategory>>('/food_categories/');

	const navigate = useNavigate();

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			{response?.results.map(foodCategory => (
				<Box
					key={foodCategory.name}
					sx={{ position: 'relative', width: imageWidth, height: imageHeight, margin: 2 }}
					onClick={() => navigate(`/food_categories/${foodCategory.name}`)}>
					<img src={foodCategory.thumbnail} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />

					<Box
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'black',
							opacity: 0.7,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'white',
							fontSize: '2.3rem',
							userSelect: 'none',
							cursor: 'pointer',

							'&:hover': {
								opacity: 0.8,
							},
						}}>
						{foodCategory.name}
					</Box>
				</Box>
			))}
		</Box>
	);
};
