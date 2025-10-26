import React from 'react';
import TitleLayout from '../../components/layout/TitleLayout';
import CustomTable from '../../components/common/CustomTable';
import CustomInput from '../../components/common/CustomInput';

interface GoodsBidRegisterProps {

}

const GoodsBidRegister: React.FC<GoodsBidRegisterProps> = () => {
    return (
        <>
            <TitleLayout
                title="입찰"
                subTitle="현재 금액: 5,000원"
                leftButtonName="입찰하기"
                rightButtonName="돌아가기"
                content={
                    <>
                        <div style={{ paddingBottom: 11, fontSize: 18, color: '#141414', fontWeight: 'bold' }}>이전 입찰 내역</div>
                        <div style={{ paddingBottom: 37 }}>
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
                        <div>
                            <div style={{ paddingBottom: 11, fontSize: 18, color: '#141414' }}>입찰 금액</div>
                            <CustomInput 
                                placeholder="입찰 금액을 입력하세요"
                                type="number"
                                width={448}
                                height={56}
                                fontSize={16}
                            />
                        </div>
                    </>
                }
            />
        </>
    )
}

export default GoodsBidRegister;