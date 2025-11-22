import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/common/CustomTable";
import PaginationButtons from "../../../components/common/PaginationButtons";
import { Typography } from "@mui/material";
import { api } from "../../../common/api";
import { useNavigate } from "react-router-dom";

interface transItemProps {
    transactionId: number;
    goodsId: number;
    sellerNo: number;
    buyerNo: number;
    goodsName: string;
    price: number;
    statusName: string;
    startDate: string;
    endDate: string;
}

const BuyTransactionList: React.FC<{storeId: number}> = ({storeId}) => {
    const [transList, setTransList] = useState<transItemProps[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1); 
    const navigate = useNavigate();

    const formatTransList = transList.map((trans, index) => ({
        id: trans.transactionId, 
        title: trans.goodsName,
        startDate: trans.startDate.substring(0, 10), 
        sellerNo: trans.sellerNo,
        buyerNo: trans.buyerNo,
        price: trans.price,
        
        status: (
            <Typography 
                fontWeight="bold"
            >
                {trans.statusName}
            </Typography>
        ),
    }));

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTransactionDetail = (transactionId:number) => {
        console.log(transactionId);
        navigate("/transactionDetail", {
            state:{
                transactionId: transactionId,
                isBuyerView: true
            }});
    }

    useEffect(() => {
        if (!storeId) return;
        api.get(`/store/${storeId}/transactions/buy`, {
            currentPage
        })
        .then((res) => {
            setTransList(res.transList || []); 
            setTotalPages(res.totalPages || 1);
        })
        .catch((err) => {
            console.log("🔥 에러:", err);

        });
    }, []);


    return (
        <div style={{
            marginTop:'20px',display:'flex', flexDirection: 'column', gap:"20px"
        }}>
            <CustomTable
                width={'100%'}
                columns={[
                    { field: "title", headerName: "상품명" },
                    { field: "price", headerName: "가격" },
                    { field: "status", headerName: "거래 상태" },
                    { field: "startDate", headerName: "날짜" }
                ]}
                dataList={formatTransList} 
                onRowClick={(row) => handleTransactionDetail(row.id)}
            />
            
            <PaginationButtons
                maxPage={totalPages} 
                page={currentPage}
                onChange={handlePageChange} 
            />
        </div>
    );
}

export default BuyTransactionList;