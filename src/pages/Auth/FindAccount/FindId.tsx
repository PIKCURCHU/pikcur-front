import React from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import CustomInput from '../../../components/common/CustomInput';
import { Button } from '@mui/material';

interface FindIdProps {
    test?: string;
}

const FindId: React.FC<FindIdProps> = () => {
    return (
        <AuthLayout
            title="아이디 찾기"
            content={
                <div style={{ height: '346px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <CustomInput width={448} height={56} placeholder="Email" />
                    <div>
                        <CustomInput width={326} height={56} placeholder="인증 번호 입력" />
                        <Button
                            onClick={() => { }}
                            style={{
                                backgroundColor: "#D9D9D9",
                                color: "#686868",
                                fontSize: 16,
                                width: 112,
                                height: 56,
                                borderRadius: 8,
                                marginLeft: 10
                            }}>인증번호 발송</Button>
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
                        }}>인증하기
                    </Button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 241 }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => { }}>비밀번호 찾기</div>
                        <div>/</div>
                        <div style={{ cursor: 'pointer' }} onClick={() => { }}>로그인</div>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => { }}>회원가입</div>
                </div>
            }
        />
    )
}

export default FindId;