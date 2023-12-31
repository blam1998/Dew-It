"use client"
import Image from 'next/image';
import Link from 'next/link';
import {UserButton} from "@clerk/nextjs";
import MobileMenu from './MobileMenu';
import { useState } from 'react';
import logo from '@/public/assets/Logo.png'

const TopBar = () => {

    return(
        <section className = "topbar">
            <Link href = "/" className = "flex items-left pl-4">
                <div className = "flex items-center justify-center gap-4">
                    <Image src = {logo} alt = "Icon" style = {{width: '48px', height: '48px'}}/>
                    <h1 className = "hidden xsm:block text-heading2-semibold text-white p-4">Dew   It</h1>
                </div>
            </Link>
            <div className = "block">
                <UserButton afterSignOutUrl="/sign-in"/>
            </div>
        </section>
    )
}

export default TopBar;