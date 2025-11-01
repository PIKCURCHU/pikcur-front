import { Box, Divider, List, ListItem, ListItemText, Paper, Switch } from "@mui/material";
import * as React from "react";

interface SettingListProps {
    children: React.ReactNode;
}

/** 자식 컴포넌트를 가지는 설정 레이아웃
 * 
 * @example
 * <SettingList>
        <SettingItem type='top' content="전체 알림" element={<BorderlessInput type='password'/>}></SettingItem>
        <SettingItem type='bottom' content="전체 알림" element={<Switch
        edge="end"
        onChange={handleToggle('all')}
        checked={checked.indexOf('all') !== -1}
        />}></SettingItem>
    </SettingList>
 * @param children 
 * @returns 
 */
const SettingList: React.FC<SettingListProps> =({children}) => {
    return (
        <Box sx={{ display:"flex", justifyContent: "space-evenly", paddingTop: '160px'}} width={'100%'} height={'calc(100% - 160px)'} bgcolor={"#F2F2F2"}>
            <List sx={{display: "flex", flexDirection: "column", alignItems: "center", width: '75%' }} >
            {/* 설정 요소 섹션 */}
            
            {children}
            
            </List>
        </Box>
    );
}

export default SettingList;