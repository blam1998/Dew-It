"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';



const LeftSideBar = () => {
    const path = usePathname();

    return(
        <div>
            <div>
                <div>
                    <Link href = "/all_task" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/all_task" && 'linkActive'}`}>All Tasks</Link>
                </div>
                <div>
                    <Link href = "/today" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/today" && 'linkActive'}`}>Today's List</Link>
                </div>
                <div>
                    <Link href = "/this_week" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/this_week" && 'linkActive'}`}>This Week's List</Link>
                </div>
                <div>
                    <Link href = "/completed" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/completed" && 'linkActive'}`}>Completed</Link>
                </div>
                <div>
                    <Link href = "/add_task" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/add_task" && 'linkActive'}`}>Add Task</Link>
                </div>
            </div>
        </div>
    )
}

export default LeftSideBar;