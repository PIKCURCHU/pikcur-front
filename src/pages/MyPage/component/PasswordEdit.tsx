import React, { useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';

interface PasswordEditProps {
    initStatus?: boolean;
}

const PasswordEdit: React.FC<PasswordEditProps> = ({ initStatus }) => {

    const storeNameRef = useRef<HTMLInputElement>(null);

    const initHandler = () => {
        // 초기화 함수
    }

    const submitHandler = () => {
        // api 함수

    }

    
    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
                <>
                    <SettingItem type="top" content="현재 비밀번호" element={
                        <input
                            ref={storeNameRef}
                            type="password"
                            value={'정은유'}
                            // onChange={e => setNickname(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="middle" content="새 비밀번호" element={
                        <input
                            ref={storeNameRef}
                            type="password"
                            value={'신한은행'}
                            // onChange={e => setNickname(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="bottom" content="새 비밀번호 확인" element={
                        <input
                            ref={storeNameRef}
                            type="password"
                            value={'110-222-222-222'}
                            // onChange={e => setNickname(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                </>
            </div>
            <div style={{ width: '100%' }}>
                <Button
                    style={{ width: '100%', height: '56px', backgroundColor: '#141414', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 'bold' }}
                    onClick={submitHandler}
                >
                    비밀번호 변경
                </Button>
            </div>
        </div>
    )
}

export default PasswordEdit;