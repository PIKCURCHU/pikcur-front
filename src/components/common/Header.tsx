import React, { use, useEffect, useRef } from 'react';
import logo from '../../assets/images/PikcurLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons'; // ← 테두리만 있는 알람 아이콘
import SearchInput from './SearchInput';
import { Box, Divider, Drawer, Typography } from '@mui/material';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import CustomAvatar from './CustomAvatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CustomModal from './CustomModal';
import stompClient, { api } from '../../common/api';

interface HeaderProps {
    isBasic?: boolean;
    onSubmit?: () => void;
}

interface AlarmItemProps {
    imagePath: string;
    alarmTitle: string;
    alarmContent: string;
    createDate: Date;
}

const now = new Date();

const getTimeOffset = (minutes: number): Date => {
    const d = new Date(now.getTime());
    d.setMinutes(d.getMinutes() - minutes);
    return d;
};

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
    const { isAuth, logout } = useAuth();

    const logoutModalRef = useRef<any>(null);

    const [isContactHovered, setIsContactHovered] = React.useState<boolean>(false);
    const [isHomeHovered, setIsHomeHovered] = React.useState<boolean>(false);
    const [isFAQHovered, setIsFAQHovered] = React.useState<boolean>(false);
    const [isQnaHovered, setIsQnaHovered] = React.useState<boolean>(false);
    const [alarmList, setAlarmList] = React.useState<AlarmItemProps[]>([]);

    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        api.get('/alarm')
            .then((res) => {
                setAlarmList(res);
            })
            .catch((err) => {
                const errorData = err.response?.data;
                if (errorData) {
                    alert(errorData.message || "알 수 없는 오류가 발생했습니다.");
                    return;
                } else {
                    alert("서버와 연결할 수 없습니다.");
                }
            })
    }, []);

    useEffect(() => {
        const handleAlarm = (alarm: any) => {
            setAlarmList((prev) => [alarm, ...prev]);
        };

        // 이벤트 listener 등록
        stompClient._alarmListener = handleAlarm;
    }, []);

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
                                <Typography fontSize={15} fontWeight={'bold'}>{alarm.alarmTitle}</Typography>
                                <Typography fontSize={13}>{alarm.alarmContent}</Typography>
                            </div>
                            <div style={{ marginRight: '10px' }}>
                                <Typography fontSize={13}>{timeAgo(new Date(alarm.createDate))}</Typography>
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
                            <span style={{ cursor: 'pointer' }} onClick={() => navigate(isAuth ? '/myStore' : '/login')}>내 상점</span>
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