import React, { useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';
import CustomAvatar from '../../../components/common/CustomAvatar';

interface AddressEditProps {
    initStatus?: boolean;
    setSelectedSetting: (key: string) => void;
}

const AddressEdit: React.FC<AddressEditProps> = ({ initStatus, setSelectedSetting }) => {
    const storeNameRef = useRef<HTMLInputElement>(null);

    const initHandler = () => {
        // 초기화 함수
    }

    const submitHandler = () => {
        // api 함수

        setSelectedSetting('AddressManage');
    }

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
                <>
                    <SettingItem type="top" content="이름" element={
                        <input
                            ref={storeNameRef}
                            type="text"
                            value={'정은유'}
                            // onChange={e => setNickname(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="middle" content="전화번호" element={
                        <input
                            ref={storeNameRef}
                            type="text"
                            value={'010-1234-5678'}
                            // onChange={e => setNickname(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="middle" content="주소" element={
                        <>
                            <input
                                type="text"
                                value={'베트남 빈옌'}
                                // onChange={e => setNickname(e.target.value)}
                                style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px', }}
                            />
                            <Button
                                style={{ backgroundColor: '#D9D9D9', color: '#686868', fontSize: 12, fontWeight: 'bold', width: 112 }}>
                                주소검색
                            </Button>
                        </>
                    } />
                    <SettingItem type="bottom" content="상세주소" element={
                        <input
                            ref={storeNameRef}
                            type="text"
                            value={'Start 4 610호'}
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

export default AddressEdit;