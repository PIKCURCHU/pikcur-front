import React, { useEffect, useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';
import CustomAvatar from '../../../components/common/CustomAvatar';
import { api } from '../../../common/api';

interface StoreManageProps {
    initStatus?: boolean;
}

const StoreManage: React.FC<StoreManageProps> = ({ initStatus }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [isEditMode, setIsEditMode] = useState(initStatus);

    const [storeId, setStoreId] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeInfo, setStoreInfo] = useState('');
    const [profile, setProfile] = useState<string | null>(null);

    const [profileFile, setProfileFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initHandler = () => {
        api.get('/mypage/store')
            .then((res) => {
                setStoreId(res.storeId);
                setStoreName(res.storeName);
                setStoreInfo(res.storeInfo);
                setProfile(res.profile);
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
        const body = {
            storeId,
            storeName,
            storeInfo
        }

        api.form.put('/mypage/store', body, profileFile || undefined, "store")
            .then((res) => {
                if (res > 0) {
                    alert("상점 정보가 수정되었습니다.");
                    initHandler();
                    setProfileFile(null);
                } else {
                    alert("상점 정보 수정에 실패했습니다.");
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

    const onChangeStore = (value: string) => {
        setStoreInfo(value);
    }

    const onChangeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setProfileFile(file);
        setProfile(URL.createObjectURL(file));
    };

    useEffect(() => {
        initHandler();
    }, [])

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {!isEditMode ? (
                    <div><CustomAvatar size={130} src={`${API_URL}${profile}`} /></div>
                ) : (
                    <>
                        <div style={{ cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
                            <CustomAvatar 
                                size={130} 
                                src={profileFile ? profile : `${API_URL}${profile}`} 
                            />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={onChangeFileHandler}
                        />
                    </>
                )}
            </div>
            <div style={{ width: '100%' }}>
                {!isEditMode ? (
                    <>
                        <SettingItem type="top" content="상점명" element={<>{storeName}</>} />
                        <SettingItem type="bottom" height={111} content="상점 설명" element={
                            <div
                                style={{
                                    lineHeight: '1.5',
                                    maxHeight: '72px',
                                    wordBreak: 'break-all',
                                }}
                            >
                                {storeInfo}
                            </div>
                        } />
                    </>
                ) : (
                    <>
                        <SettingItem type="top" content="상점명" element={
                            <input
                                type="text"
                                value={storeName}
                                onChange={e => setStoreName(e.target.value)}
                                style={{ width: '100%', height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                            />
                        } />
                        <SettingItem type="bottom" height={111} content="상점 설명" element={
                            <textarea
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