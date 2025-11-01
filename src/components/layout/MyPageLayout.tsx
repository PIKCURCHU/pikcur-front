import * as React from 'react';
import BaseLayout from './BaseLayout';
import Header from '../common/Header';
import Footer from '../common/Footer';
import SettingList from '../common/SettingList';

interface MyPageLayoutProps {
    content: React.ReactNode;
    onMenuClick: (menu: string) => void;
    menu?: string;
}

/** 기본 레이아웃 (좌우 마진)
 * 
 * @param content 레이아웃 안에 들어갈 콘텐츠
 * @returns 
 */
const MyPageLayout: React.FC<MyPageLayoutProps> = ({ content, onMenuClick, menu }) => {
    return (
        <>
            <div style={{ minHeight: '100vh' }}>
                <Header />
                <div style={{
                    marginLeft: '220px',
                    marginRight: '220px',
                    display: 'flex',
                    flexDirection: 'row',
                    height: 'calc(100vh - 105px)',
                    paddingLeft: 7,
                    paddingRight: 7,
                }}>
                    <div style={{ width: '35%', height: '100%', borderRight: '1px solid #E5E8EB', borderLeft: '1px solid #E5E8EB', display: 'flex', flexDirection: 'column', gap: 50, alignItems: 'center' }}>
                        <div
                            style={{
                                borderBottom: '3px solid #E5E8EB',
                                width: '75%',
                                paddingTop: 160,
                                paddingBottom: 5,
                                fontWeight: 'bold',
                                fontSize: 20,
                                height: '48px',
                                color: menu === "profile" ? '#141414' : '#757575',
                            }}
                        >
                            <text style={{ cursor: 'pointer' }} onClick={() => onMenuClick("profile")}>내 정보 관리</text>
                        </div>
                        <div
                            style={{
                                borderBottom: '3px solid #E5E8EB',
                                width: '75%',
                                paddingTop: 5,
                                paddingBottom: 5,
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: menu === "settings" ? '#141414' : '#757575',
                                height: '48px'
                            }}
                        >
                            <text style={{ cursor: 'pointer' }} onClick={() => onMenuClick("settings")}
                            >설정</text>
                        </div>
                    </div>
                    <div style={{ width: '65%' , height: '100%' }}>
                        <SettingList children={content} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default MyPageLayout;