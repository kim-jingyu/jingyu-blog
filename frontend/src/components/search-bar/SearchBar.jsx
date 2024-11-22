import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { searchKeywordState } from "../../recoils/PostAtoms";

function SearchBar({search, onChange}) {
    const [_, setKeyword] = useRecoilState(searchKeywordState);

    const handleSearch = () => {
        setKeyword(search);
    }

    return (
        <div>
            <input className="input" type="text" value={search} onChange={onChange} placeholder="검색어를 입력하세요." />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

SearchBar.propTypes = {
    search: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
}

export default SearchBar;