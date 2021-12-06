import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { DRecentArticleList } from '../components/article/DRecentArticleList';
import { DSearchBar } from '../components/DSearchBar';
import { DBest5FoodList } from '../components/food/DBest5FoodList';
import { DContainer } from '../layout/DContainer';
import { DFoodCategories } from '../layout/DFoodCategories';
import { DUserBar } from '../layout/DUserBar';

export const IndexPage: React.FC = props => {
	return (
		<DContainer>
			<DUserBar />

			<Box
				sx={{
					height: 260,
					backgroundColor: 'primary.main',
					color: 'primary.contrastText',
					display: 'flex',
					alignItems: 'flex-end',
					padding: 4,
				}}>
				<Typography variant="h3" sx={{ fontWeight: 'light' }}>
					기호식품 백과사전
				</Typography>

				<Box marginLeft="auto" />

				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
					<Typography variant="body2">다양한 기호식품의</Typography>
					<Typography variant="body2">세상을 소개해드리겠습니다.</Typography>
					<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
						{' '}
						어서오세요!
					</Typography>
				</Box>
			</Box>

			<Box marginTop={8} />

			<DFoodCategories />

			<Box marginTop={4} />

			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box sx={{ width: 480 }}>
					<DSearchBar />
				</Box>
			</Box>

			<Box marginTop={6} />

			<Box
				sx={{
					height: 120,
					display: 'flex',
					alignItems: 'flex-end',
					padding: 4,
				}}>
				<Typography variant="h4" sx={{ fontWeight: 'light' }}>
					Top 5 호감 기호식품
				</Typography>
			</Box>

			<DBest5FoodList />

			<Box marginTop={6} />

			<Box
				sx={{
					height: 120,
					display: 'flex',
					alignItems: 'flex-end',
					padding: 4,
				}}>
				<Typography variant="h4" sx={{ fontWeight: 'light' }}>
					커뮤니티 최근 게시글&nbsp;&nbsp;
					<Link to="/articles">
						<Typography variant="h6" display="inline">
							전체보기
						</Typography>
					</Link>
				</Typography>
			</Box>

			<DRecentArticleList />
		</DContainer>
	);
};
