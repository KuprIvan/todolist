import {TasksReducer} from './tasks-reducer'
import {todolistsReducer} from './todolists-reducer'
import {combineReducers, legacy_createStore} from 'redux'

// объединяя reducer-ы с помощью combineReducers
const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: todolistsReducer
})
export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
