import React, { useRef, useState } from 'react';
import MyPageLayout from '../../components/layout/MyPageLayout';
import SettingItem from '../../components/common/SettingItem';
import AccountManage from './component/AccountManage';
import StoreManage from './component/StoreManage';
import AddressManage from './component/AddressManage';
import ProfileManage from './component/ProfileManage';
import AlarmSetting from './component/AlarmSetting';
import BlockSetting from './component/BlockSetting';
import PrivacyPolicy from './component/PrivacyPolicy';
import TermOfService from './component/TermOfService';
import VersionInfo from './component/VersionInfo';
import PasswordEdit from './component/PasswordEdit';
import AddressEdit from './component/AddressEdit';
import AccountEdit from './component/AccountEdit';
import CustomModal from '../../components/common/CustomModal';
import AccountDeletion from './component/AccountDeletion';

const MyPage: React.FC = () => {
    const [menu, setMenu] = useState("profile");
    const [selectedSetting, setSelectedSetting] = useState<{ key: string; data?: any } | null>(null);

    const logoutModalRef = useRef<any>(null);

    const renderSettingComponent = () => {
        if (!selectedSetting) return null;

        const { key, data } = selectedSetting;

        switch (key) {
            case 'ProfileManage':
                return <ProfileManage initStatus={false} />;
            case 'StoreManage':
                return <StoreManage initStatus={false} />;
            case 'AddressManage':
                return <AddressManage initStatus={false} setSelectedSetting={setSelectedSetting} />;
            case 'AddressEdit':
                return <AddressEdit setSelectedSetting={setSelectedSetting} data={data} />;
            case 'AccountManage':
                return <AccountManage setSelectedSetting={setSelectedSetting} />;
            case 'AccountEdit':
                return <AccountEdit setSelectedSetting={setSelectedSetting}  />;
            case 'AlarmSetting':
                return <AlarmSetting />;
            case 'BlockSetting':
                return <BlockSetting />;
            case 'PrivacyPolicy':
                return <PrivacyPolicy />;
            case 'TermOfService':
                return <TermOfService />;
            case 'VersionInfo':
                return <VersionInfo />;
            case 'PasswordEdit':
                return <PasswordEdit />;
            case 'AccountDeletion':
                return <AccountDeletion />;
            default:
                return null;
        }
    };

    const onMenuClick = (value: string) => {
        setMenu(value);
        setSelectedSetting(null);
    };

    const handleSettingClick = (key: string) => {
        setSelectedSetting({key});
    };

    return (
        <div>
            <MyPageLayout
                menu={menu}
                onMenuClick={onMenuClick}
                content={
                    selectedSetting ? (
                        <div style={{ width: '100%', height: 'calc(100% - 30px)' }}>
                            {renderSettingComponent()}
                        </div>
                    ) : (
                        menu === "profile" ? (
                            <div style={{ width: '100%' }}>
                                <SettingItem type="top" content="계정 관리" element={<></>} onClick={() => handleSettingClick('ProfileManage')} />
                                <SettingItem type="middle" content="상점 관리" element={<></>} onClick={() => handleSettingClick('StoreManage')} />
                                <SettingItem type="middle" content="배송지 관리" element={<></>} onClick={() => handleSettingClick('AddressManage')} />
                                <SettingItem type="bottom" content="내 계좌 관리" element={<></>} onClick={() => handleSettingClick('AccountManage')} />
                            </div>
                        ) : (
                            <>
                                <div style={{ marginBottom: 32, width: '100%' }}>
                                    <SettingItem type="top" content="알림 설정" element={<></>} onClick={() => handleSettingClick('AlarmSetting')} />
                                    <SettingItem type="middle" content="차단 설정" element={<></>} onClick={() => handleSettingClick('BlockSetting')} />
                                    <SettingItem type="middle" content="개인정보처리방침" element={<></>} onClick={() => handleSettingClick('PrivacyPolicy')} />
                                    <SettingItem type="middle" content="이용약관" element={<></>} onClick={() => handleSettingClick('TermOfService')} />
                                    <SettingItem type="bottom" content="버전 정보" element={<></>} onClick={() => handleSettingClick('VersionInfo')} />
                                </div>
                                <div style={{ marginBottom: 32, width: '100%' }}>
                                    <SettingItem type="top" content="비밀번호 변경" element={<></>} onClick={() => handleSettingClick('PasswordEdit')} />
                                    <SettingItem type="bottom" content="로그아웃" element={<></>} onClick={() => logoutModalRef.current?.openModal()} />
                                </div>
                                <div style={{ width: '100%' }}>
                                    <SettingItem type="single" content="탈퇴하기" element={<></>} onClick={() => handleSettingClick('AccountDeletion')} />
                                </div>
                            </>
                        )
                    )
                }
            />
            
            <CustomModal
                ref={logoutModalRef}
                title="로그아웃"
                content={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 16, fontWeight: 'bold', color: '#141414' }}>로그아웃 하시곘습니까?</div>
                    </div>
                }
                leftButtonContent="로그아웃"
                onLeftButtonClick={() => {
                    alert('로그아웃 로직 실행');
                    logoutModalRef.current?.closeModal();
                }}
            />
        </div>
    );
};

export default MyPage;
