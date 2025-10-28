import { Box, Button, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Tab, Tabs, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import CustomAvatar from '../../components/common/CustomAvatar';
import ReviewSummary from '../../components/common/ReviewSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import GoodsItem from '../../components/common/GoodsItem';
import SearchInput from '../../components/common/SearchInput';
import CustomModal from '../../components/common/CustomModal';

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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  

const OtherStoreDetail: React.FC<{}> = () => {
    const [genderValue, setGenderValue] = React.useState('');
    const [value, setValue] = React.useState('');
    const reportModalRef = useRef<any>(null);
    const blockModalRef = useRef<any>(null);


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
        <BaseLayout
            content={
                <Box sx={{ width: '100%' }}>
                    <div style={{
                        width:'100%',
                        marginBottom:'30px',
                        display:'flex',
                        alignItems:'center'
                    }}>
                        <CustomAvatar size={160}></CustomAvatar>
                        <div style={{
                            marginLeft:'20px',
                            marginRight:'auto'
                        }}>
                            <Typography fontSize={22} fontWeight={'bold'}>상점 34234호</Typography>
                            <ReviewSummary value={4} reviewCnt={5}></ReviewSummary>
                            <Typography fontSize={16} color={'#757575'}>팔로워 100</Typography>
                            <Typography fontSize={16} color={'#757575'}>상태 좋은 물건만 판매합니다.</Typography>
                        </div>
                        <div style={{marginRight:'20px'}}>
                            <div style={{
                                display:'flex',
                                justifyContent:'space-between'
                            }}>
                                <button
                                    type="button"
                                    aria-label="신고"
                                    style={{
                                        width: 45,
                                        height: 40,
                                        border: '1px solid #E0E0E0',
                                        borderRadius: 12,
                                        background: '#FF5050',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }}
                                    onClick={() => reportModalRef.current?.openModal()}
                                >신고</button>                        
                                <button
                                    type="button"
                                    aria-label="차단"
                                    style={{
                                        width: 45,
                                        height: 40,
                                        border: '1px solid #E0E0E0',
                                        borderRadius: 12,
                                        background: '#FF5050',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        fontSize: 12,
                                        fontWeight: 600,
                                    }}
                                    onClick={() => blockModalRef.current?.openModal()}
                                >차단</button> 
                            </div>
                            <Button
                                type="button"
                                onClick={() => {console.log("팔로우 로직 수행")}}
                                style={{
                                    backgroundColor: "#141414",
                                    color: "#fff",
                                    width: 93,
                                    height: 40,
                                    fontSize: 14,
                                    borderRadius: 8,
                                }}>팔로우
                            </Button>                       
                        </div>
                    </div>
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
                    <CustomModal
                            ref={reportModalRef}
                            title="상점 신고"
                            content={
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center' }}>
                                    <div style={{ fontSize: 22, fontWeight: 'bold', color: '#141414', visibility: 'hidden' }}>&nbsp;</div>
                                    <div style={{ fontSize: 14, fontWeight: 'bold', color: '#757575', paddingBottom: 30 }}>상점 32434호</div>
                                    <div style={{ fontSize: 16, fontWeight: 'bold', color: '#141414' }}>해당 상점을 신고하시겠습니까?</div>
                                </div>
                            }
                            leftButtonContent="신고"
                            leftButtonColor="red"
                            onLeftButtonClick={() => {
                                alert('신고 처리 로직 실행');
                                reportModalRef.current?.closeModal();
                            }}
                        />
                    <CustomModal
                            ref={blockModalRef}
                            title="상점 차단"
                            content={
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center' }}>
                                    <div style={{ fontSize: 22, fontWeight: 'bold', color: '#141414', visibility: 'hidden' }}>&nbsp;</div>
                                    <div style={{ fontSize: 14, fontWeight: 'bold', color: '#757575', paddingBottom: 30 }}>상점 32434호</div>
                                    <div style={{ fontSize: 16, fontWeight: 'bold', color: '#141414' }}>해당 상점을 차단하시겠습니까?</div>
                                </div>
                            }
                            leftButtonContent="차단"
                            leftButtonColor="red"
                            onLeftButtonClick={() => {
                                alert('차단 처리 로직 실행');
                                blockModalRef.current?.closeModal();
                            }}
                        />
                </Box>
            }
            
        ></BaseLayout>
      );
}

export default OtherStoreDetail;