import { Box, Button, FormControlLabel, IconButton, MenuItem, Radio, RadioGroup, Select, Snackbar, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
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
import { useAuth } from '../../context/AuthContext';
import { api } from '../../common/api';
import { NumberLiteralType } from 'typescript';
import { useLocation } from 'react-router-dom';


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

interface StoreData {
    storeId: number;
    profile: string;
    storeName: string;
    storeInfo: string;
    rating: number;
    reviewCount: number;
    followerCount: number;
    follow: boolean;
}

const StoreDetail: React.FC<{}> = () => {
    const { isAuth } = useAuth();
    const location = useLocation();

    const [store, setStore] = useState<StoreData>();
    const reportModalRef = useRef<any>(null);
    const blockModalRef = useRef<any>(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('')

    const updateFollowState = (status: boolean) => { 
        setStore((prevStore) => {
            if (!prevStore) return prevStore; 
            return { 
                ...prevStore, 
                follow: status 
            };
        });
    };
    
    const handlerFollow = (storeId: number) => {
        if(isAuth) {
            api.post(`/store/follow/${storeId}`)
            .then(() => {
                updateFollowState(true);
            })
            .catch((err) => console.log("🔥 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }
    };
    
    const handlerUnFollow = (storeId: number) => {
        if(isAuth) {
            api.delete(`/store/follow/${storeId}`)
            .then(() => {
                updateFollowState(false);
            })
            .catch((err) => console.log("🔥 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
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

    useEffect(() => {
        if(!location.state.storeId) return;
        const storeId = location.state.storeId;
        api.get(`/store/${storeId}`)
            .then((res) => {
                console.log(res);
                setStore(res);
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
    }, []);

    return (
        <BaseLayout
            content={
                <>
                    {store && 
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
                                {store.follow && 
                                    <Button
                                        type="button"
                                        onClick={()=>{handlerUnFollow(store.storeId)}}
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
                                {!store.follow && 
                                    <Button
                                        type="button"
                                        onClick={()=>{handlerFollow(store.storeId)}}
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
                        
                    
                        <GoodsList storeId={location.state.storeId} />
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