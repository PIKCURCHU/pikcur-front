import React, { useEffect, useState } from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import CustomInput from '../../../components/common/CustomInput';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../common/api';

interface FindPasswordPropsSuccess {
    test?: string;
}

const FindPasswordSuccess: React.FC<FindPasswordPropsSuccess> = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const initHandler = () => {
        const id = location.state?.id;
        setId(id);
    }

    const passwordConfirmButtonClickHandler = () => {
        if (!password || !confirmPassword) {
            alert("비밀번호와 비밀번호 재입력을 모두 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            setIsDisabled(true);
            return;
        } else if (password === confirmPassword) {
            alert("비밀번호가 일치합니다.");
            setIsDisabled(false);
        }
    }

    const changePasswordButtonClickHandler = () => {
        api.post("/auth/members/password-status-unLogin", { id, password })
            .then((res) => {
                alert("비밀번호 변경이 완료되었습니다.");
                navigate('/login');
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            });
    }

    useEffect(() => {
        initHandler();
    }, []);

    return (
        <AuthLayout
            title="비밀번호 변경"
            subMsg="변경할 비밀번호를 입력해주세요."
            content={
                <div style={{ height: '346px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <CustomInput
                        type="password"
                        width={448}
                        height={56}
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setIsDisabled(true);
                        }} />
                    <div>
                        <CustomInput
                            type="password"
                            width={326}
                            height={56}
                            placeholder="비밀번호 재입력"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setIsDisabled(true);
                            }} />
                        <Button
                            onClick={passwordConfirmButtonClickHandler}
                            style={{
                                backgroundColor: "#D9D9D9",
                                color: "#686868",
                                fontSize: 16,
                                width: 112,
                                height: 56,
                                borderRadius: 8,
                                marginLeft: 10
                            }}>비밀번호 확인</Button>
                    </div>
                    <Button
                        type="button"
                        onClick={changePasswordButtonClickHandler}
                        disabled={isDisabled}
                        style={{
                            backgroundColor: "#141414",
                            color: "#fff",
                            width: 464,
                            height: 56,
                            fontSize: 16,
                            borderRadius: 8,
                            opacity: isDisabled ? 0.5 : 1,
                        }}>비밀번호 변경
                    </Button>

                    <div style={{ display: 'flex', justifyContent: 'center', width: 241 }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/findId')}>아이디 찾기</div>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate('/signUp')}>회원가입</div>
                </div>
            }
        />
    )
}

export default FindPasswordSuccess;