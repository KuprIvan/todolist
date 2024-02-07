import {TasksStateType, TodolistType} from "../App";
import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TasksReducer} from "./tasks-reducer";

let startTasksState: TasksStateType = {}
let startTodolistsState: Array<TodolistType> = []

beforeEach(() => {
    startTasksState = {}
    startTodolistsState = []
})

test('ids should be equals', () => {
    const action = AddTodolistAC('new todolist')
    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
