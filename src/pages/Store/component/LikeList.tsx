import { Button, FormControlLabel, IconButton, Radio, RadioGroup, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GoodsItem from '../../../components/common/GoodsItem';
import CustomAvatar from '../../../components/common/CustomAvatar';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import BrandItem from './BrandItem';


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

interface BrandItemProps {
    id: number;
    name: string;
    src: string;
    isLiked:boolean;
}

const brandListExample: BrandItemProps[] = [
    {
        id: 1,
        name: '나이키',
        src: 'https://example.com/brands/nike_logo.png',
        isLiked: true
    },
    {
        id: 2,
        name: '아디다스',
        src: 'https://example.com/brands/adidas_logo.png',
        isLiked: true
    },
    {
        id: 3,
        name: '샤넬',
        src: 'https://example.com/brands/chanel_logo.png',
        isLiked: true
    },
    {
        id: 4,
        name: '애플',
        src: 'https://example.com/brands/apple_logo.png',
        isLiked: true
    },
    {
        id: 5,
        name: '구찌',
        src: 'https://example.com/brands/gucci_logo.png',
        isLiked: true
    },
    {
        id: 6,
        name: '삼성전자',
        src: 'https://example.com/brands/samsung_logo.png',
        isLiked: true
    }
];

const goodsListExample: GoodsItemProps[] = [
    {
        src: 'https://example.com/images/goods_1.jpg',
        alt: '한정판 디자이너 시계',
        goodsName: '한정판 디자이너 시계 A-100 (새제품)',
        bidPrice: 550000,
        buyOutPrice: 800000,
        peopleCount: 15,
        auctionEndDate: '2025-11-01T14:30:00', 
        onClick: ()=>{},
        like: true, 
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
        auctionEndDate: '2025-10-27T10:00:00', 
        onClick: ()=>{},
        like: false, 
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
        auctionEndDate: '2025-11-05T20:00:00', 
        onClick: ()=>{},
        like: true, 
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
        auctionEndDate: '2025-10-26T23:59:59',
        onClick: ()=>{},
        like: false, 
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
        auctionEndDate: '2025-11-10T18:00:00', 
        onClick: ()=>{},
        like: true, 
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
        auctionEndDate: '2025-11-01T14:30:00', 
        onClick: ()=>{},
        like: true, 
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
        auctionEndDate: '2025-10-27T10:00:00',
        onClick: ()=>{},
        like: false, 
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

const LikeList: React.FC<{}> = () => {
    const [selectedLikeType, setSelectedLikeType] = useState('product'); 
    const [brandItems, setBrandItems] = useState<BrandItemProps[]>(brandListExample);
    


    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(brandListExample.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
 
    const currentBrandList = brandItems.slice(startIndex, endIndex);

    
    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLikeType(event.target.value);
    };
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    

    return (
        <div>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedLikeType}
                onChange={handleChangeType}
            >
                <FormControlLabel value="product" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="상품" />
                <FormControlLabel value="brand" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="브랜드" />                            
            </RadioGroup> 
            {selectedLikeType == 'product' &&
                <div style={{
                    display:'flex',
                    gap:'25px',
                    flexWrap: 'wrap',
                    marginTop:'20px'
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
            }
            {selectedLikeType == 'brand' &&
                <div style={{
                    marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
                }}>
                {currentBrandList.map((brand, index)=>{
                    return (
                        <BrandItem
                            brand={brand}
                            onClick={()=>{console.log("브랜드 페이지 이동")}}
                            onLike={()=>{console.log('좋아요 api')}}
                            onUnlike={()=>{console.log('좋아요 취소 api')}}
                            ></BrandItem>
                    );
                })}
                <PaginationButtons
                    maxPage={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange}></PaginationButtons>
            </div>
            }
        </div>
    );
}

export default LikeList;