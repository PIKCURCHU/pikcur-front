import React from 'react';
import SettingItem from '../../../components/common/SettingItem';


interface VersionInfoProps { }


const VersionInfo: React.FC<VersionInfoProps> = () => {
    return (
        <>
            <SettingItem
                type="single"
                height={'75%'}
                content=""
                maxWidth={'100%'}
                element={
                    <div style={{ width: '100%', height: '100%', padding: 32, paddingTop: 60, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
                            버전 정보
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, height: '100%' }}>
                            <div>
                                <strong>현재 앱 버전</strong> <br /><br />
                                v1.0.0
                            </div>
                            <div>
                                <strong>최신 업데이트 일자</strong> <br /><br />
                                2025-01-01
                            </div>
                            <div>
                                <strong>업데이트 안내</strong> <br /><br />
                                최신 기능과 안정성을 위해 앱을 항상 최신 버전으로 유지하세요. 새로운 기능 및 버그 수정이 포함될 수 있습니다.
                            </div>
                            <div style={{ paddingBottom: 30 }}>
                                <strong>문의 및 지원</strong> <br /><br />
                                버전 관련 문의 또는 기술 지원은 고객센터를 통해 문의해 주세요.
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    );
};


export default VersionInfo;