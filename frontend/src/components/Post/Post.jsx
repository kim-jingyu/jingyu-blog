import { Content, Date, PostContainer, Title } from "./Post.style"
import PropTypes from 'prop-types'

function Post({ title, date, content }) {
    return (
        <PostContainer>
            <Title>{title}</Title>
            <Date>{date}</Date>
            <Content>{content}</Content>
        </PostContainer>
    )
}

export default Post

Post.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}