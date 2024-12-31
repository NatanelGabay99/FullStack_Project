import PropTypes from "prop-types";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div className="search-bar flex items-center p-2 bg-gray-100 border border-gray-300 rounded-lg ">
      <input
        type="text"
        placeholder="Search for a story..."
        className="flex-grow border-none outline-none bg-transparent px-2"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />

      {value && (
        <IoMdClose
          className="text-lg cursor-pointer ml-2"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass className="text-lg cursor-pointer ml-2" />
      
    </div>
  );
};


export default SearchBar;

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  handleSearch: PropTypes.func,
  onClearSearch: PropTypes.func,
};
