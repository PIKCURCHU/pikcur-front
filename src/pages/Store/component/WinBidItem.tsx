import React, { useState } from 'react';
import PaginationButtons from '../../../components/common/PaginationButtons';
import CustomTable from '../../../components/common/CustomTable';
import { Typography } from '@mui/material';

interface bidItemProps {
    id: number;
    title: string;
    bidPrice: number;
    status: string;
    createDate: string;
    src: string;
}

const winBidListExample: bidItemProps[] = [
    {
        id: 101,
        title: '클래식 포르쉐 다이캐스트 모델',
        bidPrice: 150000,
        status: '낙찰',
        createDate: '2025-10-25T10:00:00',
        src: 'https://example.com/auction/porsche_model.jpg'
    },
    {
        id: 102,
        title: '초기 발행 한정판 코믹스 #1',
        bidPrice: 3200000,
        status: '낙찰',
        createDate: '2025-10-27T14:30:00',
        src: 'https://example.com/auction/comic_book.jpg'
    }
]

const WinBidItem: React.FC<{}> =() => {
    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(winBidListExample.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentWinBidList = winBidListExample.slice(startIndex, endIndex);

    const formattedWinBidList = currentWinBidList.map((bid, index) => ({
        id: bid.id, 
        title: bid.title,
        createDate: bid.createDate, 
        
        status: (
            <Typography 
                fontWeight="bold"
            >
                {bid.status}
            </Typography>
        ),
    }));

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return(
        <div style={{
            marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
        }}>
        <CustomTable
            width={'100%'}
            columns={
                [   
                    { field: "title", headerName: "상품명" },
                    { field: "bidPrice", headerName: "입찰가" },
                    { field: "status", headerName: "입찰 상태" },
                    { field: "createDate", headerName: "날짜" }                          
                ]
            }
            dataList={formattedWinBidList}
            onRowClick={(row) => console.log("클릭한 행:", row)}></CustomTable>
        <PaginationButtons
            maxPage={totalPages} 
            page={currentPage} 
            onChange={handlePageChange}></PaginationButtons>
        </div>
    );
}

export default WinBidItem;