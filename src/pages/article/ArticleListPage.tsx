import React from 'react';
import { DArticleList } from '../../components/article/DArticleList';
import { DPageLoading } from '../../layout/DPageLoading';
import { DPageTitleSection } from '../../layout/DPageTitleSection';
import { useFetch } from '../../hooks/useFetch';
import { DContainer } from '../../layout/DContainer';
import { DUserBar } from '../../layout/DUserBar';
import { Article } from '../../types/article';
import { PaginatedListResponse } from '../../types/response';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import { useUser } from '../../hooks/useUser';

export const ArticleListPage: React.FC = props => {
	const navigate = useNavigate();

	const user = useUser();

	const { response, pending, error } = useFetch<PaginatedListResponse<Article>>('/articles/');

	return (
		<DContainer>
			{pending === true && <DPageLoading />}

			<DUserBar />

			<DPageTitleSection title="게시글 목록" subtitle="기호식품과 관련된 이야기를 나누어 보아요." />

			{user.user !== undefined && (
				<>
					<Button variant="contained" onClick={() => navigate('/articles/new')}>
						게시글 작성
					</Button>

					<Box marginTop={4} />
				</>
			)}

			{response !== undefined && <DArticleList articles={response.results} />}
		</DContainer>
	);
};
