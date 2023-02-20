import React, {FC, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid';

export type FilteredValuesType = 'all' | 'active' | 'completed'

function App(): JSX.Element {
    // BLL:

    const [filter, setFilter] = useState<FilteredValuesType>('all')
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'ES6 & TS', isDone: true},
        {id: v1(), title: 'React & Redux', isDone: false},
    ])
    const todoListTitle: string = "What to learn"

    const changeFilterValues = (filter: FilteredValuesType) => setFilter(filter)
    const removeTask = (taskId: string) => {
        const updatedTask = tasks.filter(t => t.id !== taskId)
        setTasks(updatedTask)
    }

    const addNewTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

   /* const changeTaskStatus = (taskId: string) => {
        setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone: !t.isDone} : t))
    }*/
    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilteredValuesType): Array<TaskType> => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    let filteredTasks = getFilteredTasks(tasks, filter)
    // UI:
    return (
        <div className={'App'}>
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValues}
                removeTask={removeTask}
                addNewTask={addNewTask}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>

    );
}

export default App;
