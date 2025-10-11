import * as React from 'react';

interface CustomInputProps {
    width: number;
    height: number;
    placeholder?: string;
    fontSize?: number;
}

/** 공통 input 컴포넌트
 * 
 * @param width 가로 크기
 * @param height 세로 크기
 * @param placeholder placeholder 텍스트
 * @param fontSize 텍스트 박스 글자 크기
 * @returns 
 */
const CustomInput: React.FC<CustomInputProps> = ({ width, height, placeholder, fontSize }) => {
    return (
        <input type="text" placeholder={placeholder} style={{
            width: width,
            height: height,
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            padding: '0px 8px',
            fontSize: `${fontSize}px`,
        }} />
    );
}

export default CustomInput;