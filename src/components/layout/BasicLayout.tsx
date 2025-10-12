import * as React from 'react';

interface BasicLayoutProps {
    type: string;
    value?: string;
}

/** 로그인, 회원가입, 비밀번호/아이디 찾기 화면에서 사용할 Layouot 컴포넌트
 * 
 * @param type input type - ex) password, text
 * @returns 
 */
const BasicLayout: React.FC<BasicLayoutProps> = ({ type, value }) => {
    return (
        <div>
            <div style={{ marginLeft: '416px', marginRight: '416px' }}>

            </div>
        </div>
    )
};

export default BasicLayout;