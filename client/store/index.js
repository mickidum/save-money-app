export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },

  userSettings(state) {
    return state.auth.user && state.auth.user.settings
  }
}