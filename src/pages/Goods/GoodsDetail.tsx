import React from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import GoodsGallery from './Component/GoodsGallery';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import CustomAvatar from '../../components/common/CustomAvatar';
import ReviewSummary from '../../components/common/ReviewSummary';
import CustomTable from '../../components/common/CustomTable';

const GoodsDetail: React.FC = () => {
    return (
        <>
            <BaseLayout
                content={
                    <div style={{ marginLeft: '80px', marginRight: '80px' }}>
                        <div style={{ height: '30px', marginBottom: 14, fontSize: 16, fontWeight: 'normal', color: '#141414' }}>HOME &gt; 아우터 &gt; 자켓 &gt; 가죽자켓</div>
                        <div style={{ height: '508px', display: 'flex', overflow: 'hidden', borderBottom: '1px solid #F2F2F2', paddingBottom: 30 }}>
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight: 0,
                                    overflow: 'hidden'
                                }}
                            >
                                <GoodsGallery
                                    images={
                                        ["data:image/jpeg;base64,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",
                                        ]
                                    } />
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderBottom: '1px solid #F2F2F2' }}>
                                    <div style={{ marginBottom: 14, display: 'flex', color: '#294186', fontSize: 16 }}>
                                        휴먼메이드
                                    </div>
                                    <div style={{ color: '#141414', fontSize: 24 }}>엄청나게 화려한 자켓</div>
                                </div>
                                <div style={{ flex: 3, display: 'flex', flexDirection: 'row', borderBottom: '1px solid #F2F2F2' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: '700', color: '#141414' }}>
                                            <div>현재 입찰가</div>
                                            <div style={{ color: '#FF5050 ' }}>30,000</div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#141414' }}>
                                            <div>즉시 입찰가</div>
                                            <div>50,000</div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: '#141414' }}>
                                            <div>시작가</div>
                                            <div>10,000</div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: '#141414' }}>
                                            <div>배송비</div>
                                            <div>3,000</div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: '#141414' }}>
                                            <div>상품 상태</div>
                                            <div>최상</div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: '#141414' }}>
                                            <div>경매 종료</div>
                                            <div>2023-12-31 23:59:59</div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: '#141414' }}>
                                            <div>사이즈</div>
                                            <div>270</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
                                        <button
                                            type="button"
                                            aria-label="찜하기"
                                            style={{
                                                width: 40,
                                                height: 40,
                                                border: '1px solid #E0E0E0',
                                                borderRadius: 12,
                                                background: '#FFFFFF',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 0
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faHeart} style={{ color: '#FF5050', fontSize: 22 }} />
                                        </button>
                                        <Button style={{ backgroundColor: '#141414', height: 40, width: 120, color: '#FFFFFF' }}>입찰</Button>
                                        <Button style={{ backgroundColor: '#F2F2F2', height: 40, width: 120, color: '#141414', border: '1px solid #D9D9D9' }}>즉시 결제</Button>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: '74px' }}>
                                            <div style={{ marginLeft: 8 }}>
                                                <CustomAvatar />
                                            </div>
                                            <div>holly1017상점</div>
                                            <div style={{ marginRight: 8 }}>
                                                <ReviewSummary value={3} reviewCnt={10} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 30, minHeight: 200, fontSize: 18, borderBottom: '1px solid #F2F2F2' }}>
                            상품 설명
                            <div style={{ marginTop: 14, color: '#595959', lineHeight: '28px' }}>
                                이 자켓은 휴먼메이드의 최신 컬렉션으로, 독특한 디자인과 뛰어난 품질로 제작되었습니다. 다양한 색상과 패턴이 조화를 이루어 어떤 스타일에도 잘 어울립니다. 편안한 착용감과 내구성을 자랑하며, 일상 생활은 물론 특별한 행사에서도 빛을 발할 수 있는 아이템입니다. 지금 바로 입찰에 참여하여 이 멋진 자켓을 소유하세요!
                            </div>
                        </div>
                        <div style={{ marginTop: 30, minHeight: 200, fontSize: 18, paddingBottom: 50 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>상점 문의</div>
                                <Button style={{ height: 35, width: 89, backgroundColor: '#141414', color: '#fff' }}>문의하기</Button>
                            </div>

                            <div style={{ marginTop: 14 }}>
                                <CustomTable
                                    width={"100%"}
                                    columns={[
                                        { field: "name", headerName: "이름" },
                                        { field: "age", headerName: "나이" },
                                        { field: "city", headerName: "도시", render: (value: any) => <b>{value}</b> },
                                    ]}
                                    dataList={[
                                        { name: "홍길동", age: 28, city: "서울" },
                                        { name: "김철수", age: 33, city: "부산" },
                                    ]}
                                    onRowClick={(row) => console.log("클릭한 행:", row)}
                                />
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default GoodsDetail;