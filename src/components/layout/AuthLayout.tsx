import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

interface AuthLayoutProps {
    title: string;
    subMsg?: string;
    subMsgColor?: string;
    content?: React.ReactNode;
    style?: React.CSSProperties;
}

/** 로그인, 회원가입, 비밀번호/아이디 찾기 화면에서 사용할 Layouot 컴포넌트
 * 
 * @example 해당 레이아웃을 사용 하는 컴포넌트에서 useState로 에러 메시지를 연결해야함.
 * const [error, setError] = useState('');
 * const [showError, setShowError] = useState(false);
 * 
 * const handleLogin = () => {
 *  if (로그인 실패) {
 *   setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
 *   setShowError(true);}
 * }
 * 
 * @param title 화면 상단에 표시될 제목
 * @param subMsg 특정 로직 실행 후 화면에 표시될 서브 메시지
 * @param subMsgColor 서브 메세지 색
 * @param content 화면에 들어갈 컴포넌트
 * @param style 스타일 커스텀
 * @returns 
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subMsg, content, style, subMsgColor = "#FF5454" }) => {

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
                    ...style,
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#141414',
                    }}>{title}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 16,
                            color: `${subMsgColor}`,
                            fontWeight: 'normal',
                            minHeight: '24px',
                            marginTop: 18
                        }}
                    >
                        {subMsg || ''}
                    </div>

                    <div style={{ paddingTop: 100, display: 'flex', justifyContent: 'center' }}>
                        {content}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AuthLayout;