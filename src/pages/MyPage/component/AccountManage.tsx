import React, { useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button, Radio } from '@mui/material';
import CustomModal from '../../../components/common/CustomModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface AccountManageProps {
    initStatus?: boolean;
    setSelectedSetting: (key: string) => void;
}

// 임시 데이터
const tempData = [
    { id: 1, name: '홍길동', address: '농협은행', phone: '12314125-1234-15' },
    { id: 2, name: '김철수', address: '신한은행', phone: '3523413-12341234-1' },
    { id: 3, name: '이영희', address: '기업은행', phone: '010-1111-2222' },
    { id: 4, name: '감동란', address: '기업은행', phone: '010-1111-2222' },
];

const AccountManage: React.FC<AccountManageProps> = ({ initStatus, setSelectedSetting }) => {
    const [isEditMode, setIsEditMode] = useState(initStatus);
    const [accountList, setAccountList] = useState(tempData);
    const [selectedId, setSelectedId] = useState<number | null>(accountList[0]?.id ?? null);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

    const deleteRef = useRef<any>(null);
    const addRef = useRef<any>(null);

    const initHandler = () => {
        // 초기화 함수
    }


    const editModeChangeHandler = () => {
        setIsEditMode(!isEditMode);
    }

    const majorAddressSubmitHandler = () => {

    }

    const submitHandler = () => {
        // api 함수

        setIsEditMode(false);
    }

    const showEditComponent = () => {
        setSelectedSetting('AccountEdit');
    }

    const handleDeleteClick = (id: number) => {
        setDeleteTargetId(id);
        deleteRef.current?.openModal();
    };

    const handleDeleteConfirm = () => {
        setAccountList(prev => {
            const updated = prev.filter(item => item.id !== deleteTargetId);
            setSelectedId(updated[0]?.id ?? null);
            return updated;
        });
        setDeleteTargetId(null);
        deleteRef.current?.closeModal();
    };

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto', minHeight: 0, flex: 1 }}>
                {accountList.length > 0 ? accountList.map(item => (
                    <div style={{ paddingBottom: 23 }}>
                        <SettingItem
                            key={item.id}
                            type="single"
                            elementRight={true}
                            maxWidth="10%"
                            content={
                                <div style={{ display: 'flex', gap: 9, flexDirection: 'column' }}>
                                    <div style={{ fontSize: 16, fontWeight: 'medium', color: '#141414', display: 'flex', flexDirection: "row", gap: 12 }}>
                                        <div>{item.name}</div>
                                        <div>{item.address}</div>
                                        <div>{item.phone}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <Button
                                            onClick={showEditComponent}
                                            style={{ fontSize: 14, borderRadius: 8, height: 32, color: '#141414', backgroundColor: '#F2F2F2' }}>수정</Button>
                                        <Button
                                            onClick={() => handleDeleteClick(item.id)}
                                            style={{ fontSize: 14, borderRadius: 8, height: 32, color: '#141414', backgroundColor: '#F2F2F2' }}>삭제</Button>
                                    </div>
                                </div>
                            }
                            element={
                                <Radio
                                    checked={selectedId === item.id}
                                    onChange={() => setSelectedId(item.id)}
                                    value={item.id}
                                    color="default"
                                />
                            }
                            style={{
                                border: selectedId === item.id
                                    ? '2px solid #141414'
                                    : '1px solid #D9D9D9',
                                boxShadow: selectedId === item.id
                                    ? '0 0 0 2px #E6F4FF'
                                    : 'none',
                                transition: 'border 0.2s',
                                minHeight: '98px',
                            }}
                        />
                    </div>
                )) : (
                    <div style={{ padding: 23, textAlign: 'center', color: '#999' }}>
                        <div>등록된 계좌가 없습니다.</div>
                    </div>
                )}

                <div style={{ paddingBottom: 23 }}>
                    <SettingItem
                        type="single"
                        elementRight={true}
                        maxWidth="0%"
                        content={
                            <div style={{ display: 'flex', gap: 9, flexDirection: 'column' }}>
                                <Button
                                    onClick={() => addRef.current?.openModal()}
                                    style={{
                                        fontSize: 16,
                                        borderRadius: 8,
                                        height: 40,
                                        color: '#141414',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    추가
                                </Button>
                            </div>
                        }
                        element={
                            <></>
                        }
                    />
                </div>
            </div>
            <div style={{ width: '100%' }}>
                {!isEditMode ? (
                    <Button
                        style={{ width: '100%', height: '56px', backgroundColor: '#141414', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 'bold' }}
                        onClick={majorAddressSubmitHandler}
                    >
                        주 배송지 수정
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

            <CustomModal
                ref={deleteRef}
                title="계좌 삭제"
                content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 'bold', color: '#141414' }}>해당 계좌를 삭제하시겠습니까?</div>
                    </div>
                }
                leftButtonContent="삭제"
                leftButtonColor="red"
                onLeftButtonClick={handleDeleteConfirm}
            />

            <CustomModal
                ref={addRef}
                title="계좌 추가"
                content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <input
                            type="text"
                            placeholder="예금주"
                            style={{
                                width: '82%',
                                height: 36,
                                borderRadius: 8,
                                border: '1px solid #D9D9D9',
                                padding: '0 12px',
                                fontSize: 15,
                                boxSizing: 'border-box'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="은행"
                            style={{
                                width: '82%',
                                height: 36,
                                borderRadius: 8,
                                border: '1px solid #D9D9D9',
                                padding: '0 12px',
                                fontSize: 15,
                                boxSizing: 'border-box'
                            }}
                        />
                        <input
                            type="text"
                            placeholder="계좌번호"
                            style={{
                                width: '82%',
                                height: 36,
                                borderRadius: 8,
                                border: '1px solid #D9D9D9',
                                padding: '0 12px',
                                fontSize: 15,
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                }
                leftButtonContent="추가"
                onLeftButtonClick={handleDeleteConfirm}
            />
        </div>
    );
};

export default AccountManage;