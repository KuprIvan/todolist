import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWithRedux";


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
    let todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists);
    // let tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);
    const dispatch = useDispatch();


    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId);
        dispatch(action);
    }

    function addTask(title: string, todolistId: string) {
        let action = addTaskAC(title, todolistId);
        dispatch(action);
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let action = ChangeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }

    function changeTodolistTitle(id: string, title: string) {
        let action = ChangeTodolistTitleAC(id, title);
        dispatch(action);
    }

    function removeTodolist(id: string) {
        let action = RemoveTodolistAC(id);
        dispatch(action);
    }


    function addTodolist(title: string) {
        let action = AddTodolistAC(title);
        dispatch(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
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
                            // let allTodolistTasks = tasks[tl.id];
                            // let tasksForTodolist = allTodolistTasks;
                            //
                            // if (tl.filter === "active") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            // }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <TodolistWithRedux
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
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
