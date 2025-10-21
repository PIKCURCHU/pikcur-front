import React from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import CustomInput from '../../../components/common/CustomInput';
import { Button } from '@mui/material';

interface LoginProps {
    test?: string;
}

const Login: React.FC<LoginProps> = () => {
    return (
        <AuthLayout
            title="WelCome Back!"
            content={
                <div style={{ height: '346px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <CustomInput width={448} height={56} placeholder="ID" />
                    <CustomInput width={448} height={56} placeholder="PASSWORD" type="password" />
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
                        }}>로그인
                    </Button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 241 }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => {}}>아이디 찾기</div>
                        <div>/</div>
                        <div style={{ cursor: 'pointer' }} onClick={() => {}}>비밀번호 찾기</div>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => {}}>회원가입</div>
                </div>
            }
        />
    )
}

export default Login;