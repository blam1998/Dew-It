"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';


const MobileMenu = () => {
    const path = usePathname();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open)
    }

    return(
        <div>
            <div className = "flex flex-col relative">
                <div className = "text-white cursor-pointer w-[2.5vw] mb-4 text-center" onClick = {() => handleClick()}>
                    X
                </div>
                <div className = {`${open? 'block' : 'hidden'} w-[100vw] text-white min-md:hidden h-screen overflow-y-auto`} id = "menu-modal">
                    <div onClick = {() => handleClick()}>
                        <Link href = "/all_task" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/all_task" && 'linkActive'} w-fit`}>All Tasks</Link>
                    </div>
                    <div onClick = {() => handleClick()}>
                        <Link href = "/today" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/today" && 'linkActive'} w-fit`}>Today's List</Link>
                    </div>
                    <div onClick = {() => handleClick()}>
                        <Link href = "/this_week" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/this_week" && 'linkActive'} w-fit`}>This Week's List</Link>
                    </div>
                    <div onClick = {() => handleClick()}>
                        <Link href = "/completed" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/completed" && 'linkActive'} w-fit`}>Completed</Link>
                    </div>
                    <div onClick = {() => handleClick()}>
                        <Link href = "/add_task" className = {`p-4 pl-4 pr-4 text-white text-body-bold block ${path === "/add_task" && 'linkActive'} w-fit`}>Add Task</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;