// export const actions = {
//   nuxtServerInit({ commit }, { req }) {
//     let wasteState = (this.$auth.user && this.$auth.user.settings) || null;
//     commit('wasted/setWastedSettings', wasteState);
//   }
// }
import moment from 'moment';
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
		console.log(moment().format());
		state.auth.user.settings.lastWasted = parseInt(state.auth.user.settings.lastWasted) + waste;
	}
}