import authedUser from './authedUser'
import users from './users'
import services from './services'
import complaints from './complaints'
import rangers from './rangers'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const reducers = combineReducers({
  authedUser,
  users,
  services,
  complaints,
  rangers
})

const rootPersistConfig = {
  key: 'root',
  storage: sessionStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['users', 'services', 'complaints', 'rangers']
}

const persistReducers = persistReducer(rootPersistConfig, reducers)

export default persistReducers
