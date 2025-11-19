import React, { use, useState } from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import CustomInput from '../../../components/common/CustomInput';
import { Button } from '@mui/material';
import { api } from '../../../common/api';
import { useNavigate } from 'react-router-dom';

interface SignInProps {
    test?: string;
}

const SignIn: React.FC<SignInProps> = () => {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (id === '') {
            alert("아이디를 입력해주세요.");
            return;
        } else if (password === '') {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        api.post("/auth/members/signin", { id, password })
            .then(res => {
                localStorage.setItem("token", res.token);
                localStorage.setItem("id", res.id);
                localStorage.setItem("name", res.name);
                localStorage.setItem("authority", res.authority);

                alert("로그인 성공");
                navigate('/');
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    alert("아이디 또는 비밀번호가 잘못되었습니다.");
                } else {
                    alert("로그인 실패");
                }
            });
    }

    return (
        <AuthLayout
            title="WelCome Back!"
            content={
                <div style={{ height: '346px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <CustomInput
                        width={448}
                        height={56}
                        placeholder="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                    />
                    <CustomInput
                        width={448}
                        height={56}
                        placeholder="PASSWORD"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                    />
                    <Button
                        type="button"
                        onClick={handleLogin}
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
                        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/findId')}>아이디 찾기</div>
                        <div>/</div>
                        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/findPassword')}>비밀번호 찾기</div>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate('/signUp')}>회원가입</div>
                </div>
            }
        />
    )
}

export default SignIn;