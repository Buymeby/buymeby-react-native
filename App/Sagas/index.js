import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  console.tron.log({
    message: 'take a look into the api',
    vendors_response: api
  })
  yield all([
    takeLatest(StartupTypes.STARTUP, startup, api),
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
