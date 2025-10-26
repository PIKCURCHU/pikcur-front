import React, { useState } from "react";
import TitleLayout from "../../../components/layout/TitleLayout";
import { Accordion, AccordionDetails, AccordionSummary, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PaginationButtons from "../../../components/common/PaginationButtons";
import CustomTable from "../../../components/common/CustomTable";

interface QnaItemProps {
    id: number;
    title: string;
    isAnswered: boolean;
    createdDate: string;
}

const qnaList:  QnaItemProps[] = [
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
    const totalPages = Math.ceil(qnaList.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentQnaList = qnaList.slice(startIndex, endIndex);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const formattedQnaList = currentQnaList.map((qna, index) => ({
        id: qna.id, 
        title: qna.title,
        createdDate: qna.createdDate, 
        
        // isAnswered: boolean 대신 스타일링된 Typography JSX로 변환
        isAnswered: (
            <Typography 
                color={qna.isAnswered ? 'success' : 'textDisabled'} 
                fontWeight="bold"
            >
                {qna.isAnswered ? '답변 완료' : '답변 대기'}
            </Typography>
        ),
    }));

    return (
        <TitleLayout
            title={"1대1 문의"}
            subTitle={'관리자에게 문의하세요.'}
            content={
                <div style={{display:'flex', flexDirection: 'column', gap:"20px"}}>
                <div style={{
                    display:'flex',
                    justifyContent: 'space-between'
                }}>
                <Typography>문의 내역</Typography>
                <Button
                        type="button"
                        onClick={() => {console.log("문의 등록하는 페이지로 이동")}}
                        style={{
                            backgroundColor: "#141414",
                            color: "#fff",
                            width: 93,
                            height: 40,
                            fontSize: 14,
                            borderRadius: 8,
                        }}>문의하기
                    </Button>
                </div>
                <CustomTable
                    width={'100%'}
                    columns={
                        [
                            { field: "title", headerName: "문의 제목" },
                            { field: "isAnswered", headerName: "답변 여부" },
                            { field: "createdDate", headerName: "날짜" }
                        ]
                    }
                    dataList={formattedQnaList}
                ></CustomTable>
                <PaginationButtons 
                        maxPage={totalPages} 
                        page={currentPage} 
                        onChange={handlePageChange}
                        ></PaginationButtons>
                </div>
            }
        ></TitleLayout>
    );
}

export default QuestionList;