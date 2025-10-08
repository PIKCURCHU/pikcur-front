import React from 'react';
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface CustomAvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

/** 공통 Avatar 컴포넌트
 *
 * src가 없으면 기본 이미지
 * 기본 사이즈는 40
 * 
 * @param src 이미지 URL
 * @param alt 대체 텍스트
 * @param size 아바타 크기 (width, height 비율 같음)
 * @returns 
 */
const CustomAvatar: React.FC<CustomAvatarProps> = ({ src, alt, size = 40 }) => {
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{ width: size, height: size, fontSize: size / 2 }}
    >
      {!src && <FontAwesomeIcon icon={faUser} />}
    </Avatar>
  );
};

export default CustomAvatar;