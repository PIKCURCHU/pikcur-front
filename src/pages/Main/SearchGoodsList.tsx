import React, { useEffect } from 'react';
import WithCategoryLayout from '../../components/layout/WithCategoryLayout';
import { MenuItem, Select, Typography } from '@mui/material';
import GoodsItem from '../../components/common/GoodsItem';
import SearchInput from '../../components/common/SearchInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../common/utility';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../common/api';
import PaginationButtons from '../../components/common/PaginationButtons';

interface SearchGoodsListProps {

}

interface GoodsItemProps {
    goodsName: string;
    bidPrice: number;
    buyoutPrice: number;
    peopleCount: number;
    auctionEndDate: string;
    onClick: () => void;
    onLike: () => void;
    onUnlike: () => void;
    bidCount: number;
    brandId: number;
    categoryId: number;
    createDate: string;
    gender: string;
    goodsId: number;
    imagePath: string | null;
    liked: boolean;
    startPrice: number;
    statusNo: number | null;
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

const SearchGoodsList: React.FC<SearchGoodsListProps> = () => {
    const { isAuth } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const [genderValue, setGenderValue] = React.useState('');
    const [goodsList, setGoodsList] = React.useState<GoodsItemProps[]>([]);
    const [renderedGoodsList, setRenderedGoodsList] = React.useState<GoodsItemProps[]>([]);
    const [filterValue, setFilterValue] = React.useState('1');

    const initHandler = () => {
        setGoodsList(location.state?.res.goodsList || []);
        setTotalPages(location.state?.res.totalPages || 1);
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleGenderSelectChange = (e: any) => {
        setGenderValue(String(e.target.value));
    };

    const handleSelectChange = (e: any) => {
        setFilterValue(String(e.target.value));
    };

    const applyFiltersAndSort = () => {
        let list = [...goodsList];

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

    const handlerGoodsSelect = (goodsId: number) => {
        navigate("/goodsDetail", { state: { goodsId } });
    };

    const updateLikeState = (targetId: number, status: boolean) => {
        setGoodsList((prevList) =>
            prevList.map((item) =>
                item.goodsId === targetId
                    ? { ...item, liked: status }
                    : item
            )
        );
    };

    const handlerLike = (goodsId: number) => {
        if (isAuth) {
            api.post(`/goods/like/${goodsId}`)
                .then(() => {
                    updateLikeState(goodsId, true);
                })
                .catch((err) => console.log("🔥 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }

    };

    const handlerUnlike = (goodsId: number) => {
        if (isAuth) {
            api.delete(`/goods/like/${goodsId}`)
                .then(() => {
                    updateLikeState(goodsId, false);
                })
                .catch((err) => console.log("🔥 에러:", err));
        } else {
            alert("로그인이 필요합니다.");
        }
    };

    useEffect(() => {
        initHandler();
    }, [])

    useEffect(() => {
        applyFiltersAndSort();
    }, [goodsList, genderValue, filterValue]);

    useEffect(() => {
        api.get('/search', { keyword: location.state?.searchParam, currentPage })
            .then((res) => {
                const list = res.goodsList || [];
                setGoodsList(list);
                setTotalPages(res.totalPages || 1);
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
    }, [currentPage]);

    return (
        <>
            <WithCategoryLayout
                topContent={
                    <div style={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <div style={{ marginBottom: 29, fontSize: 22, fontWeight: 'bold', color: '#141414' }}>
                            "{location.state?.searchParam || ''}"에 대한 검색 결과
                        </div>
                    </div>
                }
                middleTopContent={
                    <>
                        <div>
                            {/* <SearchInput
                                width="100%"
                                height={48}
                                placeholder="브랜드 내 상품 검색"
                                onSubmit={() => { }}
                            /> */}
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
                                    <Select value={filterValue} displayEmpty style={{ width: 183, height: 40 }} onChange={handleSelectChange} >
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
                        {/* <div style={{
                            marginTop: '40px'
                        }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize: '22px' }}>인기 상품</Typography>
                            <div style={{
                                display: 'flex',
                                gap: '25px',
                                flexWrap: 'wrap'
                            }}>
                                {goodsListExample.map((item, index) => {
                                    return (
                                        <GoodsItem
                                            src={item.src}
                                            alt={item.alt}
                                            goodsName={item.goodsName}
                                            bidPrice={item.bidPrice}
                                            buyOutPrice={item.buyOutPrice}
                                            peopleCount={item.peopleCount}
                                            auctionEndDate={item.auctionEndDate}
                                            onClick={item.onClick}
                                            like={item.like}
                                            onLike={item.onLike}
                                            onUnlike={item.onUnlike}
                                        ></GoodsItem>
                                    );
                                })}
                            </div>
                        </div> */}
                        <div style={{
                            marginTop: '40px'
                        }}>
                            <Typography variant="body1" fontWeight="bold" sx={{ mb: 3, fontSize: '22px' }}>최근 상품</Typography>
                            <div style={{
                                display: 'flex',
                                gap: '25px',
                                flexWrap: 'wrap'
                            }}>
                                {renderedGoodsList.map((item, index) => {
                                    return (
                                        <GoodsItem
                                            key={item.goodsId}
                                            src={item.imagePath ?? ''}
                                            alt={item.goodsName}
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
                        </div>

                        <div style={{ paddingTop: 40, paddingBottom: 40 }}>
                            <PaginationButtons
                                maxPage={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                }
            />

        </>
    )
}

export default SearchGoodsList;