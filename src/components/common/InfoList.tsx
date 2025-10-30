import React from "react";

interface InfoListProps {
    data: Record<string, string | number>;
    labelMap: Record<string, string>;
}

/** 공통 InfoList 컴포넌트
 * @example
 * <InfoList
 *      data={{
 *          name: '홍길동',
 *          age: 30,
 *          address: '서울시'
 *      }}
 *      labelMap={{ name: '이름', age: '나이' }}
 * />
 *
 * @param data 컴포넌트에 들어갈 데이터
 * @param labelMap 데이터의 제목을 매핑
 * @returns 
 */
const InfoList: React.FC<InfoListProps> = ({ data, labelMap }) => {
    const entries = Object.keys(labelMap)
        .filter((key) => key in data)
        .map((key) => ({ key, label: labelMap[key], value: data[key] }));

    return (
        <div style={{ display: 'flex', gap: '24px', fontSize: 14 }}>
            {entries.map((item, index) => (
                <div
                    key={item.key}
                    style={{
                        borderTop: '1px solid #E5E8EB',
                        width: index === 0 ? '20%' : '80%',
                        height: '83px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 2
                    }}
                >
                    <div style={{ color: '#61758A' }}>{item.label}</div>
                    <div style={{ color: '#141414' }}>{item.value}</div>
                </div>
            ))}
        </div>
    );
};

export default InfoList;
