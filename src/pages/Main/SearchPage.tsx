import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import SearchInput from '../../components/common/SearchInput';
import { Box, Chip, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../common/api';

interface RecentKeyword {
    keyword: string;
    searchHistoryId: number;
}

const SearchPage: React.FC<{}> = ({ }) => {
    const navigate = useNavigate();

    const [latestKeywords, setLatestKeywords] = useState<RecentKeyword[]>([]);
    const [topTenKeywords, setTopTenKeywords] = useState<RecentKeyword[]>([]);
    const [searchFilter, setSearchFilter] = useState("Product");
    const [searchKeyword, setSearchKeyword] = useState('');

    const leftList = topTenKeywords.slice(0, 5);
    const rightList = topTenKeywords.slice(5, 10);


    const handleChipDelete = (searchHistoryId: number) => {

        api.delete(`/search/recent/${searchHistoryId}`)
            .then((res) => {
                if (res > 0) {
                    setLatestKeywords(latestKeywords.filter((chip) => chip.searchHistoryId !== searchHistoryId));
                } else {
                    return;
                }
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                    return;
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })
    };

    const handleFilterClick = (filter: string) => {
        setSearchFilter(filter);
    };

    const getFilterStyle = (filterName: string) => ({
        fontSize: '18px',
        marginRight: filterName !== 'Store' ? '20px' : '0px',
        fontWeight: searchFilter === filterName ? 'bold' : 'normal',
        cursor: 'pointer',
    });

    const initHandler = () => {
        api.get('/search/recent')
            .then((res) => {
                setLatestKeywords(res);
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                    return;
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })


        api.get('/search/popular')
            .then((res) => {
                setTopTenKeywords(res);
                return;
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                    return;
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })
    }

    const searchHandler = (keyword? : string) => {
        const searchParam = keyword || searchKeyword;

        api.get('/search', { keyword: searchParam, currentPage: 1 })
            .then((res) => {
                navigate('/searchGoodsList', { state: { res, searchParam } });
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                    return;
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })
    };

    useEffect(() => {
        initHandler();
    }, [])

    return (
        <div style={{
            marginLeft: '416px',
            marginRight: '416px',
            minHeight: "calc(100vh - 105px)",
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                display: 'flex',
                paddingTop: '40px',
                paddingBottom: '20px',
                justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={getFilterStyle("Product")}
                        onClick={() => handleFilterClick("Product")}
                    >
                        Product
                    </div>
                    {/* <div
                        style={getFilterStyle("Brand")}
                        onClick={() => handleFilterClick("Brand")}
                    >
                        Brand
                    </div>
                    <div
                        style={getFilterStyle("Store")}
                        onClick={() => handleFilterClick("Store")}
                    >
                        Store
                    </div> */}

                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                    onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>
            <Divider sx={{ height: 0 }} />
            <div style={{
                marginTop: '20px'
            }}>
                <SearchInput
                    width={'100%'}
                    height={40}
                    placeholder='검색어를 입력해주세요'
                    onSubmit={searchHandler}
                    value={searchKeyword}
                    setValue={setSearchKeyword}
                />
            </div>
            <div style={{
                marginTop: '30px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>최근 검색어</Typography>
                <div style={{
                    marginTop: '10px',
                    display: 'flex',
                    gap: '5px',
                    flexWrap: 'wrap'
                }}>
                    {latestKeywords.map((item, index) => {
                        return (
                            <Chip
                                key={index}
                                label={item.keyword}
                                variant="outlined"
                                onClick={() => {searchHandler(item.keyword)}}
                                onDelete={() => { handleChipDelete(item.searchHistoryId) }}
                            />
                        );
                    })}

                </div>
            </div>
            <div style={{
                marginTop: '50px'
            }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>인기 검색어</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    {/* 왼쪽 목록 (1위 ~ 5위) */}
                    <Box sx={{ width: '50%' }}>
                        <List>
                            {leftList.map((item, index) => {
                                const rank = index + 1;
                                return (
                                    <ListItemButton
                                        key={rank}
                                        onClick={() => { searchHandler(item.keyword) }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 'bold', mr: 1.5,
                                                width: '25px', textAlign: 'right', flexShrink: 0
                                            }}
                                        >
                                            {rank}
                                        </Typography>
                                        <ListItemText primary={item.keyword} primaryTypographyProps={{ variant: 'body2', fontWeight: rank <= 3 ? 'bold' : 'normal' }} />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </Box>

                    {/* 오른쪽 목록 (6위 ~ 10위) */}
                    <Box sx={{ width: '50%' }}>
                        <List>
                            {rightList.map((item, index) => {
                                const rank = index + 6;
                                return (
                                    <ListItemButton
                                        key={rank}
                                        onClick={() => { searchHandler(item.keyword) }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 'bold', mr: 1.5,
                                                width: '25px', textAlign: 'right', flexShrink: 0
                                            }}
                                        >
                                            {rank}
                                        </Typography>
                                        <ListItemText primary={item.keyword} primaryTypographyProps={{ variant: 'body2', fontWeight: rank <= 3 ? 'bold' : 'normal' }} />
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default SearchPage;