import React, { useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

interface transItemProps {
    id: number;
    title: string;
    price: number;
    status: string;
    createDate: string;
    src: string;
}

const transListExample: transItemProps[] = [
    {
        id: 1,
        title: '한정판 디자이너 시계',
        price: 500000,
        status: '거래 완료',
        createDate: '2025-11-01T14:30:00',
        src: 'https://example.com/images/goods_1.jpg'
    },
    {
        id: 2,
        title: '미사용 빈티지 카메라',
        price: 1250000,
        status: '판매 중',
        createDate: '2025-11-05T09:15:00',
        src: 'https://example.com/images/goods_2.jpg'
    },
    {
        id: 3,
        title: '프리미엄 가죽 지갑',
        price: 80000,
        status: '예약 중',
        createDate: '2025-11-04T18:00:00',
        src: 'https://example.com/images/goods_3.jpg'
    },
    {
        id: 4,
        title: '최신형 무선 헤드폰',
        price: 350000,
        status: '거래 완료',
        createDate: '2025-10-30T10:20:00',
        src: 'https://example.com/images/goods_4.jpg'
    },
    {
        id: 5,
        title: '희귀 만화책 세트',
        price: 45000,
        status: '판매 중',
        createDate: '2025-11-06T11:45:00',
        src: 'https://example.com/images/goods_5.jpg'
    },
    {
        id: 6,
        title: '정품 농구화 (280mm)',
        price: 220000,
        status: '판매 중',
        createDate: '2025-11-02T16:50:00',
        src: 'https://example.com/images/goods_6.jpg'
    },
    {
        id: 7,
        title: '아티스트 한정판 프린팅',
        price: 750000,
        status: '거래 완료',
        createDate: '2025-10-28T22:10:00',
        src: 'https://example.com/images/goods_7.jpg'
    }
];

const TransactionList: React.FC<{}> = () => {
    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(transListExample.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentTransList = transListExample.slice(startIndex, endIndex);

    const [selectedTransType, setSelectedTransType] = useState('buy'); 

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleChangeTransType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTransType(event.target.value);
    };

    const formattedTransList = currentTransList.map((trans, index) => ({
        id: trans.id, 
        title: trans.title,
        createDate: trans.createDate, 
        
        // isAnswered: boolean 대신 스타일링된 Typography JSX로 변환
        status: (
            <Typography 
                // color={} 
                fontWeight="bold"
            >
                {trans.status}
            </Typography>
        ),
    }));
    return (
        <div>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedTransType}
                onChange={handleChangeTransType}
            >
                <FormControlLabel value="buy" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="구매" />
                <FormControlLabel value="sell" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="판매" />
            </RadioGroup> 
            <div style={{
                marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
            }}>
            <CustomTable
                width={'100%'}
                columns={
                    [
                        { field: "title", headerName: "상품명" },
                        { field: "price", headerName: "가격" },
                        { field: "status", headerName: "거래 상태" },
                        { field: "createDate", headerName: "날짜" }                               
                    ]
                }
                dataList={formattedTransList}
                onRowClick={(row) => console.log("클릭한 행:", row)}></CustomTable>
            <PaginationButtons
                maxPage={totalPages} 
                page={currentPage} 
                onChange={handlePageChange}></PaginationButtons>
            </div>
        </div>
    );
}

export default TransactionList;