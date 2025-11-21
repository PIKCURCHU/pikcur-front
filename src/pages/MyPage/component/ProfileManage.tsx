import React, { useEffect, useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';
import { api } from '../../../common/api';

interface ProfileManageProps {
    initStatus?: boolean;
}

const ProfileManage: React.FC<ProfileManageProps> = ({ initStatus }) => {
    const [isEditMode, setIsEditMode] = useState(initStatus);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const initHandler = () => {
        api.get('/mypage/profile')
            .then((res) => {
                setName(res.name);
                setPhone(res.phone);
                setBirth(res.birth);
                setEmail(res.email);
                setCode('');
                setIsDisabled(true);
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                    return;
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })
    }

    const editModeChangeHandler = () => {
        setIsEditMode(!isEditMode);
    }

    const submitHandler = () => {
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

        api.put('/mypage/profile', { name, phone, birth })
            .then((res) => {
                if (res > 0) {
                    alert("프로필이 성공적으로 수정되었습니다.");
                    initHandler();
                } else {
                    alert("프로필 수정에 실패했습니다. 다시 시도해주세요.");
                    return;
                }
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                    return;
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })

        setIsEditMode(false);
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

    useEffect(() => {
        initHandler();
    }, []);

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
                {!isEditMode ? (
                    <>
                        <SettingItem type="top" content="이름" element={<>{name}</>} />
                        <SettingItem type="middle" content="전화번호" element={<>{phone}</>} />
                        <SettingItem type="middle" content="생년월일" element={<>{birth}</>} />
                        <SettingItem type="bottom" content="이메일" element={<>{email}</>} />
                    </>
                ) : (
                    <>
                        <SettingItem type="top" content="이름" element={
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                            />
                        } />
                        <SettingItem type="middle" content="전화번호" element={
                            <input
                                type="text"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                            />
                        } />
                        <SettingItem type="middle" content="생년월일" element={
                            <input
                                type="text"
                                value={birth}
                                onChange={e => setBirth(e.target.value)}
                                style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                            />
                        } />
                        <SettingItem type="middle" content="이메일 발송" element={
                            <>
                                <input
                                    readOnly
                                    type="text"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px', }}
                                />
                                <Button
                                    onClick={emailCodeButtonClickHandler}
                                    style={{ backgroundColor: '#D9D9D9', color: '#686868', fontSize: 12, fontWeight: 'bold', width: 112 }}>
                                    인증번호 발송
                                </Button>
                            </>
                        } />
                        <SettingItem type="bottom" content="인증" element={
                            <>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                                />
                                <Button
                                    onClick={verifyCodeButtonClickHandler}
                                    style={{ backgroundColor: '#D9D9D9', color: '#686868', fontSize: 12, fontWeight: 'bold', width: 112 }}>
                                    인증
                                </Button>
                            </>
                        } />
                    </>
                )
                }
            </div>
            <div style={{ width: '100%' }}>
                {!isEditMode ? (
                    <Button
                        style={{ width: '100%', height: '56px', backgroundColor: '#141414', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 'bold' }}
                        onClick={editModeChangeHandler}
                    >
                        수정
                    </Button>
                ) : (
                    <Button
                        disabled={isDisabled}
                        style={{
                            width: '100%',
                            height: '56px',
                            backgroundColor: '#141414',
                            color: '#fff',
                            borderRadius: 8,
                            fontSize: 16,
                            fontWeight: 'bold',
                            opacity: isDisabled ? 0.5 : 1
                        }}
                        onClick={submitHandler}
                    >
                        변경사항 저장
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ProfileManage;