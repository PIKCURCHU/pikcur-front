import React, { useEffect, useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';
import { api } from '../../../common/api';

interface AddressItem {
    addressId: number;
    name: string;
    address: string;
    addressDetail: string;
    phone: string;
    isDefault: string;
}

interface AddressEditProps {
    initStatus?: boolean;
    setSelectedSetting: React.Dispatch<React.SetStateAction<{ key: string; data?: any } | null>>;
    data?: AddressItem;
}

const AddressEdit: React.FC<AddressEditProps> = ({ setSelectedSetting, data }) => {

    const [addressId, setAddressId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [addressDetail, setAddressDetail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const initHandler = () => {
        if (data) {
            setAddressId(data.addressId);
            setName(data.name);
            setAddress(data.address);
            setAddressDetail(data.addressDetail);
            setPhone(data.phone);
        }
    }

    const submitHandler = () => {

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
        if(!addressDetail) {
            alert("상세주소를 입력해주세요.");
            return;
        }

        api.put('/mypage/address', {
            addressId,
            name,
            address,
            addressDetail,
            phone
        })
            .then((res) => {
                if (res > 0) {
                    alert("주소가 수정되었습니다.");
                    setSelectedSetting({ key: 'AddressManage' });
                } else {
                    alert("주소 수정에 실패했습니다.");
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
    }, [data]);

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
                <>
                    <SettingItem type="top" content="이름" element={
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="middle" content="전화번호" element={
                        <input
                            type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="middle" content="주소" element={
                        <>
                            <input
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px', }}
                            />
                            <Button
                                onClick={openAddressPopup}
                                style={{ backgroundColor: '#D9D9D9', color: '#686868', fontSize: 12, fontWeight: 'bold', width: 112 }}>
                                주소검색
                            </Button>
                        </>
                    } />
                    <SettingItem type="bottom" content="상세주소" element={
                        <input
                            type="text"
                            value={addressDetail}
                            onChange={e => setAddressDetail(e.target.value)}
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