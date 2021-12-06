import { Container, ContainerProps } from '@mui/material';
import React from 'react';

export type DContainerProps = ContainerProps;

export const DContainer: React.FC<ContainerProps> = props => {
	const { children, ...ContainerProps } = props;

	return (
		<Container fixed maxWidth="md" {...ContainerProps}>
			{children}
		</Container>
	);
};
