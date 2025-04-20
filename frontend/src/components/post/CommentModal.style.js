import styled from "styled-components";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 90%;
    text-align: center;
`;

export const ModalInput = styled.textarea`
    width: 90%;
    height: 100px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const ModalButton = styled.button`
    margin: 0 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => (props.primary ? "#007bff" : "#ccc")};
    color: white;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.primary ? "#0056b3" : "#aaa")};
    }
`;