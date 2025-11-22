import React, { useState } from 'react';
import CustomAvatar from '../../../components/common/CustomAvatar';
import { IconButton, Snackbar, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

interface BrandItemProps {
    brandId: number;
    brandName: string;
    brandProfile: string;
    liked:boolean;
}

interface BrandProps {
    brand: BrandItemProps;
    onClick: () => void;
    onLike: () => void;
    onUnlike: () => void;
}

const BrandItem: React.FC<BrandProps> = ({
    brand,
    onClick,
    onLike,
    onUnlike
}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('')

    const handleHeartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (brand.liked) {
            // setIsBrandLike(false);
            onUnlike();
            // setSnackbarMsg(`${brand.brandName}을(를) 찜 해제했습니다.`);
            // setOpenSnackbar(true);
        } else {
            // setIsBrandLike(true);
            onLike();
            // setSnackbarMsg(`${brand.brandName}을(를) 찜 했습니다.`);
            // setOpenSnackbar(true);
        }
    };

    
    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
            >
                <FontAwesomeIcon icon={faTimes} fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div style={{
            width:'100%',
            display:'flex',
            alignItems:'center',
            cursor:'pointer'
            }}
            onClick={onClick}>
            <CustomAvatar size={100} src={brand.brandProfile}></CustomAvatar>
            <div style={{
                marginLeft:'20px',
                marginRight:'auto'
            }}>
                <Typography>{brand.brandName}</Typography>
            </div>
            <div style={{marginRight:'20px'}}>
            <FontAwesomeIcon
                onClick={handleHeartClick}
                icon={brand.liked ? faHeartSolid : faHeartRegular}
                style={{
                    width: 26,
                    height: 26,
                    transition: 'all 0.25s ease',
                    color: '#FF5050',
                    cursor:'pointer'
                }}
            />
            </div>
            
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={handleSnackbarClose}
                message={snackbarMsg}
                action={action}
            />
        </div>
    );
}

export default BrandItem;