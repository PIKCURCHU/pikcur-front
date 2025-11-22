import React, { useState } from 'react';
import CustomAvatar from '../../../components/common/CustomAvatar';
import { Button, IconButton, Snackbar, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
interface StoreItemProps {
    storeId: number;
    storeName: string;
    profile: string;
    follow:boolean;
}
interface StoreProps {
    store: StoreItemProps;
    onClick: () => void;
    onFollow: () => void;
    onUnfollow: () => void;
}

const StoreItem: React.FC<StoreProps> = ({
    store,
    onClick,
    onFollow,
    onUnfollow
}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('')

    const handleFollowClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (store.follow) {
            // setIsStoreFollowed(false);
            onUnfollow();
            // setSnackbarMsg(`${store.storeName}을(를) 팔로우 해제했습니다.`);
            // setOpenSnackbar(true);
        } else {
            // setIsStoreFollowed(true);
            onFollow();
            // setSnackbarMsg(`${store.storeName}을(를) 팔로우 했습니다.`);
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
            <CustomAvatar size={100} src={store.profile}></CustomAvatar>
            <div style={{
                marginLeft:'20px',
                marginRight:'auto'
            }}>
                <Typography>{store.storeName}</Typography>
            </div>
            <div style={{marginRight:'20px'}}>
                {store.follow && 
                    <Button
                        type="button"
                        onClick={handleFollowClick}
                        style={{
                            backgroundColor: "#141414",
                            color: "#fff",
                            width: 93,
                            height: 40,
                            fontSize: 14,
                            borderRadius: 8,
                        }}>팔로잉
                    </Button> 
                }
                {!store.follow && 
                    <Button
                        type="button"
                        onClick={handleFollowClick}
                        style={{
                            backgroundColor: "#F2F2F2",
                            color: "#141414",
                            width: 93,
                            height: 40,
                            fontSize: 14,
                            borderRadius: 8,
                        }}>팔로우
                    </Button> 
                }
                
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

export default StoreItem;