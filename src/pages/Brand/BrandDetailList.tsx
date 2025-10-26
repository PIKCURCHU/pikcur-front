import React from 'react';
import WithCategoryLayout from '../../components/layout/WithCategoryLayout';
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import GoodsItem from '../../components/common/GoodsItem';
import SearchInput from '../../components/common/SearchInput';

interface BrandDetailListProps {

}

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
        onClick: () => { },
        like: true, // 찜 상태
        onLike: () => { },
        onUnlike: () => { },
    },
    {
        src: 'https://example.com/images/goods_2.jpg',
        alt: '빈티지 카메라',
        goodsName: '빈티지 필름 카메라 K-7000 (상태 A급)',
        bidPrice: 120000,
        buyOutPrice: 200000,
        peopleCount: 8,
        auctionEndDate: '2025-10-27T10:00:00', // 10월 27일 10시 00분
        onClick: () => { },
        like: false, // 찜 안함
        onLike: () => { },
        onUnlike: () => { },
    },
    {
        src: 'https://example.com/images/goods_3.jpg',
        alt: '최신형 무선 이어폰',
        goodsName: '최신형 노이즈 캔슬링 무선 이어폰 Pro-Max',
        bidPrice: 280000,
        buyOutPrice: 350000,
        peopleCount: 42,
        auctionEndDate: '2025-11-05T20:00:00', // 11월 5일 20시 00분
        onClick: () => { },
        like: true, // 찜 상태
        onLike: () => { },
        onUnlike: () => { },
    },
    {
        src: 'https://example.com/images/goods_4.jpg',
        alt: '고급 가죽 지갑',
        goodsName: '고급 이탈리아산 가죽 지갑 (미사용)',
        bidPrice: 70000,
        buyOutPrice: 100000,
        peopleCount: 3,
        auctionEndDate: '2025-10-26T23:59:59', // 오늘 자정 직전
        onClick: () => { },
        like: false, // 찜 안함
        onLike: () => { },
        onUnlike: () => { },
    },
    {
        src: 'https://example.com/images/goods_5.jpg',
        alt: '인기 게임 콘솔',
        goodsName: '차세대 인기 게임 콘솔 (사용감 적음)',
        bidPrice: 450000,
        buyOutPrice: 500000,
        peopleCount: 20,
        auctionEndDate: '2025-11-10T18:00:00', // 11월 10일 18시 00분
        onClick: () => { },
        like: true, // 찜 상태
        onLike: () => { },
        onUnlike: () => { },
    },
    {
        src: 'https://example.com/images/goods_1.jpg',
        alt: '한정판 디자이너 시계',
        goodsName: '한정판 디자이너 시계 A-100 (새제품)',
        bidPrice: 550000,
        buyOutPrice: 800000,
        peopleCount: 15,
        auctionEndDate: '2025-11-01T14:30:00', // 11월 1일 14시 30분
        onClick: () => { },
        like: true, // 찜 상태
        onLike: () => { },
        onUnlike: () => { },
    },
    {
        src: 'https://example.com/images/goods_2.jpg',
        alt: '빈티지 카메라',
        goodsName: '빈티지 필름 카메라 K-7000 (상태 A급)',
        bidPrice: 120000,
        buyOutPrice: 200000,
        peopleCount: 8,
        auctionEndDate: '2025-10-27T10:00:00', // 10월 27일 10시 00분
        onClick: () => { },
        like: false, // 찜 안함
        onLike: () => { },
        onUnlike: () => { },
    },
    {
        src: 'https://example.com/images/goods_3.jpg',
        alt: '최신형 무선 이어폰',
        goodsName: '최신형 노이즈 캔슬링 무선 이어폰 Pro-Max',
        bidPrice: 280000,
        buyOutPrice: 350000,
        peopleCount: 42,
        auctionEndDate: '2025-11-05T20:00:00', // 11월 5일 20시 00분
        onClick: () => { },
        like: true, // 찜 상태
        onLike: () => { },
        onUnlike: () => { },
    },
];

const selectGenderList: string[] = [
    '남성',
    '여성',
]

const selectList: string[] = [
    '최근순',
    '인기순',
    '가격 낮은순',
    '가격 높은순',
    '마감임박순',
]

const BrandDetailList: React.FC<BrandDetailListProps> = () => {

    const [genderValue, setGenderValue] = React.useState('');
    const [value, setValue] = React.useState('');

    const handleGenderSelectChange = (e: any) => {
        const newValue = e.target.value;
        setGenderValue(newValue);

        // genderValue 값에 따른 필터링 로직 추가 예정
    };

    const handleSelectChange = (e: any) => {
        const newValue = e.target.value;
        setValue(newValue);

        // value 값에 따른 정렬 로직 추가 예정
    };

    return (
        <>
            <WithCategoryLayout
                topContent={
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', width: '100%', gap: 32 }}>
                            <div>
                                <img src="https://previews.123rf.com/images/dirkercken/dirkercken1411/dirkercken141100599/33178587-shortcut-short-route-cut-distance-fast-easy-way-bypass.jpg"
                                    style={{ width: '160px', height: '160px', borderRadius: '80px' }}
                                />
                            </div>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: 22, fontWeight: 'bold', color: '#141414', flex: 1.2 }}>브랜드명</div>
                                <div style={{ fontSize: 16, color: '#757575', flex: 3 }}>브랜드 설명 {/* 브랜드 설명은 제한 길이가 있어야함 / 화면 깨짐*/}</div>
                                <div style={{ fontSize: 16, color: '#757575', flex: 1 }}>134,500개의 상품</div>
                            </div>
                        </div>
                    </div>
                }
                middleTopContent={
                    <>
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
                                    <Select value={value} displayEmpty style={{ width: 183, height: 40 }} onChange={handleSelectChange} >
                                        <MenuItem value="">
                                            <em>전체</em>
                                        </MenuItem>
                                        {selectList.map((item: string, index: number) => (
                                            <MenuItem key={index} value={index + 1}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </>
                }
                middleBottomContent={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div style={{
                            marginTop: '40px'
                        }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize: '22px' }}>인기 상품</Typography>
                            <div style={{
                                display: 'flex',
                                gap: '25px',
                                flexWrap: 'wrap'
                            }}>
                                {goodsListExample.map((item, index) => {
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
                            marginTop: '40px'
                        }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize: '22px' }}>최근 상품</Typography>
                            <div style={{
                                display: 'flex',
                                gap: '25px',
                                flexWrap: 'wrap'
                            }}>
                                {goodsListExample.map((item, index) => {
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
            />
        </>
    )
}

export default BrandDetailList;