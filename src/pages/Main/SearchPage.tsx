import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import SearchInput from '../../components/common/SearchInput';
import { Box, Chip, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

const initialKeywords = [
    '안녕하세요', '겨울패딩', '후드집업', '바지','안녕하세3요', '겨울패2딩', '후드집1업', '바지3','안7녕하세요', '겨울8패딩', '후드9집업', '0바지'
];

const topTenKeywords = [
    'MUI 컴포넌트', 'React Hooks', 'CSS Flexbox', 'Next.js', 'Redux Toolkit',
    'TypeScript', 'GraphQL', 'Vite', 'Tailwind CSS', 'Web Accessibility'
];


const SearchPage: React.FC<{}> = ({}) => {
    const [latestKeywords, setLatestKeywords] = useState(initialKeywords);
    const [searchFilter, setSearchFilter] = useState("Product");
    
    const leftList = topTenKeywords.slice(0, 5);  
    const rightList = topTenKeywords.slice(5, 10);


    const handleChipDelete = (chipToDelete: string) => {
        setLatestKeywords(latestKeywords.filter((chip) => chip !== chipToDelete)); 
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

    return (
        <div style={{
            marginLeft: '416px',
            marginRight: '416px',
            minHeight: "calc(100vh - 105px)",
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                display:'flex',
                paddingTop:'40px',
                paddingBottom:'20px',
                justifyContent: 'space-between',
                }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <div 
                    style={getFilterStyle("Product")}
                    onClick={() => handleFilterClick("Product")} 
                 >
                    Product
                </div>
                <div 
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
                </div>
            
                </div>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    cursor:'pointer'
                }}
                    onClick={()=>{console.log("전 화면으로 돌아감")}}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>
            <Divider sx={{height: 0}}/>  
            <div style={{
                marginTop:'20px'
            }}>
                <SearchInput width={'100%'} height={40} placeholder='검색어를 입력해주세요' onSubmit={()=>{console.log('선택된 기준으로 검색')}}/>
            </div>
            <div style={{
                marginTop:'30px',
                display:'flex',
                flexDirection:'column'
            }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>최근 검색어</Typography>
                <div style={{
                    marginTop:'10px',
                    display:'flex',
                    gap:'5px',
                    flexWrap: 'wrap'
                    }}>
                        {latestKeywords.map((keyword, index)=>{
                            return (
                                <Chip
                                    key={index}
                                    label={keyword}
                                    variant="outlined"
                                    onClick={()=>{console.log("해당 검색어로 재검색")}}
                                    onDelete={()=>{handleChipDelete(keyword)}}
                                />
                            );
                        })}
                
                </div>            
            </div>
            <div style={{
                marginTop:'50px'
            }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>인기 검색어</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    
                {/* 왼쪽 목록 (1위 ~ 5위) */}
                <Box sx={{ width: '50%' }}>
                    <List>
                        {leftList.map((keyword, index) => {
                            const rank = index + 1; 
                            return (
                                <ListItemButton 
                                    key={rank}
                                    onClick={() => {console.log("인기 검색어 검색")}}
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
                                    <ListItemText primary={keyword} primaryTypographyProps={{ variant: 'body2', fontWeight: rank <= 3 ? 'bold' : 'normal' }} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Box>

                {/* 오른쪽 목록 (6위 ~ 10위) */}
                <Box sx={{ width: '50%' }}>
                    <List>
                        {rightList.map((keyword, index) => {
                            const rank = index + 6; 
                            return (
                                <ListItemButton 
                                    key={rank}
                                    onClick={() => {console.log("인기 검색어 검색")}}
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
                                    <ListItemText primary={keyword} primaryTypographyProps={{ variant: 'body2', fontWeight: rank <= 3 ? 'bold' : 'normal' }} />
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