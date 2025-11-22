import React, { useEffect, useState } from 'react';
import { api } from '../../../common/api';
import GoodsItem from '../../../components/common/GoodsItem';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface GoodsItemProps {
    imagePath: string;
    goodsId: number;
    categoryId: number;
    brandId: number;
    goodsName: string;
    buyoutPrice: number;
    startPrice: number;
    auctionEndDate: string;
    createDate: string;
    bidPrice: number;
    bidCount: number;
    liked: boolean;
    gender: 'M' | 'F';
    statusNo: string;
}

const LikeGoodsList: React.FC<{storeId: number}> = ({storeId}) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const [likeGoodsList, setLikeGoodsList] = useState<GoodsItemProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    useEffect(() => {
        if (!storeId) return;
        api.get(`/store/${storeId}/goods-likes`, {
            currentPage
        })
            .then((res) => {
                console.log(res);
                setLikeGoodsList(res.goodsList);
                setTotalPages(res.totalPages || 1);
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
    }, []);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // 시간 정보(hours, minutes)는 제외하고 날짜만 반환
        return `${year}-${month}-${day}`; 
    };

    const handlerGoodsSelect = (goodsId: number) => {
        console.log(goodsId);
        navigate("/goodsDetail", {state:{goodsId}});
    };

    const updateLikeState = (targetId: number, status: boolean) => {
        setLikeGoodsList((prevList) =>
            prevList.map((item) =>
                item.goodsId === targetId
                    ? { ...item, liked: status } // 해당 상품의 liked 상태 변경
                    : item
            )
        );
    };
    
    const handlerLike = (goodsId: number) => {
        if(isAuth) {
            api.post(`/goods/like/${goodsId}`)
            .then(() => {
                // ⭐ [수정] API 요청 성공 시에만 상태 업데이트
                updateLikeState(goodsId, true);
            })
            .catch((err) => console.log("🔥 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }
        
    };
    
    const handlerUnlike = (goodsId: number) => {
        if(isAuth) {
            api.delete(`/goods/like/${goodsId}`)
            .then(() => {
                // ⭐ [수정] API 요청 성공 시에만 상태 업데이트
                updateLikeState(goodsId, false);
            })
            .catch((err) => console.log("🔥 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }
    };

    return (
        <div>
        <div style={{
            display:'flex',
            gap:'25px',
            flexWrap: 'wrap',
            marginTop:'20px'
        }}>
        {likeGoodsList.map((item, index)=>{
            return (
                <GoodsItem 
                    src={item.imagePath}
                    goodsName={item.goodsName}
                    bidPrice={item.bidPrice ?? 0}
                    buyOutPrice={item.buyoutPrice}
                    peopleCount={item.bidCount}
                    auctionEndDate={formatDate(item.auctionEndDate)}
                    onClick={() => { handlerGoodsSelect(item.goodsId) }}
                    like={item.liked}
                    onLike={() => { handlerLike(item.goodsId) }}
                    onUnlike={() => { handlerUnlike(item.goodsId) }}
                ></GoodsItem>
            );
        })}
        </div>
        <PaginationButtons
                    maxPage={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange}></PaginationButtons>
        
        </div>
    );
}

export default LikeGoodsList;