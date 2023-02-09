import React, {FC} from 'react';
import TasksList from "./TasksList";
import {FilteredValuesType} from './App';


type TodoListPropType = {
    title: string
    tasks: TaskType[]// Array<TaskType>
    changeFilterValue: (filter: FilteredValuesType) => void
    removeTask: (id: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone:boolean
}
// Type for function FC
const TodoList: FC<TodoListPropType> = (props): JSX.Element => {
    // BLL:

    // UI:
    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>

               <TasksList tasks={props.tasks} removeTask={props.removeTask}/>
                <div>
                    <button
                        onClick={() => props.changeFilterValue('all')}
                    >All</button>
                    <button
                        onClick={() => props.changeFilterValue('active')}
                    >Active</button>
                    <button
                        onClick={() => props.changeFilterValue('completed')}
                    >Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;