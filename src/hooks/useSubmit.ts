import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import axiosInstance from '../utils/axios';

interface BaseError<ErrorData = any> {
	status: number;
	data: ErrorData;
}

export function useSubmit<Response, Error extends BaseError>() {
	const [response, setResponse] = useState<Response>();
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<Error | undefined>(undefined);

	const fetch = async (path: string, config?: AxiosRequestConfig) => {
		try {
			setPending(true);

			const axiosResponse = await axiosInstance({ url: path, ...config });

			setResponse(axiosResponse.data);

			return axiosResponse.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError({
					status: Number(error.code || 400),
					data: error.response?.data,
				} as Error); // enforce type
			} else {
				throw error;
			}
		} finally {
			setPending(false);
		}
	};

	const get = async (path: string, config?: AxiosRequestConfig) => {
		return await fetch(path, { method: 'GET', ...config });
	};

	const post = async (path: string, config?: AxiosRequestConfig) => {
		return await fetch(path, { method: 'POST', ...config });
	};

	const del = async (path: string, config?: AxiosRequestConfig) => {
		return await fetch(path, { method: 'DELETE', ...config });
	};

	return { response, pending, error, get, post, del };
}
