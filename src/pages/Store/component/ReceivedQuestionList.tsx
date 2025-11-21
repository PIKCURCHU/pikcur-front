import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/common/CustomTable";
import PaginationButtons from "../../../components/common/PaginationButtons";
import { Typography } from "@mui/material";
import { api } from "../../../common/api";
import { useNavigate } from "react-router-dom";

interface QuestionItem {
    questionId: number;
    memberNo: number;
    title: string;
    answer: boolean;
    createDate: string;
    public: boolean;
}

const ReceivedQuestionList:React.FC<{storeId:number}> = ({storeId}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const [receivedQuestionList, setReceivedQuestionList] = useState<QuestionItem[]>([]);

    const formatQnaList = receivedQuestionList.map((q, index) => ({
            questionId: q.questionId, 
            memberNo:q.memberNo,
            title: q.title,
            createDate: q.createDate.substring(0, 10), 
            answer: (
                <Typography fontWeight="bold">
                    {q.answer ? '답변 완료' : '답변 대기'}
                </Typography>
            ),
            
    }));
    

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const tableColumns = [
        { field: "title", headerName: "문의 제목" },
        { field: "answer", headerName: "답변 여부" },
        { field: "createDate", headerName: "날짜" }
    ];

    useEffect(() => {
        if (!storeId) return;
        api.get(`/store/${storeId}/questions/received`, {
            currentPage
        })
            .then((res) => {
                console.log(res);
                setReceivedQuestionList(res.qnaList);
                setTotalPages(res.totalPages || 1);
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
    }, []);

    const handleQuestionDetail = (questionId:number) => {
        navigate("/questionDetail", {state:{questionId}});
    }

    return (
        <div style={{
                marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
            }}>
            <CustomTable
                width={'100%'}
                columns={tableColumns}
                dataList={formatQnaList ?? []}
                onRowClick={(row) => handleQuestionDetail(row.questionId)}
            />
            <PaginationButtons
                maxPage={totalPages} 
                page={currentPage} 
                onChange={handlePageChange}
            />
        </div>
    );
}

export default ReceivedQuestionList;