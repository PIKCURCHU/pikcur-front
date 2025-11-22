import React, { useEffect, useRef, useState } from 'react';
import TitleLayout from '../../components/layout/TitleLayout';
import InfoList from '../../components/common/InfoList';
import { Button, FormControl, InputLabel, MenuItem, Rating, Select, SelectChangeEvent, Typography } from '@mui/material';
import CustomModal from '../../components/common/CustomModal';
import CustomInput from '../../components/common/CustomInput';
import { common } from '@mui/material/colors';
import CustomTextarea from '../../components/common/CustomTextarea';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { api } from '../../common/api';

// ------------------------------------
// 인터페이스 정의 (이전 코드와 동일)
// ------------------------------------


interface PaymentInfo {
    bidPrice: number;
    paymentMethod: string;
    paymentPrice: number;
    shippingPrice: number;
}

interface ShippingInfo {
    address: string;
    addressDetail: string;
    trackingNumber: string | null;
    company: string | null;
}


interface TransactionDetails {
    transactionId: number;
    createDate: string;

    goodsId: number;
    goodsImage: string;
    goodsName: string;
    paymentInfo: PaymentInfo;
    statusName: string;

    sellerInfo: {
        storeId: number;
        storeName: string;
        phone: string;
    };
    
    buyerInfo: {
        address: string;
        addressDetail: string;
        company: string | null;
        name: string;
        phone: string;
        trackingNumber: string | null;
    };
}

const tempReviewComments = [
    { id: 1, comment: '배송이 빨라요' },
    { id: 2, comment: '친절해요' },
    { id: 3, comment: '상품이 깨끗해요' },
    { id: 4, comment: '포장이 꼼꼼해요' },
    { id: 5, comment: '배송이 빨라요' },
]

const TransactionDetail: React.FC<{}> = () => {
    const [transactionDetail ,setTransactionDetail] = useState<TransactionDetails>();
    const shippingModalRef = useRef<any>(null);
    const reviewModalRef = useRef<any>(null);
    const [shippingCompany, setShippingCompany] = React.useState("");
    const [trackingNumber, setTrackingNumber] = React.useState("");
    const location = useLocation();

    const [rating, setRating] = useState<number>(0);
    const [content, setContent] = useState<string>("");
    const [choiceIds, setChoiceIds] = useState<number[]>([]);


    const handleClick = () => {
        if (!transactionDetail?.buyerInfo.trackingNumber || !transactionDetail?.buyerInfo.company) {
            alert("운송장 정보가 등록되지 않았습니다.");
            return;
        }

        window.open(
          `http://localhost:8080/transactions/1/shipping?invoice=${transactionDetail?.buyerInfo.trackingNumber}&code=${transactionDetail?.buyerInfo.company}`,
          "_blank"
        );
      };


    const handleChange = (event: SelectChangeEvent) => {
        setShippingCompany(event.target.value as string);
    };

    const isShippingRegistered = !!transactionDetail?.buyerInfo.trackingNumber;

    // 구매 확정 버튼 로직
    const handleConfirmPurchase = () => {
        if (transactionDetail?.statusName !== '배송중') {
            alert('배송 중 상태에서만 구매 확정이 가능합니다.');
            return;
        }
        const confirmResult = window.confirm('구매를 확정하시겠습니까? 구매 확정 후에는 취소가 불가능합니다.');
        if (confirmResult) {
            api.put(`/transactions/${transactionDetail?.transactionId}/confirm`)
            .then((res) => {
                console.log(res);
                alert('구매 확정 처리 완료!');
                reviewModalRef.current?.openModal();
            })
            .catch((err) => {
                console.log("🔥 에러:", err);
            });
        }
    };

    useEffect(()=>{
        if(!location.state.transactionId) return;
        const transactionId = location.state.transactionId;
        api.get(`/transactions/${transactionId}`)
        .then((res) => {
            console.log(res);
            setTransactionDetail(res);
        })
        .catch((err) => {
            console.log("🔥 에러:", err);
        });
    },[]);

    const handleRegisterTrackingNumber = (company: string, trackingNumber:string) => {
        api.post(`/transactions/${transactionDetail?.transactionId}/shipping`,{company, trackingNumber})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log("🔥 에러:", err);
        });
    }
    const handleReviewRegister = () => {
        api.post(`/review/${transactionDetail?.sellerInfo.storeId}`, {rating,content,choiceIds}
        )
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log("🔥 에러:", err);
        });
    }

    // 왼쪽 버튼의 내용을 조건부로 설정
    const LeftButton = () => {
        if (location.state.isBuyerView) {
            // 구매자 뷰: '구매 확정' 버튼
            return (
                <Button
                    style={{
                        width: '50%', height: '40px', borderRadius: '8px',
                        backgroundColor: '#F2F2F2',
                        border: '1px solid #D9D9D9', color: '#000000', fontSize: '16px'
                    }}
                    onClick={handleConfirmPurchase}
                >
                    구매 확정
                </Button>
            );
        } else {
            // 판매자 뷰: '운송장 등록' 버튼 
            return (
                <Button
                    style={{
                        width: '50%', height: '40px', borderRadius: '8px',
                        backgroundColor: '#F2F2F2',
                        border: '1px solid #D9D9D9', color: '#000000', fontSize: '16px'
                    }}
                    onClick={() => shippingModalRef.current?.openModal()}
                >
                    운송장 등록
                </Button>
            );
        }
    };

    const formatPrice = (price: number): string => {
        return price.toLocaleString('ko-KR') + '원';
    };

    const handleChoiceClick = (id: number) => {
        setChoiceIds(prev =>
            prev.includes(id)
                ? prev.filter(cid => cid !== id)
                : [...prev, id]
        );
    };

    return (
        <TitleLayout
            title={location.state.isBuyerView ? '구매 상세' : '판매 상세'}
            content={
                <div>
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <img
                                src={transactionDetail?.goodsImage}
                                alt={transactionDetail?.goodsName}
                                style={{ width: '240px', height: '157px', borderRadius: '12px' }}
                            />
                            <div style={{
                                marginLeft: '20px',
                                marginRight: 'auto'
                            }}>
                                <Typography fontSize={22} fontWeight={'bold'}>{transactionDetail?.goodsName}</Typography>
                            </div>
                            <Typography
                                fontSize={22}
                                fontWeight={'bold'}
                                color={transactionDetail?.statusName === '배송중' ? 'red' : 'gray'}
                            >
                                {transactionDetail?.statusName}
                            </Typography>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '20px'
                        }}>
                            {/* 💡 왼쪽 버튼: 뷰 타입에 따라 렌더링 */}
                            <LeftButton />

                            <Button
                                style={{
                                    width: '50%', height: '40px', borderRadius: '8px',
                                    backgroundColor: '#F2F2F2', border: '1px solid #D9D9D9', color:'#000000', fontSize: '16px'
                                }}
                                onClick={handleClick}
                            >
                                배송 조회
                            </Button>
                        </div>
                    </div>

                    {/* 판매자 정보 */}
                    <div style={{
                        display: 'flex', gap: '20px', flexDirection: 'column',
                        marginBottom: '20px', marginTop: '20px'
                    }}>
                        <Typography fontSize={22} fontWeight={'bold'}>판매자 정보</Typography>
                        <InfoList
                            data={{
                                sellerName: transactionDetail?.sellerInfo.storeName || "",
                                phone: transactionDetail?.sellerInfo.phone || ""
                            }}
                            labelMap={{ sellerName: '상점 이름', phone: '연락처' }}
                        />
                    </div>

                    {/* 배송 정보 */}
                    <div style={{
                        display: 'flex', gap: '20px', flexDirection: 'column',
                        marginBottom: '20px'
                    }}>
                        <Typography fontSize={22} fontWeight={'bold'}>배송 정보</Typography>
                        <InfoList
                            data={{
                                buyerName: transactionDetail?.buyerInfo.name || "",
                                phone: transactionDetail?.buyerInfo.phone || ""
                            }}
                            labelMap={{ buyerName: '수신인', phone: '연락처' }}
                        />
                        <InfoList
                            data={{
                                address: (transactionDetail?.buyerInfo.address + " " +transactionDetail?.buyerInfo.addressDetail) || "",
                                shipping: isShippingRegistered ? `${transactionDetail.buyerInfo.company} ${transactionDetail.buyerInfo.trackingNumber}` : '미등록'
                            }}
                            labelMap={{ address: '주소', shipping: '운송장 번호' }}
                        />
                    </div>

                    {/* 결제 정보 */}
                    <div style={{
                        display: 'flex', gap: '20px', flexDirection: 'column',
                        marginBottom: '20px'
                    }}>
                        <Typography fontSize={22} fontWeight={'bold'}>결제 정보</Typography>
                        <InfoList
                            data={{
                                winBidPrice: formatPrice(transactionDetail?.paymentInfo.bidPrice || 0),
                                shippingPrice: formatPrice(transactionDetail?.paymentInfo.shippingPrice || 0)
                            }}
                            labelMap={{ winBidPrice: '낙찰 가격', shippingPrice: '배송비' }}
                        />
                        <InfoList
                            data={{
                                paymentMethod: transactionDetail?.paymentInfo.paymentMethod || "",
                                paymentPrice: formatPrice(transactionDetail?.paymentInfo.paymentPrice || 0)
                            }}
                            labelMap={{ paymentMethod: '결제 수단', paymentPrice: '결제 금액' }}
                        />
                    </div>

                    {/* 운송장 등록 모달 (판매자 뷰에서만 사용되지만, 모달 자체는 렌더링 유지) */}
                    <CustomModal
                        ref={shippingModalRef}
                        title="운송장 등록"
                        content={
                            <div style={{ display: 'flex', gap: 10, width: '100%', alignItems: 'center' }}>
                                <FormControl sx={{ width: '200px' }} size="small">
                                    <InputLabel id="shipping-select-label">택배사</InputLabel>
                                    <Select
                                        labelId="shipping-select-label"
                                        id="shipping-select"
                                        value={shippingCompany} // 모달 내부 상태 사용
                                        onChange={handleChange}
                                        label="택배사"
                                    >
                                        <MenuItem value={'04'}>CJ대한통운</MenuItem>
                                        <MenuItem value={'01'}>우체국</MenuItem>
                                        <MenuItem value={'46'}>CU편의점택배</MenuItem>
                                    </Select>
                                </FormControl>
                                <CustomInput
                                    width={'400px'}
                                    height={40}
                                    placeholder='운송장 번호'
                                    value={trackingNumber}
                                    onChange={(e)=>{setTrackingNumber(e.target.value)}}
                                />
                            </div>
                        }
                        leftButtonContent="등록하기"
                        leftButtonColor="#000"
                        onLeftButtonClick={() => {
                            if (!shippingCompany || !trackingNumber) {
                                alert('택배사와 운송장 번호를 모두 입력해주세요.');
                                return;
                            }
                            alert(`운송장 등록: ${shippingCompany} - ${trackingNumber}`);
                            handleRegisterTrackingNumber(shippingCompany, trackingNumber);
                            shippingModalRef.current?.closeModal();
                        }}
                    />

                    <CustomModal
                        ref={reviewModalRef}
                        title="상품 리뷰"
                        height={565}
                        content={
                            <div style={{ display: 'flex', gap: 10, width: '100%', alignItems: 'center', flexDirection: 'column' }}>
                                <div style={{ color: '#141414', fontWeight: 'bold', fontSize: 16 }}>구매하신 상품의 리뷰를 남겨주세요.</div>
                                <div>
                                    <Rating name="simple-controlled" size={"large"} onChange={(e, newValue) => setRating(newValue ?? 0)}/>
                                </div>
                                <div style={{ width: '100%' }}>
                                    <CustomTextarea
                                        placeholder="(선택)리뷰를 입력해주세요."
                                        height={107}
                                        width={'94%'}
                                        fontSize={16}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                                <div style={{ width: '100%', display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                                    {tempReviewComments.map(item => (
                                        <Button
                                            key={item.id}
                                            onClick={() => handleChoiceClick(item.id)}
                                            style={{
                                                borderRadius: 8,
                                                fontSize: 13,
                                                padding: '6px 16px',
                                                backgroundColor: choiceIds.includes(item.id) ? '#c2c2c2ff' : '#F2F2F2',
                                                color: '#141414',
                                                fontWeight: 500,
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {item.comment}
                                        </Button>
                                    ))}
                                </div>
                                <div></div>
                            </div>
                        }
                        buttons={
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleReviewRegister()
                                    alert('리뷰가 등록되었습니다.');
                                    reviewModalRef.current?.closeModal();
                                }}
                                sx={{
                                    height: 40,
                                    width: '94%',
                                    backgroundColor: '#141414',
                                    color: '#FFFFFF',
                                    borderRadius: 2,
                                    fontSize: 14
                                }}>
                                리뷰 등록
                            </Button>
                        }
                    />
                </div>
            }
        />
    );
}

export default TransactionDetail;