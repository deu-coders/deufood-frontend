import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';

export function useFetch<Response>(path?: string, config?: AxiosRequestConfig) {
	const [response, setResponse] = useState<Response>();
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<AxiosError | undefined>(undefined);

	useEffect(() => {
		const fetch = async () => {
			try {
				if (path === undefined) return;

				setPending(true);

				const axiosResponse = await axiosInstance({ url: path, ...config });

				setResponse(axiosResponse.data);
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

		fetch();
	}, [path, config]);

	return { response, pending, error };
}
