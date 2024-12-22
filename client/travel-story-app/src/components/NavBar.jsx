import LOGO from "../assets/images/logo.svg";
import PropTypes from "prop-types";
import ProfileInfo from "../components/Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Input/SearchBar";

const NavBar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const isToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  return (
    <div className="bg-slate-100 flex items-center justify-between px-6 py-5 drop-shadow sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <img src={LOGO} alt="travel-story" className="h-9" />
        <div className="flex gap-4">
          {!isToken && (
            <>
              <p
                className="text-cyan-500 cursor-pointer font-semibold hover:transition hover:duration-300 ease-in-out hover:text-cyan-300/50"
                style={{ fontFamily: "'Pacifico', cursive" }}
                onClick={() => navigate("/home")}
              >
                Home
              </p>
              <p
                className="text-cyan-500 cursor-pointer font-semibold hover:transition hover:duration-300 ease-in-out hover:text-cyan-300/50"
                style={{ fontFamily: "'Pacifico', cursive" }}
                onClick={() => navigate("/about")}
              >
                About
              </p>
            </>
          )}

          {isToken && (
            <>
              <p
                className="text-cyan-500 cursor-pointer font-semibold hover:transition hover:duration-300 ease-in-out hover:text-cyan-300/50"
                style={{ fontFamily: "'Pacifico', cursive" }}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </p>
              <p
                className="text-cyan-500 cursor-pointer font-semibold hover:transition hover:duration-300 ease-in-out hover:text-cyan-300/50"
                style={{ fontFamily: "'Pacifico', cursive" }}
                onClick={() => navigate("/about")}
              >
                About
              </p>
            </>
          )}
        </div>
      </div>
      {isToken && (
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      )}
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} /> {""}
      {!userInfo && (
        <div className="flex items-center gap-3">
          <button
            className="text-sm text-white btn-primary w-20"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>

          <button
            className="text-sm text-white btn-primary w-20"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;

NavBar.propTypes = {
  userInfo: PropTypes.object,
  onLogout: PropTypes.func,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  onSearchNote: PropTypes.func,
  handleClearSearch: PropTypes.func,
  displaySearch: PropTypes.bool,
};
