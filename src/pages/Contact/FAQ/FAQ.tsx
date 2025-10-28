import React, { useState } from "react";
import TitleLayout from "../../../components/layout/TitleLayout";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PaginationButtons from "../../../components/common/PaginationButtons";

interface FAQItemProps {
    title: string;
    content: string;
}

const faqList:  FAQItemProps[] = [
    {
        title: "계정은 어떻게 만드나요?",
        content:"계정을 만들려면 페이지 오른쪽 상단의 ‘가입하기’ 버튼을 클릭하고 지침을 따르세요. 이름, 이메일, 주소를 제공하고 비밀번호를 만들어야 합니다."
    },
    {
        title: "어떤 결제 수단을 사용할 수 있나요?",
        content:"카드"
    },
    {
        title: "배송비는 어떻게 결제하는 건가요?",
        content:"몰라욘"
    },
    {
        title: "배송비는 어떻게 결제하는 건가요?",
        content:"몰라욘"
    },
    {
        title: "배송비는 어떻게 결제하는 건가요?",
        content:"몰라욘"
    },
    {
        title: "배송비는 어떻게 결제하는 건가요?",
        content:"몰라욘"
    },
    {
        title: "배송비는 어떻게 결제하는 건가요?",
        content:"몰라욘"
    }
]

const FAQ: React.FC<{}> = () => {
    // 한 페이지에 보여줄 아이템 개수
    const ITEMS_PER_PAGE = 5;

    // 현재 페이지 상태 관리 (초기값: 1페이지)
    const [currentPage, setCurrentPage] = useState(1);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(faqList.length / ITEMS_PER_PAGE);

    // 현재 페이지에 보여줄 FAQ 항목 계산 (슬라이싱)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentFaqList = faqList.slice(startIndex, endIndex);

    // 페이지 변경 핸들러 함수
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <TitleLayout
            title={"FAQ"}
            subTitle={'고객님들이 자주 하는 질문을 한 곳에 모아뒀습니다.'}
            content={
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'19px',
                    alignItems:'center'
                }}>
                    {currentFaqList.map((faq, index)=>{
                        return (
                            <Accordion 
                                sx={{
                                    width: '100%', 
                                    border: '1px solid #E0E0E0'
                                }}
                            >
                                <AccordionSummary 
                                    expandIcon={<FontAwesomeIcon icon={faChevronDown}/>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    sx={{
                                        minHeight: '85px'
                                    }}
                                >
                                    <Typography component="span" variant="h6">
                                        {faq.title}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {faq.content}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
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

export default FAQ;