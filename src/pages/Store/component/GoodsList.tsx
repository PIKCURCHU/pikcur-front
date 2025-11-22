import React, { useState, useEffect } from 'react';
import SearchInput from '../../../components/common/SearchInput';
import { MenuItem, Select } from '@mui/material';
import GoodsItem from '../../../components/common/GoodsItem';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { api } from '../../../common/api';
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

const selectGenderList: string[] = ['남성', '여성'];
const selectList: string[] = ['최근순', '인기순', '가격 낮은순', '가격 높은순', '마감임박순'];

const GoodsList: React.FC<{ storeId: number }> = ({ storeId }) => {
    const { isAuth } = useAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [originalGoodsList, setOriginalGoodsList] = useState<GoodsItemProps[]>([]); 
    const [renderedGoodsList, setRenderedGoodsList] = useState<GoodsItemProps[]>([]);

    const [genderValue, setGenderValue] = useState('');
    const [filterValue, setFilterValue] = useState('1');

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/store/goods/${storeId}`, {
            currentPage 
        })
            .then((res) => {
                const list = res.goodsList || [];
                setOriginalGoodsList(list); 
                setTotalPages(res.totalPages || 1);
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
    }, [currentPage]);

    useEffect(() => {
        applyFiltersAndSort();
    }, [originalGoodsList, genderValue, filterValue]);

    const applyFiltersAndSort = () => {
        let list = [...originalGoodsList];

        if (genderValue !== '') {
            const targetGender = genderValue === '1' ? 'M' : 'F';
            list = list.filter(item => item.gender === targetGender);
        }

        // 2. 정렬 (Sorting)
        switch (filterValue) {
            case '1': // 최근순
                list.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
                break;
            case '2': // 인기순
                list.sort((a, b) => b.bidCount - a.bidCount);
                break;
            case '3': // 가격 낮은순
                list.sort((a, b) => (a.bidPrice ?? 0) - (b.bidPrice ?? 0));
                break;
            case '4': // 가격 높은순
                list.sort((a, b) => (b.bidPrice ?? 0) - (a.bidPrice ?? 0));
                break;
            case '5': // 마감임박순
                list.sort((a, b) => new Date(a.auctionEndDate).getTime() - new Date(b.auctionEndDate).getTime());
                break;
            default:
                break;
        }

        setRenderedGoodsList(list);
    };

    const handleGenderSelectChange = (e: any) => {
        setGenderValue(String(e.target.value));
    };

    const handleSelectChange = (e: any) => {
        setFilterValue(String(e.target.value));
    };

    const handlerGoodsSelect = (goodsId: number) => {
        console.log(goodsId);
        navigate("/goodsDetail", {state:{goodsId}});
    };

    const updateLikeState = (targetId: number, status: boolean) => {
        setOriginalGoodsList((prevList) =>
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

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // 시간 정보(hours, minutes)는 제외하고 날짜만 반환
        return `${year}-${month}-${day}`; 
    };

    return (
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
                        <Select
                            value={genderValue}
                            displayEmpty
                            style={{ width: 87, height: 40 }}
                            onChange={handleGenderSelectChange}
                        >
                            <MenuItem value="">
                                <em>전체</em>
                            </MenuItem>
                            {selectGenderList.map((item: string, index: number) => (
                                <MenuItem key={index} value={String(index + 1)}>{item}</MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div>
                    <Select
                        value={filterValue}
                        displayEmpty
                        style={{ width: 183, height: 40 }}
                        onChange={handleSelectChange}
                    >
                        {selectList.map((item: string, index: number) => (
                            <MenuItem
                                key={index}
                                value={String(index + 1)}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <p style={{ width: '100%', margin: '10px 0', fontWeight: 'bold' }}>
                총 {renderedGoodsList.length}개 상품
            </p>
            <div style={{
                display: 'flex',
                gap: '25px',
                flexWrap: 'wrap',
                marginTop: '20px'
            }}>
                {renderedGoodsList.map((item, index) => {
                    return (
                        <GoodsItem
                            key={index}
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
                        />
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

export default GoodsList;