import React, { useState } from 'react';
import CustomAvatar from '../../../components/common/CustomAvatar';
import { Button, Typography } from '@mui/material';
import PaginationButtons from '../../../components/common/PaginationButtons';
import StoreItem from './StoreItem';

interface StoreItemProps {
    id: number;
    name: string;
    src: string;
    isFollowed:boolean;
}

const storeItemListExample: StoreItemProps[] = [
    {
        id: 301,
        name: '럭셔리 빈티지 부티크',
        src: 'https://example.com/stores/store_luxury.jpg',
        isFollowed: true
    },
    {
        id: 302,
        name: '테크 & 가젯 전문점',
        src: 'https://example.com/stores/store_tech.jpg',
        isFollowed: true
    },
    {
        id: 303,
        name: '수공예 주얼리 공방',
        src: 'https://example.com/stores/store_jewelry.jpg',
        isFollowed: true
    },
    {
        id: 304,
        name: '레트로 게임 컬렉션',
        src: 'https://example.com/stores/store_retro.jpg',
        isFollowed: true
    },
    {
        id: 305,
        name: '친환경 리빙 셀렉샵',
        src: 'https://example.com/stores/store_eco.jpg',
        isFollowed: true
    }
];


const FollowingList: React.FC<{}> = () => {
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(storeItemListExample.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
 
    const currentStoreList = storeItemListExample.slice(startIndex, endIndex);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div>
            <div style={{
                marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
            }}>
            {currentStoreList.map((store, index)=>{
                return (
                    <StoreItem
                        store={store}
                        onClick={()=>{console.log("상점 페이지 이동")}}
                        onFollow={()=>{console.log("팔로우로직 수행")}}
                        onUnfollow={()=>{console.log("언팔로우로직수행")}}></StoreItem>
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