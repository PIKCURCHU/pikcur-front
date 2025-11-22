import React, { useEffect, useState } from 'react';
import WithCategoryLayout from '../../components/layout/WithCategoryLayout';
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import GoodsItem from '../../components/common/GoodsItem';
import SearchInput from '../../components/common/SearchInput';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PaginationButtons from '../../components/common/PaginationButtons';
import { api } from '../../common/api';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';


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

const selectGenderList: string[] = [
    '남성',
    '여성',
]

const selectList: string[] = [
    '최근순',
    '인기순',
    '가격 낮은순',
    '가격 높은순',
    '마감임박순',
]

const CategoryGoodsList: React.FC<{}> = () => {
    const params = useParams<{ categoryId: string }>();
    const categoryId = Number(params.categoryId); // 문자열을 숫자로 변환
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [goodsList, setGoodsList] = useState<GoodsItemProps[]>([]);

    const [genderValue, setGenderValue] = React.useState('');
    const [value, setValue] = React.useState('');

    useEffect(()=>{
        if(categoryId) {
            api.get(`/goods/categories/${categoryId}`, {currentPage})
            .then((res)=>{
                console.log(res);
                setGoodsList(res.goodsList)
                setTotalPages(res.totalPages || 1);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[categoryId]);


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


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

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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
        setGoodsList((prevList) =>
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
        <>
            <WithCategoryLayout
                topContent={
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                        
                    </div>
                }
                middleTopContent={
                    <>
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
                                    {/* <div>
                                        <RadioGroup
                                            defaultValue="normal"
                                            row
                                        >
                                            <FormControlLabel value="normal" control={<Radio />} label="일반 거래" />
                                            <FormControlLabel value="action" control={<Radio />} label="경매 거래" />
                                        </RadioGroup>
                                    </div> */}
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
                        </div>
                    </>
                }
                middleBottomContent={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div style={{
                            marginTop: '40px'
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '25px',
                                flexWrap: 'wrap'
                            }}>
                                {goodsList.map((item, index) => {
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
                                            onLike={()=>{handlerLike(item.goodsId)}}
                                            onUnlike={()=>{handlerUnlike(item.goodsId)}}
                                        ></GoodsItem>
                                    );
                                })}
                            </div>
                            <PaginationButtons
                                maxPage={totalPages} 
                                page={currentPage} 
                                onChange={handlePageChange}></PaginationButtons>
                        </div>
                



                    </div>
                }
            />
        </>
    )
}

export default CategoryGoodsList;