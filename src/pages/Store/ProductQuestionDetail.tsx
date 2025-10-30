import React, { useMemo, useState } from 'react';
import TitleLayout from '../../components/layout/TitleLayout';
import ImagePreview from '../../components/common/ImagePreview';
import CustomInput from '../../components/common/CustomInput';
import { Divider } from '@mui/material';
import CustomTextarea from '../../components/common/CustomTextarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

interface ImageState {
    file: File;
    previewUrl: string;
}

interface ProductQuestionItemProps {
    questionTitle: string;
    questionContent: string;
    questionImages: string[];
    isAnswered: boolean;
    isLocked: boolean;
    answerTitle?: string;
    answerContent?: string;
    answerImages?: string[];
}

const ProductQuestionItemExample = {
    questionTitle: "배송이 안 와요",
    questionContent: "지난주에 주문했는데 아직도 배송 상태가 '준비 중'입니다. 확인 부탁드립니다.",
    questionImages: ['PikcurLogo.png'], 
    isAnswered: true, // true: 답변 완료 / false: 답변 대기 중
    isLocked: true, // true: 비공개 / false: 전체공개
    answerTitle: "배송 지연 안내 및 처리",
    answerContent: "고객님, 배송이 지연되어 죄송합니다. 내부 물류 시스템 문제로 인해 출고가 하루 늦어졌으며, 금일 출고 완료되어 송장 번호가 등록되었습니다. 배송조회 후 문제가 발생하면 다시 문의해주세요.",
    answerImages: ['PikcurLogo.png'],
}

const ProductQuestionDetail: React.FC<{}> = () => {
    const [productQuestion, setProductQuestion] = useState<ProductQuestionItemProps>(ProductQuestionItemExample);

    const buttons = useMemo(() => {
        if (!productQuestion.isAnswered) { 
            return {
                leftName: "답변 등록",
                rightName: "취소",
                leftHandler: () => console.log("답변 등록 페이지 이동"),
                rightHandler: () => console.log("취소"),
            };
        } else {
            return null;
        }
    }, [productQuestion.isAnswered]);
    return (
        <TitleLayout
            icon={productQuestion.isLocked && <FontAwesomeIcon icon={faLock} />}
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
                        value={productQuestion.questionTitle} 
                        disabled={true}
                    />
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    문의 내용
                    <CustomTextarea 
                        width={1039} height={240} 
                        placeholder={"문의 내용"} 
                        fontSize={18} 
                        value={productQuestion.questionContent} 
                        disabled={true}
                    />
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    이미지
                    <ImagePreview images={productQuestion.questionImages} /> 
                </div>
                

                {/*  답변 완료일 때만 답변 내용을 보여줌. */}
                {productQuestion.isAnswered && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <Divider />  
                        <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', gap:'11px' }}>
                            답변 제목
                            <CustomInput 
                                width={448} height={56} 
                                placeholder={"답변 제목"} 
                                fontSize={18} 
                                value={productQuestion.answerTitle || ''} 
                                disabled={true}
                            />
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', gap:'11px' }}>
                            답변 내용
                            <CustomTextarea 
                                width={1039} height={240} 
                                placeholder={"답변 내용"} 
                                fontSize={18} 
                                value={productQuestion.answerContent || ''} 
                                disabled={true}
                            />
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', gap:'11px' }}>
                            이미지
                            <ImagePreview images={productQuestion.answerImages || []} /> 
                        </div>
                    </div>
                )}

            </div>

        }
        ></TitleLayout>
    );
} 

export default ProductQuestionDetail;