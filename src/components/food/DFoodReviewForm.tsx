import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { FormEvent, useState } from 'react';
import { useSubmit } from '../../hooks/useSubmit';
import { Food } from '../../types/food';

type FoodReviewFormData = {
	rate: string;
	contents: string;
};

export type DFoodReviewFormProps = {
	food: Food;
	onSubmit?: (data: FoodReviewFormData) => void;
};

export const DFoodReviewForm: React.FC<DFoodReviewFormProps> = props => {
	const { food, onSubmit } = props;
	const submit = useSubmit();

	const [contents, setContents] = useState('');
	const [rate, setRate] = useState('보통');

	const submitForm = async (event: FormEvent) => {
		event.preventDefault();

		await submit.post(`/foods/${food.id}/reviews/`, { data: { rate, contents } });

		window.location.reload();
	};

	return (
		<form onSubmit={submitForm}>
			<Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: grey[400], backgroundColor: 'white' }}>
				<TextField
					sx={{ border: 'none', '& *': { border: 'none !important' } }}
					fullWidth
					multiline
					minRows={2}
					maxRows={6}
					placeholder="리뷰를 작성해주세요"
					value={contents}
					onChange={event => setContents(event.target.value)}
					disabled={submit.pending}
				/>

				<Box sx={{ borderBottom: '1px solid', borderColor: grey[300] }} />

				<Box sx={{ padding: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
					<RadioGroup row value={rate} onChange={event => setRate(event.target.value)}>
						<FormControlLabel disabled={submit.pending} value="호" control={<Radio />} label="호" />
						<FormControlLabel disabled={submit.pending} value="보통" control={<Radio />} label="보통" />
						<FormControlLabel disabled={submit.pending} value="불호" control={<Radio />} label="불호" />
					</RadioGroup>

					<Box marginLeft={1} />

					<Button variant="contained" style={{ borderRadius: 0 }} size="small" type="submit" disabled={submit.pending}>
						작성
					</Button>

					<Box marginRight={2} />
				</Box>
			</Box>
		</form>
	);
};
