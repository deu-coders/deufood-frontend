import { Avatar, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router';

const barHeight = 64;

export const DUserBar: React.FC = props => {
	const navigate = useNavigate();
	const user = useUser();

	const logout = () => {
		user.logout();
	};

	return (
		<Box
			sx={{
				height: barHeight,
				bgcolor: 'primary.dark',
				color: 'primary.contrastText',
				position: 'sticky',
				top: 0,
				display: 'flex',
				alignItems: 'center',
				paddingX: 2,
				zIndex: 1000,
			}}
			onClick={() => navigate('/')}>
			<Box marginLeft="auto" onClick={event => event.stopPropagation()}>
				<Box sx={{ marginX: 2 }}>
					<Typography variant="subtitle1">
						{user.pending === true ? (
							<></>
						) : user.error !== undefined ? (
							<Link href="/login" color="inherit">
								로그인
							</Link>
						) : user.user !== undefined ? (
							<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
								<span>{user.user.username}</span>
								<Link onClick={logout} color="inherit" sx={{ fontSize: '0.75rem', marginTop: -0.4, cursor: 'pointer' }}>
									로그아웃
								</Link>
							</Box>
						) : (
							<Link href="/login" color="inherit">
								로그인
							</Link>
						)}
					</Typography>
				</Box>
			</Box>
			<Avatar />
		</Box>
	);
};
