import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';

interface bidItemProps {
    id: number;
    title: string;
    bidPrice: number;
    status: string;
    createDate: string;
    src: string;
}

const bidListExample: bidItemProps[] = [
    {
        id: 101,
        title: '클래식 포르쉐 다이캐스트 모델',
        bidPrice: 150000,
        status: '입찰 성공 (낙찰)',
        createDate: '2025-10-25T10:00:00',
        src: 'https://example.com/auction/porsche_model.jpg'
    },
    {
        id: 102,
        title: '초기 발행 한정판 코믹스 #1',
        bidPrice: 3200000,
        status: '입찰 중',
        createDate: '2025-10-27T14:30:00',
        src: 'https://example.com/auction/comic_book.jpg'
    },
    {
        id: 103,
        title: '유명 화가 서명 액자',
        bidPrice: 550000,
        status: '입찰 실패 (패찰)',
        createDate: '2025-10-20T21:45:00',
        src: 'https://example.com/auction/signed_art.jpg'
    },
    {
        id: 104,
        title: '빈티지 레코드 플레이어',
        bidPrice: 85000,
        status: '입찰 중',
        createDate: '2025-10-28T09:10:00',
        src: 'https://example.com/auction/record_player.jpg'
    },
    {
        id: 105,
        title: '희귀 동전 묶음 (1970년대)',
        bidPrice: 950000,
        status: '입찰 성공 (낙찰)',
        createDate: '2025-10-22T17:05:00',
        src: 'https://example.com/auction/coins.jpg'
    },
    {
        id: 106,
        title: '디자인 한정판 스니커즈',
        bidPrice: 400000,
        status: '입찰 실패 (패찰)',
        createDate: '2025-10-26T11:55:00',
        src: 'https://example.com/auction/sneakers.jpg'
    },
    {
        id: 107,
        title: '역사적 인물 친필 편지',
        bidPrice: 1800000,
        status: '입찰 중',
        createDate: '2025-10-28T16:30:00',
        src: 'https://example.com/auction/old_letter.jpg'
    }
];


const BidList: React.FC<{}> = () => {
    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(bidListExample.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBidList = bidListExample.slice(startIndex, endIndex);

    const [selectedBidType, setSelectedBidType] = useState('bid'); 


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleChangeBidType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBidType(event.target.value);
    };

    const formattedBidList = currentBidList.map((bid, index) => ({
        id: bid.id, 
        title: bid.title,
        createDate: bid.createDate, 
        
        // isAnswered: boolean 대신 스타일링된 Typography JSX로 변환
        status: (
            <Typography 
                // color={} 
                fontWeight="bold"
            >
                {bid.status}
            </Typography>
        ),
    }));

    return (
        <div>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedBidType}
                onChange={handleChangeBidType}
            >
                <FormControlLabel value="bid" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="입찰" />
                <FormControlLabel value="winBid" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="낙찰" />
                
            </RadioGroup> 
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
                dataList={formattedBidList}
                onRowClick={(row) => console.log("클릭한 행:", row)}></CustomTable>
            <PaginationButtons
                maxPage={totalPages} 
                page={currentPage} 
                onChange={handlePageChange}></PaginationButtons>
            </div>
        </div>
    );
}

export default BidList;