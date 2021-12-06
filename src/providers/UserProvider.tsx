import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { UserContext } from '../contexts/user';
import { User } from '../types/user';
import axiosInstance from '../utils/axios';

export const UserProvider: React.FC = props => {
	const { children } = props;

	const [user, setUser] = useState<User | undefined>(undefined);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<AxiosError | undefined>(undefined);

	const ensureLogin = async () => {
		try {
			setPending(true);
			setError(undefined);

			const response = await axiosInstance.get<User>('/auth/user/');

			setUser(response.data);
		} catch (error) {
			localStorage.removeItem('token');
		} finally {
			setPending(false);
		}
	};

	const login = async (username: string, password: string) => {
		try {
			setPending(true);
			setError(undefined);

			const response = await axiosInstance.post<{ key: string }>('/auth/login/', { username, password });
			localStorage.setItem('token', response.data.key);

			await ensureLogin();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error);
			} else {
				throw error;
			}
		} finally {
			setPending(false);
		}
	};

	const logout = async () => {
		try {
			setPending(true);
			setError(undefined);

			await axiosInstance.post<{ detail: string }>('/auth/logout/');
			localStorage.removeItem('token');
			setUser(undefined);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error);
			} else {
				throw error;
			}
		} finally {
			setPending(false);
		}
	};

	const clearError = () => {
		setError(undefined);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				pending,
				error,
				clearError,
				ensureLogin,
				login,
				logout,
			}}>
			{children}
		</UserContext.Provider>
	);
};
