import React, { useEffect, useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button } from '@mui/material';
import CustomAvatar from '../../../components/common/CustomAvatar';
import { api } from '../../../common/api';

interface AccountEditProps {
    initStatus?: boolean;
    setSelectedSetting: React.Dispatch<React.SetStateAction<{ key: string; data?: any } | null>>;
    data?: AccountItem;
}

interface AccountItem {
    accountId: number;
    name: string;
    bank: string;
    accountNumber: string;
    isDefault: string;
}

const AccountEdit: React.FC<AccountEditProps> = ({ initStatus, setSelectedSetting, data }) => {

    const [accountId, setAccountId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [bank, setBank] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');

    const initHandler = () => {
        if (data) {
            setAccountId(data.accountId);
            setName(data.name);
            setBank(data.bank);
            setAccountNumber(data.accountNumber);
        }
    }

    const submitHandler = () => {

        if (!name) {
            alert("이름을 입력해주세요.");
            return;
        }
        if (!bank) {
            alert("은행을 입력해주세요.");
            return;
        }
        if (!accountNumber) {
            alert("계좌번호를 입력해주세요.");
            return;
        }

        api.put('/mypage/account', {
            accountId,
            name,
            bank,
            accountNumber
        })
            .then((res) => {
                if (res > 0) {
                    alert("계좌가 수정되었습니다.");
                    setSelectedSetting({ key: 'AccountManage' });
                } else {
                    alert("계좌 수정에 실패했습니다.");
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

    useEffect(() => {
        initHandler();
    }, [data])

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
                <>
                    <SettingItem type="top" content="예금주" element={
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="middle" content="은행" element={
                        <input
                            type="text"
                            value={bank}
                            onChange={e => setBank(e.target.value)}
                            style={{ width: 400, height: 32, borderRadius: 8, border: '1px solid #D9D9D9', padding: '0 8px' }}
                        />
                    } />
                    <SettingItem type="bottom" content="계좌번호" element={
                        <input
                            type="text"
                            value={accountNumber}
                            onChange={e => setAccountNumber(e.target.value)}
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