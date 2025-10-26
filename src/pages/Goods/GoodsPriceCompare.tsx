import React, { useState } from 'react';
import BaseLayout from '../../components/layout/BaseLayout';
import CustomTable from '../../components/common/CustomTable';

interface GoodsPriceCompareProps {

}

/**
 * 
 * 상품 가격비교 + 시세 페이지 (탭 구분)
 */
const GoodsPriceCompare: React.FC<GoodsPriceCompareProps> = () => {
    const [activeTab, setActiveTab] = useState<'compare' | 'trend'>('compare');


    return (
        <BaseLayout
            content={
                <>
                    <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: 11 }}>
                        <div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Inzdx9zGZ7tX3MDnWf4i6ah0xAB5kHjUag&s"
                                style={{ width: 160, height: 160 }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', height: 160, justifyContent: 'center', marginLeft: 23, gap: 10 }}>
                            <div style={{ color: '#141414', fontSize: 22, fontWeight: 'bold' }}>브랜드명</div>
                            <div style={{ color: '#141414', fontSize: 14, fontWeight: 'normal' }}>상품 명</div>
                        </div>
                    </div>
                    <div style={{ marginTop: 24 }}>
                        <div
                            style={{
                                display: 'flex',
                                borderBottom: '1px solid #E5E5E5',
                                gap: 4
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => setActiveTab('compare')}
                                style={{
                                    padding: '12px 20px',
                                    color: activeTab === 'compare' ? '#141414' : '#757575',
                                    backgroundColor: '#fff',
                                    border: 'none',
                                    borderBottom:
                                        activeTab === 'compare' ? '2px solid #141414' : '1px solid #D9D9D9',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                가격비교
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('trend')}
                                style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#fff',
                                    color: activeTab === 'trend' ? '#141414' : '#757575',
                                    border: 'none',
                                    borderBottom:
                                        activeTab === 'trend' ? '2px solid #141414' : '1px solid #D9D9D9',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                }}
                            >
                                시세
                            </button>
                        </div>

                        <div style={{ padding: '24px 4px', minHeight: 160 }}>
                            {/* 가격비교 탭 내용 */}
                            {activeTab === 'compare' && (
                                <div style={{ fontSize: 16, color: '#141414' }}>
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
                                        interactive={false}
                                    />
                                </div>
                            )}

                            {/* 시세 탭 내용 */}
                            {activeTab === 'trend' && (
                                <div style={{ fontSize: 16, color: '#141414' }}>
                                    <div style={{ height: 362 }}>그래프 영역</div>
                                    <div>
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
                                            interactive={false}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            }
        />
    )
}

export default GoodsPriceCompare;