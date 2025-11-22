import React, { useEffect, useState } from "react";
import TitleLayout from "../../../components/layout/TitleLayout";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PaginationButtons from "../../../components/common/PaginationButtons";
import { api } from "../../../common/api";

interface FAQItemProps {
    faqId: number;
    title: string;
    content: string;
}

const FAQ: React.FC<{}> = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [faqList, setFaqList] = useState<FAQItemProps[]>([]);

    // 페이지 변경 핸들러 함수
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const initHandler = () => {
        api.get('/faq', { currentPage })
            .then((res) => {
                setFaqList(res.faqList);
                setTotalPages(res.totalPages || 1);
            })
            .catch((err) => {
                console.error('FAQ 불러오기 실패:', err);
            })
    }

    useEffect(() => {
        initHandler();
    }, [currentPage])

    return (
        <TitleLayout
            title={"FAQ"}
            subTitle={'고객님들이 자주 하는 질문을 한 곳에 모아뒀습니다.'}
            content={
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '19px',
                    alignItems: 'center'
                }}>
                    {faqList.map((faq, index) => {
                        return (
                            <Accordion
                                sx={{
                                    width: '100%',
                                    border: '1px solid #E0E0E0'
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
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