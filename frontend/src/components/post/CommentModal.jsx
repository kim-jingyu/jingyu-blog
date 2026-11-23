import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ModalContainer, ModalContent, ModalTitle, ModalInput, ModalActions, ModalButton } from "./CommentModal.style";

const CommentModal = ({ onClose, onSubmit }) => {
    const [comment, setComment] = useState("");

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    const handleSubmit = () => {
        if (comment.trim()) {
            onSubmit(comment);
            setComment("");
        }
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <ModalContainer onClick={onClose}>
            <ModalContent role="dialog" aria-modal="true" aria-labelledby="comment-modal-title" onClick={(e) => e.stopPropagation()}>
                <ModalTitle id="comment-modal-title">댓글 작성</ModalTitle>
                <ModalInput
                    autoFocus
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="댓글을 입력하세요. (Ctrl + Enter로 등록)"
                />
                <ModalActions>
                    <ModalButton onClick={onClose}>취소</ModalButton>
                    <ModalButton onClick={handleSubmit} $primary disabled={!comment.trim()}>
                        등록
                    </ModalButton>
                </ModalActions>
            </ModalContent>
        </ModalContainer>
    );
};

CommentModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CommentModal;
