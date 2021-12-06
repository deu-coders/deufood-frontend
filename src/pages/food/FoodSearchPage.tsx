import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { DFoodCardList } from '../../components/food/DFoodCardList';
import { DPageLoading } from '../../layout/DPageLoading';
import { DPageTitleSection } from '../../layout/DPageTitleSection';
import { DSearchBar } from '../../components/DSearchBar';
import { useFetch } from '../../hooks/useFetch';
import { DContainer } from '../../layout/DContainer';
import { DUserBar } from '../../layout/DUserBar';
import { Food } from '../../types/food';
import { PaginatedListResponse } from '../../types/response';

export const FoodSearchPage: React.FC = props => {
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const query = params.get('query') || '';

	const isQueryEmpty = query.trim().length === 0;

	const { response, pending, error } = useFetch<PaginatedListResponse<Food>>(isQueryEmpty ? undefined : `/foods/?query=${query}`);

	return (
		<DContainer>
			{pending === true && <DPageLoading />}

			<DUserBar />

			<DPageTitleSection
				title={isQueryEmpty ? '검색' : `"${query}" 에 대한 결과입니다!`}
				subtitle={
					isQueryEmpty
						? '기호식품의 이름을 검색해보세요!'
						: response === undefined
						? ''
						: `${response.count}개의 결과가 검색되었습니다.`
				}
			/>

			<DSearchBar defaultValue={query} />

			<Box marginTop={4} />

			{response !== undefined && (
				<Box>
					<DFoodCardList foods={response.results} />
				</Box>
			)}
		</DContainer>
	);
};
