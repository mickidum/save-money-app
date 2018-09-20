export default function ({store, redirect, route}) {
  const userIsLoggedIn = store.state.auth.loggedIn
  if (userIsLoggedIn) {
    return redirect('/')
  }
}