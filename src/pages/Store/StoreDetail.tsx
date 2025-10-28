import { Box, Button, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import CustomAvatar from '../../components/common/CustomAvatar';
import ReviewSummary from '../../components/common/ReviewSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import GoodsItem from '../../components/common/GoodsItem';
import SearchInput from '../../components/common/SearchInput';
import CustomTable from '../../components/common/CustomTable';
import PaginationButtons from '../../components/common/PaginationButtons';
import TransactionList from './component/TranactionList';
import BidList from './component/BidList';
import LikeList from './component/LikeList';
import QuestionList from './component/QuestionList';
import FollowingList from './component/FollowingList';
import GoodsList from './component/GoodsList';



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
  
const StoreDetail: React.FC<{}> = () => {
    const [tab, setTab] = React.useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
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
                        <TransactionList />
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
                        <QuestionList />
                    </CustomTabPanel>
                    <CustomTabPanel value={tab} index={5}>
                        {/* 팔로잉 상점 리스트 탭 */}
                        <FollowingList />
                    </CustomTabPanel>
                </Box>
            }
        ></BaseLayout>
      );
}

export default StoreDetail;