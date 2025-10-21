import React from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import CustomInput from '../../../components/common/CustomInput';
import { Button } from '@mui/material';

interface FindPasswordPropsSuccess {
    test?: string;
}

const FindPasswordSuccess: React.FC<FindPasswordPropsSuccess> = () => {
    return (
        <AuthLayout
            title="비밀번호 변경"
            subMsg="변경할 비밀번호를 입력해주세요."
            content={
                <div style={{ height: '346px', display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <CustomInput width={448} height={56} placeholder="비밀번호 입력" />
                    <div>
                        <CustomInput width={326} height={56} placeholder="비밀번호 재입력" />
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
                            }}>비밀번호 확인</Button>
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
                        }}>비밀번호 변경
                    </Button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: 241 }}>
                        <div style={{ cursor: 'pointer' }} onClick={() => { }}>아이디 찾기</div>
                        <div>/</div>
                        <div style={{ cursor: 'pointer' }} onClick={() => { }}>로그인</div>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={() => { }}>회원가입</div>
                </div>
            }
        />
    )
}

export default FindPasswordSuccess;