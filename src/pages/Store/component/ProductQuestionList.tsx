import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomTable from '../../../components/common/CustomTable';
import PaginationButtons from '../../../components/common/PaginationButtons';

interface QnaItemProps {
    id: number;
    senderNo: number; 
    receiverNo: number; 
    title: string;
    isAnswered: boolean;
    createdDate: string;
}

const qnaListExample:  QnaItemProps[] = [
    {
        id: 1,
        title: "입찰 취소 가능한가요?",
        senderNo: 1,
        receiverNo: 2, 
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 2,
        title: "배송지 변경 요청 드립니다.",
        senderNo: 1,
        receiverNo: 2, 
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 3,
        title: "입찰 취소 가능한가요?",
        senderNo: 1,
        receiverNo: 2, 
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 4,
        title: "배송지 변경 요청 드립니다.",
        senderNo: 1,
        receiverNo: 2, 
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 5,
        title: "입찰 취소 가능한가요?",
        senderNo: 1,
        receiverNo: 2, 
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 6,
        title: "배송지 변경 요청 드립니다.",
        senderNo: 1,
        receiverNo: 2, 
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 7,
        title: "입찰 취소 가능한가요?",
        senderNo: 1,
        receiverNo: 2, 
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 8,
        title: "배송지 변경 요청 드립니다.",
        senderNo: 2,
        receiverNo: 1, 
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 9,
        title: "입찰 취소 가능한가요?",
        senderNo: 2,
        receiverNo: 1, 
        isAnswered: true,
        createdDate: "25.09.24 12:01"
    },
    {
        id: 10,
        title: "배송지 변경 요청 드립니다.",
        senderNo: 2,
        receiverNo: 1, 
        isAnswered: false,
        createdDate: "25.09.24 12:01"
    }
]

const ProductQuestionList: React.FC<{memberNo: number}> = ({memberNo}) => {
    const ITEMS_PER_PAGE = 6;
    
    // ⭐ 페이지 상태를 남긴 문의/받은 문의 별로 분리
    const [sentCurrentPage, setSentCurrentPage] = useState(1);
    const [receivedCurrentPage, setReceivedCurrentPage] = useState(1);
    const [selectedQnaType, setSelectedQnaType] = useState('sent'); 

    // ⭐ 페이지 변경 핸들러 함수 분리
    const handleSentPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSentCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleReceivedPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setReceivedCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChangeQnaType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedQnaType(event.target.value);
        // 탭 전환 시 페이지 1로 초기화 (선택 사항)
        setSentCurrentPage(1);
        setReceivedCurrentPage(1);
    };

    const formatQnaList = (list: QnaItemProps[]) => {
        return list.map((qna) => ({
            id: qna.id, 
            title: qna.title,
            createdDate: qna.createdDate, 
            status: (
                <Typography fontWeight="bold">
                    {qna.isAnswered ? '답변 완료' : '답변 대기'}
                </Typography>
            ),
        }));
    };
    
    const tableColumns = [
        { field: "title", headerName: "문의 제목" },
        { field: "status", headerName: "답변 여부" },
        { field: "createdDate", headerName: "날짜" }
    ];

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
            {/* 1. 남긴 문의 (Sent) 리스트 */}
            {selectedQnaType === 'sent' && (() => {
                // 남긴 문의: senderNo가 현재 memberNo와 일치하는 항목
                const filteredList = qnaListExample.filter(item => item.senderNo === memberNo);
                
                // 페이지네이션 계산
                const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
                const startIndex = (sentCurrentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                
                const currentList = filteredList.slice(startIndex, endIndex);
                const formattedList = formatQnaList(currentList);

                return (
                    <div style={{
                            marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
                        }}>
                        <CustomTable
                            width={'100%'}
                            columns={tableColumns}
                            dataList={formattedList}
                            onRowClick={(row) => console.log("클릭한 행:", row)}
                        />
                        <PaginationButtons
                            maxPage={totalPages} 
                            page={sentCurrentPage} // 남긴 문의 페이지 상태 사용
                            onChange={handleSentPageChange} // 남긴 문의 핸들러 사용
                        />
                    </div>
                );
            })()}

            {/* 2. 받은 문의 (Received) 리스트 */}
            {selectedQnaType === 'received' && (() => {
                // 받은 문의: receiverNo가 현재 memberNo와 일치하는 항목
                const filteredList = qnaListExample.filter(item => item.receiverNo === memberNo);
                
                // 페이지네이션 계산
                const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
                const startIndex = (receivedCurrentPage - 1) * ITEMS_PER_PAGE;
                const endIndex = startIndex + ITEMS_PER_PAGE;
                
                const currentList = filteredList.slice(startIndex, endIndex);
                const formattedList = formatQnaList(currentList);

                return (
                    <div style={{
                            marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
                        }}>
                        <CustomTable
                            width={'100%'}
                            columns={tableColumns}
                            dataList={formattedList}
                            onRowClick={(row) => console.log("클릭한 행:", row)}
                        />
                        <PaginationButtons
                            maxPage={totalPages} 
                            page={receivedCurrentPage} // 받은 문의 페이지 상태 사용
                            onChange={handleReceivedPageChange} // 받은 문의 핸들러 사용
                        />
                    </div>
                );
            })()}
        </div>
    );
}

export default ProductQuestionList;