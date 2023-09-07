"use client"
import Image from 'next/image';
import Link from 'next/link';
import {UserButton} from "@clerk/nextjs";

const TopBar = (user: any) => {
    return(
        <section className = "topbar">
            <Link href = "/" className = "flex items-left pl-4">
                <Image src = "/next.svg" alt = "Icon" width = {48} height = {48}/>
                <h1 className = "text-heading1-bold text-white p-4">K List</h1>
            </Link>
            <UserButton afterSignOutUrl="/sign-in"/>
        </section>
    )
}

export default TopBar;