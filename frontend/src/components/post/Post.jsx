import { Date, Excerpt, PostContainer, Title } from "./Post.style"
import PropTypes from 'prop-types'

// 마크다운 문법을 걷어내고 미리보기용 텍스트만 추출
const toExcerpt = (markdown, maxLength = 140) => {
    if (!markdown) return '';
    const text = markdown
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/[#>*_`~|-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
};

const Post = ({ title, date, content, onClick }) => {
    const excerpt = toExcerpt(content);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        }
    };

    return (
        <PostContainer role="link" tabIndex={0} onClick={onClick} onKeyDown={handleKeyDown}>
            <Title>{title}</Title>
            {excerpt && <Excerpt>{excerpt}</Excerpt>}
            <Date>{date}</Date>
        </PostContainer>
    )
}

export default Post

Post.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string,
    onClick: PropTypes.func
}
