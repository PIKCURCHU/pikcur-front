import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import { Divider, Rating, Typography } from '@mui/material';
import CustomAvatar from '../../components/common/CustomAvatar';
import { api } from '../../common/api';
import PaginationButtons from '../../components/common/PaginationButtons';
import { useLocation, useParams } from 'react-router-dom'; // ⭐ [추가] useParams 임포트

interface ReviewProps {
    src?: string;
    storeName: string;
    content: string;
    createDate: string;
    rating: number;
    reviewChoices: string; 
}

interface StoreProps {
    storeId: number;
    storeName: string;
    averRating: number;
}

const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + "년 전";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + "달 전";
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "일 전";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "시간 전";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + "분 전";
    return Math.floor(seconds) + "초 전";
};

// ⭐ [수정] props에서 storeId를 제거하고 useParams를 사용합니다.
const ReviewDetail: React.FC = () => {
    const location = useLocation();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [reviewList, setReviewList] = useState<ReviewProps[]>([]);
    const [storeAverRating, setStoreAverRating] = useState<StoreProps | null>(null);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (location.state.storeId) {
            const storeId = location.state.storeId;
            api.get(`/store/reviews/${storeId}`, {
                currentPage
            })
                .then((res) => {
                    console.log(res);
                    setReviewList(res.reviewList);
                    setTotalPages(res.totalPages);
                    setStoreAverRating(res.storeAverRating);
                })
                .catch((err) => {
                    console.log("🔥 에러:", err);
                });
        }
    }, [currentPage]); 

    return (
        <BaseLayout
            content={
                <div>
                    <div>
                        <Typography fontWeight={'bold'} fontSize={22} >{storeAverRating?.storeName}의 리뷰</Typography>
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginBottom: '20px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Rating sx={{ fontSize: '4rem' }} name="read-only" value={storeAverRating?.averRating || 0} readOnly></Rating>
                                <Typography fontSize={22}>({reviewList?.length || 0})</Typography>
                            </div>
                        </div>
                    </div>
                    <Divider></Divider>
                    <div>
                        {reviewList && reviewList.map((review, index) => {
                            
                            let choicesArray: string[] = [];
                            
                            if (review.reviewChoices) {
                                choicesArray = review.reviewChoices
                                    .split(',') 
                                    .map(str => str.trim()) 
                                    .filter(str => str !== '');
                            }

                            return (
                                // ⭐ [수정] Fragment로 감싸고 key 부여
                                <React.Fragment key={index}> 
                                    <div 
                                        style={{
                                            display: 'flex', width: "100%", alignItems: 'center', marginTop: '10px', marginBottom: '20px'
                                        }}>
                                        <div style={{ marginLeft: "10px", marginRight: '10px', paddingTop: '0px' }}>
                                            <CustomAvatar size={100} src={review.src || ''} />
                                        </div>

                                        <div style={{ marginRight: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
                                            <Typography fontSize={15} fontWeight={'bold'}>{review.storeName}</Typography>
                                            <Rating value={review.rating} readOnly></Rating>
                                            <Typography fontSize={13}>{review.content}</Typography>
                                            
                                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                                {choicesArray.map((choice, idx) => (
                                                    <div key={idx} style={{
                                                        backgroundColor: '#F2F2F2', color: '#757575', fontSize: '13px', padding: '8px', borderRadius: '8px'
                                                        }}>
                                                        {choice}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{ marginRight: '10px', display: 'flex' }}>
                                            <Typography fontSize={13}>{timeAgo(new Date(review.createDate))}</Typography>
                                        </div>
                                    </div>
                                    {/* ⭐ [추가] 마지막 리뷰가 아닐 때만 구분선 추가 */}
                                    {index < reviewList.length - 1 && <Divider />}
                                </React.Fragment> // ⭐ Fragment 닫기
                            );
                        })}
                    </div>
                    <PaginationButtons
                        maxPage={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}></PaginationButtons>
                </div>
            }
        ></BaseLayout>
    );
}

export default ReviewDetail;