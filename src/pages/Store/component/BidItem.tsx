import React, { useRef, useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { Typography } from '@mui/material';
import { ManageModalHandle } from '../../Auth/SignUp/component/TermsOfServiceModal';
import CustomModal from '../../../components/common/CustomModal';
import Payment from '../../Payment/Payment';

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
        status: '낙찰',
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
        status: '낙찰',
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

const BidItem: React.FC<{}> = () => {
    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(bidListExample.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBidList = bidListExample.slice(startIndex, endIndex);

    const formattedBidList = currentBidList.map((bid, index) => ({
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


    // 결제 모달 정보
    const [receiver, setReceiver] = useState('홍길동');
    const [phone, setPhone] = useState('010-1234-5678');
    const [address, setAddress] = useState('서울시 강남구 테헤란로 123');
    const [detailAddress, setDetailAddress] = useState('101동 202호');
    const payModalRef = useRef<ManageModalHandle>(null);

    const handleAddressSearch = () => {
        alert('api 연동 필요');
    };

    const handlePay = () => {
        alert('결제가 완료되었습니다.');
        payModalRef.current?.closeModal();
    };


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    return (
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
            onRowClick={(row) => {
                // formattedBidList의 'row' 객체에서 id를 가져옵니다.
                // 원본 bidListExample에서 해당 아이템을 찾습니다.
                const originalBidItem = bidListExample.find(bid => bid.id === row.id);

                // 원본 아이템이 존재하고, 상태가 '입찰 성공 (낙찰)'일 경우에만 모달을 엽니다.
                if (originalBidItem && originalBidItem.status === '낙찰') {
                    // [선택 사항] 결제할 아이템 정보 설정
                    // setSelectedItem(originalBidItem); 
                    
                    // 모달 열기
                    payModalRef.current?.openModal();
                } else {
                    console.log("입찰 성공 상태가 아니므로 결제 모달을 열지 않습니다. 상태:", originalBidItem?.status);
                }
            }}></CustomTable>
        <PaginationButtons
            maxPage={totalPages} 
            page={currentPage} 
            onChange={handlePageChange}></PaginationButtons>
        <CustomModal
            ref={payModalRef}
            title="결제"
            content={
                <Payment
                    receiver={receiver}
                    setReceiver={setReceiver}
                    phone={phone}
                    setPhone={setPhone}
                    address={address}
                    setAddress={setAddress}
                    detailAddress={detailAddress}
                    setDetailAddress={setDetailAddress}
                    handleAddressSearch={handleAddressSearch}
                />
            }
            leftButtonContent="결제하기"
            onLeftButtonClick={handlePay}
            height={600}
        />
        </div>
    );
}

export default BidItem;