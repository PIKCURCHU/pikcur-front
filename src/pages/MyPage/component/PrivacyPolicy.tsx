import React from 'react';
import SettingItem from '../../../components/common/SettingItem';

interface PrivacyPolicyProps {

}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
    return (
        <>
            <SettingItem
                type="single"
                height={'100%'}
                content=""
                maxWidth={'100%'}
                element={
                    <div style={{ width: '100%', height: '100%', padding: 32, paddingTop: 60, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>
                            개인정보처리방침
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, height: '100%' }}>
                            <div>
                                <strong>제1조 (목적)</strong> <br /><br />
                                본 약관은 Acme Co(이하 "회사"라 합니다)가 제공하는 모든 서비스(이하 "서비스"라 합니다)의 이용조건 및 절차, 회사와 회원 간의 권리, 의무, 책임사항 및 기타 필요한 사항을 규정함을 목적으로 합니다.
                            </div>
                            <div>
                                <strong>제2조 (용어의 정의)</strong> <br /><br />
                                본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                                <ol >
                                    <li>"서비스"라 함은 회사가 제공하는 모든 제반 서비스를 의미합니다.</li>
                                    <li>"회원"이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
                                    <li> "아이디(ID)"라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.</li>
                                    <li>"비밀번호"라 함은 회원이 부여받은 아이디와 일치되는 회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자 또는 숫자의 조합을 의미합니다.</li>
                                    <li> "게시물"이라 함은 회원이 서비스를 이용함에 있어 서비스상에 게시한 부호, 문자, 음성, 음향, 화상, 동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.</li>
                                </ol>
                            </div>
                            <div style={{ paddingBottom: 30 }}>
                                <strong>제3조 (서비스 이용)</strong> <br /><br />
                                회원은 회사가 제공하는 서비스를 이용함에 있어 관련 법령 및 본 약관, 회사가 정한 정책을 준수하여야 하며,
                                서비스를 이용하면서 얻은 정보를 회사의 사전 승인 없이 복제, 전송, 출판, 배포, 방송 등
                                상업적 목적으로 사용할 수 없습니다. 또한, 회원은 서비스 이용 과정에서 타인의 권리를 침해하거나
                                불법적 행위를 해서는 안 되며, 위반 시 회사는 이용 제한, 계정 정지 등 필요한 조치를 취할 수 있습니다.
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default PrivacyPolicy;