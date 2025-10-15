import * as React from 'react';
import logo from '../../assets/images/PikcurLogo.png'
import { Button, MenuItem, Pagination, Select } from '@mui/material';
import SearchInput from '../common/SearchInput';

interface ManageLayoutProps {
    title: string;
    selectList: string[];
    pageCount: number;
    searchInputText: string;
    searchHandler: () => void;
    onSelectChangeHandler: (value: string) => void;
    onPageChangeHandler: (page: number) => void;
    onClickButtonHandler?: () => void;
    content: React.ReactNode;
}

/** 관리자 페이지에서 사용할 레이아웃
 * @TODO React Router 적용
 * @example 
 * function App() {
 *  const handleSelectChange = (value: string) => {
 *    console.log("선택된 값:", value);
 *    // ✅ 여기에 필터링, API 호출 등 원하는 동작 수행
 *  };
 *
 *  const handlePageChange = (page: number) => {
 *    console.log("현재 페이지:", page);
 *    // ✅ 여기에 페이지 변경에 따른 동작 수행
 *  };
 *  return (
 *    <div>
 *      <ManageLayout
 *        title="text"
 *        selectList={["사랑스러운", "귀엽고 깜찍한", "애기공쥬", "떠니"]}
 *        pageCount={20}
 *        searchInputText="뭘 검색하실 건가"
 *        searchHandler={() => { }}
 *        onSelectChangeHandler={handleSelectChange}
 *        onPageChangeHandler={handlePageChange}
 *        content={<div>여기에 중앙 컨텐츠 들어감</div>}
 *      />
 *    </div>
 *  );
 *}
 * 
 * @param title 페이지 제목
 * @param selectList 셀렉트 박스에 들어갈 항목 리스트
 * @param pageCount 페이지네이션 페이지 개수
 * @param searchInputText 검색창 placeholder 텍스트
 * @param searchHandler 검색창에서 엔터 또는 버튼 클릭 시 실행할 함수
 * @param onSelectChangeHandler 셀렉트 박스에서 요소 선택시 실행할 함수
 * @param onPageChangeHandler 페이지네이션에서 페이지 변경시 실행할 함수
 * @param onClickButtonHandler 우측 하단 버튼 클릭시 실행할 함수
 * @param content 중앙에 들어갈 컨텐츠
 * @returns 
 */

const ManageLayout: React.FC<ManageLayoutProps> = ({
    title, selectList, pageCount, searchInputText, searchHandler, onSelectChangeHandler, onPageChangeHandler, onClickButtonHandler, content
}) => {

    const [value, setValue] = React.useState('');
    const [page, setPage] = React.useState(1);

    const handleSelectChange = (e: any) => {
        const newValue = e.target.value;
        setValue(newValue);

        // 콜백 함수 (함수를 전달받았을 떄 해당 함수 실행)
        if (onSelectChangeHandler) {
            onSelectChangeHandler(newValue);
        }
    };


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        // 콜백 함수 (함수를 전달받았을 떄 해당 함수 실행)
        if (onPageChangeHandler) onPageChangeHandler(value);
    };

    const menuList = [
        { label: '카테고리 관리', path: '/admin/category' },
        { label: '사용자 관리', path: '/admin/user' },
        { label: '알람 관리', path: '/admin/alarm' },
        { label: '신고 관리', path: '/admin/report' },
        { label: '문의 관리', path: '/admin/question' },
        { label: 'FAQ 관리', path: '/admin/faq' },
        { label: '상품 관리', path: '/admin/goods' },
        { label: '배송 관리', path: '/admin/shipping' },
    ];

    const currentPath = window.location.pathname;

    return (
        <div>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
                <div style={{ backgroundColor: '#293846', width: '177px', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                    <div style={{ borderBottom: '1px solid #fff', width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '36px', paddingTop: '36px', marginBottom: '20px' }}>
                        <img src={logo} alt="Logo" style={{ cursor: 'pointer' }} />
                    </div>
                    {menuList.map((menu) => (
                        <div
                            key={menu.path}
                            // onClick={() => navigate(menu.path)}
                            style={{
                                width: 116,
                                cursor: 'pointer',
                                color: currentPath === menu.path ? '#00BFFF' : 'white',
                                transition: 'color 0.2s',
                            }}
                        >
                            {menu.label}
                        </div>
                    ))}
                </div>
                <div style={{ height: '100vh', width: 'calc(100% - 177px)' }}>
                    <div style={{ height: '112px', borderBottom: '1px solid #F2F2F2' }}>
                        <div style={{ fontWeight: 'bold', fontSize: 14, color: '#141414', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', paddingRight: 60 }}>
                            <text onClick={() => { }} style={{ cursor: 'pointer' }}>로그아웃</text> {/* TODO: 클릭 이벤트 추가 */}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 113px)', marginLeft: 60, marginRight: 60 }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ color: '#141414', fontSize: '28px', fontWeight: 'bold', flex: 1, paddingTop: 40 }}>{title}</div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 11, justifyContent: 'flex-end', paddingBottom: 20 }}>
                                <Select value={value} displayEmpty style={{ width: 150, height: 40 }} onChange={handleSelectChange} >
                                    <MenuItem value="">
                                        <em>전체</em>
                                    </MenuItem>
                                    {selectList.map((item: string, index: number) => (
                                        <MenuItem key={index} value={index + 1}>{item}</MenuItem>
                                    ))}
                                </Select>
                                <SearchInput width={200} height={40} placeholder={searchInputText} onSubmit={searchHandler} />
                            </div>
                        </div>

                        <div style={{ flex: 3 }}>
                            {content}
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20 }}>
                                {onClickButtonHandler &&
                                    <Button
                                        style={{ backgroundColor: '#141414', borderRadius: '8px', width: '93px', height: '40px', color: '#fff' }}
                                        onClick={onClickButtonHandler}
                                    >등록</Button>
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Pagination count={pageCount} color="primary" page={page} onChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ManageLayout;