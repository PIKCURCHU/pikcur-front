import React, { useState } from 'react';
import BlockItem from './BlockItem';
import { IconButton, Snackbar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface BlockSettingProps { }

const initialBlockData = [
    {
        id: 1,
        name: '홍길동',
        src: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: 2,
        name: '김철수',
        src: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        id: 3,
        name: '이영희',
        src: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: 4,
        name: '이영희',
        src: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: 5,
        name: '이영희',
        src: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: 6,
        name: '이영희',
        src: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: 7,
        name: '이영희',
        src: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: 8,
        name: '이영희',
        src: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: 9,
        name: '이영희',
        src: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
];

const BlockSetting: React.FC<BlockSettingProps> = () => {
    const [blockData, setBlockData] = useState(initialBlockData);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const handleUnBlock = (id: number, name: string) => {
        setBlockData(prev => prev.filter(item => item.id !== id));
        setSnackbarMsg(`${name}님의 차단이 해제되었습니다.`);
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
        >
            <FontAwesomeIcon icon={faTimes} fontSize="small" />
        </IconButton>
    );

    return (
        <>
            <div style={{ height: '100%', overflowY: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 15 }}>
                {blockData.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#757575', fontSize: 16, marginTop: 40 }}>
                        차단된 상점이 없습니다.
                    </div>
                ) : (
                    blockData.map(follow => (
                        <BlockItem
                            key={follow.id}
                            follow={follow}
                            onClick={() => handleUnBlock(follow.id, follow.name)}
                        />
                    ))
                )}
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={handleSnackbarClose}
                message={snackbarMsg}
                action={action}
            />
        </>
    );
};

export default BlockSetting;