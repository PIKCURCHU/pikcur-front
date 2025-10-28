import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';

interface QnaItemProps {
    id: number;
    title: string;
    isAnswered: boolean;
    createdDate: string;
}

const qnaListExample:  QnaItemProps[] = [
    {
        id: 1,
        title: "입찰 취소 가능한가요?",
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 2,
        title: "배송지 변경 요청 드립니다.",
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 3,
        title: "입찰 취소 가능한가요?",
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 4,
        title: "배송지 변경 요청 드립니다.",
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 5,
        title: "입찰 취소 가능한가요?",
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 6,
        title: "배송지 변경 요청 드립니다.",
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 7,
        title: "입찰 취소 가능한가요?",
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 8,
        title: "배송지 변경 요청 드립니다.",
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 9,
        title: "입찰 취소 가능한가요?",
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 10,
        title: "배송지 변경 요청 드립니다.",
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    }
]

const QuestionList: React.FC<{}> = () => {
    const ITEMS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(qnaListExample.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentQnaList = qnaListExample.slice(startIndex, endIndex);

    const [selectedQnaType, setSelectedQnaType] = useState('sent'); 


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleChangeQnaType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedQnaType(event.target.value);
    };

    const formattedQnaList = currentQnaList.map((qna, index) => ({
        id: qna.id, 
        title: qna.title,
        createdDate: qna.createdDate, 
        
        // isAnswered: boolean 대신 스타일링된 Typography JSX로 변환
        status: (
            <Typography 
                color={qna.isAnswered ? 'success' : 'textDisabled'} 
                fontWeight="bold"
            >
                {qna.isAnswered ? '답변 완료' : '답변 대기'}
            </Typography>
        ),
    }));

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
            <div style={{
                marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
            }}>
            <CustomTable
                width={'100%'}
                columns={
                    [   
                        { field: "title", headerName: "문의 제목" },
                        { field: "status", headerName: "답변 여부" },
                        { field: "createdDate", headerName: "날짜" }                          
                    ]
                }
                dataList={formattedQnaList}
                onRowClick={(row) => console.log("클릭한 행:", row)}></CustomTable>
            <PaginationButtons
                maxPage={totalPages} 
                page={currentPage} 
                onChange={handlePageChange}></PaginationButtons>
            </div>
        </div>
    );
}

export default QuestionList;