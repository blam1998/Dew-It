"use client"

import Image from 'next/image';
import Link from 'next/link';
import {UserButton} from "@clerk/nextjs";
import { Button } from '@/components/ui/button';


const LeftSideBar = () => {
    return(
        <section className = "leftsidebar">
            <div>
                <Link href = "/all_task" className = "p-4 pl-8 pr-8 text-white text-heading3-semibold block">All Tasks</Link>
                <Link href = "/today" className = "p-4 pl-8 pr-8 text-white text-heading3-semibold block">Today's List</Link>
                <Link href = "/this_week" className = "p-4 pl-8 pr-8 text-white text-heading3-semibold block">This Week's List</Link>
                <Link href = "/completed" className = "p-4 pl-8 pr-8 text-white text-heading3-semibold block">Completed</Link>
                <Link href = "/add_task" className = "p-4 pl-8 pr-8 text-white text-heading3-semibold block">Add Task</Link>
            </div>
        </section>
    )
}

export default LeftSideBar;