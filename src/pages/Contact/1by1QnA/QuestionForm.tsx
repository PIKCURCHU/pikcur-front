import React, { useState } from 'react';
import TitleLayout from '../../../components/layout/TitleLayout';
import CustomInput from '../../../components/common/CustomInput';
import CustomTextarea from '../../../components/common/CustomTextarea';
import ImageUploader from '../../../components/common/ImageUploader';
import ImagePreview from '../../../components/common/ImagePreview';
import ImageUploadGroup from '../../../components/common/ImageUploadGroup';

interface ImageState {
    file: File;
    previewUrl: string;
}

const QuestionForm: React.FC<{}> = () => {
    const [images, setImages] = useState<ImageState[]>([]);

    return (
        <TitleLayout
            title={"문의 등록"}
            subTitle={"문의 하실 내용을 등록해주세요"}
            content={
            <div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    문의 제목
                    <CustomInput width={448} height={56} placeholder={"문의 제목을 입력해주세요."} fontSize={18}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    문의 내용
                    <CustomTextarea width={1039} height={240} placeholder={"문의 내용을 입력해주세요."} fontSize={18}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    이미지 등록 (최대 1장)
                    <ImageUploadGroup maxCount={1} images={images} setImages={setImages}/>
                </div>
            </div>}
            leftButtonName={"등록하기"}
            rightButtonName={"취소"}
            leftButtonClickHandler={()=>{console.log("문의등록")}}
            rightButtonClickHandler={()=>{console.log("취소")}}
        ></TitleLayout>
    );
}

export default QuestionForm;