import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {updateUserData} from '../../redux/ReduxSlice'

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const fullName = urlParams.get('name');
    const role = urlParams.get('userType');
    const userID = urlParams.get('userID');
    const profile = urlParams.get('profile');

    if (token && email && fullName && role) {
      // Dispatch the action to store user details in Redux
      dispatch(updateUserData({ token, email, fullName, role,userID,profile }));

      // Redirect to the appropriate route
      navigate('/');
    }
  }, [dispatch, location.search, navigate]);

  return <></>;
};

export default GoogleCallback;
