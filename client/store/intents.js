export const state = () => ({
  list: []
})

export const mutations = {
  add(state, intent) {
    state.list.push(intent)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}