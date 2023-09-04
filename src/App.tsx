import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterTypes = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState([
        {id: '1', title: 'test', isDone: false},
        {id: '2', title: 'test', isDone: true},
        {id: '3', title: 'test', isDone: false},
        {id: '4', title: 'test', isDone: false},
        {id: '5', title: 'test', isDone: false},
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
           />
        </div>
    );
}

export default App;
