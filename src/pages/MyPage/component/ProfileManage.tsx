import React, { useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';

interface ProfileManageProps {
    initStatus?: boolean;
}

const ProfileManage: React.FC<ProfileManageProps> = ({ initStatus }) => {
    const [isEditMode, setIsEditMode] = useState(initStatus);

    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const birthRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const initHandler = () => {
        // 초기화 함수
    }

    const editModeChangeHandler = () => {
        setIsEditMode(!isEditMode);
    }

    const submitHandler = () => {
        // api 함수

        setIsEditMode(false);
    }

    const emailAuthNumberSender = () => {
        // 인증번호 발송 API 호출
    }

    const authHandler = () => {
        // 이메일 인증 API 호출
    }

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
                {!isEditMode ? (
                    <>
                        <SettingItem type="top" content="이름" element={<>정은유</>} />
                        <SettingItem type="middle" content="전화번호" element={<>010-1234-5678</>} />
                        <SettingItem type="middle" content="생년월일" element={<>1990-01-01</>} />
                        <SettingItem type="bottom" content="이메일" element={<>example@example.com</>} />
                    </>
                ) : (
                    <>
                        <SettingItem type="top" content="이름" element={
                            <input
                                ref={nameRef}
                                type="text"
                                value={'정은유'}
                                // onChange={e => setNickname(e.target.value)}
                                style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                            />
                        } />
                        <SettingItem type="middle" content="전화번호" element={
                            <input
                                ref={phoneRef}
                                type="text"
                                value={'010-1234-5678'}
                                // onChange={e => setNickname(e.target.value)}}}
                                style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                            />
                        } />
                        <SettingItem type="middle" content="생년월일" element={
                            <input
                                ref={birthRef}
                                type="text"
                                value={'1990-01-01'}
                                // onChange={e => setNickname(e.target.value)}
                                style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                            />
                        } />
                        <SettingItem type="middle" content="이메일 발송" element={
                            <>
                                <input
                                    ref={emailRef}
                                    type="text"
                                    value={'example@example.com'}
                                    // onChange={e => setNickname(e.target.value)}
                                    style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px', }}
                                />
                                <Button
                                    onClick={emailAuthNumberSender}
                                    style={{ backgroundColor: '#D9D9D9', color: '#686868', fontSize: 12, fontWeight: 'bold', width: 112 }}>
                                    인증번호 발송
                                </Button>
                            </>
                        } />
                        <SettingItem type="bottom" content="인증" element={
                            <>
                                <input
                                    ref={emailRef}
                                    type="text"
                                    value={'example@example.com'}
                                    // onChange={e => setNickname(e.target.value)}
                                    style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                                />
                                <Button
                                    onClick={authHandler}
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
                        style={{ width: '100%', height: '56px', backgroundColor: '#141414', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 'bold' }}
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