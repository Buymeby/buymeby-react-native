import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  startup: require('./StartupRedux').reducer,
  vendor: require('./VendorRedux').reducer,
  search: require('./SearchRedux').reducer,
  form: formReducer,
  reduxTokenAuth: reduxTokenAuthReducer
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
