import React from "react";
import WithCategoryLayout from "../../components/layout/WithCategoryLayout";
import GoodsItem from "../../components/common/GoodsItem";
import { Typography } from "@mui/material";

interface GoodsItemProps {
    src: string;
    alt?: string;
    goodsName: string;
    bidPrice: number;
    buyOutPrice: number;
    peopleCount: number;
    auctionEndDate: string;
    onClick: () => void;
    like: boolean;
    onLike: () => void;
    onUnlike: () => void;
}


const goodsListExample: GoodsItemProps[] = [
    {
        src: 'https://example.com/images/goods_1.jpg',
        alt: '한정판 디자이너 시계',
        goodsName: '한정판 디자이너 시계 A-100 (새제품)',
        bidPrice: 550000,
        buyOutPrice: 800000,
        peopleCount: 15,
        auctionEndDate: '2025-11-01T14:30:00', // 11월 1일 14시 30분
        onClick: ()=>{},
        like: true, // 찜 상태
        onLike: ()=>{},
        onUnlike: ()=>{},
    },
    {
        src: 'https://example.com/images/goods_2.jpg',
        alt: '빈티지 카메라',
        goodsName: '빈티지 필름 카메라 K-7000 (상태 A급)',
        bidPrice: 120000,
        buyOutPrice: 200000,
        peopleCount: 8,
        auctionEndDate: '2025-10-27T10:00:00', // 10월 27일 10시 00분
        onClick: ()=>{},
        like: false, // 찜 안함
        onLike: ()=>{},
        onUnlike: ()=>{},
    },
    {
        src: 'https://example.com/images/goods_3.jpg',
        alt: '최신형 무선 이어폰',
        goodsName: '최신형 노이즈 캔슬링 무선 이어폰 Pro-Max',
        bidPrice: 280000,
        buyOutPrice: 350000,
        peopleCount: 42,
        auctionEndDate: '2025-11-05T20:00:00', // 11월 5일 20시 00분
        onClick: ()=>{},
        like: true, // 찜 상태
        onLike: ()=>{},
        onUnlike: ()=>{},
    },
    {
        src: 'https://example.com/images/goods_4.jpg',
        alt: '고급 가죽 지갑',
        goodsName: '고급 이탈리아산 가죽 지갑 (미사용)',
        bidPrice: 70000,
        buyOutPrice: 100000,
        peopleCount: 3,
        auctionEndDate: '2025-10-26T23:59:59', // 오늘 자정 직전
        onClick: ()=>{},
        like: false, // 찜 안함
        onLike: ()=>{},
        onUnlike: ()=>{},
    },
    {
        src: 'https://example.com/images/goods_5.jpg',
        alt: '인기 게임 콘솔',
        goodsName: '차세대 인기 게임 콘솔 (사용감 적음)',
        bidPrice: 450000,
        buyOutPrice: 500000,
        peopleCount: 20,
        auctionEndDate: '2025-11-10T18:00:00', // 11월 10일 18시 00분
        onClick: ()=>{},
        like: true, // 찜 상태
        onLike: ()=>{},
        onUnlike: ()=>{},
    },
    {
        src: 'https://example.com/images/goods_1.jpg',
        alt: '한정판 디자이너 시계',
        goodsName: '한정판 디자이너 시계 A-100 (새제품)',
        bidPrice: 550000,
        buyOutPrice: 800000,
        peopleCount: 15,
        auctionEndDate: '2025-11-01T14:30:00', // 11월 1일 14시 30분
        onClick: ()=>{},
        like: true, // 찜 상태
        onLike: ()=>{},
        onUnlike: ()=>{},
    },
    {
        src: 'https://example.com/images/goods_2.jpg',
        alt: '빈티지 카메라',
        goodsName: '빈티지 필름 카메라 K-7000 (상태 A급)',
        bidPrice: 120000,
        buyOutPrice: 200000,
        peopleCount: 8,
        auctionEndDate: '2025-10-27T10:00:00', // 10월 27일 10시 00분
        onClick: ()=>{},
        like: false, // 찜 안함
        onLike: ()=>{},
        onUnlike: ()=>{},
    },
    {
        src: 'https://example.com/images/goods_3.jpg',
        alt: '최신형 무선 이어폰',
        goodsName: '최신형 노이즈 캔슬링 무선 이어폰 Pro-Max',
        bidPrice: 280000,
        buyOutPrice: 350000,
        peopleCount: 42,
        auctionEndDate: '2025-11-05T20:00:00', // 11월 5일 20시 00분
        onClick: ()=>{},
        like: true, // 찜 상태
        onLike: ()=>{},
        onUnlike: ()=>{},
    },
];


const MainPage: React.FC<{}> = ({}) => {
    return (
        <WithCategoryLayout
            topContent={
            <div style={{
                width:'100%',
                height:'180px',
                backgroundColor:'purple',
                marginTop:'60px',
                borderRadius:'8px'
            }}>
                메인이미지
            </div>
        }
            middleBottomContent={
            <div style={{
                display:'flex',
                flexDirection: 'column',
            }}>
                <div style={{
                    marginTop:'40px'
                }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize:'22px' }}>최근 본 상품</Typography>
                    <div style={{
                        display:'flex',
                        gap:'25px',
                        flexWrap: 'wrap'
                    }}>
                    {goodsListExample.map((item, index)=>{
                        return (
                            <GoodsItem 
                                src={item.src}
                                alt={item.alt}
                                goodsName={item.goodsName}
                                bidPrice={item.bidPrice}
                                buyOutPrice={item.buyOutPrice}
                                peopleCount={item.peopleCount}
                                auctionEndDate={item.auctionEndDate}
                                onClick={item.onClick}
                                like={item.like}
                                onLike={item.onLike}
                                onUnlike={item.onUnlike}
                            ></GoodsItem>
                        );
                    })}
                    </div>
                </div>
                <div style={{
                    marginTop:'40px'
                }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize:'22px' }}>인기 상품</Typography>
                    <div style={{
                        display:'flex',
                        gap:'25px',
                        flexWrap: 'wrap'
                    }}>
                    {goodsListExample.map((item, index)=>{
                        return (
                            <GoodsItem 
                                src={item.src}
                                alt={item.alt}
                                goodsName={item.goodsName}
                                bidPrice={item.bidPrice}
                                buyOutPrice={item.buyOutPrice}
                                peopleCount={item.peopleCount}
                                auctionEndDate={item.auctionEndDate}
                                onClick={item.onClick}
                                like={item.like}
                                onLike={item.onLike}
                                onUnlike={item.onUnlike}
                            ></GoodsItem>
                        );
                    })}
                    </div>
                </div>
                <div style={{
                    marginTop:'40px'
                }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize:'22px' }}>경매 종료 임박 상품</Typography>
                    <div style={{
                        display:'flex',
                        gap:'25px',
                        flexWrap: 'wrap'
                    }}>
                    {goodsListExample.map((item, index)=>{
                        return (
                            <GoodsItem 
                                src={item.src}
                                alt={item.alt}
                                goodsName={item.goodsName}
                                bidPrice={item.bidPrice}
                                buyOutPrice={item.buyOutPrice}
                                peopleCount={item.peopleCount}
                                auctionEndDate={item.auctionEndDate}
                                onClick={item.onClick}
                                like={item.like}
                                onLike={item.onLike}
                                onUnlike={item.onUnlike}
                            ></GoodsItem>
                        );
                    })}
                    </div>
                </div>   
                
                     
                
            </div>
        }
        ></WithCategoryLayout>
    );
}

export default MainPage;