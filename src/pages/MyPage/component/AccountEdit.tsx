import React, { useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';
import CustomAvatar from '../../../components/common/CustomAvatar';

interface AccountEditProps {
    initStatus?: boolean;
    setSelectedSetting: (key: string) => void;
}

const AccountEdit: React.FC<AccountEditProps> = ({ initStatus, setSelectedSetting }) => {

    const storeNameRef = useRef<HTMLInputElement>(null);

    const initHandler = () => {
        // 초기화 함수
    }

    const submitHandler = () => {
        // api 함수

        setSelectedSetting('AccountManage');
    }

    
    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
                <>
                    <SettingItem type="top" content="예금주" element={
                        <input
                            ref={storeNameRef}
                            type="text"
                            value={'정은유'}
                            // onChange={e => setNickname(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="middle" content="은행" element={
                        <input
                            ref={storeNameRef}
                            type="text"
                            value={'신한은행'}
                            // onChange={e => setNickname(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="bottom" content="계좌번호" element={
                        <input
                            ref={storeNameRef}
                            type="text"
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
                    변경사항 저장
                </Button>
            </div>
        </div>
    )
}

export default AccountEdit;