import * as React from 'react';
import { Box, List, ListItem, ListItemText, Popper, Paper, Grid, Typography, Link } from '@mui/material';

// 카테고리 데이터 타입
interface CategoryData {
  [key: string]: string[];
}

// 카테고리 데이터 - DB에서 받아올 예정
const categoryData: CategoryData = {
  '아우터': ['후드집업', '트러커 자켓', '블루종 / MA-1', '블레이저 자켓', '레더자켓', '사파리 / 헌팅자켓', '가디건', '베스트'],
  '상의': ['반팔티', '긴팔티', '맨투맨', '후드티', '니트'],
  '바지': ['데님', '슬랙스', '면바지', '반바지'],
  '원피스 / 스커트': [],
  '신발': [],
  '가방': [],
  '모자': [],
  '악세사리': [],
  '주얼리': []
};

/** 카테고리 바 컴포넌트
 * 
 * @returns 
 */
const CategorySidebar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [hoveredCategory, setHoveredCategory] = React.useState<string>('');

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    category: string
  ) => {
    setAnchorEl(event.currentTarget);
    setHoveredCategory(category);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoveredCategory('');
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', }} onMouseLeave={handlePopoverClose}>
      {/* 왼쪽 기본 카테고리 목록 */}
      <Paper elevation={2} sx={{ width: 200, backgroundColor:"#F2F2F2", border: "1px solid #D9D9D9", borderRadius:"8px" }} >
        <p style={{fontWeight: "bold", fontSize: "20px", textAlign:"left", marginLeft:"15px"}}>Category</p>
        <List sx={{marginBottom:"10px"}}>
          {Object.keys(categoryData).map((category) => (
            <ListItem
              key={category}
              onMouseEnter={(e) => handlePopoverOpen(e, category)}
              sx={{
                '&:hover': {
                  backgroundColor: 'white', 
                  cursor: 'pointer', 
                },
              }}
            >
              <ListItemText primary={category} />
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
            <Link href="#" underline="hover" sx={{ fontWeight: 'bold', color:"black" }}>
              {`${hoveredCategory} 전체보기 >`}
            </Link>
          </Box>
          <Grid container spacing={1}>
            {/* hoveredCategory가 비어있지 않을 때만 렌더링 */}
            {hoveredCategory && categoryData[hoveredCategory]?.map((subCategory) => (
              <Grid item xs={6} key={subCategory} mt={1} mb={1}>
                <Link href="#" underline="hover" color="inherit">
                  {subCategory}
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