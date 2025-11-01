import React, { useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';
import CustomAvatar from '../../../components/common/CustomAvatar';
import CustomModal from '../../../components/common/CustomModal';

interface AccountDeletionProps {
    initStatus?: boolean;
}

const AccountDeletion: React.FC<AccountDeletionProps> = ({ initStatus }) => {

    const storeNameRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<any>(null);

    const initHandler = () => {
        // 초기화 함수
    }

    const submitHandler = () => {
        // api 함수

        submitRef.current?.openModal();
    }

    
    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
                <>
                    <SettingItem type="single" content="비밀번호" element={
                        <input
                            ref={storeNameRef}
                            type="password"
                            value={'정은유'}
                            // onChange={e => setNickname(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                </>
            </div>
            <div style={{ width: '100%' }}>
                <Button
                    style={{ width: '100%', height: '56px', backgroundColor: '#FF5050', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 'bold' }}
                    onClick={submitHandler}
                >
                    탈퇴하기
                </Button>
            </div>

            <CustomModal
                ref={submitRef}
                title="탈퇴"
                content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 'bold', color: '#141414' }}>탈퇴하시겠습니까?</div>
                    </div>
                }
                leftButtonContent="탈퇴하기"
                leftButtonColor="red"
                onLeftButtonClick={() => {
                    alert('탈퇴 실행');
                    submitRef.current?.closeModal();
                }}
            />
        </div>
    )
}

export default AccountDeletion;