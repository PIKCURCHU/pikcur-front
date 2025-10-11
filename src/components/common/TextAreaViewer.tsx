import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';

interface SearchInputProps {
    content: string;
}

/** 공통 TextAreaViewer 컴포넌트
 * TextArea로 저장된 긴 데이터 저장 컴포넌트
 * 
 * @param content Viewer에 들어갈 데이터
 * @returns 
 */
const TextAreaViewer: React.FC<SearchInputProps> = ({ content }) => {

    return (
        <div
            style={{
                width: '1041px',
                fontSize: '16px',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap', 
                wordWrap: 'break-word',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                padding: '16px',
                boxSizing: 'border-box',
                color: "#757575"
            }}
        >
            {content}
        </div>
    );
};

export default TextAreaViewer;