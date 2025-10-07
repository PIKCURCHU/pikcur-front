import * as React from 'react';
import { Box, Typography, Rating, Link } from '@mui/material';

interface ReviewSummaryProps {
    value: number;
    reviewCnt: number;
}

/** 리뷰 총 평점과 리뷰의 개수를 포함한 컴포넌트
 * 
 * @param value 리뷰 총 평점
 * @param reviewCnt 리뷰의 개수
 * @returns 
 */
const ReviewSummary: React.FC<ReviewSummaryProps> = ({value, reviewCnt}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating name="read-only" value={value} readOnly />
            <Link href="/" style={{textDecoration: 'none'}}>
                <Typography color='E0E0E0' marginLeft={1} sx={{
                    '&:hover': {
                    textDecoration: 'underline',
                    }
                }}
                >
                ({reviewCnt})
                </Typography>
            </Link>
        </Box>
    );
}

export default ReviewSummary;