import { Code, HomeLink, Message, NotFoundContainer } from "./NotFound.style.js";

function NotFound() {
    return (
        <NotFoundContainer>
            <Code>404</Code>
            <Message>요청하신 페이지를 찾을 수 없어요.</Message>
            <HomeLink href="/">홈으로 돌아가기</HomeLink>
        </NotFoundContainer>
    )
}

export default NotFound
