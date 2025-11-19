import React, { useState } from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import CustomInput from '../../../components/common/CustomInput';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { api } from '../../../common/api';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {
    test?: string;
}

const SignUp: React.FC<SignUpProps> = () => {

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');

    const [idCheck, setIdCheck] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);

    const idDuplicateCheckButtonClickHandler = () => {
        if (id === '') {
            alert("아이디를 입력해주세요.");
            return;
        }

        if (id) {
            api.post('/auth/members/duplicate-id', { id })
                .then((res) => {
                    if (res > 0) {
                        alert("이미 사용 중인 아이디 입니다.");
                        setId('');
                        setIdCheck(false);
                        return;
                    }
                    alert("사용 가능한 아이디입니다.");
                    setIdCheck(true);
                })
                .catch((err) => {
                    const errorData = err.response?.data;
                    if (errorData) {
                        alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                    } else {
                        alert("서버와 연결할 수 없습니다.");
                    }
                })
        }
    }

    const passwordConfirmButtonClickHandler = () => {
        if (!password || !confirmPassword) {
            alert("비밀번호와 비밀번호 재입력을 모두 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            setPasswordCheck(false);
            return;
        } else if (password === confirmPassword) {
            alert("비밀번호가 일치합니다.");
            setPasswordCheck(true);
        }
    }

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

        api.post("/auth/email/send-code-for-signup", { email })
            .then((res) => {
                alert("인증번호가 발송되었습니다.");
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    switch (errorData.code) {
                        case "DUPLICATE":
                            alert("이미 가입된 이메일입니다.");
                            break;
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
                setEmailCheck(true);
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

    const onSubmitHandler = () => {
        if (!idCheck) {
            alert("아이디 중복 확인을 해주세요.");
            return;
        }

        if (!passwordCheck) {
            alert("비밀번호 확인을 해주세요.");
            return;
        }

        if (!emailCheck) {
            alert("이메일 인증을 해주세요.");
            return;
        }

        if (!name) {
            alert("이름을 입력해주세요.");
            return;
        }

        if (!phone) {
            alert("전화번호를 입력해주세요.");
            return;
        } else if (phone) {
            const regPhone = /^010-\d{4}-\d{4}$/;

            if (!regPhone.test(phone)) {
                alert("전화번호 형식에 맞게 입력해주세요. (010-0000-0000)");
                return;
            }
        }

        if (!birth) {
            alert("생년월일을 입력해주세요.");
            return;
        } else if (birth) {
            const regBirth = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
            if (!regBirth.test(birth)) {
                alert("생년월일 형식에 맞게 입력해주세요. (YYYY-MM-DD)");
                return;
            }
        }

        if (!gender) {
            alert("성별을 선택해주세요.");
            return;
        }

        api.post("/auth/members/signup", { id, password, email, name, phone, birth, gender })
            .then((res) => {
                if (res > 1) {
                    alert("회원가입이 완료되었습니다.");
                    navigate('/login');
                    return;
                } else {
                    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                }
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })
    }

    return (
        <AuthLayout
            style={{ paddingTop: 80, paddingBottom: 80 }}
            title="회원가입"
            content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <div>
                        <CustomInput
                            width={326}
                            height={56}
                            placeholder="아이디"
                            value={id}
                            onChange={(e) => {
                                setId(e.target.value)
                                setIdCheck(false);
                            }} />
                        <Button
                            onClick={idDuplicateCheckButtonClickHandler}
                            style={{
                                backgroundColor: "#D9D9D9",
                                color: "#686868",
                                fontSize: 16,
                                width: 112,
                                height: 56,
                                borderRadius: 8,
                                marginLeft: 10
                            }}>중복 확인</Button>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <CustomInput
                            type="password"
                            width={326}
                            height={56}
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordCheck(false);
                            }} />
                        <div
                            style={{
                                width: 112,
                                height: 56,
                                marginLeft: 10,
                                visibility: 'hidden',
                            }} />
                    </div>
                    <div>
                        <CustomInput
                            type="password"
                            width={326}
                            height={56}
                            placeholder="비밀번호 재입력"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setPasswordCheck(false);
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
                    <div>
                        <CustomInput
                            width={326}
                            height={56}
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setEmailCheck(false);
                                setCode('');
                            }} />
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
                        <CustomInput
                            width={326}
                            height={56}
                            placeholder="인증번호 입력"
                            value={code}
                            onChange={(e) => setCode(e.target.value)} />
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
                    <div style={{ display: 'flex' }}>
                        <CustomInput
                            width={326}
                            height={56}
                            placeholder="이름"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }} />
                        <div
                            style={{
                                width: 112,
                                height: 56,
                                marginLeft: 10,
                                visibility: 'hidden',
                            }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <CustomInput width={326} height={56} placeholder="전화번호 (010-0000-0000)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <div
                            style={{
                                width: 112,
                                height: 56,
                                marginLeft: 10,
                                visibility: 'hidden',
                            }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <CustomInput width={326} height={56} placeholder="생년월일 (YYYY-MM-DD)" value={birth} onChange={(e) => setBirth(e.target.value)} />
                        <div
                            style={{
                                width: 112,
                                height: 56,
                                marginLeft: 10,
                                visibility: 'hidden',
                            }} />
                    </div>
                    <div style={{ display: 'flex', width: '100%', paddingBottom: 80 }}>
                        <RadioGroup
                            defaultValue="M"
                            row
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <FormControlLabel value="M" control={<Radio />} label="남자" />
                            <FormControlLabel value="F" control={<Radio />} label="여자" />
                        </RadioGroup>
                        <div
                            style={{
                                width: 112,
                                height: 56,
                                marginLeft: 10,
                                visibility: 'hidden',
                            }} />
                    </div>
                    <Button
                        type="button"
                        onClick={onSubmitHandler}
                        style={{
                            backgroundColor: "#2563EB",
                            color: "#fff",
                            width: 464,
                            height: 56,
                            fontSize: 16,
                            borderRadius: 8,
                        }}>회원가입
                    </Button>
                </div>
            }
        />
    )
}

export default SignUp;