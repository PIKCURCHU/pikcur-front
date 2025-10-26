import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface CustomTableProps {
    width: number | string;
    columns: ColumnDef[];
    dataList: any[];
    onRowClick?: (row: any) => void;
    interactive?: boolean;
}

/** 공통 Table 컴포넌트
 * 
 * @example
 * <CustomTable
 *   width={600}
 *   columns={[
 *     { field: "name", headerName: "이름" },
 *     { field: "age", headerName: "나이" },
 *     { field: "city", headerName: "도시", render: (value: any) => <b>{value}</b> }, // render 함수로 커스텀 렌더링 가능, 이미지도 가능
 *   ]}
 *   dataList={[
 *     { name: "홍길동", age: 28, city: "서울" },
 *     { name: "김철수", age: 33, city: "부산" },
 *   ]}
 *   onRowClick={(row) => console.log("클릭한 행:", row)}
 * />
 *
 * @param width 가로 크기
 * @param columns 컬럼 정의
 * @param dataList 데이터 리스트
 * @param onRowClick 행 클릭 이벤트 핸들러
 * @returns 
 */
const CustomTable: React.FC<CustomTableProps> = ({
    width,
    columns,
    dataList,
    onRowClick,
    interactive = true,
}) => {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2, width: width, boxShadow: 'none', border: '1px solid #E0E0E0' }}>
            <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                <TableHead>
                    <TableRow>
                        {columns.map((col) => (
                            <TableCell
                                key={col.field}
                                align={col.align || "left"}
                                sx={{
                                    fontWeight: 500,
                                    color: '#141414',
                                    fontSize: 14,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textAlign:'center'
                                }}>
                                {col.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {dataList.map((row, idx) => (
                        <TableRow
                            key={idx}
                            hover={interactive}
                            onClick={() => {
                                if (interactive) onRowClick?.(row);
                            }}
                            sx={{
                                cursor: interactive ? 'pointer' : 'default',
                                '&:hover': interactive
                                    ? { backgroundColor: '#F5F5F5' }
                                    : undefined,
                                transition: 'background-color 0.15s ease'
                            }}
                        >
                            {columns.map((col) => (
                                <TableCell 
                                key={col.field} 
                                align={col.align || "left"} 
                                sx={{
                                    fontweight: 400, 
                                    color: '#757575', 
                                    fontSize: 14, 
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textAlign:'center'
                                }}>
                                    {col.render ? col.render(row[col.field], row) : row[col.field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
