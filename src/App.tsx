import React from 'react';
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

function App() {
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
      <StoreDetail isMyselfView={true}></StoreDetail>
      {/* <GoodsForm></GoodsForm> */}
    </div>
  );
}

export default App;
