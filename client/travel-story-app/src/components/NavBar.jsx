import LOGO from "../../public/logo.svg";
import PropTypes from "prop-types";
import ProfileInfo from "../components/Cards/ProfileInfo";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./Input/SearchBar";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const NavBar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const isXS = useMediaQuery({ query: "(max-width: 576px)" });
  const location = useLocation();

  const isToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className=" w-full bg-slate-200 flex items-center justify-center gap-4 sm:justify-between px-6 py-5 drop-shadow sticky top-0 z-10 ">
      <div className="flex items-center gap-6">
        {location.pathname === "/dashboard" || location.pathname === "/favorites" ?  (
          <img src={LOGO} alt="travel-story" className="h-9 hidden sm:block" />
        ): (<img src={LOGO} alt="travel-story" className="h-9" />)
        }
        
        <div className="flex gap-4">
          <div className="navbar">
            

            {/* Hamburger Menu for Mobile */}
            <div className="navbar-hamburger md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="navbar-hamburger-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      menuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div
              className={`navbar-mobile-menu ${
                menuOpen ? "block" : "hidden"
              } md:hidden`}
            >
              <div className="navbar-links-container">
                 {/* When there is no User*/}
                {!isToken && (
                  <>
                    <p
                      className="navbar-link"
                      onClick={() => navigate("/home")}
                    >
                      Home
                    </p>
                    <p
                      className="navbar-link"
                      onClick={() => navigate("/about")}
                    >
                      About
                    </p>
                  </>
                )}


                {/* When User is Logged in*/}
                {isToken && (
                  <>
                    <p
                      className="navbar-link"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </p>
                    <p
                      className="navbar-link"
                      onClick={() => navigate("/about")}
                    >
                      About
                    </p>
                    <p
                      className="navbar-link"
                      onClick={() => navigate("/favorites")}
                    >
                      Favorites
                    </p>
                    <p className="navbar-link" onClick={onLogout}>
                      Logout
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>



           {/* When there is no User*/}
          {!isToken && (
            <>
              <div className="hidden md:flex navbar-links-container">
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
              </div>
            </>
          )}



          {/* When User is Logged in*/}
          {isToken && (
            <>
              <div className="hidden md:flex navbar-links-container2">
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
                <p
                  className="text-cyan-500 cursor-pointer font-semibold hover:transition hover:duration-300 ease-in-out hover:text-cyan-300/50"
                  style={{ fontFamily: "'Pacifico', cursive" }}
                  onClick={() => navigate("/favorites")}
                >
                  Favorite Stories ❤️
                </p>
              </div>
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
      {!isXS && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
      {!userInfo && (
        <div className="flex items-center gap-3 mr-[-17px] sm:display-hidden">
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
