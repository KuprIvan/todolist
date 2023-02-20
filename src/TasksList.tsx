import React, {ChangeEvent, FC} from 'react';
import {TaskType} from "./TodoList";

type TasksList = {
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}


const TasksList: FC<TasksList> = (props): JSX.Element => {
    // JSX Element
    // BLL:
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => {
                const taskClasses = ['task']
                    task.isDone && taskClasses.push('task-done')
                const removeTaskHandler = () => {
                    props.removeTask(task.id)
                }
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}/>
                        <span className={taskClasses.join(' ')}>{task.title}</span>
                        <button onClick={removeTaskHandler}>X</button>
                    </li>
                )
            })
            : <span>Your taskList is empty</span>;

    // UI:
    return (
        <ul>
            {tasksItems}
        </ul>
    );
};

export default TasksList;