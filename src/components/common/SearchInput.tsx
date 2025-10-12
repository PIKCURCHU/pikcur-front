import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';

interface SearchInputProps {
    width: number;
    height: number;
    placeholder: string;
    onSubmit: () => void;
    fontSize?: number;
}

/** 공통 SearchInput 컴포넌트
 * 
 * @param width 가로 크기
 * @param height 세로 크기
 * @param placeholder placeholder 텍스트
 * @param onSubmit 버튼 클릭 or 엔터 이벤트 함수
 * @param fontSize 텍스트 박스 폰트 크기
 * @returns 
 */
const SearchInput: React.FC<SearchInputProps> = ({ width, height, placeholder, onSubmit, fontSize = 16 }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 기존 이벤트 방지 (sumit 이벤트 방지)
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                placeholder={placeholder}
                style={{
                    width,
                    height,
                    borderTop: '1px solid #D9D9D9',
                    borderBottom: '1px solid #D9D9D9',
                    borderLeft: '1px solid #D9D9D9',
                    borderRight: 'none',
                    borderRadius: '8px 0 0 8px',
                    backgroundColor: '#F2F2F2',
                    outline: 'none',
                    boxSizing: 'border-box',
                    padding: '0 8px',
                    fontSize: `${fontSize}px`,
                }}
            />
            <button
                type="submit"
                style={{
                    width: height,
                    height: height,
                    borderTop: '1px solid #D9D9D9',
                    borderBottom: '1px solid #D9D9D9',
                    borderRight: '1px solid #D9D9D9',
                    borderLeft: 'none',
                    borderRadius: '0 8px 8px 0',
                    backgroundColor: '#F2F2F2',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                }}
            >
                <FontAwesomeIcon icon={faSearch} color="#757575" />
            </button>
        </form>
    );
};

export default SearchInput;