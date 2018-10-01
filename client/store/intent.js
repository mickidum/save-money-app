export const state = () => ({
  item: null
})

export const mutations = {
  add(state, intent) {
    state.item = intent;
  },
  emptyIntent(state) {
    state.item = null;
  },
  done(state, done) {
    state.item.done = done;
  }
}

export const getters = {
  item: state => {
    return state.item;
  }
}