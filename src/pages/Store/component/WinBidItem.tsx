import React, { useEffect, useRef, useState } from 'react';
import PaginationButtons from '../../../components/common/PaginationButtons';
import CustomTable from '../../../components/common/CustomTable';
import { Typography } from '@mui/material';
import CustomModal from '../../../components/common/CustomModal';
import Payment from '../../Payment/Payment';
import { ManageModalHandle } from '../../Auth/SignUp/component/TermsOfServiceModal';

declare global {
  interface Window {
    IMP?: any;
  }
}

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
    id: 1,
    title: '클래식 포르쉐 다이캐스트 모델',
    bidPrice: 10,
    status: '낙찰',
    createDate: '2025-10-25T10:00:00',
    src: 'https://example.com/auction/porsche_model.jpg'
  },
  {
    id: 102,
    title: '초기 발행 한정판 코믹스 #1',
    bidPrice: 10,
    status: '낙찰',
    createDate: '2025-10-27T14:30:00',
    src: 'https://example.com/auction/comic_book.jpg'
  }
];

const WinBidItem: React.FC<{}> = () => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(winBidListExample.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWinBidList = winBidListExample.slice(startIndex, endIndex);

  const formattedWinBidList = currentWinBidList.map((bid, index) => ({
    id: bid.id,
    title: bid.title,
    bidPrice: bid.bidPrice.toLocaleString() + '원',
    createDate: bid.createDate,
    status: (
      <Typography fontWeight="bold">
        {bid.status}
      </Typography>
    ),
  }));

  // 결제 모달 정보
  const [buyerName, setBuyerName] = useState('홍길동');
  const [phone, setPhone] = useState('010-1234-5678');
  const [address, setAddress] = useState('서울시 강남구 테헤란로 123');
  const [detailAddress, setDetailAddress] = useState('101동 202호');
  const payModalRef = useRef<ManageModalHandle>(null);
  const [selectedItem, setSelectedItem] = useState<bidItemProps | null>(null);

  useEffect(() => {
    if (window.IMP) {
      window.IMP.init('imp57185518'); // ⚠️ 가맹점 식별코드
    } else {
      console.error("window.IMP를 찾지 못했습니다. index.html을 확인하세요.");
    }
  }, []);

  const handleAddressSearch = () => {
    alert('api 연동 필요');
  };

  const handlePay = () => {
    console.log('--- handlePay 함수 시작 ---');

    if (!selectedItem) {
      console.error('❌ 결제 중단: selectedItem이 null입니다.');
      alert('결제할 상품이 선택되지 않았습니다.');
      return;
    }

    console.log('선택된 상품:', selectedItem.title, selectedItem.bidPrice);

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
        name: selectedItem.title,
        amount: selectedItem.bidPrice,
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

          fetch('http://localhost:8080/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              impUid: rsp.imp_uid,
              merchantUid: rsp.merchant_uid,
              amount: selectedItem.bidPrice,
              goodsId: selectedItem.id,
            }),
          })
            .then(res => {
              if (!res.ok) {
                console.error('백엔드 fetch 실패 (res.ok 아님)', res);
                throw new Error('결제 검증 실패');
              }
              return res.json();
            })
            .then(data => {
              console.log('서버 검증 성공 ✅', data);
              alert('결제가 정상적으로 처리되었습니다.');
            })
            .catch(err => {
              console.error('fetch .catch 에러:', err);
              alert('결제 검증 중 오류가 발생했습니다.');
            });
        } else {
          console.error('❌ 아임포트 결제 실패!', rsp);
          alert('❌ 결제가 실패하였습니다: ' + rsp.error_msg);
        }
      }
    );
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      marginTop: '20px', display: 'flex', flexDirection: 'column', gap: "20px"
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
        onRowClick={(row) => {
          const originalBidItem = winBidListExample.find(bid => bid.id === row.id);
          if (originalBidItem && originalBidItem.status === '낙찰') {
            setSelectedItem(originalBidItem); // 결제할 아이템 선택
            payModalRef.current?.openModal();
          } else {
            console.log("입찰 성공 상태가 아니므로 결제 모달을 열지 않습니다. 상태:", originalBidItem?.status);
          }
        }}
      />

      <PaginationButtons
        maxPage={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />

      <CustomModal
        ref={payModalRef}
        title="결제"
        content={
          <Payment
            receiver={buyerName}
            setReceiver={setBuyerName}
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

export default WinBidItem;