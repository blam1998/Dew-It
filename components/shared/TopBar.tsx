"use client"
import Image from 'next/image';
import Link from 'next/link';
import {UserButton} from "@clerk/nextjs";

const TopBar = () => {
    return(
        <section className = "topbar">
            <Link href = "/" className = "flex items-left pl-4">
                <div className = "flex items-center">
                    <img src = "/assets/logo.png" alt = "Icon" style = {{width: '48px', height: '48px'}}/>
                    <h1 className = "text-heading2-semibold text-white p-4">Dew it</h1>
                </div>
            </Link>
            <UserButton afterSignOutUrl="/sign-in"/>
        </section>
    )
}

export default TopBar;