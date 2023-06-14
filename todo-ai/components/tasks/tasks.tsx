"use client"

import React, { useState } from "react";

import s from './tasks.module.scss';
import Task from "../task/task";
import uid from "@/utils/uid";

interface TaskInterface {
    id: string,
    content: string,
}

export default function Tasks() {

    let [order, setOrder] = useState<Array<string>>([])
    let [tasks, setTasks] = useState<{[fieldName: string]: TaskInterface}>({})

    function addEmptyTask() {
        let newTask: TaskInterface = { id: uid(), content: "" }
        let newTasks = { ...tasks, [newTask.id]: newTask }
        setTasks(newTasks)
        setOrder([...order, newTask.id])
    }

    function changeTaskContent(id: string, content: string) {
        console.log(id, content)
        let newTasks = { ...tasks, [id]: { ...tasks[id as keyof Object], content: content } }
        setTasks(newTasks)
    }

    function deleteTask(id: string) {
        let newTasks = { ...tasks }
        delete newTasks[id as keyof Object]
        setTasks(newTasks)

        let newOrder = [...order]
        newOrder.splice(newOrder.indexOf(id), 1)
        setOrder(newOrder)
    }

    return (
        <div className={s.tasks}>
            {order.map((id: string) => {
                return (
                    <Task
                        key={id}
                        id={id}
                        content={tasks[id as keyof Object].content}
                        contentSetter={changeTaskContent}
                        taskDeleter={deleteTask}
                    />
                )
            })}
            <div onClick={addEmptyTask}>add task</div>
        </div>
    )
}