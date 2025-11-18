import React, { useState } from 'react';
import TitleLayout from '../../components/layout/TitleLayout';
import CustomInput from '../../components/common/CustomInput';
import CustomTextarea from '../../components/common/CustomTextarea';
import ImageUploadGroup from '../../components/common/ImageUploadGroup';
import { 
    FormControlLabel, 
    Radio, 
    RadioGroup, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    TextField, 
    Autocomplete 
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

interface ImageState {
    file: File;
    previewUrl: string;
}

// ... (카테고리, 브랜드, 사이즈 데이터는 이전과 동일) ...
const categoryData: { [key: string]: string[] } = {
    '아우터': ['후드집업', '트러커 자켓', '블루종 / MA-1', '블레이저 자켓', '레더자켓', '사파리 / 헌팅자켓', '가디건', '베스트'],
    '상의': ['반팔티', '긴팔티', '맨투맨', '후드티', '니트'],
    '바지': ['데님', '슬랙스', '면바지', '반바지'],
    '원피스 / 스커트': ['원피스', '스커트'],
    '신발': ['스니커즈', '구두', '부츠', '샌들'],
    '가방': ['백팩', '숄더백', '크로스백', '토트백'],
    '모자': ['캡', '비니', '버킷햇'],
    '악세사리': ['반지', '목걸이', '팔찌'],
    '주얼리': ['반지', '목걸이', '팔찌', '귀걸이'],
};
const mainCategories = Object.keys(categoryData);
const brandList = [
    '나이키', '아디다스', '구찌', '샤넬', '루이비통', '스톤아일랜드', '꼼데가르송', '우영미', '기타'
];
const sizeData: { [key: string]: string[] } = {
    '아우터': ['XS', 'S', 'M', 'L', 'XL', 'XXL', '90', '95', '100', '105', '110', 'FREE'],
    '상의': ['XS', 'S', 'M', 'L', 'XL', 'XXL', '90', '95', '100', '105', '110', 'FREE'],
    '바지': ['24', '25', '26', '27', '28', '29', '30', '31', '32', 'S', 'M', 'L', 'FREE'],
    '원피스 / 스커트': ['XS', 'S', 'M', 'L', 'FREE'],
    '신발': ['220', '225', '230', '235', '240', '245', '250', '255', '260', '265', '270', '275', '280'],
    '가방': ['FREE', 'One Size'],
    '모자': ['FREE', 'One Size'],
    '악세사리': ['FREE', 'One Size'],
    '주얼리': ['FREE', 'One Size'],
};


const GoodsForm: React.FC<{}> = () => {
    const [images, setImages] = useState<ImageState[]>([]);
    const [selectedStatus, setSelectedStatus] = useState('new'); 
    const [selectedGender, setSelectedGender] = useState('M'); 
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [buyOutPrice, setBuyOutPrice] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [shippingFee, setShippingFee] = useState('');

    // --- (1. state 추가) ---
    const [goodsName, setGoodsName] = useState('');
    const [goodsInfo, setGoodsInfo] = useState('');
    const [auctionEndDate, setAuctionEndDate] = useState('');
    // -----------------------

    const availableSubCategories = categoryData[selectedMainCategory] || [];
    const availableSizes = sizeData[selectedMainCategory] || [];

    // --- (핸들러 함수들) ---
    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStatus(event.target.value);
    };
    const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };
    const handleMainCategoryChange = (event: SelectChangeEvent) => {
        const mainCategory = event.target.value;
        setSelectedMainCategory(mainCategory);
        setSelectedSubCategory(''); 
        setSelectedSizes([]); 
    };
    const handleSubCategoryChange = (event: SelectChangeEvent) => {
        setSelectedSubCategory(event.target.value);
    };

    const handleNumericChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const { value } = event.target;
        
        if (value === '' || /^[0-9\b]+$/.test(value)) {
            setter(value);
        }
    };


    return (
        <TitleLayout
            title={"상품 등록"}
            subTitle={"경매에 낼 상품 정보를 자세히 작성해 주세요."}
            content={
            <div>
                {/* --- (2. value, onChange 연결) --- */}
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    상품명
                    <CustomInput 
                        width={448} 
                        height={56} 
                        placeholder={"상품명을 입력해주세요."} 
                        fontSize={18}
                        value={goodsName}
                        onChange={(e) => setGoodsName(e.target.value)}
                    />
                </div>
                
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    카테고리
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <FormControl sx={{ minWidth: 219 }}>
                            <InputLabel id="main-category-label">대분류</InputLabel>
                            <Select
                                labelId="main-category-label"
                                value={selectedMainCategory}
                                label="대분류"
                                onChange={handleMainCategoryChange}
                                sx={{ height: 56 }}
                            >
                                {mainCategories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 219 }}>
                            <InputLabel id="sub-category-label">소분류</InputLabel>
                            <Select
                                labelId="sub-category-label"
                                value={selectedSubCategory}
                                label="소분류"
                                onChange={handleSubCategoryChange}
                                disabled={!selectedMainCategory || availableSubCategories.length === 0}
                                sx={{ height: 56 }}
                            >
                                {availableSubCategories.map((subCategory) => (
                                    <MenuItem key={subCategory} value={subCategory}>
                                        {subCategory}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    상품 상태
                    <RadioGroup
                        row
                        value={selectedStatus}
                        onChange={handleChangeStatus}
                    >
                        <FormControlLabel value="new" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="새상품" />
                        <FormControlLabel value="like-new" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="사용감 없음" />
                        <FormControlLabel value="used" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="사용감 있음" />
                        <FormControlLabel value="heavily-used" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="사용감 많음" />
                    </RadioGroup>
                </div>
                
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    브랜드
                    <Autocomplete
                        freeSolo 
                        options={brandList}
                        value={selectedBrand}
                        onChange={(event, newValue) => {
                            setSelectedBrand(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                placeholder="브랜드를 검색하여 입력하세요." 
                            />
                        )}
                        sx={{ width: 448 }}
                    />
                </div>

                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    성별
                    <RadioGroup
                        row
                        value={selectedGender}
                        onChange={handleChangeGender}
                    >
                        <FormControlLabel value="M" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="남성" />
                        <FormControlLabel value="F" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="여성" />
                    </RadioGroup>
                </div>
                
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    사이즈
                    <Autocomplete
                        multiple 
                        freeSolo 
                        options={availableSizes}
                        value={selectedSizes}
                        onChange={(event, newValue) => {
                            setSelectedSizes(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                placeholder="사이즈를 선택하거나 입력하세요." 
                            />
                        )}
                        sx={{ width: 448 }}
                        disabled={!selectedMainCategory || availableSizes.length === 0}
                    />
                </div>

                {/* --- (2. value, onChange 연결) --- */}
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    상품 설명
                    <CustomTextarea 
                        width={1039} 
                        height={240} 
                        placeholder={"상품 설명을 입력해주세요."} 
                        fontSize={18}
                        value={goodsInfo}
                        onChange={(e) => setGoodsInfo(e.target.value)}
                    />
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    이미지 등록 (최대 10장)
                    <ImageUploadGroup maxCount={10} images={images} setImages={setImages}/>
                </div>

                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    즉결 가격
                    <CustomInput 
                        width={448} 
                        height={56} 
                        placeholder={"즉결 가격을 입력해주세요."} 
                        fontSize={18}
                        value={buyOutPrice} 
                        onChange={handleNumericChange(setBuyOutPrice)}
                        type="tel"
                    />
                </div>
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    경매 시작 가격
                    <CustomInput 
                        width={448} 
                        height={56} 
                        placeholder={"경매 시작 가격을 입력해주세요."} 
                        fontSize={18}
                        value={startPrice} 
                        onChange={handleNumericChange(setStartPrice)}
                        type="tel" 
                    />
                </div>

                {/* --- (2. 레이아웃 수정 및 value, onChange 연결) --- */}
                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    경매 종료일
                    <CustomInput 
                        width={448} 
                        height={56} 
                        placeholder={"경매 종료일을 선택해주세요."} 
                        fontSize={18} 
                        type="datetime-local"
                        value={auctionEndDate}
                        onChange={(e) => setAuctionEndDate(e.target.value)}
                    />
                </div>

                <div style={{ fontSize: 18, fontWeight: 'normal', color: '#141414', display:'flex', flexDirection:'column', marginTop:'27px', gap:'11px' }}>
                    배송비
                    <CustomInput 
                        width={448} 
                        height={56} 
                        placeholder={"배송비를 입력해주세요."} 
                        fontSize={18}
                        value={shippingFee}
                        onChange={handleNumericChange(setShippingFee)}
                        type="tel"
                    />
                </div>
            </div>}
            leftButtonName={"등록하기"}
            rightButtonName={"취소"}
            leftButtonClickHandler={()=>{
                const formData = new FormData();
                const goodsData = {
                    goodsName:goodsName,
                    goodsInfo:goodsInfo,
                    quality: selectedStatus,
                    gender: selectedGender,
                    categoryId: 1,
                    // mainCategory: selectedMainCategory,
                    // subCategory: selectedSubCategory,
                    // brand: selectedBrand,
                    brandId: 1,
                    size: selectedSizes.join(","),
                    buyoutPrice: buyOutPrice, 
                    startPrice: startPrice,   
                    shippingPrice: shippingFee,
                    auctionEndDate: auctionEndDate
                };
                formData.append(
                    "goodsData",
                    new Blob([JSON.stringify(goodsData)], { type: "application/json" })
                );
            
                // ② 이미지 파일들 추가
                images.forEach((img, index) => {
                    formData.append("images", img.file);
                });
            
                const accessToken = localStorage.getItem("accessToken");
                axios.post("http://localhost:8080/goods", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer`,
                    },
                });
                // console.log("===== FormData 내용 확인 =====");
                // formData.forEach((value, key) => {
                //     console.log(key + ":", value);
                // });
            }}
            rightButtonClickHandler={()=>{console.log("취소")}}
        ></TitleLayout>
    );
}

export default GoodsForm;