import React, { useRef, useState } from 'react';
import { Button } from '@mui/material';
import CustomModal, { ManageModalHandle } from '../../components/common/CustomModal';

interface PaymentProps {
    receiver: string;
    setReceiver: (v: string) => void;
    phone: string;
    setPhone: (v: string) => void;
    address: string;
    setAddress: (v: string) => void;
    detailAddress: string;
    setDetailAddress: (v: string) => void;
    handleAddressSearch: () => void;
}

const Payment: React.FC<PaymentProps> = ({
    receiver, setReceiver,
    phone, setPhone,
    address, setAddress,
    detailAddress, setDetailAddress,
    handleAddressSearch
}) => {
        const productInfo = {
            name: '나이키 에어맥스 97',
            price: 189000
        };

        return (
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 22
            }}>
                <div style={{
                    background: '#F7F8FA',
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 8,
                    fontSize: 15,
                    color: '#141414'
                }}>
                    <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{productInfo.name}</div>
                    <div>상품 가격: <span style={{ fontWeight: 600 }}>{productInfo.price.toLocaleString()}원</span></div>
                </div>
                <input
                    type="text"
                    placeholder="받는 사람 이름"
                    value={receiver}
                    onChange={e => setReceiver(e.target.value)}
                    style={{
                        height: 40,
                        borderRadius: 8,
                        border: '1px solid #D9D9D9',
                        padding: '0 12px',
                        fontSize: 16,
                        marginBottom: 8
                    }}
                />
                <input
                    type="text"
                    placeholder="전화번호"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={{
                        height: 40,
                        borderRadius: 8,
                        border: '1px solid #D9D9D9',
                        padding: '0 12px',
                        fontSize: 16,
                        marginBottom: 8
                    }}
                />
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input
                        type="text"
                        placeholder="주소"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        style={{
                            flex: 1,
                            height: 40,
                            borderRadius: 8,
                            border: '1px solid #D9D9D9',
                            padding: '0 12px',
                            fontSize: 16
                        }}
                    />
                    <Button
                        onClick={handleAddressSearch}
                        style={{
                            height: 40,
                            minWidth: 90,
                            borderRadius: 8,
                            backgroundColor: '#F2F2F2',
                            color: '#141414',
                            fontSize: 15,
                            fontWeight: 500
                        }}
                    >
                        주소 검색
                    </Button>
                </div>
                <input
                    type="text"
                    placeholder="상세 주소"
                    value={detailAddress}
                    onChange={e => setDetailAddress(e.target.value)}
                    style={{
                        height: 40,
                        borderRadius: 8,
                        border: '1px solid #D9D9D9',
                        padding: '0 12px',
                        fontSize: 16,
                        marginBottom: 8
                    }}
                />
            </div>
        );
    };

export default Payment;