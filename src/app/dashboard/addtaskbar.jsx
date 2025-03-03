"use client";
import { useState } from "react";
import { motion as m, AnimatePresence } from 'motion/react';
import { MdAdd } from "react-icons/md";
import NewTaskForm from "./newTask";  

import './page.css';
import './forms.css';

const formVariants = {
    initial: {
        opacity: 0,
        y: "100%",
    },
    enter: {
        opacity: 1,
        y: "0%",
        transition: {
            duration: 0.1,
            type: "spring",
            stiffness: 100,
            damping: 15,

        },
    },
    exit: {
        opacity: 0,
        y: "100%",
        transition: {
            duration: 0.1,
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};



export default function AddTaskBar(props) {
    const [showForm, setShowForm] = useState(false);
    const {newTask, setNewTask} = props;
    const userData = props.userData;


    const handleShowForm = () => {
        setShowForm(!showForm);
    }

    return (
        <>
            <m.div
                key="add-task-bar-key"
                className="add-task-bar"
            >
                <m.button
                    className="add-task-button"
                    onClick={() => setShowForm(!showForm)}
                    whileHover={{
                        scale: 1.02,
                        background: "var(--primary)",
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <MdAdd style={{
                        rotate: showForm ? "45deg" : "0deg",
                        transition: "rotate 0.25s",
                    }} />
                </m.button>

            </m.div>
            <AnimatePresence mode="wait">
            {showForm && (
                        <m.div
                        key="form-container-key"
                        className="form-container"
                        initial="initial"
                        animate={showForm ? "enter" : "exit"}
                        exit="exit"
                        variants={formVariants}
                    >
                <NewTaskForm tasks={userData[0].tasks} showForm={showForm} setShowForm={handleShowForm} />
                </m.div>
            )}
            </AnimatePresence>
        </>
    );
}
