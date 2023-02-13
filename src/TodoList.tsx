import React, {ChangeEvent, FC, MutableRefObject, RefObject, useRef, useState, KeyboardEvent} from 'react';
import TasksList from "./TasksList";
import {FilteredValuesType} from './App';


type TodoListPropType = {
    title: string
    tasks: TaskType[]// Array<TaskType>
    changeFilterValue: (filter: FilteredValuesType) => void
    removeTask: (id: string) => void
    addNewTask: (title: string) => void
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

    const [title, setTitle] = useState('')

    const onInputEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addNewTask(trimmedTitle)

        }
        setTitle('')
    }

    const onAllClickFilterHandler = () => {
        props.changeFilterValue('all')
    }
    const onActiveClickFilterHandler = () => {
        props.changeFilterValue('active')
    }
    const onCompletedClickFilterHandler = () => {
        props.changeFilterValue('completed')
    }

    const onKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTask()
    }


    // onChange
    // UI:
    return (
            <div className="todolist">
                <h3>{props.title}</h3>
                <div>
                    {/*for useRef*/}
                    {/*<input ref={addTaskInput}/>
                    <button onClick={addTask}>+</button> */}
                    <input value={title} onChange={onInputEventHandler} onKeyDown={onKeyEnterPress}/>
                    <button disabled={title.trim().length === 0} onClick={addTask}>+</button>
                    {title.length > 15 && <div style={{color: 'hotpink'}}>Task title is too long</div>}

                </div>

               <TasksList tasks={props.tasks} removeTask={props.removeTask}/>
                <div>
                    <button onClick={onAllClickFilterHandler}>All</button>
                    <button onClick={onActiveClickFilterHandler}>Active</button>
                    <button onClick={onCompletedClickFilterHandler}>Completed</button>
                </div>
            </div>
    );
};

export default TodoList;