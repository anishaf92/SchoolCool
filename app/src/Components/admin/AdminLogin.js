import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loginAdmin} from '../../reducers/adminReducer';
import {persistor} from '../../app/store';
import '../../Css/login.css';
import useAuth from '../auth/AuthContext';

const AdminLogin = () => {
  const [userName, setUserName] = useState ('');
  const [password, setPassword] = useState ('');
  const [error, setError] = useState (false);
  const navigate = useNavigate ();
  const dispatch = useDispatch ();
  const {
    setAuthUser,
    setIsLoggedIn } = useAuth();
  function validateForm () {
    return userName.length > 0 && password.length > 0;
  }
  async function handleSubmit (e) {
    e.preventDefault ();
    try {
      console.log (userName, password);
      if (validateForm ()) {
        await fetch ('http://localhost:6969/admin/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify ({userName: userName, password: password}),
        })
          .then (response => response.json ())
          .then (data => {
            if (data.status === 'Success') {
              console.log (data.admin, data.token);
              setIsLoggedIn(true)
              setAuthUser(data.admin)
              dispatch (
                loginAdmin({adminData: data.admin, token: data.token})
              );

              persistor.flush ();
              console.log(data.token)
              navigate ('/adminDashboard');
            } else {
              navigate ('/adminLogin');
              setError (true);
            }
          });
      }
    } catch (error) {
      console.error ('Error:', error);
      // Handle the error here.
    }
  }
  return (
    <div className="body-container">

      {error
        ? <div className="error">
            Wrong Credentials !! Please try again with correct User name and Password
          </div>
        : <div />}
      <div className="container" id="container">

        <div className="form-container sign-in-container">

          <form className="form-tag">

            <h1>Sign in</h1>

            <input
              type="text"
              placeholder="Admin Username"
              onChange={e => setUserName (e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={e => setPassword (e.target.value)}
              required
            />
            <button onClick={e => handleSubmit (e)}>Sign In</button>
            <div className="new-user">
              Not an Admin ? Click here to
              {' '}
              <button onClick={e => navigate ('/')}>Go back</button>
            </div>
          </form>

        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Not an Admin ?</h1>
              <p className="login">Click here to</p>
              <button id="signUp" onClick={e => navigate ('/')}>Go back</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default AdminLogin;
