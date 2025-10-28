import React from 'react';
import SearchInput from '../../../components/common/SearchInput';
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import GoodsItem from '../../../components/common/GoodsItem';

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

const selectGenderList: string[] = [
    '남성',
    '여성',
];

const selectList: string[] = [
    '최근순',
    '인기순',
    '가격 낮은순',
    '가격 높은순',
    '마감임박순',
]

const GoodsList: React.FC<{}> =() => {
    const [genderValue, setGenderValue] = React.useState('');
    const [filterValue, setFilterValue] = React.useState('');

    const handleGenderSelectChange = (e: any) => {
        const newValue = e.target.value;
        setGenderValue(newValue);

        // genderValue 값에 따른 필터링 로직 추가 예정
    };

    const handleSelectChange = (e: any) => {
        const newValue = e.target.value;
        setFilterValue(newValue);

        // value 값에 따른 정렬 로직 추가 예정
    };
    return(
        <div>
            <SearchInput
                width="100%"
                height={48}
                placeholder="브랜드 내 상품 검색"
                onSubmit={() => { }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ marginRight: 20 }}>
                        <Select value={genderValue} displayEmpty style={{ width: 87, height: 40 }} onChange={handleGenderSelectChange} >
                            <MenuItem value="">
                                <em>전체</em>
                            </MenuItem>
                            {selectGenderList.map((item: string, index: number) => (
                                <MenuItem key={index} value={index + 1}>{item}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <RadioGroup
                            defaultValue="normal"
                            row
                        >
                            <FormControlLabel value="normal" control={<Radio />} label="일반 거래" />
                            <FormControlLabel value="action" control={<Radio />} label="경매 거래" />
                        </RadioGroup>
                    </div>
                </div>
                <div>
                    <Select value={filterValue} displayEmpty style={{ width: 183, height: 40 }} onChange={handleSelectChange} >
                        <MenuItem value="">
                            <em>전체</em>
                        </MenuItem>
                        {selectList.map((item: string, index: number) => (
                            <MenuItem key={index} value={index + 1}>{item}</MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
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
        </div>
    );
}

export default GoodsList;