import React, { useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';
import CustomAvatar from '../../../components/common/CustomAvatar';
import CustomModal from '../../../components/common/CustomModal';

interface StoreManageProps {
    initStatus?: boolean;
}

const StoreManage: React.FC<StoreManageProps> = ({ initStatus }) => {
    const [isEditMode, setIsEditMode] = useState(initStatus);
    const [storeInfo, setStoreInfo] = useState("");

    const storeNameRef = useRef<HTMLInputElement>(null);
    const storeInfoRef = useRef<HTMLTextAreaElement>(null);

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

    const onChangeStore = (value: string) => {
        setStoreInfo(value);
    }

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {!isEditMode ? (
                    <div><CustomAvatar size={130} /></div>
                ) : (
                    <div style={{ cursor: 'pointer' }} onClick={() => { }}><CustomAvatar size={130} /></div>
                )}
            </div>
            <div style={{ width: '100%' }}>
                {!isEditMode ? (
                    <>
                        <SettingItem type="top" content="상점명" element={<>youzede</>} />
                        <SettingItem type="bottom" height={111} content="상점 설명" element={
                            <div
                                style={{
                                    lineHeight: '1.5',
                                    maxHeight: '72px',
                                    wordBreak: 'break-all',
                                }}
                            >
                                내용
                            </div>
                        } />
                    </>
                ) : (
                    <>
                        <SettingItem type="top" content="상점명" element={
                            <input
                                ref={storeNameRef}
                                type="text"
                                value={'youzede'}
                                // onChange={e => setNickname(e.target.value)}
                                style={{ width: '100%', height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                            />
                        } />
                        <SettingItem type="bottom" height={111} content="상점 설명" element={
                            <textarea
                                ref={storeInfoRef}
                                value={storeInfo}
                                onChange={e => onChangeStore(e.target.value)}
                                style={{
                                    fontSize: 16,
                                    lineHeight: '1.5',
                                    width: '100%',
                                    height: '72px',
                                    borderRadius: 8,
                                    border: '1px solid #D9D9D9',
                                    padding: '8px 12px',
                                    fontWeight: 550
                                }}
                            />
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

export default StoreManage;