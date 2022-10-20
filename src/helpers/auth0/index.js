import history from './history';
import { Auth0Config } from '../../settings';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class Auth0Helper {
  isValid = Auth0Config.clientID && Auth0Config.domain;

  constructor() {
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  logout() {
    //Delete token from header
    this.setAuthTokenInHeader(false);
    // Clear access token and ID token from local storage
    localStorage.removeItem('admin_token');
    //Set current user to {} which will set isAuthenticated to false
    // navigate to the home route
    // history.replace("/");
    window.location.href = '/';
  }

  setAuthTokenInHeader = (token) => {
    if (token) {
      //apply to every request
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      //Delete Auth header
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  //Check for token
  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const admin_token = localStorage.getItem('admin_token');
    //set Authorization token in the header
    this.setAuthTokenInHeader(admin_token);
    //User data
    const decoded = jwt_decode(admin_token);
    const expireTime = decoded.exp;
    const currentTime = Date.now() / 1000;

    return expireTime < currentTime;
  }
}
export default new Auth0Helper();
