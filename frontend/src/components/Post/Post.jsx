import { Date, PostContainer, Title } from "./Post.style"
import PropTypes from 'prop-types'

const Post = ({ title, date, onClick }) => {
    return (
        <PostContainer onClick={onClick}>
            <Title>{title}</Title>
            <Date>{date}</Date>
        </PostContainer>
    )
}

export default Post

Post.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    onClick: PropTypes.func.func
}