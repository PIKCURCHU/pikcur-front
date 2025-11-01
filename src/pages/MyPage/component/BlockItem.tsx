import React, { useState } from 'react';
import CustomAvatar from '../../../components/common/CustomAvatar';
import { Button, IconButton, Snackbar, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BlockProps {
    id: number;
    name: string;
    src: string;
}

interface BlockItemProps {
    follow: BlockProps;
    onClick?: () => void;
}

const BlockItem: React.FC<BlockItemProps> = ({
    follow,
    onClick
}) => {

    return (
        <>
            <div
                style={{
                    width: 'calc(100% - 40px)',
                    display: 'flex',
                    alignItems: 'center',
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    padding: '16px 20px'
                }}
            >
                <CustomAvatar size={70} src={follow.src} />
                <div style={{ marginLeft: 20, marginRight: 'auto' }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 500 }}>{follow.name}</Typography>
                </div>
                <div style={{ marginRight: 20 }}>
                    <Button
                        onClick={onClick}
                        style={{ backgroundColor: '#D9D9D9', color: "#757575", borderRadius: 10 }}
                    >
                        차단 해제
                    </Button>
                </div>
            </div>
        </>
    );
};

export default BlockItem;