import * as React from 'react';
import { Box, List, ListItem, ListItemText, Popper, Paper, Grid, Typography, Link } from '@mui/material';
import { api } from '../../common/api';
import { useNavigate } from 'react-router-dom';

// 백엔드에서 받아올 카테고리 데이터 구조 정의
interface Category {
    categoryId: number;
    categoryName: string;
    subCategories: { categoryId: number; categoryName: string }[];
}

interface CategorySidebarProps {
    style?: React.CSSProperties;
}

/** 카테고리 바 컴포넌트
 * * @param style 스타일 커스터마이징
 * @returns 
 */
const CategorySidebar: React.FC<CategorySidebarProps> = ({ style }) => {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [hoveredCategory, setHoveredCategory] = React.useState<Category | null>(null); 
    const [fixedHeight, setFixedHeight] = React.useState<number | undefined>(undefined);

    const listRef = React.useRef<HTMLUListElement | null>(null);

    React.useEffect(() => {
        api.get<Category[]>("/goods/categories")
            .then(res => {
                setCategories(res);
            })
            .catch(err => {
                console.error("카테고리 불러오기 실패", err);
            });
    }, []);

    // ✅ useEffect: 카테고리 로드 후 높이 설정
    React.useEffect(() => {
        if (listRef.current) {
            // 카테고리 항목 수에 따라 높이가 변할 수 있으므로, 카테고리 로드 후에 높이를 설정합니다.
            // 90px은 Category 제목 및 margin/padding 값입니다.
            setFixedHeight(listRef.current.offsetHeight + 90); 
        }
    }, [categories]); // categories가 로드될 때마다 실행

    const handleCategoryGoods = (categoryId: number) => {
            navigate(`/categories/${categoryId}`);
    }

    const handlePopoverOpen = (
        event: React.MouseEvent<HTMLElement>,
        category: Category // Category 객체를 받도록 수정
    ) => {
        setAnchorEl(event.currentTarget);
        setHoveredCategory(category);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredCategory(null); // null로 초기화
    };

    const open = Boolean(anchorEl);

    return (
        <Box
            sx={{ display: 'flex' }}
            onMouseLeave={handlePopoverClose}
            style={{ ...style, height: fixedHeight ? `${fixedHeight}px` : 'auto' }}
        >
            {/* 왼쪽 기본 카테고리 목록 */}
            <Paper elevation={2} sx={{ width: 258, backgroundColor: "#F2F2F2", border: "1px solid #D9D9D9", borderRadius: "8px" }} >
                <p style={{ fontWeight: "bold", fontSize: "20px", textAlign: "left", marginLeft: "15px" }}>Category</p>
                <List ref={listRef} sx={{ marginBottom: "10px" }}>
                    {categories.map((category) => ( // ✅ API에서 불러온 categories 사용
                        <ListItem
                            key={category.categoryId}
                            onMouseEnter={(e) => handlePopoverOpen(e, category)} // ✅ Category 객체 전달
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <ListItemText primary={category.categoryName} />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Popper로 상세 카테고리 구현 */}
            <Popper
                id="mouse-over-popover"
                open={open}
                anchorEl={anchorEl}
                placement="right-start"
                sx={{ zIndex: 1300, marginLeft: '8px' }}
            >
                <Paper elevation={2} sx={{ p: 2, width: 400 }}>
                    <Box sx={{ mb: 1.5 }}>
                        <Link 
                            href={`/categories/${hoveredCategory?.categoryId}`} // ✅ 카테고리 ID를 사용하여 링크 생성
                            underline="hover" 
                            sx={{ fontWeight: 'bold', color: "black" , cursor:'pointer'}}
                        >
                            {`${hoveredCategory?.categoryName} 전체보기 >`} {/* ✅ hoveredCategory.categoryName 사용 */}
                        </Link>
                    </Box>
                    <Grid container spacing={1}>
                        {/* ✅ hoveredCategory가 null이 아닐 때 소분류 렌더링 */}
                        {hoveredCategory?.subCategories.map((subCategory) => (
                            <Grid item xs={6} key={subCategory.categoryId} mt={1} mb={1}>
                                <Link 
                                    sx={{cursor:'pointer'}}
                                    onClick={()=>handleCategoryGoods(subCategory.categoryId)}
                                    underline="hover" 
                                    color="inherit"
                                >
                                    {subCategory.categoryName}
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Popper>
        </Box>
    );
}

export default CategorySidebar;