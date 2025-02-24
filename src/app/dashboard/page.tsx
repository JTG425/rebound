// page.jsx
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';
import LogoutButton from './LogoutButton'; // adjust the path if needed
import './page.css';

export default async function PrivatePage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }

    return (
        <div className='user-page'>
            <div className='user-page-header'>
                <p>Hello {data.user.email}</p>
                <LogoutButton />
            </div>
        </div>
    );
}
