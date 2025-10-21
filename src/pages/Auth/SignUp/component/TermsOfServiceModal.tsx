import { Button, Divider, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

interface TermsOfServiceModalProps {
    title: string;
    content: React.ReactNode;
}

export interface ManageModalHandle {
    openModal: () => void;
    closeModal: () => void;
}

/** 사용자 화면 커스텀 모달 컴포넌트
 * @example
 * const modalRef = useRef<ManageModalHandle>(null); ! 외부에서 꼭 Ref를 선언해야함 => 부모 요소에서 자식 요소 내부 함수를 참조하기 위함 !
 * 
 * return (
 *    <div>
 *      <Button
 *        variant="contained"
 *        onClick={() => modalRef.current?.openModal()} // ManageModal의 openModal 사용 / closeModal도 필요시 사용
 *      >
 *        사용자 수정
 *      </Button>
 *
 *      <TermsOfServiceModal
 *        ref={modalRef}
 *        title="입찰"
 *        content={<div>입찰 내용</div>}
 *        leftButtonContent="입찰"
 *        leftButtonColor="red"
 *        onLeftButtonClick={() => alert('입찰 클릭')}
 *      />
 *    </div>
 *  );
 * @param title 모달 제목
 * @param content 모달 내 콘텐츠
 * @param leftButtonColor 하단 좌측 버튼 색 지정
 * @param leftButtonContent 하단 좌측 버튼 문구
 * @param onLeftButtonClick 하단 좌측 버튼 클릭 이벤트 함수
 * @returns 
 */
const TermsOfServiceModal = React.forwardRef<ManageModalHandle, TermsOfServiceModalProps>(
    (
        {
            title,
            content,
        },
        ref
    ) => {
        const [position, setPosition] = React.useState({ x: 0, y: 0 });
        const [open, setOpen] = React.useState(false);
        const offset = React.useRef({ x: 0, y: 0 });
        const dragRef = React.useRef<HTMLDivElement>(null);

        const handleOpen = () => {
            const width = 612;
            const height = 726;
            setPosition({
                x: (window.innerWidth - width) / 2,
                y: (window.innerHeight - height) / 2,
            })
            setOpen(true);
        }

        const handleMouseDown = (e: React.MouseEvent) => {
            offset.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            };
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y,
            });
        }

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        React.useImperativeHandle(ref, () => ({
            openModal: () => handleOpen(),
            closeModal: () => setOpen(false),
        }));

        return (
            <>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box
                        ref={dragRef}
                        sx={{
                            position: 'absolute',
                            top: position.y,
                            left: position.x,
                            width: 607,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 3,
                            height: 726,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                borderRadius: '8px 8px 0px 0px',
                                height: 41,
                                display: 'flex',
                                alignItems: 'center',
                                padding: "20px",
                                color: 'black',
                                fontSize: 25,
                                flexShrink: 0,
                                justifyContent: "space-evenly"
                            }}
                            onMouseDown={handleMouseDown}
                        >
                            {title}
                        </Typography>
                        <Divider component="li" sx={{ height: 0 }} />
                        <Box
                            sx={{
                                padding: "20px",
                                overflowY: 'auto',
                                height: 565,
                                overflow: 'auto',
                                display: "flex",
                            }}
                        >
                            {content}
                        </Box>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 30,
                            alignItems: 'center',
                            flex: 1,
                            borderRadius: '0px 0px 8px 8px',
                            marginBottom: "30px"
                        }}>
                            <Button
                                variant="outlined"
                                onClick={() => setOpen(false)}
                                sx={{
                                    height: 56,
                                    width: 570,
                                    borderRadius: 2,
                                    fontSize: 14,
                                    color: "white",
                                    border: "none",
                                    backgroundColor: "#2563EB"
                                }}>
                                확 인
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </>
        );
    }
);
export default TermsOfServiceModal;
