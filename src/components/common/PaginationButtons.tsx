import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Pagination } from '@mui/material';


interface PaginationButtonsProps {
  page?: number;
  maxPage?: number;
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => any;
}

/**
 * 
 * @example
 * // 한 페이지에 보여줄 아이템 개수
    const ITEMS_PER_PAGE = 5;

    // 현재 페이지 상태 관리 (초기값: 1페이지)
    const [currentPage, setCurrentPage] = useState(1);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(faqList.length / ITEMS_PER_PAGE);

    // 현재 페이지에 보여줄 FAQ 항목 계산 (슬라이싱)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentFaqList = faqList.slice(startIndex, endIndex);

    // 페이지 변경 핸들러 함수
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

 * @param page 현재 페이지 
 * @param onChange 페이지 변경 핸들러
 * @param maxPage 계산된 전체 페이지 수 (기본값 1)
 * @returns 
 */
const PaginationButtons: React.FC<PaginationButtonsProps> = ({ page, onChange, maxPage=1 }) => {
  return (
    <div style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
      <Stack spacing={2}>
        <Pagination count={maxPage} size={"large"} page={page} onChange={onChange} />
      </Stack>
    </div>
  );
}

export default PaginationButtons;