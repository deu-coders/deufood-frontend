import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { DFoodCardList } from '../../components/food/DFoodCardList';
import { DPageLoading } from '../../layout/DPageLoading';
import { DPageTitleSection } from '../../layout/DPageTitleSection';
import { useFetch } from '../../hooks/useFetch';
import { useUser } from '../../hooks/useUser';
import { DContainer } from '../../layout/DContainer';
import { DUserBar } from '../../layout/DUserBar';
import { FoodCategory } from '../../types/food';
import { RetreiveResponse } from '../../types/response';

export const FoodListPage: React.FC = props => {
	const { foodCategory } = useParams();
	const navigate = useNavigate();

	const user = useUser();

	const { response, pending, error } = useFetch<RetreiveResponse<FoodCategory>>(`/food_categories/${foodCategory}/`);

	return (
		<DContainer>
			{pending === true && <DPageLoading />}

			<DUserBar />

			<DPageTitleSection title={`${foodCategory} 목록`} subtitle="세상엔 다양한 기호식품이 있습니다. 한번 구경해볼까요?" />

			{response !== undefined && (
				<>
					<DFoodCardList foods={response.foods} />

					{user.user !== undefined && (
						<>
							<Box marginTop={4} />

							<Button variant="contained" onClick={() => navigate(`/foods/new?food_category=${foodCategory}`)}>
								추가하기
							</Button>
						</>
					)}
				</>
			)}
		</DContainer>
	);
};
