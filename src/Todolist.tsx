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
    changeCheckBox: (taskId: string, isDone: boolean) => void
    filter: FilterTypes
}

export function Todolist({filter, title, tasks, removeTask, changeFilterValue, addTask, changeCheckBox}: PropsType) {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    function onTaskAddHandler() {
        if (inputValue.trim() !== '') {
            addTask(inputValue.trim())
            setInputValue('')
        } else {
            setError('Title is required')
        }
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
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
                className={error ? 'error' : ''}
            />
            <button onClick={onTaskAddHandler}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {tasks.map(task => {
                    const onClickButtonHandler = () => {
                        removeTask(task.id)
                    }
                    const onCheckBoxClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        changeCheckBox(task.id, newIsDoneValue)
                    }

                    return (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onCheckBoxClickHandler}
                            />
                            <span
                                className={task.isDone ? 'is-done' : ''}
                            >{task.title}</span>
                            <button onClick={onClickButtonHandler}>✖️</button>
                        </li>)
                }
            )
            }
        </ul>
        <div>
            <button
                onClick={onAllClickHandler}
                className={filter === 'all' ? 'active-filter' : ''}
            >
                All
            </button>
            <button
                onClick={onActiveClickHandler}
                className={filter === 'active' ? 'active-filter' : ''}
            >
                Active
            </button>
            <button
                onClick={onCompleteClickHandler}
                className={filter === 'completed' ? 'active-filter' : ''}
            >
                Completed
            </button>
        </div>
    </div>
}