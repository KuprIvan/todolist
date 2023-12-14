import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
export type AddTasksActionType = ReturnType<typeof addTaskAC>
export type ChangeStatusTasksActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleTasksActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTasksActionType
    | AddTasksActionType
    | ChangeStatusTasksActionType
    | ChangeTitleTasksActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(task => task.id === action.taskId
                        ? {...task, isDone: action.isDone}
                        : task)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(task => task.id === action.taskId
                        ? {...task, title: action.title}
                        : task)
            }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistID} as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return {type: 'ADD-TASK', title, todolistID} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistID} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistID} as const
}


// case "REMOVE-TODOLIST": {
//     const {[action.id]: [], ...rest} = state
//     return rest
// }