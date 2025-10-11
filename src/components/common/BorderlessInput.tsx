import * as React from 'react';
import { InputBase, InputBaseProps } from '@mui/material';
import { styled } from '@mui/system';

interface BorderlessInputProps {
    type: string; 
    value?: string;
}

/** 설정 요소 내부에서 사용할 외곽선 less 컴포넌트
 * 
 * @param type input type - ex) password, text
 * @returns 
 */
const BorderlessInput: React.FC<BorderlessInputProps> = ({type, value}) => {
  return <input value={value} type={type} style={{border: "none", width:"300px", height:"25px", textAlign: "right", outline:"none"}} />
};

export default BorderlessInput;