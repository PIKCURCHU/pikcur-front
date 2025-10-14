import  React from 'react';
import { Button } from '@mui/material';
import BaseLayout from './BaseLayout';

interface TitleLayoutProps {
    title: string;
    subTitle?: string;
    content: React.ReactNode;
    leftButtonName?: string;
    rightButtonName?: string;
    leftButtonClickHandler?: () => void;
    rightButtonClickHandler?: () => void;
    icon?: React.ReactNode;
}

/** 제목(+아이콘), 소제목, 버튼(1~2) 레이아웃 (+좌우 마진)
 * 
 * @param title 상단 제목
 * @param subTitle 상단 제목 아래 소제목
 * @param content 중앙에 들어갈 컨텐츠
 * @param leftButtonName 좌측 검정버튼 이름(파라미터 전달 안하면 화면에 나오지 않음)
 * @param rightButtonName 우측 회색버튼 이름(파라미터 전달 안하면 화면에 나오지 않음)
 * @param leftButtonClickHandler 좌측 검정버튼 클릭 이벤트 함수
 * @param rightButtonClickHandler 우측 회색버튼 클릭 이벤트 함수
 * @param icon 상단 제목 우측에 들어갈 아이콘
 * @returns 
 */
const TitleLayout: React.FC<TitleLayoutProps> = ({ title, subTitle, content, leftButtonName, rightButtonName, leftButtonClickHandler, rightButtonClickHandler, icon }) => {
    return (
        <BaseLayout
            content={
                <>
                    <div>
                        <div style={{ fontSize: 32, fontWeight: 'bold', color: '#141414' }}>
                            {title} {icon}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 'normal', color: '#141414' }}>
                            {subTitle}
                        </div>
                    </div>

                    <div style={{ paddingTop: 40, flex: 1 }}>
                        {content}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingBottom: 16 }}>
                        {leftButtonName && (
                            <Button
                                style={{
                                    backgroundColor: '#141414',
                                    borderRadius: 8,
                                    width: 93,
                                    height: 40,
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    fontSize: 14
                                }}
                                onClick={leftButtonClickHandler}
                            >
                                {leftButtonName}
                            </Button>
                        )}
                        {rightButtonName && (
                            <Button
                                style={{
                                    backgroundColor: '#F2F2F2',
                                    borderRadius: 8,
                                    width: 93,
                                    height: 40,
                                    color: '#141414',
                                    fontWeight: 'bold',
                                    fontSize: 14
                                }}
                                onClick={rightButtonClickHandler}
                            >
                                {rightButtonName}
                            </Button>
                        )}
                    </div>
                </>
            }
        />
    );
};

export default TitleLayout;