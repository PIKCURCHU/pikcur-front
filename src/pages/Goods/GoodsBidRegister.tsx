import React, { useEffect, useState } from 'react';
import TitleLayout from '../../components/layout/TitleLayout';
import CustomTable from '../../components/common/CustomTable';
import CustomInput from '../../components/common/CustomInput';
import { api } from '../../common/api';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationButtons from '../../components/common/PaginationButtons';

interface GoodsBidItem {
    bidId: number;
    bidPrice: number;
    createDate: string;
    memberId: string;

}

const GoodsBidRegister: React.FC<{}> = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [bidList, setBidList] = useState<GoodsBidItem[]>([]);
    const [bidPrice, setBidPrice] = useState<string>("");
    const location = useLocation();
    const navigate = useNavigate();

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(()=>{
        if(!location.state.goodsId) return;
        const goodsId = location.state.goodsId;
        api.get(`/bid/${goodsId}/list`, {currentPage})
        .then((res)=>{
            console.log(res)
            setBidList(res.bidList);
            setTotalPages(res.totalPages || 0);
        })
        .catch((err)=>{
            console.log("🔥 에러:", err);
        })
    }, []);

        // 현재 입찰금액 계산
    const currentBidPrice = bidList.length > 0 
    ? Math.max(...bidList.map(bid => bid.bidPrice))
    : 0;
    
    const handleRegisterBid = () => {
        if(!bidPrice) {
            alert("입찰 금액을 입력해주세요.");
            return;
        }
        if(!location.state.goodsId) return;
        const goodsId = location.state.goodsId;
        api.post(`/bid/${goodsId}`, {bidPrice})
        .then((res)=>{
            console.log(res);
            alert('입찰이 등록되었습니다.');
            navigate("/goodsDetail", {state:{goodsId}});
        })
        .catch((err)=>{
            console.log("🔥 에러:", err);
        })
    }

    return (
        <>
            <TitleLayout
                title="입찰"
                subTitle={`현재 금액: ${currentBidPrice.toLocaleString()}원`}
                leftButtonClickHandler={handleRegisterBid}
                leftButtonName="입찰하기"
                rightButtonName="돌아가기"
                content={
                    <>
                        <div style={{ paddingBottom: 11, fontSize: 18, color: '#141414', fontWeight: 'bold' }}>이전 입찰 내역</div>
                        <div style={{ paddingBottom: 37, gap:20, display:'flex', flexDirection:'column' }}>
                            <CustomTable
                                width={"100%"}
                                columns={[
                                    { field: "memberId", headerName: "아이디" },
                                    { field: "bidPrice", headerName: "입찰 금액", render: (value: number) => value.toLocaleString() + '원'                                 },
                                    { field: "createDate", headerName: "입찰일" },
                                ]}
                                dataList={bidList}
                                interactive={false}
                            />
                            <PaginationButtons
                                maxPage={totalPages} 
                                page={currentPage} 
                                onChange={handlePageChange}></PaginationButtons>
                        </div>
                        <div>
                            <div style={{ paddingBottom: 11, fontSize: 18, color: '#141414' }}>입찰 금액</div>
                            <CustomInput 
                                placeholder="입찰 금액을 입력하세요"
                                type="number"
                                width={448}
                                height={56}
                                fontSize={16}
                                value={bidPrice}
                                onChange={(e)=>setBidPrice(e.target.value)}
                            />
                        </div>
                    </>
                }
            />
        </>
    )
}

export default GoodsBidRegister;