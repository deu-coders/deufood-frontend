import { AxiosError } from 'axios';
import React from 'react';
import { User } from '../types/user';

export const UserContext = React.createContext<{
	ensureLogin: () => Promise<void>;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	user: User | undefined;
	pending: boolean;
	error: AxiosError | undefined;
	clearError: () => void;
}>(undefined!);
