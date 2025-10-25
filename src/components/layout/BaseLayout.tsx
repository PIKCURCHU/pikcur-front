import * as React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

interface BaseLayoutProps {
    content: React.ReactNode;
}

/** 기본 레이아웃 (좌우 마진)
 * 
 * @param content 레이아웃 안에 들어갈 콘텐츠
 * @returns 
 */
const BaseLayout: React.FC<BaseLayoutProps> = ({ content }) => {
    return (
        <>
            <div style={{ minHeight: '100vh' }}>
                <Header />
                <div style={{
                    marginLeft: '220px',
                    marginRight: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 'calc(100vh - 154px)',
                    paddingLeft: 7,
                    paddingRight: 7,
                    paddingTop: 49,
                }}>
                    {content}
                </div>
            </div>
            <Footer />
        </>
    )
};

export default BaseLayout;