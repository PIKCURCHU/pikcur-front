import React from 'react';
import SettingItem from '../../../components/common/SettingItem';

interface TermOfServiceProps {

}

const TermOfService: React.FC<TermOfServiceProps> = () => {
    return (
        <>
            <SettingItem
                type="single"
                height={'70%'}
                content=""
                maxWidth={'100%'}
                element={
                    <div style={{ width: '100%', height: '100%', padding: 32, paddingTop: 60, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
                            이용약관
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, height: '100%' }}>
                            <div>
                                <strong>제1조 (수집 및 이용 목적)</strong> <br /><br />
                                회사는 회원에게 다양한 마케팅 정보, 이벤트, 프로모션, 신규 서비스 안내 등을 제공하기 위해 회원의 연락처(이메일, 휴대전화번호 등)를 활용할 수 있습니다.
                                수집된 정보는 맞춤형 광고 및 서비스 개선을 위한 분석 목적으로도 사용될 수 있습니다.
                            </div>
                            <div>
                                <strong>제2조 (수신 동의 및 거부)</strong> <br /><br />
                                회원은 마케팅 정보 수신에 동의하지 않을 권리가 있으며, 동의하지 않아도 서비스 이용에 제한이 없습니다.
                                동의 후에도 언제든지 수신 거부를 요청할 수 있으며, 회사는 즉시 처리합니다.
                            </div>
                            <div style={{ paddingBottom: 30 }}>
                                <strong>제3조 (보유 및 이용 기간)</strong> <br /><br />
                                마케팅 정보 수신을 위한 개인정보는 동의 철회 또는 회원 탈퇴 시까지 보유 및 이용됩니다.
                                단, 관련 법령에 따라 보관이 필요한 경우에는 해당 기간 동안 안전하게 보관됩니다.
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default TermOfService;