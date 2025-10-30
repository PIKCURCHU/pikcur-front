import React, { useState, useEffect, useMemo } from 'react';
import SearchInput from '../../../components/common/SearchInput';
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import GoodsItem from '../../../components/common/GoodsItem';

// 1. GoodsItemProps에 gender 필드 추가 (이전과 동일)
interface GoodsItemProps {
    src: string;
    alt?: string;
    goodsName: string;
    bidPrice: number;
    buyOutPrice: number;
    likeCount: number;
    auctionEndDate: string;
    onClick: () => void;
    like: boolean;
    onLike: () => void;
    onUnlike: () => void;
    gender: '남성' | '여성'; 
}

// 2. goodsListExample에 gender 데이터 추가 및 복사하여 데이터 보강 (이전과 동일)
const goodsListOriginal: GoodsItemProps[] = [
    {
        src: 'https://example.com/images/goods_1.jpg', alt: '한정판 디자이너 시계', goodsName: '한정판 디자이너 시계 A-100 (새제품)',
        bidPrice: 550000, buyOutPrice: 800000, likeCount: 15, auctionEndDate: '2025-11-01T14:30:00', 
        onClick: () => {}, like: true, onLike: () => {}, onUnlike: () => {}, gender: '남성',
    },
    {
        src: 'https://example.com/images/goods_2.jpg', alt: '빈티지 카메라', goodsName: '빈티지 필름 카메라 K-7000 (상태 A급)',
        bidPrice: 120000, buyOutPrice: 200000, likeCount: 8, auctionEndDate: '2025-10-27T10:00:00', 
        onClick: () => {}, like: false, onLike: () => {}, onUnlike: () => {}, gender: '여성',
    },
    {
        src: 'https://example.com/images/goods_3.jpg', alt: '최신형 무선 이어폰', goodsName: '최신형 노이즈 캔슬링 무선 이어폰 Pro-Max',
        bidPrice: 280000, buyOutPrice: 350000, likeCount: 42, auctionEndDate: '2025-11-05T20:00:00', 
        onClick: () => {}, like: true, onLike: () => {}, onUnlike: () => {}, gender: '여성',
    },
    {
        src: 'https://example.com/images/goods_4.jpg', alt: '고급 가죽 지갑', goodsName: '고급 이탈리아산 가죽 지갑 (미사용)',
        bidPrice: 70000, buyOutPrice: 100000, likeCount: 3, auctionEndDate: '2025-10-26T23:59:59',
        onClick: () => {}, like: false, onLike: () => {}, onUnlike: () => {}, gender: '여성',
    },
    {
        src: 'https://example.com/images/goods_5.jpg', alt: '인기 게임 콘솔', goodsName: '차세대 인기 게임 콘솔 (사용감 적음)',
        bidPrice: 450000, buyOutPrice: 500000, likeCount: 20, auctionEndDate: '2025-11-10T18:00:00', 
        onClick: () => {}, like: true, onLike: () => {}, onUnlike: () => {}, gender: '남성',
    },
    // 복사본 1
    {
        src: 'https://example.com/images/goods_1.jpg', alt: '테스트 시계', goodsName: '테스트 시계 (남성용)',
        bidPrice: 600000, buyOutPrice: 900000, likeCount: 10, auctionEndDate: '2025-11-02T10:00:00', 
        onClick: () => {}, like: false, onLike: () => {}, onUnlike: () => {}, gender: '남성',
    },
    // 복사본 2
    {
        src: 'https://example.com/images/goods_2.jpg', alt: '테스트 카메라', goodsName: '테스트 카메라 (여성 선호)',
        bidPrice: 150000, buyOutPrice: 250000, likeCount: 5, auctionEndDate: '2025-10-28T15:00:00',
        onClick: () => {}, like: true, onLike: () => {}, onUnlike: () => {}, gender: '여성',
    },
    // 복사본 3
    {
        src: 'https://example.com/images/goods_3.jpg', alt: '테스트 이어폰', goodsName: '테스트 이어폰 (인기 많음)',
        bidPrice: 300000, buyOutPrice: 400000, likeCount: 50, auctionEndDate: '2025-11-06T12:00:00',
        onClick: () => {}, like: false, onLike: () => {}, onUnlike: () => {}, gender: '여성',
    },
];

// 성별 목록 (이전과 동일)
const selectGenderMap: { [key: string]: string } = {
    '1': '남성',
    '2': '여성',
};
const selectGenderList: string[] = ['남성', '여성'];

// 정렬 기준 목록 (이전과 동일)
const selectSortMap: { [key: string]: string } = {
    '1': '최근순',
    '2': '인기순',
    '3': '가격 낮은순',
    '4': '가격 높은순',
    '5': '마감임박순',
};
const selectList: string[] = ['최근순', '인기순', '가격 낮은순', '가격 높은순', '마감임박순'];


const GoodsList: React.FC<{}> = () => {
    // 필터링/정렬 기준 상태
    const [genderValue, setGenderValue] = useState(''); // 성별 필터링 값 (1: 남성, 2: 여성)
    // ⭐ '1' (최근순)을 기본값으로 설정
    const [filterValue, setFilterValue] = useState('1'); // 정렬 기준 값 (1~5)

    const [renderedGoodsList, setRenderedGoodsList] = useState(goodsListOriginal);

    useEffect(() => {
        applyFiltersAndSort(genderValue, filterValue);
    }, [genderValue, filterValue]);

    const applyFiltersAndSort = (gender: string, sort: string) => {
        let list = [...goodsListOriginal]; 

        // 1. 필터링 (성별)
        if (gender !== '') {
            const selectedGender = selectGenderMap[gender];
            
            list = list.filter(item => 
                item.gender === selectedGender
            );
        }

        // 2. 정렬 (Sorting) 
        switch (sort) {
            case '1': // 최근순
                // 마감일이 늦은 순 (최신 등록 기준이 없으므로 임시 사용)
                list.sort((a, b) => new Date(b.auctionEndDate).getTime() - new Date(a.auctionEndDate).getTime()); 
                break;
            case '2': // 인기순 (peopleCount 높은 순)
                list.sort((a, b) => b.likeCount - a.likeCount);
                break;
            case '3': // 가격 낮은순 (bidPrice 낮은 순)
                list.sort((a, b) => a.bidPrice - b.bidPrice);
                break;
            case '4': // 가격 높은순 (bidPrice 높은 순)
                list.sort((a, b) => b.bidPrice - a.bidPrice);
                break;
            case '5': // 마감임박순 (auctionEndDate가 현재 시간과 가장 가까운 순)
                list.sort((a, b) => new Date(a.auctionEndDate).getTime() - new Date(b.auctionEndDate).getTime());
                break;
            default:
                // filterValue가 ''일 때 (이 코드는 filterValue가 '1'로 초기화되어 실행되지 않음)
                break;
        }

        setRenderedGoodsList(list);
    };


    const handleGenderSelectChange = (e: any) => {
        setGenderValue(String(e.target.value)); 
    };

    const handleSelectChange = (e: any) => {
        setFilterValue(String(e.target.value));
    };

    return (
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
                        <Select 
                            value={genderValue} 
                            displayEmpty 
                            style={{ width: 87, height: 40 }} 
                            onChange={handleGenderSelectChange} 
                        >
                            <MenuItem value="">
                                <em>전체</em>
                            </MenuItem>
                            {selectGenderList.map((item: string, index: number) => (
                                <MenuItem key={index} value={String(index + 1)}>{item}</MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div>
                    <Select 
                        value={filterValue} 
                        displayEmpty 
                        style={{ width: 183, height: 40 }} 
                        onChange={handleSelectChange} 
                    >
                        {/* ⭐ '전체' 대신 '1' (최근순)이 기본 선택되므로 '전체' MenuItem의 value를 '' 대신 '1'로 설정하면 렌더링 시 '최근순'이 표시되지만, 
                           데이터 관리를 위해 여기서는 '전체' 옵션을 유지하고 filterValue 상태만 '1'로 초기화합니다. */}
                        
                        {/* '전체' 선택 시 정렬 필터가 해제되지 않도록, 첫 번째 항목을 '최근순 (기본)'으로 설정합니다. */}
                        {selectList.map((item: string, index: number) => (
                            <MenuItem 
                                key={index} 
                                value={String(index + 1)}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <p style={{ width: '100%', margin: '10px 0', fontWeight: 'bold' }}>
                총 {renderedGoodsList.length}개 상품
            </p>
            <div style={{
                display: 'flex',
                gap: '25px',
                flexWrap: 'wrap',
                marginTop: '20px'
            }}>
                {renderedGoodsList.map((item, index) => {
                    return (
                        <GoodsItem 
                            key={index} 
                            src={item.src}
                            alt={item.alt}
                            goodsName={item.goodsName}
                            bidPrice={item.bidPrice}
                            buyOutPrice={item.buyOutPrice}
                            peopleCount={item.likeCount}
                            auctionEndDate={item.auctionEndDate}
                            onClick={item.onClick}
                            like={item.like}
                            onLike={item.onLike}
                            onUnlike={item.onUnlike}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default GoodsList;