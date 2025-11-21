import React from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpSuccess: React.FC = () => {

    const navigate = useNavigate();

    return (
        <>
            <div style={{ minHeight: '100vh' }}>
                <Header isBasic={false} />
                <div style={{
                    marginLeft: '416px',
                    marginRight: '416px',
                    minHeight: "calc(100vh - 105px)",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#141414',
                    }}>
                        회원가입이 완료되었습니다. PIKCUR 오신 것을 환영합니다!
                    </div>
                    <div style={{ paddingTop: 72, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={() => navigate('/login')}
                            style={{
                                backgroundColor: "#141414",
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: 'bold',
                                width: 178,
                                height: 56,
                                borderRadius: 8
                            }}>로그인 하러가기</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignUpSuccess;