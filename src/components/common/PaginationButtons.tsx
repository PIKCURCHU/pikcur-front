import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Pagination } from '@mui/material';


interface PaginationButtonsProps {
  size: "small" | "medium" | "large";
  page?: number;
  maxPage?: number;
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => any;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({ size, page, onChange, maxPage=10 }) => {
  return (
    <div style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
      <Stack spacing={2}>
        <Pagination count={maxPage} size={size} page={page} onChange={onChange} />
      </Stack>
    </div>
  );
}

export default PaginationButtons;