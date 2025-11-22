import React, { useEffect, useState } from "react";
import WithCategoryLayout from "../../components/layout/WithCategoryLayout";
import GoodsItem from "../../components/common/GoodsItem";
import { Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../../common/api";

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


const MainPage: React.FC<{}> = ({}) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const [recentViewGoodsList, setRecentViewGoodsList] = useState<GoodsItemProps[]>([]);
    const [popularGoodsList, setPopularGoodsList] = useState<GoodsItemProps[]>([]);
    const [auctionEndAscGoodsList, setAuctionEndAscGoodsList] = useState<GoodsItemProps[]>([]);

    const fetchGoods = () => {
        api.get(`/goods/recent`)
            .then((res) => {
                setRecentViewGoodsList(res);
            })
            .catch((err) => {
                console.log("최근 본 상품 에러:", err);
                setRecentViewGoodsList([]);
            });

        api.get(`/goods/popular`)
            .then((res) => {
                setPopularGoodsList(res);
            })
            .catch((err) => {
                console.log("인기 상품 에러:", err);
                setPopularGoodsList([]);
            });

        api.get(`/goods/closing-soon`)
            .then((res) => {
                setAuctionEndAscGoodsList(res); 
            })
            .catch((err) => {
                console.log("경매 임박 상품 에러:", err);
                setAuctionEndAscGoodsList([]);
            });
    };
    
    useEffect(() => {
        fetchGoods();
    }, []);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`; 
    };

    const handlerGoodsSelect = (goodsId: number) => {
        console.log(goodsId);
        navigate("/goodsDetail", {state:{goodsId}});
    };

    const updateList = (prevList: GoodsItemProps[], targetId: number, status: boolean): GoodsItemProps[] => {
        return prevList.map((item) =>
            item.goodsId === targetId
                ? { ...item, liked: status }
                : item
        );
    };

    const updateLikeState = (targetId: number, status: boolean) => {
        setRecentViewGoodsList((prevList) => updateList(prevList, targetId, status));
        setPopularGoodsList((prevList) => updateList(prevList, targetId, status));
        setAuctionEndAscGoodsList((prevList) => updateList(prevList, targetId, status));
    };
    
    const handlerLike = (goodsId: number) => {
        if(isAuth) {
            api.post(`/goods/like/${goodsId}`)
            .then(() => {
                updateLikeState(goodsId, true); 
            })
            .catch((err) => console.log("🔥 좋아요 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }
        
    };
    
    const handlerUnlike = (goodsId: number) => {
        if(isAuth) {
            api.delete(`/goods/like/${goodsId}`)
            .then(() => {
                updateLikeState(goodsId, false); 
            })
            .catch((err) => console.log("🔥 싫어요 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }
    };


    return (
        <WithCategoryLayout
            topContent={
            <div style={{
                width:'100%',
                height:'180px',
                backgroundColor:'purple',
                marginTop:'60px',
                borderRadius:'8px'
            }}>
                메인이미지
            </div>
        }
            middleBottomContent={
            <div style={{
                display:'flex',
                flexDirection: 'column',
            }}>
                {/* 최근 본 상품 */}
                <div style={{ marginTop:'40px' }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize:'22px' }}>최근 본 상품</Typography>
                    <div style={{
                        display:'flex',
                        gap:'25px',
                        flexWrap: 'wrap'
                    }}>
                    {recentViewGoodsList.map((item, index)=>{
                        return (
                            <GoodsItem 
                                key={item.goodsId}
                                src={item.imagePath}
                                goodsName={item.goodsName}
                                bidPrice={item.bidPrice ?? 0}
                                buyOutPrice={item.buyoutPrice}
                                peopleCount={item.bidCount}
                                auctionEndDate={formatDate(item.auctionEndDate)}
                                onClick={() => { handlerGoodsSelect(item.goodsId) }}
                                like={item.liked}
                                onLike={()=>{handlerLike(item.goodsId)}}
                                onUnlike={()=>{handlerUnlike(item.goodsId)}}
                            ></GoodsItem>
                        );
                    })}
                    </div>
                </div>
                
                {/* 인기 상품 */}
                <div style={{ marginTop:'40px' }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize:'22px' }}>인기 상품</Typography>
                    <div style={{
                        display:'flex',
                        gap:'25px',
                        flexWrap: 'wrap'
                    }}>
                    {popularGoodsList.map((item, index)=>{
                        return (
                            <GoodsItem 
                                key={item.goodsId}
                                src={item.imagePath}
                                goodsName={item.goodsName}
                                bidPrice={item.bidPrice ?? 0}
                                buyOutPrice={item.buyoutPrice}
                                peopleCount={item.bidCount}
                                auctionEndDate={formatDate(item.auctionEndDate)}
                                onClick={() => { handlerGoodsSelect(item.goodsId) }}
                                like={item.liked}
                                onLike={()=>{handlerLike(item.goodsId)}}
                                onUnlike={()=>{handlerUnlike(item.goodsId)}}
                            ></GoodsItem>
                        );
                    })}
                    </div>
                </div>
                
                {/* 경매 종료 임박 상품 */}
                <div style={{ marginTop:'40px' }}>
                    <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize:'22px' }}>경매 종료 임박 상품</Typography>
                    <div style={{
                        display:'flex',
                        gap:'25px',
                        flexWrap: 'wrap'
                    }}>
                    {auctionEndAscGoodsList.map((item, index)=>{
                        return (
                            <GoodsItem 
                                key={item.goodsId}
                                src={item.imagePath}
                                goodsName={item.goodsName}
                                bidPrice={item.bidPrice ?? 0}
                                buyOutPrice={item.buyoutPrice}
                                peopleCount={item.bidCount}
                                auctionEndDate={formatDate(item.auctionEndDate)}
                                onClick={() => { handlerGoodsSelect(item.goodsId) }}
                                like={item.liked}
                                onLike={()=>{handlerLike(item.goodsId)}}
                                onUnlike={()=>{handlerUnlike(item.goodsId)}}
                            ></GoodsItem>
                        );
                    })}
                    </div>
                </div>   
            </div>
        }
        />
    );
}

export default MainPage;