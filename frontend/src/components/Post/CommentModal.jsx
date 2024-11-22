import React, { useState } from "react";
import { ModalContainer, ModalContent, ModalInput, ModalButton } from "./CommentModal.style";

const CommentModal = ({ onClose, onSubmit }) => {
    const [comment, setComment] = useState("");

    const handleSubmit = () => {
        if (comment.trim()) {
            onSubmit(comment);
            setComment("");
        }
    };

    return (
        <ModalContainer>
            <ModalContent>
                <h3>댓글 작성</h3>
                <ModalInput
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="댓글을 입력하세요."
                />
                <div>
                    <ModalButton onClick={onClose}>취소</ModalButton>
                    <ModalButton onClick={handleSubmit} primary>
                        등록
                    </ModalButton>
                </div>
            </ModalContent>
        </ModalContainer>
    );
};

export default CommentModal;