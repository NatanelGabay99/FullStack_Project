import LOGO from '../assets/images/logo.svg'
import PropTypes from 'prop-types';
import ProfileInfo from '../components/Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';

const NavBar = ({userInfo}) => {

  const isToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const onLogout = () => {
       localStorage.clear();
       navigate("/login");
  };
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
        <img src={LOGO} alt="travel-story" className="h-9" />

        {isToken && <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>}
    </div>
  )
}

export default NavBar;


NavBar.propTypes = {
  userInfo: PropTypes.object,
  onLogout: PropTypes.func
}

