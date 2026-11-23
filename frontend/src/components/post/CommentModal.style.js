import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const popIn = keyframes`
    from { opacity: 0; transform: translateY(8px) scale(0.98); }
    to { opacity: 1; transform: none; }
`;

export const ModalContainer = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    z-index: 1000;
    animation: ${fadeIn} 0.15s ease;
`;

export const ModalContent = styled.div`
    width: 100%;
    max-width: 480px;
    padding: 24px;
    border-radius: ${({ theme }) => theme.radius};
    background: ${({ theme }) => theme.surface};
    border: 1px solid ${({ theme }) => theme.border};
    box-shadow: ${({ theme }) => theme.shadow};
    color: ${({ theme }) => theme.color};
    animation: ${popIn} 0.18s ease;
`;

export const ModalTitle = styled.h3`
    margin: 0 0 16px;
    font-size: 1.1rem;
    font-weight: 700;
`;

export const ModalInput = styled.textarea`
    display: block;
    width: 100%;
    min-height: 120px;
    padding: 12px 14px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.radiusSm};
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
    font: inherit;
    font-size: 0.95rem;
    line-height: 1.6;
    resize: vertical;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &::placeholder {
        color: ${({ theme }) => theme.textMuted};
    }

    &:focus {
        border-color: ${({ theme }) => theme.accent};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.accentSoft};
    }
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
`;

export const ModalButton = styled.button`
    padding: 9px 18px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.radiusSm};
    background-color: transparent;
    color: ${({ theme }) => theme.color};
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.15s ease, opacity 0.15s ease;

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.surfaceAlt};
    }

    ${({ $primary, theme }) => $primary && css`
        border-color: ${theme.accent};
        background-color: ${theme.accent};
        color: ${theme.backgroundColor};

        &:hover:not(:disabled) {
            background-color: ${theme.accent};
            opacity: 0.85;
        }
    `}

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;
