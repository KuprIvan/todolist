import {v1} from "uuid";

export const taskReducer = (state: TaskType[], action: TaskReducerType): TaskType[] => {
    switch (action.type) {
        case RemoveTask: {
            return state.filter(el => el.id !== action.payload.id);
        }
        case AddTask: {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return [...state, newTask]
        }
        default:
            return state;
    }
}

const RemoveTask = 'REMOVE-TASK'
const AddTask = 'ADD-TASK'

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type AddTaskACType = ReturnType<typeof addTaskAC>;
type TaskReducerType = RemoveTaskACType | AddTaskACType

export const removeTaskAC = (id: string) => {
    return {
        type: RemoveTask,
        payload: {
            id
        }
    } as const
}
export const addTaskAC = (title: string) => {
    return {
        type: AddTask,
        payload: {
            title
        }
    } as const
}

export default taskReducer