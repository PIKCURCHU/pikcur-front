import * as React from 'react';

interface FooterProps {
}

/** 사이트에서 사용하는 공통 Footer 컴포넌트 */
const Footer: React.FC<FooterProps> = () => {
    return (
         <footer
            style={{
                width: '100%',
                borderTop: '1px solid #E0E0E0',
                padding: '20px 40px',
                backgroundColor: '#ffffff',
                fontSize: '13px',
                color: '#555',
                boxSizing: 'border-box',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                }}
            >
                {/* 회사 정보 */}
                <div style={{ lineHeight: '1.8' }}>
                    <strong>Pikcur</strong><br />
                    대표: 홍길동 | 사업자등록번호: 123-45-67890<br />
                    주소: 서울특별시 강남구 테헤란로 123, Pikcur 빌딩<br />
                    이메일: support@pikcur.com
                </div>

                {/* 정책 링크 */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        alignItems: 'flex-end',
                        textAlign: 'right',
                    }}
                >
                    <span style={{ cursor: 'pointer' }}>이용약관</span>
                    <span style={{ cursor: 'pointer' }}>개인정보처리방침</span>
                    <span style={{ cursor: 'pointer' }}>고객센터</span>
                </div>
            </div>

            {/* 저작권 */}
            <div
                style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    fontSize: '12px',
                    color: '#999',
                }}
            >
                © 2025 Pikcur. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
