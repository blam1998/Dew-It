"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import { fetchAllTask } from '@/lib/actions/task.actions';
import { useState } from 'react';
import mongoose from 'mongoose';


const LeftSideBar = (data : any) => {
    const path = usePathname();
    if (!data){return}

    return(
        <div>
            <div>
                <Link href = "/all_task" className = {`p-4 pl-8 pr-8 text-white text-heading3-semibold block ${path === "/all_task" && 'bg-dark-blue'}`}>All Tasks</Link>
                <Link href = "/today" className = {`p-4 pl-8 pr-8 text-white text-heading3-semibold block ${path === "/today" && 'bg-dark-blue'}`}>Today's List</Link>
                <Link href = "/this_week" className = {`p-4 pl-8 pr-8 text-white text-heading3-semibold block ${path === "/this_week" && 'bg-dark-blue'}`}>This Week's List</Link>
                <Link href = "/completed" className = {`p-4 pl-8 pr-8 text-white text-heading3-semibold block ${path === "/completed" && 'bg-dark-blue'}`}>Completed</Link>
                <Link href = "/add_task" className = {`p-4 pl-8 pr-8 text-white text-heading3-semibold block ${path === "/add_task" && 'bg-dark-blue'}`}>Add Task</Link>
            </div>
        </div>
    )
}

export default LeftSideBar;