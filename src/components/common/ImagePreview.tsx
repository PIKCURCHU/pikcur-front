import * as React from "react";
import cameraIcon from '../../assets/images/camera.png'; 

interface ImagePreviewProps {
    images: string[];
    onRemove?: (index: number) => void;
}

/** 이미지 미리보기 컴포넌트 - 삭제 기능 포함
 * 
 * @param images 업로드한 이미지 리스트
 * @param onRemove 업로드한 이미지 삭제 함수
 * @returns 
 */
const ImagePreview: React.FC<ImagePreviewProps> = ({images, onRemove}) => {
    return (
        <div style={{
            display: 'flex',     
            flexWrap: 'wrap',    
            gap: '9px'           
        }}>
        {images.map((img, index) => (
                <div key={index} style={{
                    position: 'relative', 
                    borderRadius: "8px", 
                    border: '1px dashed #FFFFFF', 
                    width: "301px", 
                    height: "301px"
                }}>
                    <img src={img} alt={`Preview ${index}`} style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '8px' 
                    }} />
                    {onRemove && <button 
                        onClick={() => onRemove(index)} // X 버튼 클릭 시 onRemove 함수 호출
                        style={{
                            position: 'absolute', top: '8px', right: '8px',
                            backgroundColor: 'rgba(0,0,0,0.6)', color: 'white',
                            border: 'none', borderRadius: '50%', cursor: 'pointer',
                            width: '24px', height: '24px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                        ×
                    </button>}
                </div>
            ))}
        </div>
    );
}

export default ImagePreview;