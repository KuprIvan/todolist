import React from "react";
import {FilterTypes} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (element: string) => void
    changeFilterValue: (value: FilterTypes) => void
}

export function Todolist({title, tasks, removeTask, changeFilterValue} : PropsType) {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            { tasks.map(tasks => {
                // debugger
                return (
                    <li key={tasks.id}>
                        <input type="checkbox" checked={tasks.isDone}/>
                        <span>{tasks.title}</span>
                        <button onClick={() => removeTask(tasks.id)}>✖️</button>
                    </li>)}
                )
            } 
        </ul>
        <div>
            <button onClick={() => changeFilterValue('all')}>All</button>
            <button onClick={() => changeFilterValue('active')}>Active</button>
            <button onClick={() => changeFilterValue('completed')}>Completed</button>
        </div>
    </div>
}