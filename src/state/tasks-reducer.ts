import {TasksStateType} from '../App';
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


export type ActionsTypeTasksReducer = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

let initialState: TasksStateType = {};

export const TasksReducer = (state: TasksStateType = initialState, action: ActionsTypeTasksReducer): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(el => el.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskID
                        ? {...el, isDone: action.isDone}
                        : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskID
                        ? {...el, title: action.title}
                        : el)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let copyState = {...state};
            delete copyState[action.id];
            return copyState;
            // const {[action.id]: [], ...rest} = state;
            // return rest;
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const;
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const;
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistId} as const;
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskID, title, todolistId} as const;
}