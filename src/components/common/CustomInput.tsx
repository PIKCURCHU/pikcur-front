import * as React from 'react';

interface CustomInputProps {
    width: number | string;
    height: number;
    placeholder?: string;
    fontSize?: number;
    type?: string;
    value?: string;
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>)=>void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>)=>void;
}

/** 공통 input 컴포넌트
 * 
 * @param width 가로 크기
 * @param height 세로 크기
 * @param placeholder placeholder 텍스트
 * @param fontSize 텍스트 박스 글자 크기
 * @param value 텍스트 
 * @param disabled
 * @returns 
 */
const CustomInput: React.FC<CustomInputProps> = ({ width, height, placeholder, fontSize, type, value, disabled, onChange, onKeyDown }) => {
    return (
        <input type={type} placeholder={placeholder} value={value} disabled={disabled} onChange={onChange} onKeyDown={onKeyDown} style={{
            width: width,
            height: height,
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            padding: '0px 8px',
            fontSize: `${fontSize}px`,
            lineHeight: `${height}px`,
        }} />
    );
}

export default CustomInput;