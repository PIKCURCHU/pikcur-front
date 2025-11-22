import { Button, FormControlLabel, IconButton, Radio, RadioGroup, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GoodsItem from '../../../components/common/GoodsItem';
import CustomAvatar from '../../../components/common/CustomAvatar';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import BrandItem from './BrandItem';
import LikeGoodsList from './LikeGoodsList';
import LikeBrandList from './LikeBrandList';

const LikeList: React.FC<{storeId: number}> = ({storeId}) => {
    const [selectedLikeType, setSelectedLikeType] = useState('goods'); 
    
    const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedLikeType(event.target.value);
    };

    return (
        <div>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedLikeType}
                onChange={handleChangeType}
            >
                <FormControlLabel value="goods" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="상품" />
                <FormControlLabel value="brand" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="브랜드" />                            
            </RadioGroup> 
            {selectedLikeType == 'goods' &&
                <LikeGoodsList storeId={storeId}/>
            }
            {selectedLikeType == 'brand' &&
                <LikeBrandList storeId={storeId} />
            }
        </div>
    );
}

export default LikeList;