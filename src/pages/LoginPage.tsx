import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { FormEvent, useEffect, useState } from 'react';
import { DContainer } from '../layout/DContainer';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/useUser';

export const LoginPage: React.FC = props => {
	const theme = useTheme();
	const navigate = useNavigate();

	const user = useUser();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		user.clearError();

		return () => user.clearError();
	}, []);

	useEffect(() => {
		if (user.user !== undefined) {
			navigate('/');
		}
	}, [user.user]);

	const submitForm = async (event: FormEvent) => {
		event.preventDefault();

		user.login(username, password);
	};

	return (
		<DContainer>
			<Box
				sx={{
					height: 260 + 64,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					backgroundColor: '#1d78a5',
					color: theme.palette.getContrastText('#1d78a5'),
					padding: 4,
				}}>
				<Typography variant="h6" sx={{ fontWeight: 'light', marginLeft: 0.75 }} gutterBottom>
					기호식품 백과사전에
				</Typography>
				<Typography variant="h3" sx={{ fontWeight: 'light' }}>
					로그인
				</Typography>
			</Box>

			<Box marginTop={4} />

			<Box sx={{ padding: 4 }}>
				<form style={{ width: 440 }} onSubmit={submitForm}>
					<Typography variant="h6" color="textSecondary" gutterBottom>
						사용자 이름
					</Typography>
					<TextField
						fullWidth
						variant="outlined"
						size="small"
						value={username}
						onChange={event => setUsername(event.target.value)}
						disabled={user.pending}
					/>

					<Box marginTop={4} />

					<Typography variant="h6" color="textSecondary" gutterBottom>
						비밀번호
					</Typography>
					<TextField
						fullWidth
						variant="outlined"
						type="password"
						size="small"
						value={password}
						onChange={event => setPassword(event.target.value)}
						disabled={user.pending}
					/>

					<Box marginTop={6} />

					<Button variant="contained" type="submit" disabled={user.pending}>
						로그인
					</Button>

					<Box marginTop={2} />

					{user.error !== undefined && <Alert severity="error">사용자가 존재하지 않거나, 비밀번호가 일치하지 않습니다.</Alert>}
				</form>

				<Box marginTop={8} />

				<Typography variant="subtitle1">또는 ...</Typography>
				<Typography
					variant="h5"
					display="inline"
					sx={{ fontWeight: 'light', textDecoration: 'underline', cursor: 'pointer' }}
					onClick={() => navigate('/register')}>
					새로 가입하기
				</Typography>
			</Box>
		</DContainer>
	);
};
