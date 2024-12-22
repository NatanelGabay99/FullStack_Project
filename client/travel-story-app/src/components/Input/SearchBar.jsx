import PropTypes from "prop-types";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 py-2 border bg-slate-200 rounded-md">
      <input
        type="text"
        placeholder="Seach for a story..."
        className="w-full text-md text-slate-700 bg-transparent outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black
           mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black transition-all duration-100 ease-in-out"
        onClick={handleSearch}
      />
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
