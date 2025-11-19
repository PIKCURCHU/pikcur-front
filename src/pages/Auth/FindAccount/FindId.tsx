import React, { useState } from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import CustomInput from '../../../components/common/CustomInput';
import { Button } from '@mui/material';
import { api } from '../../../common/api';
import { useNavigate } from 'react-router-dom';

interface FindIdProps {
    test?: string;
}

const FindId: React.FC<FindIdProps> = () => {

    const navigate = useNavigate();

    const [isDisabled, setIsDisabled] = useState(true);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const emailCodeButtonClickHandler = () => {

        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

        if (!regEmail.test(email)) {
            alert('이메일 형식에 따라 정확히 입력해주세요');
            return;
        }

        api.post("/auth/email/send-code-for-find", { email })
            .then((res) => {
                alert("인증번호가 발송되었습니다.");
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    switch (errorData.code) {
                        case "MAIL_SEND_FAIL":
                            alert("메일 전송에 실패했습니다. 다시 시도해주세요.");
                            break;
                        default:
                            alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                            break;
                    }
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            });
    }

    const verifyCodeButtonClickHandler = () => {
        if (!code) {
            alert("인증 번호를 입력해주세요.");
            return;
        }

        api.post("/auth/email/verify-code", { email, code })
            .then((res) => {
                alert("인증이 완료되었습니다.");
                setIsDisabled(false);
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    switch (errorData.code) {
                        case "EXPIRATION":
                            alert("인증 시간이 만료되었습니다. 인증번호를 다시 발급 받아주세요.");
                            break;
                        case "INCONSISTENCY":
                            alert("인증 번호가 일치하지 않습니다. 다시 확인해주세요.");
                            break;
                        default:
                            alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                            break;
                    }
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setIsDisabled(true);
        setCode("");
    }

    const nextButtonClickHandler = () => {
        api.post("/auth/members/find-id", { email })
            .then((res) => {
                navigate('/findIdSuccess', { state: { id: res.data } });
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    switch (errorData.code) {
                        case "NOT_FOUND":
                            alert("존재하지 않는 회원입니다.");
                            break;
                        default:
                            alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                            break;
                    }
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })
    }

    return (
        <AuthLayout
            title="아이디 찾기"
            content={
                <div style={{ height: '346px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <div>
                        <CustomInput 
                        width={326} 
                        height={56} 
                        placeholder="이메일" 
                        value={email} 
                        onChange={(e) => onEmailChange(e)} />
                        <Button
                            onClick={emailCodeButtonClickHandler}
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
                    <div>
                        <CustomInput width={326} height={56} placeholder="인증 번호 입력" value={code} onChange={(e) => setCode(e.target.value)} />
                        <Button
                            onClick={verifyCodeButtonClickHandler}
                            style={{
                                backgroundColor: "#D9D9D9",
                                color: "#686868",
                                fontSize: 16,
                                width: 112,
                                height: 56,
                                borderRadius: 8,
                                marginLeft: 10
                            }}>인증하기</Button>
                    </div>
                    <Button
                        type="button"
                        disabled={isDisabled}
                        onClick={nextButtonClickHandler}
                        style={{
                            backgroundColor: "#141414",
                            color: "#fff",
                            width: 464,
                            height: 56,
                            fontSize: 16,
                            borderRadius: 8,
                            opacity: isDisabled ? 0.5 : 1,
                        }}>다음
                    </Button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 241 }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/findPassword')}>비밀번호 찾기</div>
                        <div>/</div>
                        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>로그인</div>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => navigate('/signUp')}>회원가입</div>
                </div>
            }
        />
    )
}

export default FindId;