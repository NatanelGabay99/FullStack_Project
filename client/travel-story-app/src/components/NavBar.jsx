import LOGO from '../assets/images/logo.svg'
import PropTypes from 'prop-types';
import ProfileInfo from '../components/Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from './Input/SearchBar';

const NavBar = ({userInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch}) => {

  const isToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const onLogout = () => {
       localStorage.clear();
       navigate("/login");
  };

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery('');
  };


  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        <img src={LOGO} alt="travel-story" className="h-9" />

        {isToken && ( 
          <>
          <SearchBar 
          value={searchQuery}
          onChange={({target}) => setSearchQuery(target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
          />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/> {''} 
        </>
        )}
    </div>
  )
}

export default NavBar;


NavBar.propTypes = {
  userInfo: PropTypes.object,
  onLogout: PropTypes.func,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  onSearchNote: PropTypes.func,
  handleClearSearch: PropTypes.func,
};

