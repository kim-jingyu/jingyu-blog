import PropTypes from "prop-types";
import { useRecoilState } from "recoil";
import { searchKeywordState } from "../../recoils/PostAtoms";
import { SearchInput, SearchContainer } from "./SearchBar.style";
import debounce from "lodash/debounce";
import React, {useMemo} from "react";

function SearchBar({search, onChange}) {
    const [_, setKeyword] = useRecoilState(searchKeywordState);

    const debouncedSearch = useMemo(() => {
        return debounce((value) => {
            setKeyword(value);
        }, 500);
    }, [setKeyword]);

    const handleInputChange = (e) => {
        const { value } = e.target;
        onChange(e);
        debouncedSearch(value);
    };

    React.useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <SearchContainer>
            <SearchInput
                className="input"
                type="text"
                value={search}
                onChange={handleInputChange}
                placeholder="글 검색"
            />
        </SearchContainer>
    )
}

SearchBar.propTypes = {
    search: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
}

export default SearchBar;