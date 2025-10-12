import React from 'react';
import logo from '../../assets/images/PikcurLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons'; // ← 테두리만 있는 알람 아이콘
import SearchInput from './SearchInput';

interface HeaderProps {
    isBasic?: boolean;
    isAuth?: boolean;
    onSubmit?: () => void;
}

/** 공통 SearchInput 컴포넌트
 * 
 * @param isBasic Basic Layout 여부 (true: Basic Layout, false: Auth Layout)) - 기본값은 true
 * @param isAuth 인증 여부 (true: 로그아웃 표출, false: 로그인 표출)
 * @param onSubmit SearchInput의 버튼 클릭 or 엔터 이벤트 함수
 * @returns 
 */
const Header: React.FC<HeaderProps> = ({ isBasic = true, isAuth, onSubmit }) => {
    return (
        <div style={{ height: '105px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #F2F2F2' }}>
            <div style={{ width: '200px', paddingLeft: '20px' }}>
                <img src={logo} alt="Logo" style={{ cursor: 'pointer' }} />
            </div>

            {isBasic && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', width: '336px' }}>
                        <div style={{ fontSize: 22 }}>Home</div>
                        <div style={{ fontSize: 22 }}>Contact Us</div>
                    </div>

                    <div style={{ flex: 1 }} />

                    <div style={{ marginRight: '42px' }}>
                        <SearchInput width={200} height={40} placeholder='Search' onSubmit={onSubmit || (() => {})} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', width: '336px', paddingRight: '20px' }}>
                        <div style={{ borderRight: '2px solid #141414', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: 'bold' }}>상품등록</div>
                        <div style={{ borderRight: '2px solid #141414', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: 'bold' }}>내 상점</div>
                        <div style={{ borderRight: '2px solid #141414', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18, color: '#141414' }}>
                            <FontAwesomeIcon icon={faBell} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: 'bold' }}>
                            {isAuth ? '로그아웃' : '로그인'}
                        </div>
                    </div>
                </>
            )}
        </div>
    );

}

export default Header;