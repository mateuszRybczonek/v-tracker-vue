export default {
  user: state => state.user,
  isAuthenticated: state => state.idToken !== null,
  isAuthError: state => state.authError,
  idToken: state => state.idToken
}
