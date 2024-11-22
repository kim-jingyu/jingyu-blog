import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { searchKeywordState } from "../../recoils/PostAtoms";
import { SearchInput, SearchButton, SearchContainer } from "./SearchBar.style";

function SearchBar({search, onChange}) {
    const [_, setKeyword] = useRecoilState(searchKeywordState);

    const handleSearch = () => {
        setKeyword(search);
    }

    return (
        <SearchContainer>
            <SearchInput className="input" type="text" value={search} onChange={onChange} placeholder="검색어를 입력하세요." />
            <SearchButton onClick={handleSearch}>🔎</SearchButton>
        </SearchContainer>
    )
}

SearchBar.propTypes = {
    search: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
}

export default SearchBar;