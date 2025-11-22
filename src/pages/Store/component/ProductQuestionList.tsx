import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';
import SentQuestionList from './SentQuestionList';
import ReceivedQuestionList from './ReceivedQuestionList';



const ProductQuestionList: React.FC<{storeId: number}> = ({storeId}) => {
    
    const [selectedQnaType, setSelectedQnaType] = useState('sent'); 
    const handleChangeQnaType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedQnaType(event.target.value);
    };

    return (
        <div>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedQnaType}
                onChange={handleChangeQnaType}
            >
                <FormControlLabel value="sent" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="남긴 문의" />
                <FormControlLabel value="received" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="받은 문의" />
                
            </RadioGroup> 
            {selectedQnaType === 'sent' && (<SentQuestionList storeId={storeId}/>)}

            {selectedQnaType === 'received' && (<ReceivedQuestionList storeId={storeId}/>)}
        </div>
    );
}

export default ProductQuestionList;