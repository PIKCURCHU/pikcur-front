import React, { useEffect, useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button, Radio } from '@mui/material';
import CustomModal from '../../../components/common/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../../common/api';

interface AddressManageProps {
    initStatus?: boolean;
    setSelectedSetting: React.Dispatch<React.SetStateAction<{ key: string; data?: any } | null>>;
}

interface AddressItem {
    addressId: number;
    name: string;
    address: string;
    addressDetail: string;
    phone: string;
    isDefault: string;
}


const AddressManage: React.FC<AddressManageProps> = ({ initStatus, setSelectedSetting }) => {
    const [isEditMode, setIsEditMode] = useState(initStatus);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    const [addressList, setAddressList] = useState<AddressItem[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [addressDetail, setAddressDetail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const deleteRef = useRef<any>(null);
    const addRef = useRef<any>(null);

    const initHandler = () => {
        api.get("/mypage/address")
            .then((res) => {
                const sortedList = res.sort((a: AddressItem, b: AddressItem) => {
                    if (a.isDefault === 'Y') return -1;
                    if (b.isDefault === 'Y') return 1;
                    return 0;
                });
                setAddressList(sortedList);
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

    const majorAddressSubmitHandler = () => {
        if (selectedId === null) {
            alert("배송지가 없습니다.");
            return;
        }

        api.put(`/mypage/address/${selectedId}/set-default`)
            .then((res) => {
                alert("주 배송지가 수정되었습니다.");
                initHandler();
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

    const submitHandler = () => {
        // api 함수

        setIsEditMode(false);
    }

    const showEditComponent = (addressId: number) => {
        const addressData = addressList.find(item => item.addressId === addressId);
        if (addressData) {
            setSelectedSetting({ key: 'AddressEdit', data: addressData });
        }
    }

    const handleDeleteClick = (addressId: number) => {
        setDeleteTargetId(addressId);
        deleteRef.current?.openModal();
    };

    const handleDeleteConfirm = () => {

        const addressId = deleteTargetId;
        api.delete(`/mypage/address/${addressId}`)
            .then((res) => {
                if (res > 0) {
                    alert("삭제가 완료되었습니다");
                    initHandler();
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

        setDeleteTargetId(null);
        deleteRef.current?.closeModal();
    };

    const handleAddressModalClose = () => {
        setName('');
        setAddress('');
        setAddressDetail('');
        setPhone('');
        addRef.current?.closeModal();
    };

    const handleSubmitHandler = () => {
        if (!name) {
            alert("이름을 입력해주세요.");
            return;
        }
        if (!phone) {
            alert("전화번호를 입력해주세요.");
            return;
        }
        if (!address) {
            alert("주소를 입력해주세요.");
            return;
        }
        if (!addressDetail) {
            alert("상세주소를 입력해주세요.");
            return;
        }

        api.post('/mypage/address', {
            name, phone, address, addressDetail
        })
        .then((res) => {
            if (res > 0) {
                alert("주소가 추가되었습니다.");
                handleAddressModalClose();
                initHandler()
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
    }

    const openAddressPopup = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data: any) {
                    const fullAddress = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
                    setAddress(fullAddress);
                }
            }).open();
        } else {
            alert('주소 검색 서비스를 불러올 수 없습니다.');
        }
    };

    useEffect(() => {
        initHandler();
    }, [])

    useEffect(() => {
        if (addressList.length > 0) {
            const defaultAddress = addressList.find(item => item.isDefault === "Y");

            if (defaultAddress) {
                setSelectedId(defaultAddress.addressId);
            } else {
                setSelectedId(addressList[0].addressId);
            }
        }
    }, [addressList]);

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto', minHeight: 0, flex: 1 }}>
                {addressList.length > 0 ? addressList.map((item: any) => (
                    <>
                        <div style={{ paddingBottom: 23 }}>
                            <SettingItem
                                key={item.addressId}
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
                                                onClick={() => showEditComponent(item.addressId)}
                                                style={{ fontSize: 14, borderRadius: 8, height: 32, color: '#141414', backgroundColor: '#F2F2F2' }}>수정</Button>
                                            <Button
                                                onClick={() => handleDeleteClick(item.addressId)}
                                                style={{ fontSize: 14, borderRadius: 8, height: 32, color: '#141414', backgroundColor: '#F2F2F2' }}>삭제</Button>
                                        </div>
                                    </div>
                                }
                                element={
                                    <Radio
                                        checked={selectedId === item.addressId}
                                        onChange={() => setSelectedId(item.addressId)}
                                        value={item.addressId}
                                        color="default"
                                    />
                                }
                                style={{
                                    border: selectedId === item.addressId
                                        ? '2px solid #141414'
                                        : '1px solid #D9D9D9',
                                    boxShadow: selectedId === item.addressId
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
                                onClick={openAddressPopup}
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
                            value={addressDetail}
                            onChange={(e) => setAddressDetail(e.target.value)}
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
                onLeftButtonClick={handleSubmitHandler}
                onRightButtonClick={handleAddressModalClose}
            />
        </div>
    );
};

export default AddressManage;