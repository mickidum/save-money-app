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
  },
  listDone: state => {
    return state.list.filter(intent => {
      return intent.done == true;
    })
  },
  listNotDone: state => {
    return state.list.filter(intent => {
      return intent.done == false;
    })
  },
  aimsReached: state => {
    return state.list.filter(intent => {
      return intent.done == true;
    }).reduce(
      (accumulator, item) => accumulator + item.cost,
      0
    )
  }
}