import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterTypes = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'test', isDone: false},
        {id: v1(), title: 'test', isDone: true},
        {id: v1(), title: 'test', isDone: false},
        {id: v1(), title: 'test', isDone: false},
        {id: v1(), title: 'test', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterTypes>("all")

    let tasksForTodoList = tasks

    if (filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(el => el.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(el => el.isDone === true)
    }

    function changeFilterValue(value: FilterTypes) {
        setFilter(value)
    }

    function addTask(taskTitle: string) {
        let newTask: TaskType  = {id: v1(), title: taskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    function onClickButtonHandler(taskId: string) {
        let filteredTasks = tasks.filter(el => el.id !== taskId)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
           <Todolist
               title="test"
               tasks={tasksForTodoList}
               removeTask={onClickButtonHandler}
               changeFilterValue={changeFilterValue}
               addTask={addTask}
           />
        </div>
    );
}

export default App;
