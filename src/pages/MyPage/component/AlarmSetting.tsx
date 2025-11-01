import React, { useState } from 'react';
import SettingItem from '../../../components/common/SettingItem';
import { Button, Switch } from '@mui/material';

interface AlarmSettingProps {
    initStatus?: boolean;
}

interface SettingsState {
    [key: string]: boolean;
}

const alarmGroups = [
    {
        items: [
            { key: 'all', label: '전체알람', type: 'single' }
        ]
    },
    {
        items: [
            { key: 'inquiry-register', label: '문의 등록', type: 'top' },
            { key: 'inquiry-reply', label: '문의 답변 등록', type: 'bottom' }
        ]
    },
    {
        items: [
            { key: 'bid-register', label: '입찰 등록', type: 'top' },
            { key: 'bid-win', label: '낙찰', type: 'middle' },
            { key: 'payment-complete', label: '결제 완료', type: 'middle' },
            { key: 'transaction-status-change', label: '거래 상태 변경', type: 'middle' },
            { key: 'review-register', label: '리뷰 등록', type: 'bottom' }
        ]
    },
    {
        items: [
            { key: 'favorite-auction-end-30min', label: '찜 상품 경매  종료 30분전', type: 'top' },
            { key: 'follow-store-product-register', label: '팔로우 상점 상품 등록', type: 'middle' },
            { key: 'favorite-brand-product-register', label: '찜 브랜드 상품 등록', type: 'bottom' }
        ]
    }
];

const AlarmSetting: React.FC<AlarmSettingProps> = ({ initStatus }) => {
    const [settings, setSettings] = useState<SettingsState>({
        'all': true,
        'inquiry-register': true,
        'inquiry-reply': false,
        'bid-register': false,
        'bid-win': false,
        'payment-complete': false,
        'transaction-status-change': false,
        'review-register': false,
        'favorite-auction-end-30min': false,
        'follow-store-product-register': false,
        'favorite-brand-product-register': false,
    });

    const handleToggle = (key: string) => () => {
        if (key === 'all') {
            const newValue = !settings['all'];
            const updated = { ...settings };
            Object.keys(updated).forEach(k => updated[k] = newValue);
            setSettings(updated);
        } else {
            setSettings(prevSettings => ({
                ...prevSettings,
                [key]: !prevSettings[key],
            }));
        }
    };

    const submitHandler = () => {
        // api 함수
    }

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ width: '100%' }}>
                {alarmGroups.map((group, idx) => (
                    <div key={idx} style={{ marginBottom: 32, width: '100%' }}>
                        {group.items.map(item => (
                            <SettingItem
                                key={item.key}
                                elementRight={true}
                                type={item.type as any}
                                content={item.label}
                                element={
                                    <Switch
                                        edge="end"
                                        onChange={handleToggle(item.key)}
                                        checked={settings[item.key]}
                                    />
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>

            <Button
                style={{ width: '100%', height: '56px', backgroundColor: '#141414', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 'bold' }}
                onClick={submitHandler}
            >
                변경사항 저장
            </Button>
        </div>
    );
};

export default AlarmSetting;