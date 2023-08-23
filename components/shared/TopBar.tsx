import Image from 'next/image';
import Link from 'next/link';

const TopBar = () => {
    return(
        <section className = "topbar">
            <Link href = "/" className = "flex items-left pl-4">
                <Image src = "/next.svg" alt = "Icon" width = {28} height = {28}/>
                <h1 className = "text-heading1-bold text-white p-4">K List</h1>
            </Link>
            <div className = "p-4">Hi</div>
        </section>
    )
}

export default TopBar;