"use client";
import { useEffect, useState } from "react";
import { motion as m } from 'motion/react';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import './page.css';

export default function ToDoList(props) {
    const userData = props.userData;
    const [tasks, setTasks] = useState(userData[0].tasks || []);
    return (
        <div className='user-tasks'>
            {tasks && (
                <>
                    {tasks.map((task, index) => (
                        <div className="user-task" key={`user-task-${index}`}>
                            <p>{task.name}</p>
                            <span className="task-options">
                                <CircularProgressbar 
                                    value={task.progress || 0} 
                                    strokeWidth={24} 
                                    styles={buildStyles({
                                        trailColor: task.progress ? "var(--foreground)" : "var(--background)",
                                        pathColor: "var(--primary)",
                                    })}

                                />
                            </span>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
