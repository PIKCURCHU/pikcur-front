import * as React from "react"
import ImagePreview from "./ImagePreview";
import ImageUploader from "./ImageUploader";

/** 파일과 미리보기용 url포함 객체 */
interface ImageState {
    file: File;
    previewUrl: string;
}

interface ImageUploadGroupProps{
    maxCount: number;
    images: ImageState[];
    setImages: React.Dispatch<React.SetStateAction<ImageState[]>>;
}

/** 이미지 업로드 버튼, 미리보기를 모두 포함한 그룹 컴포넌트
 * 
 * @example
 * interface ImageState {
    file: File;
    previewUrl: string;
 *  }
 *
 * const [images, setImages] = useState<ImageState[]>([]);
 * 
 * <ImageUploadGroup 
 *  maxCount={3} 
 *  images={images} 
 *  setImages={setImages}/>
 * 
 * @param maxCount 업로드 가능한 이미지의 개수
 * @param images 업로드된 이미지 리스트
 * @param setImages 이미지 set함수
 * @returns 
 */
const ImageUploadGroup: React.FC<ImageUploadGroupProps> = ({maxCount, images, setImages}) => {
    
    const imageUrlList = images.map(img => img.previewUrl);

    // ImageUploader로부터 새 파일들을 받아 처리하는 함수
    const handleImageUpload = (newFiles: File[]) => {
        if (images.length + newFiles.length > maxCount) {
            alert(`이미지는 최대 ${maxCount}개까지 추가할 수 있습니다.`);
            return;
        }

        // 각 파일에 대해 미리보기 URL 생성
        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // 새 이미지 정보를 기존 배열에 추가
                setImages(prevImages => [
                    ...prevImages, 
                    { file: file, previewUrl: reader.result as string }
                ]);
            };
            reader.readAsDataURL(file);
        });
    };

    // ImagePreview로부터 삭제할 이미지의 인덱스를 받는 함수
    const handleImageRemove = (indexToRemove: number) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="App" style={{
            display: 'flex',     
            flexWrap: 'wrap',    
            gap: '9px'           
        }}>
            <ImagePreview 
                          images={imageUrlList}
                          onRemove={handleImageRemove} 
                      />
            {images.length < maxCount && (
                          <ImageUploader 
                              onUpload={handleImageUpload} 
                          />
                      )}
          </div>
    );
}

export default ImageUploadGroup;