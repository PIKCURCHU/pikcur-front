import React, { useEffect, useState } from 'react';
import TitleLayout from '../../components/layout/TitleLayout';
import CustomInput from '../../components/common/CustomInput';
import CustomTextarea from '../../components/common/CustomTextarea';
import ImageUploadGroup from '../../components/common/ImageUploadGroup';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../common/api';

interface ImageState {
    file: File;
    previewUrl: string;
}

const ProductQuestionForm: React.FC<{}> = () => {
    const location = useLocation();
    const navigate = useNavigate();    

    const [image, setImage] = useState<ImageState[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [goodsId, setGoodsId] = useState(0);
    const [isPublic, setIsPublic] = useState<string>('Y');
    const [selectedPublicType, setSelectedPublicType] = useState('public');

    const handleChangePublicType = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedPublicType(value);
        if(value == 'public') {
            setIsPublic('Y')
        } else {
            setIsPublic('N')
        }
    };
    

    useEffect(()=>{
        if(location.state?.goodsId) {
            setGoodsId(location.state.goodsId)
        }
    },[]);

    const handleQuestionRegister = () => {
        console.log(location.state.goodsId);

        const questionData = {
            title,
            content,
            goodsId,
            isPublic 
        };
    
        const files = image.map(img => img.file);   
    
        api.form.post(`/question`, {questionData}, files)
            .then((res) => {
                alert("문의 등록되었습니다.");
                navigate("/goodsDetail", {state:{goodsId}});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <TitleLayout
            title={"문의 등록"}
            subTitle={"문의 하실 내용을 등록해주세요"}
            content={
            <div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    문의 제목
                    <CustomInput value={title} onChange={(e)=>setTitle(e.target.value)} width={448} height={56} placeholder={"문의 제목을 입력해주세요."} fontSize={18}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    문의 내용
                    <CustomTextarea value={content} onChange={(e)=>setContent(e.target.value)} width={1039} height={240} placeholder={"문의 내용을 입력해주세요."} fontSize={18}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    이미지 등록 (최대 1장)
                    <ImageUploadGroup maxCount={1} images={image} setImages={setImage}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    공개 여부
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedPublicType}
                    onChange={handleChangePublicType}
                >
                    <FormControlLabel value="public" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="공개" />
                    <FormControlLabel value="privacy" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="비공개" />
                </RadioGroup>                 
                </div>
            </div>}
            leftButtonName={"등록하기"}
            rightButtonName={"취소"}
            leftButtonClickHandler={()=>{handleQuestionRegister()}}
            rightButtonClickHandler={()=>{console.log("취소")}}
        ></TitleLayout>
    );
}

export default ProductQuestionForm;