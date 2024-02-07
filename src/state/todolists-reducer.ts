import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>


export type ActionsTypeTodolistReducer = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

let initialState: Array<TodolistType> = [];

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsTypeTodolistReducer): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title}: el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter}: el)
        }
        default:
            return state;
    }
}

export const RemoveTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', id: todolistId } as const;
}
export const AddTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()} as const;
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', title, id: todolistId } as const;
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter, id: todolistId } as const;
}
