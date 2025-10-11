import { ListItem, ListItemText, Switch } from "@mui/material";
import * as React from "react";

type RadiusType = 'top' | 'bottom' | 'middle';

const borderRadiusMap: Record<RadiusType, string> = {
    top: '15px 15px 0 0',
    bottom: '0 0 15px 15px',
    middle: '0'
}

interface SettingElementProps {
    content: string;
    element: React.ReactNode; 
    type: RadiusType; /**15 15 0 0, 0 0 15 15 */
}

/** 설정 리스트 내부 자식 요소로 들어갈 리스트 아이템 컴포넌트
 * 
 * @example
--------------------------------------------------------
(Switch 컴포넌트 사용하는 경우 정의 필요)
상태 객체의 타입을 interface로 정의
interface SettingsState {
  'all': boolean;
  'inquiry-register': boolean;
  'inquiry-reply': boolean;
  'bid-register': boolean;
  'bid-win': boolean;
  // 나중에 설정이 추가되면 여기에 타입을 추가
  [key: string]: boolean; // 인덱스 시그니처: 어떤 문자열 key든 boolean 값을 가짐
}

useState에 위에서 정의한 interface를 적용
const [settings, setSettings] = React.useState<SettingsState>({
  'all': true,
  'inquiry-register': true,
  'inquiry-reply': false,
  'bid-register': false,
  'bid-win': false,
});

핸들러 함수
const handleToggle = (key: string) => () => {
  setSettings(prevSettings => ({
    ...prevSettings,
    [key]: !prevSettings[key],
  }));
};
--------------------------------------------------------

 * <SettingItem
 *   type='middle'
 *   content="문의 등록"
 *   element={
 *     <Switch
 *       edge="end"
 *       onChange={handleToggle('inquiry-register')}
 *       checked={settings['inquiry-register']}
 *     />
 *   }
 * />
 * 
 * @param content 리스트 요소의 내부 텍스트
 * @param element 리스트 요소의 내부 컴포넌트 - ex) input, Switch
 * @param type 리스트 요소의 radius 방향
 * @returns 
 */
const SettingItem: React.FC<SettingElementProps> = ({content, element, type}) => {
    
        
    return (
        <ListItem sx={{
            height:"46px",
            backgroundColor: 'white',
            border: "1px solid #D9D9D9",
            borderRadius: borderRadiusMap[type]
          }}>
            <ListItemText primary={content} />
            {element}
        </ListItem>
    );
}

export default SettingItem;