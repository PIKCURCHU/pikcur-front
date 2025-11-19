import React, { use, useRef } from 'react';
import logo from '../../assets/images/PikcurLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons'; // ← 테두리만 있는 알람 아이콘
import SearchInput from './SearchInput';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import CustomAvatar from './CustomAvatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CustomModal from './CustomModal';
import { logout } from '../../common/utility';

interface HeaderProps {
    isBasic?: boolean;
    onSubmit?: () => void;
}

interface AlarmItemProps {
    src: string;
    title: string;
    content: string;
    createdDate: Date;
}

const now = new Date();

const getTimeOffset = (minutes: number): Date => {
    const d = new Date(now.getTime());
    d.setMinutes(d.getMinutes() - minutes);
    return d;
};

const alarmList: AlarmItemProps[] = [
    {
        src: "/img/auction_win.png",
        title: "낙찰",
        content: "회원님의 [빈티지 시계] 상품이 성공적으로 낙찰되었습니다.",
        createdDate: getTimeOffset(5) // 5분 전
    },
    {
        src: "/img/bid_alert.png",
        title: "입찰 알림",
        content: "주목하시던 [한정판 스니커즈]에 새로운 입찰이 등록되었습니다.",
        createdDate: getTimeOffset(15) // 15분 전
    },
    {
        src: "/img/chat.png",
        title: "새 메시지",
        content: "판매자 '김철수'님으로부터 새 메시지가 도착했습니다.",
        createdDate: getTimeOffset(30) // 30분 전
    },
    {
        src: "/img/qna.png",
        title: "문의 답변",
        content: "회원님의 상품 문의에 답변이 등록되었습니다. 확인해 주세요.",
        createdDate: getTimeOffset(60 * 2) // 2시간 전
    },
    {
        src: "/img/auction_end.png",
        title: "경매 종료",
        content: "[고급 커피 머신] 경매가 종료되었습니다. 낙찰되지 않았습니다.",
        createdDate: getTimeOffset(60 * 5) // 5시간 전
    },
    {
        src: "/img/bid_alert.png",
        title: "최고 입찰자 변경",
        content: "입찰하신 [레트로 게임기]의 최고 입찰자가 변경되었습니다.",
        createdDate: getTimeOffset(60 * 10) // 10시간 전
    },
    {
        src: "/img/system.png",
        title: "시스템 점검",
        content: "시스템 안정화 점검이 완료되었습니다. 서비스를 이용해 주세요.",
        createdDate: getTimeOffset(60 * 24) // 1일 전
    },
    {
        src: "/img/promo.png",
        title: "프로모션",
        content: "놓치면 안 될 주간 특별 할인 상품이 업데이트되었습니다!",
        createdDate: getTimeOffset(60 * 24 * 3) // 3일 전
    },
    {
        src: "/img/auction_win.png",
        title: "낙찰",
        content: "회원님의 [유럽 직수입 가방] 경매가 낙찰되었습니다.",
        createdDate: getTimeOffset(60 * 24 * 7) // 1주 전
    }
];

const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + "년 전";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + "달 전";
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "일 전";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "시간 전";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + "분 전";
    return Math.floor(seconds) + "초 전";
};


/** 공통 SearchInput 컴포넌트
 *
 * @TODO React Router 적용, searchInput onSubmit 기능 구현
 * @param isBasic Basic Layout 여부 (true: Basic Layout, false: Auth Layout)) - 기본값은 true
 * @param onSubmit SearchInput의 버튼 클릭 or 엔터 이벤트 함수
 * @returns 
 */
const Header: React.FC<HeaderProps> = ({ isBasic = true, onSubmit }) => {
    const { isAuth } = useAuth();

    const logoutModalRef = useRef<any>(null);

    const [isContactHovered, setIsContactHovered] = React.useState<boolean>(false);
    const [isHomeHovered, setIsHomeHovered] = React.useState<boolean>(false);
    const [isFAQHovered, setIsFAQHovered] = React.useState<boolean>(false);
    const [isQnaHovered, setIsQnaHovered] = React.useState<boolean>(false);

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 366 }} role="presentation">
            <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: '20px',
                marginLeft: '20px',
                alignItems: 'center'
            }}>
                <FontAwesomeIcon icon={faXmark} onClick={toggleDrawer(false)} style={{ cursor: 'pointer' }} />
                <Typography fontSize={22} fontWeight={'bold'}>알림</Typography>
            </div>
            <Divider sx={{ marginTop: '20px' }} />
            <div>
                {alarmList.map((alarm, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                width: "100%",
                                height: '90px',
                                alignItems: 'center',
                            }}>
                            <div style={{ marginLeft: "10px", marginRight: '10px' }}>
                                <CustomAvatar size={60} />
                            </div>

                            <div style={{ marginRight: 'auto' }}>
                                <Typography fontSize={15} fontWeight={'bold'}>{alarm.title}</Typography>
                                <Typography fontSize={13}>{alarm.content}</Typography>
                            </div>
                            <div style={{ marginRight: '10px' }}>
                                <Typography fontSize={13}>{timeAgo(alarm.createdDate)}</Typography>
                            </div>
                        </div>
                    );
                })}

            </div>
        </Box>
    );

    return (
        <div style={{ height: '105px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #F2F2F2' }}>
            <div style={{ width: '200px', paddingLeft: '20px' }}>
                <img src={logo} alt="Logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
            </div>

            {isBasic && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', width: '336px' }}>
                        <div style={{
                            fontSize: 22,
                            position: 'relative',
                            cursor: 'pointer',
                            height: "100%",
                            width: "100%",
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'center',
                            fontWeight: isHomeHovered ? 'bold' : 'normal'
                        }}
                            onMouseEnter={() => setIsHomeHovered(true)}
                            onMouseLeave={() => setIsHomeHovered(false)}
                            onClick={() => navigate('/')}
                        >Home</div>
                        <div style={{
                            fontSize: 22,
                            position: 'relative',
                            cursor: 'pointer',
                            height: "100%",
                            width: "100%",
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: 'center',
                            fontWeight: isContactHovered ? 'bold' : 'normal'
                        }}
                            onMouseEnter={() => setIsContactHovered(true)}
                            onMouseLeave={() => setIsContactHovered(false)}>
                            Contact Us
                            {/* contact 드롭다운 */}
                            {isContactHovered && (
                                <div style={{
                                    width: '100%',
                                    position: 'absolute',
                                    top: '100%',
                                    zIndex: '1300',
                                    backgroundColor: 'white',
                                    border: '1px solid #E0E0E0'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        paddingLeft: '30px',
                                        alignItems: 'center',
                                        height: '80px',
                                        fontWeight: isFAQHovered ? 'bold' : 'normal'
                                    }}
                                        onMouseEnter={() => setIsFAQHovered(true)}
                                        onMouseLeave={() => setIsFAQHovered(false)}
                                        onClick={() => navigate('/faq')}
                                    >FAQ</div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        paddingLeft: '30px',
                                        alignItems: 'center',
                                        height: '80px',
                                        fontWeight: isQnaHovered ? 'bold' : 'normal'
                                    }}
                                        onMouseEnter={() => setIsQnaHovered(true)}
                                        onMouseLeave={() => setIsQnaHovered(false)}
                                        onClick={() => { navigate('/questionList'); }}
                                    >1:1 문의</div>
                                </div>
                            )}
                        </div>

                    </div>



                    <div style={{ flex: 1 }} />

                    <div style={{ marginRight: '42px' }}>
                        <SearchInput width={200} height={40} placeholder='Search' onSubmit={onSubmit || (() => { })} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', width: '336px', paddingRight: '20px' }}>
                        <div style={{ borderRight: '2px solid #141414', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: 'bold' }}>
                            <span style={{ cursor: 'pointer' }} onClick={() => navigate(isAuth ? '/goodsform' : '/login')}>상품등록</span>
                        </div>
                        <div style={{ borderRight: '2px solid #141414', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: 'bold' }}>
                            <span style={{ cursor: 'pointer' }} onClick={() => navigate(isAuth ? '/storeDetail' : '/login')}>내 상점</span>
                        </div>
                        <div style={{ borderRight: '2px solid #141414', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 18, color: '#141414' }}>
                            <FontAwesomeIcon icon={faBell} style={{ cursor: 'pointer' }} onClick={toggleDrawer(true)} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: 'bold' }}>
                            <span 
                            style={{ cursor: 'pointer' }} 
                            onClick={() => {
                                if (isAuth) {
                                    logoutModalRef.current?.openModal();
                                } else {
                                    navigate('/login');
                                }
                            }}>
                                {isAuth ? '로그아웃' : '로그인'}
                            </span>
                        </div>
                    </div>
                    <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
                        {DrawerList}
                    </Drawer>
                </>
            )}

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
                    logout();
                    logoutModalRef.current?.closeModal();
                }}
            />
        </div>
    );

}

export default Header;