import React, { useEffect, useState } from 'react';
import CustomAvatar from '../../../components/common/CustomAvatar';
import { Button, Typography } from '@mui/material';
import PaginationButtons from '../../../components/common/PaginationButtons';
import StoreItem from './StoreItem';
import { api } from '../../../common/api';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface StoreItemProps {
    storeId: number;
    storeName: string;
    profile: string;
    follow:boolean;
}

const FollowingList: React.FC<{storeId: number}> = ({storeId}) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [followList, setFollowList] = useState<StoreItemProps[]>([]);

    useEffect(()=> {
            api.get(`/store/${storeId}/follows`, {currentPage})
            .then((res) => {
                console.log(res);
                setFollowList(res.followList);
                setTotalPages(res.totalPages || 0);
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
    },[])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlerStoreSelect = (storeId: number) => {
        navigate("/storeDetail", {state:{storeId}});
    };

    const updateFollowState = (targetId: number, status: boolean) => {
        setFollowList((prevList) =>
            prevList.map((item) =>
                item.storeId === targetId
                    ? { ...item, follow: status }
                    : item
            )
        );
    };
    
    const handlerFollow = (storeId: number) => {
        if(isAuth) {
            api.post(`/store/follow/${storeId}`)
            .then(() => {
                updateFollowState(storeId, true);
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
                updateFollowState(storeId, false);
            })
            .catch((err) => console.log("🔥 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }
    };

    return (
        <div>
            <div style={{
                marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
            }}>
            {followList.map((store, index)=>{
                return (
                    <StoreItem
                        store={store}
                        onClick={()=>{handlerStoreSelect(store.storeId)}}
                        onFollow={()=>{handlerFollow(store.storeId)}}
                        onUnfollow={()=>{handlerUnFollow(store.storeId)}}></StoreItem>
                );
            })}
            
            <PaginationButtons
                maxPage={totalPages} 
                page={currentPage} 
                onChange={handlePageChange}></PaginationButtons>
        </div>
        </div>
    );
}

export default FollowingList;