import React, { useState } from 'react';
import TitleLayout from '../../components/layout/TitleLayout';
import CustomInput from '../../components/common/CustomInput';
import CustomTextarea from '../../components/common/CustomTextarea';
import ImageUploadGroup from '../../components/common/ImageUploadGroup';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';


interface ImageState {
    file: File;
    previewUrl: string;
}

const GoodsForm: React.FC<{}> = () => {
    const [images, setImages] = useState<ImageState[]>([]);
    const [selectedType, setSelectedType] = useState('auction'); 
    const [selectedStatus, setSelectedStatus] = useState('new'); 
    const [selectedGender, setSelectedGender] = useState('male'); 

    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedType(event.target.value);
    };
    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStatus(event.target.value);
    };
    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };
    const isAuction = selectedType === 'auction';
    return (
        <TitleLayout
            title={"상품 등록"}
            subTitle={"경매에 낼 상품 정보를 자세히 작성해 주세요."}
            content={
            <div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    상품명
                    <CustomInput width={448} height={56} placeholder={"상품명을 입력해주세요."} fontSize={18}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    거래 방식 선택
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedType}
                        onChange={handleChangeType}
                    >
                        <FormControlLabel value="auction" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="경매 거래" />
                        <FormControlLabel value="general" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="일반 거래" />
                        
                    </RadioGroup>                
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    카테고리
                    <CustomInput width={448} height={56} placeholder={"문의 제목을 입력해주세요."} fontSize={18}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    상품 상태
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedStatus}
                        onChange={handleChangeStatus}
                    >
                        <FormControlLabel value="new" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="새상품" />
                        <FormControlLabel value="like-new" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="사용감 없음" />
                        <FormControlLabel value="used" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="사용감 있음" />
                        <FormControlLabel value="heavily-used" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="사용감 많음" />
                        
                    </RadioGroup>                  </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    브랜드
                    <CustomInput width={448} height={56} placeholder={"브랜드를 선택해주세요."} fontSize={18}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    성별
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedGender}
                        onChange={handleChangeGender}
                    >
                        <FormControlLabel value="male" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="남성" />
                        <FormControlLabel value="female" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="여성" />
                        
                    </RadioGroup>                  </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    사이즈
                    <CustomInput width={448} height={56} placeholder={"사이즈를 선택해주세요."} fontSize={18}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    상품 설명
                    <CustomTextarea width={1039} height={240} placeholder={"상품 설명을 입력해주세요."} fontSize={18}/>
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    이미지 등록 (최대 10장)
                    <ImageUploadGroup maxCount={10} images={images} setImages={setImages}/>
                </div>
                {isAuction && (
                    <>
                        <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                            즉결 가격
                            <CustomInput width={448} height={56} placeholder={"즉결 가격을 입력해주세요."} fontSize={18}/>
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                            경매 시작 가격
                            <CustomInput width={448} height={56} placeholder={"경매 시작 가격을 입력해주세요."} fontSize={18}/>
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'row', marginTop:'27px', gap:'11px' }}>
                            <div style={{display:'flex', flexDirection:'column', gap:'11px'}}>
                                경매 시작일
                                <CustomInput width={448} height={56} placeholder={"문의 제목을 입력해주세요."} fontSize={18}/>
                            </div>
                            <div style={{display:'flex', flexDirection:'column', gap:'11px'}}>
                                경매 종료일
                                <CustomInput width={448} height={56} placeholder={"문의 제목을 입력해주세요."} fontSize={18}/>
                            </div> 
                        </div>
                    </>
                )}
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    배송비
                    <CustomInput width={448} height={56} placeholder={"배송비를 입력해주세요."} fontSize={18}/>
                </div>
            </div>}
            leftButtonName={"등록하기"}
            rightButtonName={"취소"}
            leftButtonClickHandler={()=>{console.log("상품등록")}}
            rightButtonClickHandler={()=>{console.log("취소")}}
        ></TitleLayout>
    );
}

export default GoodsForm;