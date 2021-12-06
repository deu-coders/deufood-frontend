import { Alert, Button, TextField, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { FormEvent, useEffect, useState } from 'react';
import { useSubmit } from '../hooks/useSubmit';
import { DContainer } from '../layout/DContainer';
import { useNavigate } from 'react-router';
import { useUser } from '../hooks/useUser';

export const RegisterPage: React.FC = props => {
	const theme = useTheme();
	const navigate = useNavigate();
	const user = useUser();

	const submit = useSubmit<
		{ key: string },
		{
			status: 400;
			data: {
				username?: string[];
				email?: string[];
				password1: string[];
				password2: string[];
				non_field_errors?: string[];
			};
		}
	>();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');

	const [result, setResult] = useState<{
		username?: string;
		email?: string;
		password1?: string;
		password2?: string;
		non_field_errors?: string;
	}>({});

	useEffect(() => {
		if (submit.error !== undefined) {
			const { status, data } = submit.error;

			if (status === 400) {
				setResult({
					username: data?.username?.[0],
					email: data?.email?.[0],
					password1: data?.password1?.[0],
					password2: data?.password2?.[0],
					non_field_errors: data?.non_field_errors?.[0],
				});
			}
		}
	}, [submit.error]);

	useEffect(() => {
		// register successful?
		if (submit.response !== undefined) {
			localStorage.setItem('token', submit.response.key);
			user.ensureLogin();
			navigate('/');
		}
	}, [submit.response]);

	const submitForm = (event: FormEvent) => {
		event.preventDefault();

		submit.post('/register/', {
			data: {
				username,
				email,
				password1,
				password2,
			},
		});
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
					기호식품 백과사전에 오신 것을 환영합니다!
				</Typography>
				<Typography variant="h3" sx={{ fontWeight: 'light' }}>
					가입
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
						disabled={submit.pending}
						error={result.username !== undefined}
						helperText={result.username}
					/>

					<Box marginTop={4} />

					<Typography variant="h6" color="textSecondary" gutterBottom>
						이메일
					</Typography>
					<TextField
						fullWidth
						variant="outlined"
						size="small"
						value={email}
						onChange={event => setEmail(event.target.value)}
						disabled={submit.pending}
						error={result.email !== undefined}
						helperText={result.email}
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
						value={password1}
						onChange={event => setPassword1(event.target.value)}
						disabled={submit.pending}
						error={result.password1 !== undefined}
						helperText={result.password1}
					/>

					<Box marginTop={4} />

					<Typography variant="h6" color="textSecondary" gutterBottom>
						비밀번호 확인
					</Typography>
					<TextField
						fullWidth
						variant="outlined"
						type="password"
						size="small"
						value={password2}
						onChange={event => setPassword2(event.target.value)}
						disabled={submit.pending}
						error={result.password2 !== undefined}
						helperText={result.password2}
					/>

					{result.non_field_errors !== undefined && (
						<>
							<Box marginTop={4} />

							<Alert severity="error">{result.non_field_errors}</Alert>
						</>
					)}

					<Box marginTop={6} />

					<Button variant="contained" type="submit" disabled={submit.pending}>
						가입
					</Button>

					<Box marginTop={2} />
				</form>
			</Box>
		</DContainer>
	);
};
