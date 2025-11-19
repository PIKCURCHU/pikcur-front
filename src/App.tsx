import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/Main/MainPage';
import FAQ from './pages/Contact/FAQ/FAQ';
import QuestionList from './pages/Contact/1by1QnA/QuestionList';
import GoodsForm from './pages/Goods/GoodsForm';
import SignIn from './pages/Auth/SignIn/SignIn';
import StoreDetail from './pages/Store/StoreDetail';
import FindId from './pages/Auth/FindAccount/FindId';
import FindIdSuccess from './pages/Auth/FindAccount/FindIdSuccess';
import FindPassword from './pages/Auth/FindAccount/FindPassword';
import FindPasswordSuccess from './pages/Auth/FindAccount/FindPasswordSuccess';
import SignUp from './pages/Auth/SignUp/SignUp';

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="questionList" element={<QuestionList />} />
                    <Route path="goodsForm" element={<GoodsForm />} />
                    <Route path="login" element={<SignIn />} />
                    <Route path="storeDetail" element={<StoreDetail isMyselfView={true} />} />
                    <Route path="findId" element={<FindId />} />
                    <Route path="findIdSuccess" element={<FindIdSuccess />} />
                    <Route path="findPassword" element={<FindPassword />} />
                    <Route path="findPasswordSuccess" element={<FindPasswordSuccess />} />
                    <Route path="signUp" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;