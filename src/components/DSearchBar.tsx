import { Search } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

export type DSearchBarProps = {
	onSearch?: (keyword: string) => void;
	defaultValue?: string;
};

export const DSearchBar: React.FC<DSearchBarProps> = props => {
	const navigate = useNavigate();
	const { onSearch = (query: string) => navigate(`/search?query=${query}`), defaultValue } = props;
	const [query, setQuery] = useState(defaultValue ?? '');

	const submit = (event: FormEvent) => {
		event.preventDefault();

		onSearch?.(query);
	};

	return (
		<form onSubmit={submit}>
			<Box sx={{ display: 'flex' }}>
				<TextField
					variant="outlined"
					fullWidth
					placeholder="다양한 기호식품을 검색해보세요!"
					value={query}
					onChange={event => setQuery(event.target.value)}
				/>

				<Box marginLeft={2} />

				<IconButton size="large" type="submit">
					<Search />
				</IconButton>
			</Box>
		</form>
	);
};
