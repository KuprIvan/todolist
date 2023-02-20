import React, {ChangeEvent, FC, MutableRefObject, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilteredValuesType} from './App';


type TodoListPropType = {
    title: string
    filter: FilteredValuesType
    tasks: TaskType[]// Array<TaskType>
    changeFilterValue: (filter: FilteredValuesType) => void
    removeTask: (id: string) => void
    addNewTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone:boolean
}
// Type for function FC
const TodoList: FC<TodoListPropType> = (props): JSX.Element => {
    // BLL:
    // useRef
    /*const addTaskInput: RefObject<HTMLInputElement>  = useRef(null) // TODO learn about useRef hook
    const addTask = () => {
        if (addTaskInput.current) {
            props.addNewTask(addTaskInput.current.value)
            addTaskInput.current.value = ''
        }
        // addTaskInput.current && props.addNewTask(addTaskInput.current.value)
    }*/

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)


    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addNewTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')   // очистка строки для контролируемого инпута
    }

    const handlerCreator = (filter: FilteredValuesType) => {
        return () => props.changeFilterValue(filter)
    }

    const onInputEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()
    }

    const userMessageError = error && <div style={{color: 'hotpink'}}>Required!</div>
    const isAddBtnDisabled = title.length === 0
    const maxLengthMessage = 15
    const isUserMessageTooLong = maxLengthMessage > 15
    const userMaxLengthMessage = isUserMessageTooLong && <div style={{color: 'hotpink'}}>Task title is too long</div>
    const inputErrorClasses = error || isUserMessageTooLong ? 'input-error' : ''



    // onChange
    // UI:
    return (
            <div className="todolist">
                <h3>{props.title}</h3>
                <div>
                    {/*for useRef*/}
                    {/*<input ref={addTaskInput}/>
                    <button onClick={addTask}>+</button> */}
                    <input
                        value={title}
                        onChange={onInputEventHandler}
                        onKeyDown={onKeyEnterPress}
                        placeholder={'Enter title'}
                        className={inputErrorClasses}
                    />
                    <button disabled={isAddBtnDisabled} onClick={addTask}>+</button>
                    {userMaxLengthMessage}
                    {userMessageError}

                </div>

               <TasksList tasks={props.tasks} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus}/>
                <div>
                    <button className={`filter-btn ${props.filter === 'all' ? 'active-filter-btn' : ''}`} onClick={handlerCreator('all')}>All</button>
                    <button className={`filter-btn ${props.filter === 'active' ? 'active-filter-btn' : ''}`} onClick={handlerCreator('active')}>Active</button>
                    <button className={`filter-btn ${props.filter === 'completed' ? 'active-filter-btn' : ''}`} onClick={handlerCreator('completed')}>Completed</button>
                </div>
            </div>
    );
};

export default TodoList;