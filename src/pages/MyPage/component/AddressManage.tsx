import React, { useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button, Radio } from '@mui/material';
import CustomModal from '../../../components/common/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface AddressManageProps {
    initStatus?: boolean;
    setSelectedSetting: (key: string) => void;
}

// 임시 데이터
const tempData = [
    { id: 1, name: '홍길동', address: '제주특별자치도 제주시 우도면 우도해안길 364-13', phone: '010-1234-5678' },
    { id: 2, name: '김철수', address: '부산시 해운대구 해운대로 456', phone: '010-8765-4321' },
    { id: 3, name: '이영희', address: '대구시 수성구 달구벌대로 789', phone: '010-1111-2222' },
    { id: 4, name: '이영희', address: '대구시 수성구 달구벌대로 789', phone: '010-1111-2222' },
];

const AddressManage: React.FC<AddressManageProps> = ({ initStatus, setSelectedSetting }) => {
    const [isEditMode, setIsEditMode] = useState(initStatus);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    const [addressList, setAddressList] = useState(tempData);
    const [selectedId, setSelectedId] = useState<number | null>(addressList[0]?.id ?? null);

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
        setSelectedSetting('AddressEdit');
    }

    const handleDeleteClick = (id: number) => {
        setDeleteTargetId(id);
        deleteRef.current?.openModal();
    };

    const handleDeleteConfirm = () => {
        setAddressList(prev => {
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
                {addressList.length > 0 ? addressList.map(item => (
                    <>
                        <div style={{ paddingBottom: 23 }}>
                            <SettingItem
                                key={item.id}
                                type="single"
                                elementRight={true}
                                maxWidth="10%"
                                content={
                                    <div style={{ display: 'flex', gap: 9, flexDirection: 'column' }}>
                                        <div style={{ fontSize: 16, fontWeight: 'medium', color: '#141414', display: 'flex', flexDirection: "column", gap: 12 }}>
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
                                    minHeight: '161px',
                                }}
                            />
                        </div>
                    </>
                )) : (
                    <div style={{ padding: 23, textAlign: 'center', color: '#999' }}>
                        <div>배송지가 없습니다.</div>
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
                title="배송지 삭제"
                content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 'bold', color: '#141414' }}>해당 배송지를 삭제하시겠습니까?</div>
                    </div>
                }
                leftButtonContent="삭제"
                leftButtonColor="red"
                onLeftButtonClick={handleDeleteConfirm}
            />
            <CustomModal
                ref={addRef}
                title="배송지 추가"
                content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <input
                            type="text"
                            placeholder="이름"
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
                            placeholder="전화번호"
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
                        <div style={{ width: '82%', display: 'flex', gap: 8, height: 36 }}>
                            <input
                                type="text"
                                placeholder="주소"
                                style={{
                                    flex: 1,
                                    height: '100%',
                                    borderRadius: 8,
                                    border: '1px solid #D9D9D9',
                                    padding: '0 12px',
                                    fontSize: 15,
                                    boxSizing: 'border-box'
                                }}
                            />
                            <Button
                                style={{
                                    height: '100%',
                                    minWidth: 90,
                                    borderRadius: 8,
                                    backgroundColor: '#F2F2F2',
                                    color: '#141414',
                                    fontSize: 10,
                                    fontWeight: 700
                                }}
                            >배송지 검색</Button>
                        </div>
                        <input
                            type="text"
                            placeholder="상세 주소"
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

export default AddressManage;