import React, { useEffect, useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { api } from '../../../common/api'; // ⭐ [추가] API 호출을 위한 api 임포트
import SellTransactionList from './SellTransactionList';
import BuyTransactionList from './BuyTransactionList';



const TransactionList: React.FC<{storeId: number}> = ({storeId}) => { 
    const [selectedTransType, setSelectedTransType] = useState('buy');
    
    const handleChangeTransType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTransType(event.target.value);
    };

    return (
        <div>
            <RadioGroup
                row
                aria-labelledby="transaction-type-label"
                name="transaction-type-group"
                value={selectedTransType}
                onChange={handleChangeTransType}
            >
                <FormControlLabel value="buy" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="구매" />
                <FormControlLabel value="sell" control={<Radio sx={{'&.Mui-checked': {color: 'black', }}}/>} label="판매" />
            </RadioGroup> 
            {selectedTransType == 'buy' &&
                <BuyTransactionList storeId={storeId} />
            }
            {selectedTransType == 'sell' &&
                <SellTransactionList storeId={storeId} />
            }
            
            
        </div>
    );
}

export default TransactionList;