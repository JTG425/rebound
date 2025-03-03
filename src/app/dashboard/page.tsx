// page.jsx
"use server";
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';
import LogoutButton from './LogoutButton';
import ToDoList from './ToDoList';
import AddTaskBar from './addtaskbar'
import { fetchUserData } from '../actions';
import { addUserTask } from '../actions';
import './page.css';

export default async function Dashboard() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    const userData = await fetchUserData();


    const handleNewTask = async (task: string) => {
        await addUserTask(task);
        redirect('/dashboard');
    }
    
    
    return (
        <div 
            className='user-page'
        >
            <div className='user-page-header'>
                <p>Hello {data.user.email}</p>
                <LogoutButton />
            </div>
            <AddTaskBar userData={userData} />
            <ToDoList userData={userData} />
        </div>
    );
}
