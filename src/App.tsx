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

function App() {
  return (
    <div>
      {/* <FindIdSuccess /> */}
      {/* <FindId /> */}
      {/* <FindPasswordSuccess /> */}
      {/* <SignUp /> */}
      {/* <TermsOfService /> */}
      <SignUpSuccess></SignUpSuccess>
    </div>
  );
}

export default App;
