import React, { useEffect, useState } from 'react';
import TitleLayout from '../../../components/layout/TitleLayout';
import CustomInput from '../../../components/common/CustomInput';
import CustomTextarea from '../../../components/common/CustomTextarea';
import ImageUploader from '../../../components/common/ImageUploader';
import ImagePreview from '../../../components/common/ImagePreview';
import ImageUploadGroup from '../../../components/common/ImageUploadGroup';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../common/api';

interface ImageState {
    file: File;
    previewUrl: string;
}

const AnswerForm: React.FC<{}> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [image, setImage] = useState<ImageState[]>([]);

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [questionId, setQuestionId] = useState(0);

    useEffect(() => {
        const questionId = location.state?.questionId;
        if (questionId) setQuestionId(questionId);
    }, [location.state]); 

    const handleAnswerRegister = () => {
        console.log(location.state.questionId);

        const answerData = {
            title,
            content
        };
    
        const files = image.map(img => img.file);   // ★ File만 추출
    
        api.form.post(`/question/answer/${questionId}`, {answerData}, files)
            .then((res) => {
                alert("답변 등록되었습니다.");
                navigate('/myStore');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <TitleLayout
            title={"답변 등록"}
            subTitle={"답변 하실 내용을 등록해주세요"}
            content={
            <div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    답변 제목
                    <CustomInput width={448} height={56} placeholder={"문의 제목을 입력해주세요."} fontSize={18} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    답변 내용
                    <CustomTextarea width={1039} height={240} placeholder={"문의 내용을 입력해주세요."} fontSize={18} value={content} onChange={(e)=>setContent(e.target.value)}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    이미지 등록 (최대 1장)
                    <ImageUploadGroup maxCount={1} images={image} setImages={setImage}/>
                </div>
            </div>}
            leftButtonName={"등록하기"}
            rightButtonName={"취소"}
            leftButtonClickHandler={()=>{handleAnswerRegister()}}
            rightButtonClickHandler={()=>{console.log("취소")}}
        ></TitleLayout>
    );
}

export default AnswerForm;