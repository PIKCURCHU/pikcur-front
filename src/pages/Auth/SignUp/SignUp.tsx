import React from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import CustomInput from '../../../components/common/CustomInput';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface SignUpProps {
    test?: string;
}

const SignUp: React.FC<SignUpProps> = () => {
    return (
        <AuthLayout
            style={{ paddingTop: 80, paddingBottom: 80 }}
            title="회원가입"
            content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <div>
                        <CustomInput width={326} height={56} placeholder="아이디" />
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
                            }}>중복 확인</Button>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <CustomInput width={326} height={56} placeholder="비밀번호" />
                        <div
                            style={{
                                width: 112,
                                height: 56,
                                marginLeft: 10,
                                visibility: 'hidden',
                            }} />
                    </div>
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
                    <div>
                        <CustomInput width={326} height={56} placeholder="이메일" />
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
                    <div>
                        <CustomInput width={326} height={56} placeholder="인증번호 입력" />
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
                            }}>인증번호 확인</Button>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <CustomInput width={326} height={56} placeholder="이름" />
                        <div
                            style={{
                                width: 112,
                                height: 56,
                                marginLeft: 10,
                                visibility: 'hidden',
                            }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <CustomInput width={326} height={56} placeholder="전화번호" />
                        <div
                            style={{
                                width: 112,
                                height: 56,
                                marginLeft: 10,
                                visibility: 'hidden',
                            }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <CustomInput width={326} height={56} placeholder="생년월일 (YYYY-MM-DD)" />
                        <div
                            style={{
                                width: 112,
                                height: 56,
                                marginLeft: 10,
                                visibility: 'hidden',
                            }} />
                    </div>
                    <div style={{ display: 'flex', width: '100%', paddingBottom : 80 }}>
                        <RadioGroup
                            defaultValue="Male"
                            row
                        >
                            <FormControlLabel value="male" control={<Radio />} label="남자" />
                            <FormControlLabel value="female" control={<Radio />} label="여자" />
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
                        onClick={() => { }}
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