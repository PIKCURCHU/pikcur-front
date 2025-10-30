import React, { useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

interface transItemProps {
    id: number;
    sellerNo: number;
    buyerNo: number;
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
        sellerNo: 1,
        buyerNo: 2,
        price: 500000,
        status: '거래 완료',
        createDate: '2025-11-01T14:30:00',
        src: 'https://example.com/images/goods_1.jpg'
    },
    {
        id: 2,
        title: '미사용 빈티지 카메라',
        sellerNo: 1,
        buyerNo: 2,
        price: 1250000,
        status: '판매 중',
        createDate: '2025-11-05T09:15:00',
        src: 'https://example.com/images/goods_2.jpg'
    },
    {
        id: 3,
        title: '프리미엄 가죽 지갑',
        sellerNo: 1,
        buyerNo: 2,
        price: 80000,
        status: '예약 중',
        createDate: '2025-11-04T18:00:00',
        src: 'https://example.com/images/goods_3.jpg'
    },
    {
        id: 4,
        title: '최신형 무선 헤드폰',
        sellerNo: 1,
        buyerNo: 2,
        price: 350000,
        status: '거래 완료',
        createDate: '2025-10-30T10:20:00',
        src: 'https://example.com/images/goods_4.jpg'
    },
    {
        id: 5,
        title: '희귀 만화책 세트',
        sellerNo: 1,
        buyerNo: 2,
        price: 45000,
        status: '판매 중',
        createDate: '2025-11-06T11:45:00',
        src: 'https://example.com/images/goods_5.jpg'
    },
    {
        id: 6,
        title: '정품 농구화 (280mm)',
        sellerNo: 2,
        buyerNo: 1,
        price: 220000,
        status: '판매 중',
        createDate: '2025-11-02T16:50:00',
        src: 'https://example.com/images/goods_6.jpg'
    },
    {
        id: 7,
        title: '아티스트 한정판 프린팅',
        sellerNo: 2,
        buyerNo: 1,
        price: 750000,
        status: '거래 완료',
        createDate: '2025-10-28T22:10:00',
        src: 'https://example.com/images/goods_7.jpg'
    }
];

const TransactionList: React.FC<{memberNo: number}> = ({memberNo}) => {
    const ITEMS_PER_PAGE = 6; 
    
    // ⭐ 독립적인 페이지 상태 분리
    const [buyCurrentPage, setBuyCurrentPage] = useState(1);
    const [sellCurrentPage, setSellCurrentPage] = useState(1);
    const [selectedTransType, setSelectedTransType] = useState('buy'); 

    const handleBuyPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setBuyCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleSellPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSellCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChangeTransType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTransType(event.target.value);
        setBuyCurrentPage(1);
        setSellCurrentPage(1);
    };

    const formatTransList = (list: transItemProps[]) => {
        return list.map((trans) => ({
            id: trans.id, 
            title: trans.title,
            createDate: trans.createDate, 
            sellerNo: trans.sellerNo,
            buyerNo: trans.buyerNo,
            price: trans.price,
            
            status: (
                <Typography 
                    fontWeight="bold"
                >
                    {trans.status}
                </Typography>
            ),
        }));
    };
    
    const tableColumns = [
        { field: "title", headerName: "상품명" },
        { field: "price", headerName: "가격" },
        { field: "status", headerName: "거래 상태" },
        { field: "createDate", headerName: "날짜" }
    ];

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
            
            {/* 구매(Buy) 목록 */}
            {selectedTransType === 'buy' && (() => {
                const filteredList = transListExample.filter(item => item.buyerNo === memberNo);
             
                const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
                const startIndex = (buyCurrentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                const currentList = filteredList.slice(startIndex, endIndex);
                
                const formattedList = formatTransList(currentList);

                return (
                    <div style={{
                            marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
                        }}>
                        <CustomTable
                            width={'100%'}
                            columns={tableColumns}
                            dataList={formattedList}
                            onRowClick={(row) => console.log("클릭한 행:", row)}
                        />
                        <PaginationButtons
                            maxPage={totalPages} 
                            page={buyCurrentPage} 
                            onChange={handleBuyPageChange} 
                        />
                    </div>
                );
            })()}

            {/* 판매(Sell) 목록 */}
            {selectedTransType === 'sell' && (() => {
                const filteredList = transListExample.filter(item => item.sellerNo === memberNo);
                
                const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
                const startIndex = (sellCurrentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                const currentList = filteredList.slice(startIndex, endIndex);
                
                const formattedList = formatTransList(currentList);

                return (
                    <div style={{
                            marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
                        }}>
                        <CustomTable
                            width={'100%'}
                            columns={tableColumns}
                            dataList={formattedList}
                            onRowClick={(row) => console.log("클릭한 행:", row)}
                        />
                        <PaginationButtons
                            maxPage={totalPages} 
                            page={sellCurrentPage}
                            onChange={handleSellPageChange} 
                        />
                    </div>
                );
            })()}
        </div>
    );
}

export default TransactionList;