// export const actions = {
//   nuxtServerInit({ commit }, { req }) {
//     commit('intents/emptyList')
//   }
// }


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

export const mutations = {
	add(state, waste) {
		state.auth.user.settings = {
      ...state.auth.user.settings,
      ...waste
    }
	}
}