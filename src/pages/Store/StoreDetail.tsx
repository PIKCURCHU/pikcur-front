import { Box, Button, FormControlLabel, IconButton, MenuItem, Radio, RadioGroup, Select, Snackbar, Tab, Tabs, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import CustomAvatar from '../../components/common/CustomAvatar';
import ReviewSummary from '../../components/common/ReviewSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTimes } from '@fortawesome/free-solid-svg-icons';
import GoodsItem from '../../components/common/GoodsItem';
import SearchInput from '../../components/common/SearchInput';
import CustomTable from '../../components/common/CustomTable';
import PaginationButtons from '../../components/common/PaginationButtons';
import TransactionList from './component/TranactionList';
import BidList from './component/BidList';
import LikeList from './component/LikeList';
import ProductQuestionList from './component/ProductQuestionList';
import FollowingList from './component/FollowingList';
import GoodsList from './component/GoodsList';
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

const Store = {
    storeName:'상점3223424호',
    starRating: 4,
    reviewCnt:3,
    content:'쿨거좋아요',
    follower: 300

}


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

function a11yProps(index: number) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}
  
const StoreDetail: React.FC<{ isMyselfView: boolean }> = ({ isMyselfView = true }) => {
    const [tab, setTab] = React.useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const reportModalRef = useRef<any>(null);
    const blockModalRef = useRef<any>(null);

    const [isStoreFollowed, setIsStoreFollowed] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('')

    const handleFollowClick = (e: React.MouseEvent) => {
        if (isStoreFollowed) {
            setIsStoreFollowed(false);
            // onUnfollow();
            setSnackbarMsg(`${Store.storeName}을(를) 팔로우 해제했습니다.`);
            setOpenSnackbar(true);
        } else {
            setIsStoreFollowed(true);
            // onFollow();
            setSnackbarMsg(`${Store.storeName}을(를) 팔로우 했습니다.`);
            setOpenSnackbar(true);
        }
    };
    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
            >
                <FontAwesomeIcon icon={faTimes} fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <BaseLayout
            content={
                <>
                    {isMyselfView && 
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
                                <Typography fontSize={22} fontWeight={'bold'}>{Store.storeName}</Typography>
                                <ReviewSummary value={Store.starRating} reviewCnt={Store.reviewCnt}></ReviewSummary>
                                <Typography fontSize={16} color={'#757575'}>팔로워 {Store.follower}</Typography>
                                <Typography fontSize={16} color={'#757575'}>{Store.content}</Typography>
                            </div>
                            <div style={{marginRight:'20px'}}>
                                <FontAwesomeIcon icon={faGear} onClick={()=>{console.log("설정으로 이동")}} cursor={'pointer'}></FontAwesomeIcon>
                            </div>
                        </div>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="판매 중인 상품" {...a11yProps(0)} />
                            <Tab label="거래 내역" {...a11yProps(1)} />
                            <Tab label="입찰 내역" {...a11yProps(2)} />
                            <Tab label="찜" {...a11yProps(3)} />
                            <Tab label="문의" {...a11yProps(4)} />
                            <Tab label="팔로잉 상점" {...a11yProps(5)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={tab} index={0}>
                            {/* 판매중인 상품 리스트 */}
                            <GoodsList />
                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={1}>
                            {/* 거래 내역 탭 */}
                            <TransactionList memberNo={1} />
                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={2}>
                            {/* 입찰 내역 탭 */}
                            <BidList />
                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={3}>
                            {/* 좋아요 내역 탭 */}
                            <LikeList />
                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={4}>
                            {/* 문의 내역 탭 */}
                            <ProductQuestionList memberNo={1} />
                        </CustomTabPanel>
                        <CustomTabPanel value={tab} index={5}>
                            {/* 팔로잉 상점 리스트 탭 */}
                            <FollowingList />
                        </CustomTabPanel>
                        </Box>
                    }
                    {!isMyselfView && 
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
                                <Typography fontSize={22} fontWeight={'bold'}>{Store.storeName}</Typography>
                                <ReviewSummary value={Store.starRating} reviewCnt={Store.reviewCnt}></ReviewSummary>
                                <Typography fontSize={16} color={'#757575'}>팔로워 {Store.follower}</Typography>
                                <Typography fontSize={16} color={'#757575'}>{Store.content}</Typography>
                            </div>
                            <div style={{marginRight:'20px'}}>
                                <div style={{
                                    display:'flex',
                                    justifyContent:'space-between',
                                    marginBottom:'5px'
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
                                {isStoreFollowed && 
                                    <Button
                                        type="button"
                                        onClick={handleFollowClick}
                                        style={{
                                            backgroundColor: "#141414",
                                            color: "#fff",
                                            width: 93,
                                            height: 40,
                                            fontSize: 14,
                                            borderRadius: 8,
                                        }}>팔로잉
                                    </Button> 
                                }
                                {!isStoreFollowed && 
                                    <Button
                                        type="button"
                                        onClick={handleFollowClick}
                                        style={{
                                            backgroundColor: "#F2F2F2",
                                            color: "#141414",
                                            width: 93,
                                            height: 40,
                                            fontSize: 14,
                                            borderRadius: 8,
                                        }}>팔로우
                                    </Button> 
                                }                      
                            </div>
                        </div>
                        
                    
                        <GoodsList />
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
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={2500}
                            onClose={handleSnackbarClose}
                            message={snackbarMsg}
                            action={action}
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
                    
                    </>
            }
        ></BaseLayout>
      );
}

export default StoreDetail;