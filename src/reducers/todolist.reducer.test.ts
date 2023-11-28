import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import todolistReducer, {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./todolist.reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('add todolist', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = "New todolist"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
});

test('change todolist filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newFilterValue: FilterValuesType = 'completed';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, changeFilterAC(newFilterValue, todolistId1));

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('completed');
    expect(endState[1].filter).toBe('all');
});

test('change todolist title', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newFilterValue: string= 'New Title';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, newFilterValue));

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('New Title');
    expect(endState[1].title).toBe('What to buy');
});