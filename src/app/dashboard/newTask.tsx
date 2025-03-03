"use client";
import { motion as m, AnimatePresence } from 'motion/react';
import { MdAdd } from "react-icons/md";
import './forms.css';
import { createClient } from '../../../utils/supabase/client';



export default function NewTaskForm(props) {
    const userTasks = props.userTasks;
    const supabase = createClient();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Get the task name from the form input (assumes the input is the first element)
        const taskName = e.target[0].value.trim();
        if (!taskName) return; // Exit if no name is provided
      
        // Create the new task object
        const newTask = {
          ms: false,              // false because we have no microsteps info from the form
          name: taskName,
          progress: 0,
          completed: false,
          microsteps: []          // empty array because ms is false
        };
      

        // Ensure we have an array of tasks
        const currentTasks = userTasks || [];
      
        // Append the new task to the current tasks
        const updatedTasks = [...currentTasks, newTask];
      
        // Update the user's tasks in the database
        const { error: updateError } = await supabase
          .from("ReboundUserData")
          .update({ Tasks: updatedTasks })
        if (updateError) {
          console.error("Error updating tasks:", updateError);
        } else {
          // Optionally, reset the form input upon successful update
          e.target.reset();
        }
      };

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <input type="text" placeholder="Task name" />
            <button type="submit">Add Task </button>
        </form>
    );
}
