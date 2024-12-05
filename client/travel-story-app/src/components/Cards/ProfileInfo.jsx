import PropTypes from 'prop-types';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({userInfo, onLogout}) => {
   
  return (
    userInfo && 
    ( <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
          {getInitials(userInfo?.fullName)}
        </div>

        <div>
            <p className='text-sm font-medium'>{userInfo?.fullName|| "Guest"}</p>
            <button className='text-sm text-white btn-primary' onClick={onLogout}>
                Logout
            </button>
        </div>

    </div>)
  )
}

export default ProfileInfo;

ProfileInfo.propTypes = {
    userInfo: PropTypes.object,
    onLogout: PropTypes.func
    }
