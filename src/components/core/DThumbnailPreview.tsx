import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box, BoxProps } from '@mui/system';
import React, { useEffect, useState } from 'react';

const fileToUrl = (file: File): Promise<string> =>
	new Promise(resolve => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(String(reader.result));
		};
		reader.readAsDataURL(file);
	});

export type DThumbnailPreviewProps = {
	file?: File;
	placeholder?: string;
} & BoxProps;

export const DThumbnailPreview: React.FC<DThumbnailPreviewProps> = props => {
	const { file, placeholder = '이미지가 없습니다', ...BoxProps } = props;

	const [url, setUrl] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (file === undefined) {
			setUrl(undefined);
		} else {
			fileToUrl(file).then(url => setUrl(url));
		}
	}, [file]);

	return (
		<Box
			sx={{
				backgroundColor: grey[200],
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
			{...BoxProps}>
			{url === undefined ? (
				placeholder !== undefined && (
					<Typography variant="subtitle1" color="textSecondary">
						{placeholder}
					</Typography>
				)
			) : (
				<img src={url} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
			)}
		</Box>
	);
};
