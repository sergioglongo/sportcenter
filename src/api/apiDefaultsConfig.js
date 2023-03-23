// ** Auth Endpoints
// console.log(process.env.NODE_ENV)
const apiDefaultsConfig = {
    // baseURL : 'http://apisandbox.nubiot.local/',
    baseURL : process.env.NODE_ENV === 'production' ? 'https://api.nubiot.io/v1/' : 'http://localhost:3002/',
    // baseURL : `${process.env.REACT_APP_API_REST_URL}`,
    username: 'ZLnQrVkjIqoufmNd',
    password: '848105c3c05033dd202f0db9f00ba89c0f2ec817',
  
    loginEndpoint: '',
    registerEndpoint: '/register',
    refreshEndpoint: '',
    logoutEndpoint: '/logout',
  
    // ** This will be prefixed in authorization header with token
    // ? e.g. Authorization: Bearer <token>
    tokenType: 'Bearer',
  
    // ** Value of this property will be used as key to store JWT token in storage
    storageTokenKeyName: 'access_token',
    storageRefreshTokenKeyName: 'refresh_token',
    storageSessionKeyName: 'sessionid'
  }
  
  export default apiDefaultsConfig