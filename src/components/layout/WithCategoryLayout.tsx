import * as React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import CategorySidebar from '../common/CategorySidebar';

interface WithCategoryLayoutProps {
    topContent?: React.ReactNode;
    middleTopContent: React.ReactNode;
    middleBottomContent: React.ReactNode;
}

/** 카테고리가 포함된 레이아웃
 * 
 * @param topContent 상단에 들어갈 컨텐츠
 * @param middleTopContent 중앙 상단에 들어갈 컨텐츠
 * @param middleBottomContent 중앙 하단에 들어갈 컨텐츠
 * @returns 
 */
const WithCategoryLayout: React.FC<WithCategoryLayoutProps> = ({ topContent, middleTopContent, middleBottomContent }) => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <div style={{ flex: 1, marginRight: '110px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '239px' }}>
                        {topContent}
                    </div>

                    <div style={{ display: 'flex', flex: 1 }}>
                        <div style={{ width: '303px', display: 'flex', justifyContent: 'center' }}>
                            <CategorySidebar style={{ position: 'sticky', top: '60px', height: '100vh' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ height: '138px' }}>{middleTopContent}</div>
                            <div>{middleBottomContent}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default WithCategoryLayout;