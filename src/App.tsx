import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Auth/Login/Login';
import FindId from './pages/Auth/FindAccount/FindId';
import FindPassword from './pages/Auth/FindAccount/FindPassword';
import FindIdSuccess from './pages/Auth/FindAccount/FindIdSuccess';
import FindPasswordSuccess from './pages/Auth/FindAccount/FindPasswordSuccess';
import SignUp from './pages/Auth/SignUp/SignUp';
import TermsOfService from './pages/Auth/SignUp/TermsOfService';
import SignUpSuccess from './pages/Auth/SignUp/SignUpSuccess';
import Header from './components/common/Header';
import SearchPage from './pages/Main/SearchPage';
import MainPage from './pages/Main/MainPage';
import QuestionForm from './pages/Contact/1by1QnA/QuestionForm';
import QuestionDetail from './pages/Contact/1by1QnA/QuestionDetail';
import QuestionList from './pages/Contact/1by1QnA/QuestionList';
import ReviewDetail from './pages/Store/ReviewDetail';
import StoreDetail from './pages/Store/StoreDetail';
import ProductQuestionDetail from './pages/Store/ProductQuestionDetail';
import ProductQuestionForm from './pages/Store/ProductQuestionForm';
import TransactionDetail from './pages/Store/TransactionDetail';
import GoodsForm from './pages/Goods/GoodsForm';
import MyPage from './pages/MyPage/MyPage';
import GoodsDetail from './pages/Goods/GoodsDetail';
import Payment from './pages/Payment/Payment';
import CustomModal, { ManageModalHandle } from './components/common/CustomModal';
import { Button } from '@mui/material';

function App() {

     const [receiver, setReceiver] = useState('홍길동');
    const [phone, setPhone] = useState('010-1234-5678');
    const [address, setAddress] = useState('서울시 강남구 테헤란로 123');
    const [detailAddress, setDetailAddress] = useState('101동 202호');
    const modalRef = useRef<ManageModalHandle>(null);

    const handleAddressSearch = () => {
        alert('api 연동 필요');
    };

    const handlePay = () => {
        alert('결제가 완료되었습니다.');
        modalRef.current?.closeModal();
    };
  return (
    <div>
      {/* <FindIdSuccess /> */}
      {/* <FindId /> */}
      {/* <FindPasswordSuccess /> */}
      {/* <SignUp /> */}
      {/* <TermsOfService /> */}
      {/* <SignUpSuccess></SignUpSuccess> */}
      {/* <SearchPage></SearchPage> */}
      {/* <MainPage></MainPage> */}
      {/* <StoreDetail isMyselfView={true}></StoreDetail> */}
      {/* <GoodsForm></GoodsForm> */}
      {/* <MyPage></MyPage> */}
      {/* <TransactionDetail isBuyerView={true}></TransactionDetail> */}
            <Button
                variant="contained"
                onClick={() => modalRef.current?.openModal()}
                style={{ margin: 40, fontWeight: 700, fontSize: 18 }}
            >
                결제 화면 열기
            </Button>
            <CustomModal
                ref={modalRef}
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

export default App;
