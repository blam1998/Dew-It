"use client"
import Image from 'next/image';
import Link from 'next/link';
import {UserButton} from "@clerk/nextjs";
import MobileMenu from './MobileMenu';
import { useState } from 'react';

const TopBar = () => {

    return(
        <section className = "topbar">
            <Link href = "/" className = "flex items-left pl-4">
                <div className = "flex items-center">
                    <img src = 'https://drive.google.com/uc?export=view&id=1EPBAL-rfmAwbWl4lW0g57twaelWRgXQK' alt = "Icon" style = {{width: '48px', height: '48px'}}/>
                    <h1 className = "text-heading2-semibold text-white p-4">Dew it</h1>
                </div>
            </Link>
            <div className = "block">
                <UserButton afterSignOutUrl="/sign-in"/>
            </div>
        </section>
    )
}

export default TopBar;