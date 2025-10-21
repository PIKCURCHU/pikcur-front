import React from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import { Button } from '@mui/material';

interface FindIdSuccessProps {
    test?: string;
}

const FindIdSuccess: React.FC<FindIdSuccessProps> = () => {
    return (
        <AuthLayout
            title="아이디 찾기"
            subMsg="인증이 완료되었습니다."
            content={
                <div style={{ height: '346px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <div style={{
                        width: 448, height: 56,
                        border: '1px solid #E0E0E0',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        fontSize: `16px`,
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '16px',
                        fontWeight: 'normal',
                    }}>test</div>
                    <div>
                        <div style={{ width: 326, height: '56px' }} />
                    </div>
                    <Button
                        type="button"
                        onClick={() => { }}
                        style={{
                            backgroundColor: "#141414",
                            color: "#fff",
                            width: 464,
                            height: 56,
                            fontSize: 16,
                            borderRadius: 8,
                        }}>로그인 하러 가기
                    </Button>

                    <div style={{ display: 'flex', justifyContent: 'center', width: 241 }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => { }}>비밀번호 찾기</div>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => { }}>회원가입</div>
                </div>
            }
        />
    )
}

export default FindIdSuccess;