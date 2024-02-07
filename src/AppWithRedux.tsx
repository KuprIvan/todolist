import React, {Reducer, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    ActionsTypeTodolistReducer,
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    ActionsTypeTasksReducer,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksReducer
} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToToTodolistReducer] = useReducer<Reducer<Array<TodolistType>, ActionsTypeTodolistReducer>>(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]);

    let [tasks, dispatchToTaskReducer] = useReducer<Reducer<TasksStateType, ActionsTypeTasksReducer>>(TasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    })


    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId);
        dispatchToTaskReducer(action);
    }

    function addTask(title: string, todolistId: string) {
        let action = addTaskAC(title, todolistId);
        dispatchToTaskReducer(action);
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let action = changeTaskStatusAC(id, isDone, todolistId);
        dispatchToTaskReducer(action);
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatchToTaskReducer(action);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let action = ChangeTodolistFilterAC(todolistId, value);
        dispatchToToTodolistReducer(action);
    }
    function changeTodolistTitle(id: string, title: string) {
        let action = ChangeTodolistTitleAC(id, title);
        dispatchToToTodolistReducer(action);
    }

    function removeTodolist(id: string) {
        let action = RemoveTodolistAC(id);
        dispatchToToTodolistReducer(action);
        dispatchToTaskReducer(action);
    }


    function addTodolist(title: string) {
        let action = AddTodolistAC(title);
        dispatchToToTodolistReducer(action);
        dispatchToTaskReducer(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
