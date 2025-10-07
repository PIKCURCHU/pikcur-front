import * as React from 'react';

interface CustomInputProps {
    width: number;
    height: number;
}

/** 공통 input 컴포넌트
 * 
 * @param width 가로 크기
 * @param height 세로 크기
 * @returns 
 */
const CustomInput: React.FC<CustomInputProps> = ({width, height}) => {
    return (
        <input type="text" style={{
            width: width, 
            height: height,
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            backgroundColor: 'FFFFFF'
        }} />
    );
}

export default CustomInput;