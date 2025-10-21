import React, { useRef } from 'react';
import AuthLayout from '../../../components/layout/AuthLayout';
import { Button, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import TermsOfServiceModal, { ManageModalHandle } from './component/TermsOfServiceModal';

interface TermsOfServiceProps {
    test?: string;
}

const TermsOfService: React.FC<TermsOfServiceProps> = () => {

    const termModalRef = useRef<ManageModalHandle>(null);
    const privacyModalRef = useRef<ManageModalHandle>(null);
    const serviceModalRef = useRef<ManageModalHandle>(null);

    return (
        <AuthLayout
            style={{ paddingTop: 80, paddingBottom: 80 }}
            title="이용 약관 동의"
            subMsg='회원가입을 위해 아래 약관에 동의해주세요.'
            subMsgColor='#141414'
            content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', width: '100%', marginBottom: 80, height: '373px', border: '1px solid #E0E0E0', borderRadius: 8, flexDirection: 'column' }}>
                        <div style={{ flex: 1, borderBottom: '1px solid #E0E0E0', width: '100%', display: 'flex', alignItems: 'center', padding: '0px 26px' }}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label={<span style={{ color: '#525252', fontSize: 20 }}>약관 동의</span>}
                            />
                        </div>
                        <div style={{ flex: 5, borderBottom: '1px solid #E0E0E0', width: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: 3, padding: '0px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontSize: 23, color: '#141414', fontWeight: 'bold', paddingBottom: 20 }}>필수 항목</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={<span style={{ color: '#525252', fontSize: 20 }}>이용약관 동의</span>}
                                    />
                                    <div onClick={() => termModalRef.current?.openModal()} style={{ cursor: 'pointer', color: '#003FE9' }}>내용 보기 &nbsp;&nbsp;&gt;</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={<span style={{ color: '#525252', fontSize: 20 }}>개인정보 수집 및 이용 동의</span>}
                                    />
                                    <div onClick={() => privacyModalRef.current?.openModal()} style={{ cursor: 'pointer', color: '#003FE9' }}>내용 보기 &nbsp;&nbsp;&gt;</div>
                                </div>
                            </div>
                            <div style={{ flex: 2, padding: '0px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontSize: 23, color: '#141414', fontWeight: 'bold', paddingBottom: 20 }}>선택 항목</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={<span style={{ color: '#525252', fontSize: 20 }}>마케팅 정보 수신 동의</span>}
                                    />
                                    <div onClick={() => serviceModalRef.current?.openModal()} style={{ cursor: 'pointer', color: '#525252' }}>자세히 &nbsp;&nbsp;&gt;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        type="button"
                        onClick={() => { }}
                        style={{
                            backgroundColor: "#2563EB",
                            color: "#fff",
                            width: 464,
                            height: 56,
                            fontSize: 16,
                            borderRadius: 8,
                        }}>다음 단계
                    </Button>

                    <TermsOfServiceModal
                        ref={termModalRef}
                        title="이용약관"
                        content={
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
                        }
                    />
                    <TermsOfServiceModal
                        ref={privacyModalRef}
                        title="개인 정보 수집 및 이용"
                        content={
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 30, height: '100%' }}>
                                <div>
                                    <strong>제1조 (수집하는 개인정보 항목)</strong> <br /><br />
                                    회사는 회원가입, 서비스 이용, 상담 등을 위해 아래와 같은 개인정보를 수집할 수 있습니다.
                                    이름, 이메일, 연락처, 아이디 및 비밀번호, 서비스 이용 기록, 접속 로그, 쿠키 등 회원이 제공하거나 자동으로 생성되는 정보가 포함됩니다.
                                </div>
                                <div>
                                    <strong>제2조 (개인정보 수집 및 이용 목적)</strong> <br /><br />
                                    수집된 개인정보는 다음과 같은 목적을 위해 사용됩니다.
                                    <ul >
                                        <li>서비스 제공 및 회원 관리</li>
                                        <li>본인 식별 및 인증</li>
                                        <li>서비스 개선 및 맞춤형 서비스 제공</li>
                                        <li>고지사항 전달, 고객 상담, 불만 처리 등</li>
                                    </ul>
                                </div>
                                <div style={{ paddingBottom: 30 }}>
                                    <strong>제3조 (개인정보의 보유 및 이용 기간)</strong> <br /><br />
                                    회원의 개인정보는 수집 및 이용 목적이 달성될 때까지 보유하며, 관련 법령에 따라 일정 기간 보관 후 안전하게 파기합니다.
                                    단, 법령에서 별도로 정한 경우에는 해당 기간 동안 보관할 수 있습니다. 회원은 언제든지 개인정보 열람, 수정, 삭제를 요청할 수 있으며,
                                    회사는 합리적인 절차를 거쳐 요청사항을 처리합니다.
                                </div>
                            </div>
                        }
                    />
                    <TermsOfServiceModal
                        ref={serviceModalRef}
                        title="마켓팅 정보 수신"
                        content={
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
                        }
                    />
                </div>
            }
        />
    )
}

export default TermsOfService;