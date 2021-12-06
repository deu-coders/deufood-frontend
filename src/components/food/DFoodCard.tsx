import { Comment, Sell } from '@mui/icons-material';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router';
import { Food } from '../../types/food';

const imageWidth = 220;
const imageHeight = 180;
const descriptionHeight = 40;

export type DFoodCardProps = {
	food: Food;
};

export const DFoodCard: React.FC<DFoodCardProps> = props => {
	const { food } = props;
	const navigate = useNavigate();

	return (
		<Card sx={{ width: imageWidth, bgcolor: 'primary.main', color: 'primary.contrastText' }} elevation={2}>
			<Box sx={{ width: imageWidth, height: imageHeight, overflow: 'hidden', '&:hover': { cursor: 'pointer' } }}>
				<CardMedia
					component="img"
					height={imageHeight}
					image={food.thumbnail || undefined}
					alt={food.name}
					sx={{ objectFit: 'cover', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}
					onClick={() => navigate(`/foods/${food.id}`)}
				/>
			</Box>

			<CardContent>
				<Box sx={{ display: 'flex' }}>
					<Typography
						gutterBottom
						variant="h5"
						sx={{ fontWeight: 'light', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
						{food.name}
					</Typography>
					<Box marginLeft={1} />
					<Box
						sx={{
							flexShrink: 0,
							background: orange[500],
							alignSelf: 'center',
							color: 'black',
							fontSize: '0.7rem',
							fontWeight: 'bold',
							height: '1rem',
							borderRadius: '0.3rem',
							paddingX: 0.25,
						}}>
						{food.category}
					</Box>
				</Box>

				<Typography variant="body2" sx={{ height: descriptionHeight, overflow: 'hidden' }}>
					{food.description}
				</Typography>

				<Box marginTop={2} />

				<Box sx={{ display: 'flex' }}>
					<Sell fontSize="small" color="inherit" />
					<Box marginLeft={1} />
					<Typography variant="subtitle2">{food.price}원</Typography>
				</Box>

				<Box marginTop={0.5} />

				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Comment fontSize="small" color="inherit" />
					<Box marginLeft={1} />
					<Typography variant="subtitle2">{food.reviews}</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};
