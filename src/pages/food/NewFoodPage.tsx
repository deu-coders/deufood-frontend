import { PhotoCamera } from '@mui/icons-material';
import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { DPageTitleSection } from '../../layout/DPageTitleSection';
import { useSubmit } from '../../hooks/useSubmit';
import { useUser } from '../../hooks/useUser';
import { DContainer } from '../../layout/DContainer';
import { DUserBar } from '../../layout/DUserBar';
import { DThumbnailPreview } from '../../components/core/DThumbnailPreview';

export const NewFoodPage: React.FC = props => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const params = new URLSearchParams(search);

	const user = useUser();
	const submit = useSubmit<
		unknown,
		{
			status: 400;
			data: {
				thumbnail?: string[];
				name?: string[];
				description?: string[];
				price?: string[];
				category?: string[];
			};
		}
	>();

	const foodCategory = params.get('food_category') || undefined;

	const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
	const [foodName, setFoodName] = useState('');
	const [foodPrice, setFoodPrice] = useState('');
	const [foodDescription, setFoodDescription] = useState('');

	const [result, setResult] = useState<{
		name?: string;
		price?: string;
		description?: string;
		thumbnail?: string;
	}>({});

	useEffect(() => {
		if (submit.error !== undefined) {
			const { status, data } = submit.error;

			if (status === 400) {
				setResult({
					name: data?.name?.[0],
					price: data?.price?.[0],
					description: data?.description?.[0],
					thumbnail: data?.thumbnail?.[0],
				});
			}
		}
	}, [submit.error]);

	useEffect(() => {
		if (submit.response !== undefined) {
			navigate(`/food_categories/${foodCategory}`);
		}
	}, [submit.response]);

	const submitForm = (event: FormEvent) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append('name', foodName);
		formData.append('price', foodPrice);
		formData.append('description', foodDescription);

		if (foodCategory !== undefined) formData.append('category', foodCategory);
		if (thumbnail !== undefined) formData.append('thumbnail', thumbnail);

		submit.post('/foods/', { data: formData });
	};

	return (
		<DContainer>
			<DUserBar />

			<DPageTitleSection title="????????? ???????????? ????????????" subtitle={`"${foodCategory}" ??????????????? ?????? ??????????????? ???????????????????`} />

			{foodCategory === undefined ? (
				<Alert severity="error">????????? ???????????????.</Alert>
			) : user.user === undefined ? (
				<Alert severity="error">??????????????? ??????????????? ????????? ??????????????? ?????????.</Alert>
			) : (
				<form onSubmit={submitForm}>
					<Box sx={{ display: 'flex' }}>
						<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<DThumbnailPreview file={thumbnail} width={240} height={240} />

							{result.thumbnail !== undefined && (
								<>
									<Box marginTop={3} />
									<Typography variant="subtitle2" sx={{ color: 'red' }}>
										{result.thumbnail}
									</Typography>
								</>
							)}

							<Box marginTop={3} />

							<label htmlFor="input-thumbnail">
								<input
									id="input-thumbnail"
									accept="image/*"
									type="file"
									style={{ display: 'none' }}
									onChange={event => {
										const file = event.target.files?.[0] ?? undefined;
										setThumbnail(file);
									}}
								/>
								<Button variant="contained" size="small" startIcon={<PhotoCamera />} component="span">
									????????? ?????????
								</Button>
							</label>

							<Box marginTop={12} />

							<Button variant="contained" type="submit" fullWidth sx={{ height: 50, fontSize: '1.2rem', fontWeight: 'bold' }}>
								???????????? ??????
							</Button>
						</Box>

						<Box marginLeft={8} />

						<Box sx={{ flex: 1 }}>
							<Typography variant="subtitle1" color="textSecondary" gutterBottom>
								???????????? ??????
							</Typography>
							<TextField
								variant="outlined"
								fullWidth
								value={foodName}
								onChange={event => setFoodName(event.target.value)}
								error={result.name !== undefined}
								helperText={result.name}
							/>

							<Box marginTop={4} />

							<Typography variant="subtitle1" color="textSecondary" gutterBottom>
								??????
							</Typography>
							<TextField
								variant="outlined"
								fullWidth
								value={foodPrice}
								onChange={event => setFoodPrice(event.target.value)}
								error={result.price !== undefined}
								helperText={result.price}
							/>

							<Box marginTop={4} />

							<Typography variant="subtitle1" color="textSecondary" gutterBottom>
								???????????? ??????
							</Typography>
							<TextField
								variant="outlined"
								fullWidth
								multiline
								rows={15}
								value={foodDescription}
								onChange={event => setFoodDescription(event.target.value)}
								error={result.description !== undefined}
								helperText={result.description}
							/>
						</Box>
					</Box>
				</form>
			)}
		</DContainer>
	);
};
