import styled from '@emotion/styled'
import * as React from 'react';

interface CustomTextareaProps {
  width: number;
  height: number;
  placeholder: string; 
  fontSize: number;
  value?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>)=>void;}

interface StyledTextareaProps {
  width: number;
  height: number;
  fontSize: number;
  disabled?: boolean;
}

const StyledTextarea = styled.textarea<StyledTextareaProps>`
  width: ${(props) => props.width}px;   
  height: ${(props) => props.height}px; 
  padding: 16px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  background-color: #FFFFFF; /* '#' 추가 */
  resize: none;
  outline: none;
  font-family: inherit;
  font-size: ${(props) => props.fontSize}px;

  /* placeholder 색상 지정 */
  &::placeholder {
    color: #757575;
  }

`;

/**
 * 공통 textarea 컴포넌트
 * @param width 가로 크기 (px)
 * @param height 세로 크기 (px)
 * @param placeholder placeholder 텍스트
 * @param fontSize
 * @param value 
 * @param disabled
 * @returns 
 */
const CustomTextarea: React.FC<CustomTextareaProps> = ({ width, height, placeholder, fontSize, value, disabled, onChange }) => {
  return (
    <StyledTextarea
      onChange={onChange}
      width={width}
      height={height}
      placeholder={placeholder}
      fontSize={fontSize}
      value={value}
      disabled={disabled}
    />
  );
};

export default CustomTextarea;