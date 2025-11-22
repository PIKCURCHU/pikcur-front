import React, { useEffect, useRef, useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { Typography } from '@mui/material';
import { ManageModalHandle } from '../../Auth/SignUp/component/TermsOfServiceModal';
import CustomModal from '../../../components/common/CustomModal';
import Payment from '../../Payment/Payment';
import { api } from '../../../common/api';

interface bidItemProps {
    bidId: number;
    goodsName: string;
    bidPrice: number;
    statusName: string;
    createDate: string;
}

const BidItem: React.FC<{storeId:number}> = ({storeId}) => {
    const [bidList, setBidList] = useState<bidItemProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const formattedBidList = bidList.map((bid, index) => ({
        bidId: bid.bidId,
        goodsName: bid.goodsName,
        bidPrice: bid.bidPrice.toLocaleString() + '원',
        createDate: bid.createDate.substring(0, 10), 
        statusName: (
        <Typography fontWeight="bold" color={bid.statusName === '낙찰' ? 'success' : ''}>
            {bid.statusName}
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

    useEffect(() => {
        if (!storeId) return;
        api.get(`/store/${storeId}/bids`, {
            currentPage
        })
            .then((res) => {
                console.log(res);
                setBidList(res.bidList);
                setTotalPages(res.totalPages || 1);
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
    }, []);
    
    return (
        <div style={{
            marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
        }}>
        <CustomTable
            width={'100%'}
            columns={
                [   
                    { field: "goodsName", headerName: "상품명" },
                    { field: "bidPrice", headerName: "입찰가" },
                    { field: "statusName", headerName: "입찰 상태" },
                    { field: "createDate", headerName: "날짜" }                          
                ]
            }
            dataList={formattedBidList}
            onRowClick={(row) => {
                const originalBidItem = bidList.find(bid => bid.bidId === row.bidId);

                if (originalBidItem && originalBidItem.statusName === "낙찰") {
                    payModalRef.current?.openModal();
                } else {
                    console.log("입찰 성공 상태가 아니므로 결제 모달을 열지 않습니다. 상태:", originalBidItem?.statusName);
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