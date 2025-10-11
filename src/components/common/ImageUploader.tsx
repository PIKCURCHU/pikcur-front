import * as React from "react";
import cameraIcon from '../../assets/images/camera.png'; 

interface ImageUploaderProps {
    onUpload?: (file: File[]) => void;
}

/** 이미지 업로드 버튼
 * 
 * @param onUpload 이미지 파일 업로드 함수
 * @returns 
 */
const ImageUploader: React.FC<ImageUploaderProps> = ({onUpload}) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files; // files는 FileList 객체
        if (!files || files.length === 0) return;
    
        // FileList를 실제 배열로 변환하여 부모에게 전달
        onUpload?.(Array.from(files));

        // input의 값을 초기화하여 같은 파일을 다시 선택할 수 있게 함
        event.target.value = '';
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px", 
            border: '1px dashed #FFFFFF', 
            width: "301px", 
            height: "301px"}}>
        
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <img src={cameraIcon} alt="카메라 아이콘" />
                <button 
                    onClick={handleUploadClick}
                    style={{
                        backgroundColor:"F2F2F2", 
                        width: "134px", 
                        height: "40px",
                        borderRadius: "8px", 
                        border: "none"}}>업로드</button>
            </div>
        
        <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
        />
        </div>
    );
}

export default ImageUploader;