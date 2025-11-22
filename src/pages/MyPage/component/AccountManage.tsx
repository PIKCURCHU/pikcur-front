import React, { useEffect, useRef, useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button, Radio } from '@mui/material';
import CustomModal from '../../../components/common/CustomModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { api } from '../../../common/api';


interface AccountManageProps {
    initStatus?: boolean;
    setSelectedSetting: React.Dispatch<React.SetStateAction<{ key: string; data?: any } | null>>;
}

interface AccountItem {
    accountId: number;
    name: string;
    bank: string;
    accountNumber: string;
    isDefault: string;
}

const AccountManage: React.FC<AccountManageProps> = ({ initStatus, setSelectedSetting }) => {
    const [isEditMode, setIsEditMode] = useState(initStatus);
    const [accountList, setAccountList] = useState<AccountItem[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(accountList[0]?.accountId ?? null);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

    const [name, setName] = useState<string>('');
    const [bank, setBank] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');

    const deleteRef = useRef<any>(null);
    const addRef = useRef<any>(null);

    const initHandler = () => {
        api.get('/mypage/account')
            .then((res) => {
                const sortedList = res.sort((a: AccountItem, b: AccountItem) => {
                    if (a.isDefault === 'Y') return -1;
                    if (b.isDefault === 'Y') return 1;
                    return 0;
                });
                setAccountList(sortedList);
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

    const majorAccountSubmitHandler = () => {
        if (selectedId === null) {
            alert("계좌가 없습니다.");
            return;
        }

        api.put(`/mypage/account/${selectedId}/set-default`)
            .then((res) => {
                alert("주 계좌가 수정되었습니다.");
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
        setIsEditMode(false);
    }

    const handleSubmitHandler = () => {
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

        api.post('/mypage/account', {
            name, bank, accountNumber
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

    const handleAddressModalClose = () => {
        setName('');
        setBank('');
        setAccountNumber('');
        addRef.current?.closeModal();
    };

    const showEditComponent = (accountId: number) => {
        const accountData = accountList.find(item => item.accountId === accountId);
        if (accountData) {
            setSelectedSetting({ key: 'AccountEdit', data: accountData });
        }
    }

    const handleDeleteClick = (accountId: number) => {
        setDeleteTargetId(accountId);
        deleteRef.current?.openModal();
    };

    const handleDeleteConfirm = () => {

        const accountId = deleteTargetId;
        api.delete(`/mypage/account/${accountId}`)
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

    useEffect(() => {
        initHandler();
    }, [])

    useEffect(() => {
        if (accountList.length > 0) {
            const defaultAccount = accountList.find(item => item.isDefault === "Y");

            if (defaultAccount) {
                setSelectedId(defaultAccount.accountId);
            } else {
                setSelectedId(accountList[0].accountId);
            }
        }
    }, [accountList]);

    return (
        <div style={{ width: '100%', height: '448px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto', minHeight: 0, flex: 1 }}>
                {accountList.length > 0 ? accountList.map(item => (
                    <div style={{ paddingBottom: 23 }}>
                        <SettingItem
                            key={item.accountId}
                            type="single"
                            elementRight={true}
                            maxWidth="10%"
                            content={
                                <div style={{ display: 'flex', gap: 9, flexDirection: 'column' }}>
                                    <div style={{ fontSize: 16, fontWeight: 'medium', color: '#141414', display: 'flex', flexDirection: "row", gap: 12 }}>
                                        <div>{item.name}</div>
                                        <div>{item.bank}</div>
                                        <div>{item.accountNumber}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <Button
                                            onClick={() => showEditComponent(item.accountId)}
                                            style={{ fontSize: 14, borderRadius: 8, height: 32, color: '#141414', backgroundColor: '#F2F2F2' }}>수정</Button>
                                        <Button
                                            onClick={() => handleDeleteClick(item.accountId)}
                                            style={{ fontSize: 14, borderRadius: 8, height: 32, color: '#141414', backgroundColor: '#F2F2F2' }}>삭제</Button>
                                    </div>
                                </div>
                            }
                            element={
                                <Radio
                                    checked={selectedId === item.accountId}
                                    onChange={() => setSelectedId(item.accountId)}
                                    value={item.accountId}
                                    color="default"
                                />
                            }
                            style={{
                                border: selectedId === item.accountId
                                    ? '2px solid #141414'
                                    : '1px solid #D9D9D9',
                                boxShadow: selectedId === item.accountId
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
                        onClick={majorAccountSubmitHandler}
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
                            value={name}
                            onChange={e => setName(e.target.value)}
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
                            value={bank}
                            onChange={e => setBank(e.target.value)}
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
                            value={accountNumber}
                            onChange={e => setAccountNumber(e.target.value)}
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
                onLeftButtonClick={handleSubmitHandler}
                onRightButtonClick={handleAddressModalClose}
            />
        </div>
    );
};

export default AccountManage;