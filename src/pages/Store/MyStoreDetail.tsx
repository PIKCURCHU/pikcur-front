import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomAvatar from '../../components/common/CustomAvatar';
import ReviewSummary from '../../components/common/ReviewSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import GoodsList from './component/GoodsList';
import TransactionList from './component/TranactionList';
import BidList from './component/BidList';
import LikeList from './component/LikeList';
import ProductQuestionList from './component/ProductQuestionList';
import FollowingList from './component/FollowingList';
import { api } from '../../common/api';
import BaseLayout from '../../components/layout/BaseLayout';

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

    interface StoreData {
        storeId: number;
        profile: string;
        storeName: string;
        storeInfo: string;
        rating: number;
        reviewCount: number;
        followerCount: number;
    }

const MyStoreDetail: React.FC<{}> = () => {
    const [tab, setTab] = React.useState(0);
    const [store, setStore] = useState<StoreData>();

    useEffect(() => {
        api.get(`/store/my-store`)
            .then((res) => {
                console.log(res);
                setStore(res);
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
    }, []);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    return (
        <BaseLayout
            content={
                <>
                {store && (
                <Box sx={{ width: '100%' }}>
                    <div style={{
                        width:'100%',
                        marginBottom:'30px',
                        display:'flex',
                        alignItems:'center'
                    }}>
                        <CustomAvatar size={160} src={store.profile}></CustomAvatar>
                        <div style={{
                            marginLeft:'20px',
                            marginRight:'auto'
                        }}>
                            <Typography fontSize={22} fontWeight={'bold'}>{store.storeName}</Typography>
                            <ReviewSummary value={store.rating} reviewCnt={store.reviewCount} storeId={store.storeId}></ReviewSummary>
                            <Typography fontSize={16} color={'#757575'}>팔로워 {store.followerCount}</Typography>
                            <Typography fontSize={16} color={'#757575'}>{store.storeInfo}</Typography>
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
                        <GoodsList storeId={store.storeId} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={1}>
                        {/* 거래 내역 탭 */}
                        <TransactionList storeId={store.storeId} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={2}>
                        {/* 입찰 내역 탭 */}
                        <BidList storeId={store.storeId}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={3}>
                        {/* 좋아요 내역 탭 */}
                        <LikeList storeId={store.storeId} />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={4}>
                        {/* 문의 내역 탭 */}
                        <ProductQuestionList storeId={store.storeId}  />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={5}>
                        {/* 팔로잉 상점 리스트 탭 */}
                        <FollowingList storeId={store.storeId} />
                    </CustomTabPanel>
                </Box>
                )}
                </>
            }                  
        ></BaseLayout>
    );
}

export default MyStoreDetail;