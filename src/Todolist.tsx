import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
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
    addTask: (title: string) => void
}

export function Todolist({title, tasks, removeTask, changeFilterValue, addTask} : PropsType) {
    const [inputValue, setInputValue] = useState('')

    function onTaskAddHandler() {
        addTask(inputValue)
        setInputValue('')
    }
    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            onTaskAddHandler()
            setInputValue('')
        }
    }

    const onAllClickHandler = () => {
        changeFilterValue('all')
    }
    const onActiveClickHandler = () => {
        changeFilterValue('active')
    }
    const onCompleteClickHandler = () => {
        changeFilterValue('completed')
    }


    return <div>
        <h3>{title}</h3>
        <div>
            <input
                 value={inputValue}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
            />
            <button onClick={onTaskAddHandler}>+</button>
        </div>
        <ul>
            { tasks.map(tasks => {
                const onClickButtonHandler = () => {
                    removeTask(tasks.id)
                }

                return (
                    <li key={tasks.id}>
                        <input type="checkbox" checked={tasks.isDone}/>
                        <span>{tasks.title}</span>
                        <button onClick={onClickButtonHandler}>✖️</button>
                    </li>)}
                )
            } 
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompleteClickHandler}>Completed</button>
        </div>
    </div>
}