import React, { useRef } from 'react';
import TitleLayout from '../../components/layout/TitleLayout';
import InfoList from '../../components/common/InfoList';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import CustomModal from '../../components/common/CustomModal';
import CustomInput from '../../components/common/CustomInput';

// ------------------------------------
// 인터페이스 정의 (이전 코드와 동일)
// ------------------------------------

interface ProductInfo {
    productName: string;
    productImageUrl: string;
    transactionStatus: '배송중' | '배송 전' | '거래 완료' | '취소';
}

interface UserInfo {
    name: string;
    phone: string;
}

interface TransactionDetails {
    product: ProductInfo;
    seller: UserInfo;
    buyer: UserInfo;
    shippingCompany: string;
    trackingNumber: string;
    address: string;
    winBidPrice: number;
    shippingPrice: number;
    totalPaymentPrice: number;
    paymentMethod: '신용카드' | '무통장 입금' | '포인트';
}

// ------------------------------------
// 더미 데이터 및 유틸리티 함수 (이전 코드와 동일)
// ------------------------------------

const TransactionDetailExample: TransactionDetails = {
    product: {
        productName: '빈티지 가죽 자켓 (A급)',
        productImageUrl: 'https://picsum.photos/240/157',
        transactionStatus: '배송중', 
    },
    seller: {
        name: '프리미엄 빈티지 샵',
        phone: '010-3456-7890',
    },
    buyer: {
        name: '김구매 (buyerName)',
        phone: '010-1234-5678',
    }, 
    shippingCompany: 'CJ대한통운',
    trackingNumber: '2342-3546-3463-46',
    address: '서울특별시 강남구 테헤란로 123',
    winBidPrice: 250000,
    shippingPrice: 5000,
    totalPaymentPrice: 255000,
    paymentMethod: '신용카드'
};

const formatPrice = (price: number): string => {
    return price.toLocaleString('ko-KR') + '원';
};

const TransactionDetail: React.FC<{ isBuyerView: boolean }> = ({ isBuyerView = true }) => {
    const shippingModalRef = useRef<any>(null);
    const [shippingCompany, setShippingCompany] = React.useState(TransactionDetailExample.shippingCompany);
    const [trackingNumber, setTrackingNumber] = React.useState(TransactionDetailExample.trackingNumber);

    const handleChange = (event: SelectChangeEvent) => {
        setShippingCompany(event.target.value as string);
    };

    const data = TransactionDetailExample;
    const isShippingRegistered = !!data.trackingNumber;
    
    // 구매 확정 버튼 로직
    const handleConfirmPurchase = () => {
        if (data.product.transactionStatus !== '배송중') {
            alert('배송 중 상태에서만 구매 확정이 가능합니다.');
            return;
        }
        const confirmResult = window.confirm('구매를 확정하시겠습니까? 구매 확정 후에는 취소가 불가능합니다.');
        if (confirmResult) {
            alert('구매 확정 처리 완료!');
            // TODO: '거래 완료' 상태로 업데이트하는 API 호출 로직
        }
    };
    
    // 왼쪽 버튼의 내용을 조건부로 설정
    const LeftButton = () => {
        if (isBuyerView) {
            // 구매자 뷰: '구매 확정' 버튼
            return (
                <Button 
                    style={{
                        width:'50%', height:'40px', borderRadius:'8px', 
                        backgroundColor: '#F2F2F2',
                        border:'1px solid #D9D9D9', color:'#000000', fontSize:'16px'
                    }}
                    onClick={handleConfirmPurchase}
                    // '배송중' 상태일 때만 활성화 (임시 조건)
                    disabled={data.product.transactionStatus !== '배송중'}
                >
                    구매 확정
                </Button>
            );
        } else {
            // 판매자 뷰: '운송장 등록' 버튼 (기존 로직)
            return (
                <Button 
                    style={{
                        width:'50%', height:'40px', borderRadius:'8px', 
                        backgroundColor: '#F2F2F2',
                        border:'1px solid #D9D9D9', color:'#000000', fontSize:'16px'
                    }}
                    onClick={() => shippingModalRef.current?.openModal()}
                >
                    운송장 등록
                </Button>
            );
        }
    };

    return(
        <TitleLayout
            title={isBuyerView ? '구매 상세' : '거래 상세'}
            content={
                <div>
                    <div>
                        <div style={{
                            display:'flex',
                            alignItems:'center'
                        }}>
                            <img 
                                src={data.product.productImageUrl} 
                                alt={data.product.productName}
                                style={{width:'240px', height:'157px', borderRadius:'12px'}} 
                            />
                            <div style={{
                                marginLeft:'20px',
                                marginRight:'auto'
                            }}>
                                <Typography fontSize={22} fontWeight={'bold'}>{data.product.productName}</Typography>
                            </div>
                            <Typography 
                                fontSize={22} 
                                fontWeight={'bold'} 
                                color={data.product.transactionStatus === '배송중' ? 'red' : 'gray'}
                            >
                                {data.product.transactionStatus}
                            </Typography>
                        </div>
                        
                        <div style={{
                            display:'flex',
                            gap:'10px',
                            marginTop:'20px'
                        }}>
                            {/* 💡 왼쪽 버튼: 뷰 타입에 따라 렌더링 */}
                            <LeftButton /> 
                            
                            <Button 
                                style={{
                                    width:'50%', height:'40px', borderRadius:'8px', 
                                    backgroundColor:'#F2F2F2', border:'1px solid #D9D9D9', color:'#000000', fontSize:'16px'
                                }}
                                disabled={!isShippingRegistered}
                                onClick={() => {
                                    alert(`'${data.shippingCompany}'로 배송 조회 (${data.trackingNumber})`);
                                }}
                            >
                                배송 조회
                            </Button>
                        </div>
                    </div>
                    
                    {/* 판매자 정보 */}
                    <div style={{
                        display:'flex', gap:'20px', flexDirection:'column',
                        marginBottom:'20px', marginTop:'20px'
                    }}>
                        <Typography fontSize={22} fontWeight={'bold'}>판매자 정보</Typography>
                        <InfoList
                            data={{
                                sellerName: data.seller.name, 
                                phone: data.seller.phone
                            }}
                            labelMap={{ sellerName: '상점 이름', phone: '연락처' }}
                        />
                    </div>
                    
                    {/* 배송 정보 */}
                    <div style={{
                        display:'flex', gap:'20px', flexDirection:'column',
                        marginBottom:'20px'
                    }}>
                        <Typography fontSize={22} fontWeight={'bold'}>배송 정보</Typography> 
                        <InfoList
                            data={{
                                buyerName: data.buyer.name,
                                phone: data.buyer.phone
                            }}
                            labelMap={{ buyerName: '수신인', phone: '연락처'}}
                        />
                        <InfoList
                            data={{
                                address: data.address,
                                shipping: isShippingRegistered ? `${data.shippingCompany} ${data.trackingNumber}` : '미등록'
                            }}
                            labelMap={{ address:'주소', shipping:'운송장 번호' }}
                        />
                    </div>
                    
                    {/* 결제 정보 */}
                    <div style={{
                        display:'flex', gap:'20px', flexDirection:'column',
                        marginBottom:'20px'
                    }}>
                        <Typography fontSize={22} fontWeight={'bold'}>결제 정보</Typography>
                        <InfoList
                            data={{
                                winBidPrice: formatPrice(data.winBidPrice),
                                shippingPrice: formatPrice(data.shippingPrice)
                            }}
                            labelMap={{ winBidPrice:'낙찰 가격', shippingPrice:'배송비' }}
                        />
                        <InfoList
                            data={{
                                paymentMethod: data.paymentMethod,
                                paymentPrice: formatPrice(data.totalPaymentPrice)
                            }}
                            labelMap={{ paymentMethod:'결제 수단', paymentPrice:'결제 금액' }}
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
                                        <MenuItem value={'CJ대한통운'}>CJ대한통운</MenuItem>
                                        <MenuItem value={'우체국'}>우체국</MenuItem>
                                        <MenuItem value={'CU편의점택배'}>CU편의점택배</MenuItem>
                                    </Select>
                                </FormControl>
                                <CustomInput 
                                    width={'400px'} 
                                    height={40} 
                                    placeholder='운송장 번호' 
                                    value={trackingNumber}
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
                            // TODO: 상태 업데이트 로직 추가
                            shippingModalRef.current?.closeModal();
                        }}
                    />
                </div>
            }
        />
    );
}

export default TransactionDetail;