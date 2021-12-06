import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './providers/UserProvider';
import { useUser } from './hooks/useUser';
import { RootRoutes } from './RootRoutes';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1da578',
		},
		background: {
			default: '#f8fcfb',
		},
	},
});

export const UserInitialization: React.FC = props => {
	const user = useUser();

	// check login state
	useEffect(() => {
		user.ensureLogin();
	}, []);

	return <></>;
};

export const App: React.FC = props => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<UserProvider>
					<UserInitialization />
					<CssBaseline />

					<RootRoutes />
				</UserProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
};
