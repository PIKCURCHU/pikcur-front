import React from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import { Divider, Rating, Typography } from '@mui/material'; 
import CustomAvatar from '../../components/common/CustomAvatar';

interface ReviewProps {
    src: string;
    nickname: string;
    content: string;
    createDate: Date;
    starRate: number;
    reviewChoice: string[];
}

interface ReviewDetailProps {
    storeName:string;
    averStarRate: number;
    reviews: ReviewProps[];

}

const now = new Date();

const getTimeOffset = (minutes: number): Date => {
    const d = new Date(now.getTime());
    d.setMinutes(d.getMinutes() - minutes);
    return d;
};

const ReviewDetailExample: ReviewDetailProps = {
    storeName:'상점 23423524524호',
    averStarRate: 5,
    reviews: [
        {
            src:'http:/',
            nickname:'감자사요',
            content:'상태 좋아요',
            createDate: getTimeOffset(5),
            starRate:3,
            reviewChoice:['배송이 빨라요', '친절해요']
        },
        {
            src:'http:/',
            nickname:'감자사요',
            content:'상태 좋아요',
            createDate:getTimeOffset(5),
            starRate:3,
            reviewChoice:['배송이 빨라요', '친절해요']
        },
        {
            src:'http:/',
            nickname:'감자사요',
            content:'상태 좋아요',
            createDate:getTimeOffset(5),
            starRate:3,
            reviewChoice:['배송이 빨라요', '친절해요']
        },
        {
            src:'http:/',
            nickname:'감자사요',
            content:'상태 좋아요',
            createDate:getTimeOffset(5),
            starRate:3,
            reviewChoice:['배송이 빨라요', '친절해요']
        },
        {
            src:'http:/',
            nickname:'감자사요',
            content:'상태 좋아요',
            createDate:getTimeOffset(60 * 24 * 7),
            starRate:3,
            reviewChoice:['배송이 빨라요', '친절해요']
        },
    ]
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



const ReviewDetail: React.FC<{}> = ({}) => {
    return (
        <BaseLayout
            content={
                <div>
                    <div>
                        <Typography fontWeight={'bold'} fontSize={22} >{ReviewDetailExample.storeName}의 리뷰</Typography>
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center',
                            marginTop:'20px',
                            marginBottom:'20px'
                        }}>
                            <div style={{
                                display:'flex',
                                alignItems:'center'
                            }}>
                                <Rating sx={{ fontSize: '4rem' }} name="read-only" value={ReviewDetailExample.averStarRate} readOnly></Rating>
                                <Typography fontSize={22}>({ReviewDetailExample.reviews.length})</Typography>   
                            </div>
                        </div>
                    </div>
                    <Divider></Divider>
                    <div>
                        {ReviewDetailExample.reviews.map((review, index)=>{
                            return(
                                <div 
                                    style={{
                                        display: 'flex',
                                        width:"100%",
                                        alignItems: 'center',
                                        marginTop:'10px',
                                        marginBottom:'20px',
                                    }}>
                                    <div style={{marginLeft:"10px", marginRight: '10px', paddingTop:'0px'}}>
                                        <CustomAvatar size={100} src={review.src}/>
                                    </div>
                                    
                                    <div style={{ marginRight: 'auto', display:'flex', flexDirection:'column', gap:'10px', marginTop:'30px' }}>
                                        <Typography fontSize={15} fontWeight={'bold'}>{review.nickname}</Typography>
                                        <Rating value={review.starRate} readOnly></Rating>
                                        <Typography fontSize={13}>{review.content}</Typography>
                                        <div style={{
                                            display:'flex',
                                            gap:'10px'
                                        }}>
                                            {review.reviewChoice.map((choice, index)=>{
                                                return (
                                                    <div style={{
                                                        backgroundColor:'#F2F2F2',
                                                        color:'#757575',
                                                        fontSize:'13px',
                                                        padding:'8px',
                                                        borderRadius:'8px'
                                                    }}>
                                                        {choice}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                    </div>
                                    <div style={{ marginRight: '10px', display:'flex' }}>
                                        <Typography fontSize={13}>{timeAgo(review.createDate)}</Typography>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            }
        ></BaseLayout>
    );
}

export default ReviewDetail;