import React, { useEffect, useMemo, useState } from 'react';
import TitleLayout from '../../components/layout/TitleLayout';
import ImagePreview from '../../components/common/ImagePreview';
import CustomInput from '../../components/common/CustomInput';
import { Divider } from '@mui/material';
import CustomTextarea from '../../components/common/CustomTextarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../common/api';

interface ImageState {
    file: File;
    previewUrl: string;
}

interface AnswerInfo {
    title: string;
    content: string;
    imagePath: string | null;
    answerId: number;
}

interface QuestionItemProps {
    questionId:number;
    storeId: number; // 문의를 받은 상점
    title: string;
    content: string;
    imagePath: string | null;
    answerInfo: AnswerInfo;
}

const ProductQuestionDetail: React.FC<{}> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [questionDetail, setQuestionDetail] = useState<QuestionItemProps>();
 
    const buttons = useMemo(() => {
        if (questionDetail && questionDetail.answerInfo == null && location.state?.storeId == questionDetail.storeId) { 
            return {
                leftName: "답변 등록",
                rightName: "취소",
                leftHandler: () => handleAnswerPage(questionDetail.questionId), 
                rightHandler: () => console.log("취소"),
            };
        } else {
            return null;
        }
    }, [questionDetail, location.state.storeId]);

    const handleAnswerPage = (questionId:number)=> {
        navigate(`/answerForm`, {state:{questionId}})
    }

    useEffect(()=>{
        if(location.state.questionId) {
            const questionId = location.state.questionId;
            api.get(`/question/${questionId}`)
            .then((res)=>{
                console.log(res);
                setQuestionDetail(res);
            })
            .catch((err)=>{
                console.log("에러", err);
            })
        }
    },[]);

    return (
        <TitleLayout
            icon={true && <FontAwesomeIcon icon={faLock} />}
            title={"문의 상세"}
            leftButtonName={buttons?.leftName}
            rightButtonName={buttons?.rightName}
            leftButtonClickHandler={buttons?.leftHandler}
            rightButtonClickHandler={buttons?.rightHandler}
            content={
            <div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    문의 제목
                    <CustomInput 
                        width={448} height={56} 
                        placeholder={"문의 제목"} 
                        fontSize={18} 
                        value={questionDetail?.title} 
                        disabled={true}
                    />
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    문의 내용
                    <CustomTextarea 
                        width={1039} height={240} 
                        placeholder={"문의 내용"} 
                        fontSize={18} 
                        value={questionDetail?.content} 
                        disabled={true}
                    />
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    이미지
                    <ImagePreview 
                        images={questionDetail?.imagePath ? [questionDetail.imagePath] : []}
                    />                
                    </div>

                {/*  답변 완료일 때만 답변 내용을 보여줌. */}
                {questionDetail?.answerInfo != null && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <Divider />  
                        <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', gap:'11px' }}>
                            답변 제목
                            <CustomInput 
                                width={448} height={56} 
                                placeholder={"답변 제목"} 
                                fontSize={18} 
                                value={questionDetail.answerInfo.title || ''} 
                                disabled={true}
                            />
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', gap:'11px' }}>
                            답변 내용
                            <CustomTextarea 
                                width={1039} height={240} 
                                placeholder={"답변 내용"} 
                                fontSize={18} 
                                value={questionDetail.answerInfo.content || ''} 
                                disabled={true}
                            />
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', gap:'11px' }}>
                            이미지
                            <ImagePreview 
                                images={questionDetail.answerInfo.imagePath ? [questionDetail.answerInfo.imagePath] : []} 
                            />                        
                            </div>
                    </div>
                )}

            </div>

        }
        ></TitleLayout>
    );
} 

export default ProductQuestionDetail;