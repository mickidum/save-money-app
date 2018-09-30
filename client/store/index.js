// export const actions = {
//   nuxtServerInit({ commit }, { req }) {
//     let user = null
//     let card = []
//     if (req && req.headers && req.headers.cookie) {
//       const parsed = cookieparser.parse(req.headers.cookie)
//       user = (parsed.user && JSON.parse(parsed.user)) || null
//       card = (parsed.card && JSON.parse(parsed.card)) || []
//     }

//     commit('auth/setUser', user)
//     commit('card/setItems', card)
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