import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';
import WinBidItem from './WinBidItem';
import BidItem from './BidItem';

const BidList: React.FC<{storeId:number}> = ({storeId}) => {
    const [selectedBidType, setSelectedBidType] = useState('bid'); 

    const handleChangeBidType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedBidType(event.target.value);
    };

    return (
        <div>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedBidType}
                onChange={handleChangeBidType}
            >
                <FormControlLabel value="bid" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="입찰" />
                <FormControlLabel value="winBid" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="낙찰" />
                
            </RadioGroup> 
            {selectedBidType == 'bid' &&
                <BidItem storeId={storeId}></BidItem>
            }
            {selectedBidType == 'winBid' &&
                <WinBidItem storeId={storeId}></WinBidItem>
            }
        </div>
    );
}

export default BidList;