import React, { useEffect, useRef, useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { Typography } from '@mui/material';
import { ManageModalHandle } from '../../Auth/SignUp/component/TermsOfServiceModal';
import CustomModal from '../../../components/common/CustomModal';
import BidPayment from '../../Payment/BidPayment';
import { api } from '../../../common/api';

declare global {
    interface Window {
      IMP?: any;
    }
  }

interface bidItemProps {
    bidId: number;
    goodsName: string;
    bidPrice: number;
    statusName: string;
    createDate: string;
    goodsId: number;
}

const BidItem: React.FC<{ storeId: number }> = ({ storeId }) => {
    const [bidList, setBidList] = useState<bidItemProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const formattedBidList = bidList.map((bid, index) => ({
        goodsId:bid.goodsId,
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
    const [buyerName, setBuyerName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [payPrice, setPayPrice] = useState(0);
    const payModalRef = useRef<ManageModalHandle>(null);
    const [selectedItem, setSelectedItem] = useState<bidItemProps | null>(null);

    const handleAddressSearch = () => {
        alert('api 연동 필요');
    };

    useEffect(() => {
        if (window.IMP) {
          window.IMP.init('imp57185518'); // ⚠️ 가맹점 식별코드
        } else {
          console.error("window.IMP를 찾지 못했습니다. index.html을 확인하세요.");
        }
      }, []);
    
      const handlePay = () => {
        console.log('--- handlePay 함수 시작 ---');
    
        if (!selectedItem) {
          console.error('❌ 결제 중단: selectedItem이 null입니다.');
          alert('결제할 상품이 선택되지 않았습니다.');
          return;
        }
    
        console.log('선택된 상품:', selectedItem.goodsName, selectedItem.bidPrice);
    
        const IMP = window.IMP;
        if (!IMP) {
          console.error('❌ 결제 중단: 아임포트(IMP) 로드 실패');
          alert('아임포트 로드 실패');
          return;
        }
    
        console.log('아임포트에 결제 요청을 보냅니다...');
    
        IMP.request_pay(
          {
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name: selectedItem.goodsName,
            amount: payPrice,
            buyer_name: buyerName,
            buyer_tel: phone,
            buyer_addr: `${address} ${detailAddress}`,
          },
          (rsp: any) => {
            if (rsp.success) {
              console.log('✅ 아임포트 결제 성공!', rsp);
              alert('✅ 결제가 완료되었습니다.\n결제번호: ' + rsp.imp_uid);
              payModalRef.current?.closeModal();
    
              console.log('이제 백엔드로 fetch 요청을 보냅니다...');
    
              api.post(`/payment/verify`, {
                impUid: rsp.imp_uid,
                merchantUid: rsp.merchant_uid,
                amount: payPrice,
                goodsId: selectedItem.goodsId,
              })
              .then((res) => {
                  console.log("서버 응답:", res);
              
                  if (res.status !== "success") {
                      throw new Error('결제 검증 실패');
                  }
              
                  alert(res.message);
              })
              .catch((err) => {
                  console.error(' .catch 에러:', err);
                  alert(err.message);
              });
            } else {
              console.error('❌ 아임포트 결제 실패!', rsp);
              alert('❌ 결제가 실패하였습니다: ' + rsp.error_msg);
            }
          }
        );
      };

    const openAddressPopup = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data: any) {
                    const fullAddress = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                    setAddress(fullAddress);
                }
            }).open();
        } else {
            alert('주소 검색 서비스를 불러올 수 없습니다.');
        }
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
            marginTop: '20px', display: 'flex', flexDirection: 'column', gap: "20px"
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
                        api.get('/payment/info', { bidId: originalBidItem.bidId })
                            .then((res) => {
                                setPayPrice(res.payPrice);
                                setBuyerName(res.receiver);
                                setPhone(res.phone);
                                setAddress(res.address);
                                setDetailAddress(res.addressDetail);
                            })
                            .catch((err) => {
                                console.log("🔥 에러:", err);
                            })
                        setSelectedItem(originalBidItem); 
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
                    <BidPayment
                        receiver={buyerName}
                        setReceiver={setBuyerName}
                        phone={phone}
                        setPhone={setPhone}
                        address={address}
                        setAddress={setAddress}
                        detailAddress={detailAddress}
                        setDetailAddress={setDetailAddress}
                        handleAddressSearch={openAddressPopup}
                        payPrice={payPrice}
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