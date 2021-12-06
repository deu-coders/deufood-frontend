import { PhotoCamera } from '@mui/icons-material';
import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { DThumbnailPreview } from '../../components/core/DThumbnailPreview';
import { useSubmit } from '../../hooks/useSubmit';
import { useUser } from '../../hooks/useUser';
import { DContainer } from '../../layout/DContainer';
import { DPageTitleSection } from '../../layout/DPageTitleSection';
import { DUserBar } from '../../layout/DUserBar';

export const NewArticlePage: React.FC = props => {
	const navigate = useNavigate();

	const user = useUser();
	const submit = useSubmit<
		unknown,
		{
			status: 400;
			data: {
				thumbnail?: string[];
				title?: string[];
				contents?: string[];
			};
		}
	>();

	const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
	const [title, setTitle] = useState('');
	const [contents, setContents] = useState('');

	const [result, setResult] = useState<{
		thumbnail?: string;
		title?: string;
		contents?: string;
	}>({});

	useEffect(() => {
		if (submit.error !== undefined) {
			const { status, data } = submit.error;

			if (status === 400) {
				setResult({
					thumbnail: data?.thumbnail?.[0],
					title: data?.title?.[0],
					contents: data?.contents?.[0],
				});
			}
		}
	}, [submit.error]);

	useEffect(() => {
		if (submit.response !== undefined) {
			navigate('/articles');
		}
	}, [submit.response]);

	const submitForm = (event: FormEvent) => {
		event.preventDefault();

		const formData = new FormData();

		if (thumbnail !== undefined) formData.append('thumbnail', thumbnail);
		formData.append('title', title);
		formData.append('contents', contents);

		submit.post('/articles/', { data: formData });
	};

	return (
		<DContainer>
			<DUserBar />

			<DPageTitleSection title="새로운 글 작성하기" subtitle="커뮤니티에 새로운 글을 작성해보세요!" />

			{user.user === undefined ? (
				<Alert severity="error">잘못된 접근입니다.</Alert>
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
									이미지 업로드
								</Button>

								<Box marginTop={12} />

								<Button
									variant="contained"
									type="submit"
									fullWidth
									sx={{ height: 50, fontSize: '1.2rem', fontWeight: 'bold' }}>
									게시글 작성
								</Button>
							</label>
						</Box>

						<Box marginLeft={8} />

						<Box sx={{ flex: 1 }}>
							<Typography variant="subtitle1" color="textSecondary" gutterBottom>
								제목
							</Typography>
							<TextField
								variant="outlined"
								fullWidth
								value={title}
								onChange={event => setTitle(event.target.value)}
								error={result.title !== undefined}
								helperText={result.title}
							/>

							<Box marginTop={4} />

							<Typography variant="subtitle1" color="textSecondary" gutterBottom>
								내용
							</Typography>
							<TextField
								variant="outlined"
								fullWidth
								multiline
								rows={15}
								value={contents}
								onChange={event => setContents(event.target.value)}
								error={result.contents !== undefined}
								helperText={result.contents}
							/>
						</Box>
					</Box>
				</form>
			)}
		</DContainer>
	);
};
