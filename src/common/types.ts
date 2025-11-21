import { TableCellProps } from "@mui/material";

/**
 * CustonTable Component 컬럼 타입 정의
 */
declare global {
  interface ColumnDef {
    field: string;
    headerName: string;
    width?: number;
    align?: TableCellProps["align"];
    render?: (value: any, row?: any) => React.ReactNode;
  }

  interface Window {
    daum: any;
  }
}

export {};