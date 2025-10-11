import { Box, Button, Modal, Typography } from '@mui/material';
import React, { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';

interface ManageModalProps {
  title: string;
  content: ReactNode;
  viewLeftButton?: boolean;
  leftButtonColor?: string;
  leftButtonContent: string
  onLeftButtonClick: () => void;
}

export interface ManageModalHandle {
  openModal: () => void;
  closeModal: () => void;
}

/**
 * 관리자 화면에서 사용하는 모달 컴포넌트
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
 *      <ManageModal
 *        ref={modalRef}
 *        title="사용자 수정"
 *        content={<div>수정할 사용자 정보가 여기에 표시됩니다.</div>}
 *        leftButtonContent="저장"
 *        leftButtonColor="red"
 *        onLeftButtonClick={() => alert('저장 클릭')}
 *      />
 *    </div>
 *  );
 * 
 * @param title 모달 제목
 * @param content 모달 내 컨텐츠 (div와 같은 태그 사용가능)
 * @param viewLeftButton 하단 좌측 버튼 화면 표시 여부
 * @param leftButtonColor 하단 좌측 버튼 색깔 지정 (기본값 검정색, 'red'로 전달 시 붉은 색, 그 외 색 지정 불가)
 * @param leftButtonContent 하단 좌측 버튼 내 문구
 * @param onLeftButtonClick 하단 좌측 버튼 클릭 이벤트 함수
 */
const ManageModal = forwardRef<ManageModalHandle, ManageModalProps>(
  (
    {
      title,
      content,
      viewLeftButton = true,
      leftButtonColor = '#141414',
      leftButtonContent = '저장',
      onLeftButtonClick,
    },
    ref
  ) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [open, setOpen] = useState(false);
    const offset = useRef({ x: 0, y: 0 });
    const dragRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
      const width = 607;
      const height = 507;
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

    useImperativeHandle(ref, () => ({
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
              height: 507,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <Typography
              sx={{
                fontWeight: 'normal',
                backgroundColor: "#293846",
                borderRadius: '8px 8px 0px 0px',
                height: 41,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 1,
                color: '#FFFFFF',
                fontSize: 16,
                flexShrink: 0
              }}
              onMouseDown={handleMouseDown}
            >
              {title}
            </Typography>

            <Box
              sx={{
                overflowY: 'auto',
                padding: 1,
                height: 380,
                overflow: 'auto'
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
            }}>
              <Button
                variant="contained"
                onClick={onLeftButtonClick}
                sx={{
                  height: 40,
                  width: 224,
                  visibility: viewLeftButton ? 'visible' : 'hidden',
                  backgroundColor: leftButtonColor === 'red' ? '#FF5050' : '#141414',
                  color: '#FFFFFF',
                  borderRadius: 2,
                  fontSize: 14
                }}>
                {leftButtonContent}
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                sx={{
                  height: 40,
                  width: 224,
                  borderRadius: 2,
                  fontSize: 14
                }}>
                닫기
              </Button>
            </div>
          </Box>
        </Modal>
      </>
    );
  }
);

export default ManageModal;